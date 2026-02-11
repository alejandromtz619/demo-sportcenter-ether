import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Check, 
  Calendar as CalendarIcon,
  DollarSign,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import TimeSlotPicker from '../components/TimeSlotPicker';
import ReviewCard from '../components/ReviewCard';
import { useApp } from '../context/AppContext';
import { courts, timeSlots, DURATION_BY_TYPE } from '../data/seedData';
import { toast } from 'sonner';

const COURT_TYPE_LABELS = {
  padel: 'Pádel',
  tenis: 'Tenis',
  beach_tenis: 'Beach Tennis',
  futsal: 'Futsal',
  cesped: 'Césped'
};

const CourtDetailPage = () => {
  const { courtId } = useParams();
  const navigate = useNavigate();
  const { currentUser, bookings, addBooking, getCourtReviews, addReview } = useApp();

  const court = courts.find(c => c.id === courtId);
  const reviews = getCourtReviews(courtId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('60');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    clientName: currentUser.name,
    clientEmail: currentUser.email,
    clientPhone: currentUser.phone || ''
  });

  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Get booked slots for selected date
  const bookedSlots = useMemo(() => {
    if (!court || !selectedDate) return [];
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    const dayBookings = bookings.filter(
      b => b.courtId === court.id && b.date === dateStr && b.status !== 'finalizado'
    );

    const slots = [];
    dayBookings.forEach(booking => {
      const startIndex = timeSlots.indexOf(booking.startTime);
      const slotsToBlock = Math.ceil(booking.duration / 30);
      for (let i = 0; i < slotsToBlock; i++) {
        if (timeSlots[startIndex + i]) {
          slots.push(timeSlots[startIndex + i]);
        }
      }
    });

    return slots;
  }, [court, selectedDate, bookings]);

  if (!court) {
    return (
      <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-oswald text-2xl mb-4">Cancha no encontrada</h2>
          <Button onClick={() => navigate('/canchas')} className="btn-neon">
            Volver a canchas
          </Button>
        </div>
      </div>
    );
  }

  const durationOptions = DURATION_BY_TYPE[court.type] || [60, 90, 120];
  const totalPrice = (court.pricePerHour * parseInt(selectedDuration)) / 60;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleBooking = () => {
    if (!selectedTime) {
      toast.error('Selecciona un horario');
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmBooking = () => {
    const booking = {
      courtId: court.id,
      courtName: court.name,
      clientName: bookingForm.clientName,
      clientEmail: bookingForm.clientEmail,
      clientPhone: bookingForm.clientPhone,
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTime,
      duration: parseInt(selectedDuration),
      totalPrice
    };

    addBooking(booking);
    setShowConfirmDialog(false);
    setSelectedTime('');
    toast.success('¡Reserva solicitada con éxito!');
  };

  const handleSubmitReview = () => {
    if (!reviewComment.trim()) {
      toast.error('Escribe un comentario');
      return;
    }

    addReview({
      courtId: court.id,
      clientName: currentUser.name,
      rating: reviewRating,
      comment: reviewComment
    });

    setReviewComment('');
    setReviewRating(5);
    toast.success('¡Reseña publicada!');
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : court.rating;

  return (
    <div className="min-h-screen bg-[#050505] pt-20" data-testid="court-detail-page">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate('/canchas')}
          className="flex items-center gap-2 text-white/60 hover:text-neon transition-colors"
          data-testid="back-btn"
        >
          <ArrowLeft size={18} />
          <span className="font-manrope text-sm">Volver a canchas</span>
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 bg-neon text-black font-oswald text-sm tracking-wider mb-4">
              {COURT_TYPE_LABELS[court.type]}
            </span>
            <h1 className="font-oswald text-4xl lg:text-5xl tracking-wider mb-4">
              {court.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-neon fill-neon" />
                <span className="font-medium">{avgRating}</span>
                <span className="text-white/50">({reviews.length} reseñas)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>8:00 - 22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-neon" />
                <span className="font-oswald text-neon text-xl">
                  {formatPrice(court.pricePerHour)}/hr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Details & Reviews */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div>
              <h2 className="font-oswald text-xl tracking-wider mb-4">DESCRIPCIÓN</h2>
              <p className="text-white/70 font-manrope leading-relaxed">
                {court.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-oswald text-xl tracking-wider mb-4">CARACTERÍSTICAS</h2>
              <div className="grid grid-cols-2 gap-3">
                {court.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 glass-panel"
                  >
                    <div className="w-6 h-6 bg-neon/20 flex items-center justify-center">
                      <Check size={14} className="text-neon" />
                    </div>
                    <span className="text-sm font-manrope">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="w-full bg-surface border border-white/10 p-1">
                <TabsTrigger 
                  value="reviews" 
                  className="flex-1 data-[state=active]:bg-neon data-[state=active]:text-black"
                  data-testid="tab-reviews"
                >
                  Reseñas ({reviews.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="write" 
                  className="flex-1 data-[state=active]:bg-neon data-[state=active]:text-black"
                  data-testid="tab-write-review"
                >
                  Escribir Reseña
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="mt-6 space-y-4">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <div className="text-center py-12 glass-panel">
                    <Star className="w-12 h-12 mx-auto mb-4 text-white/20" />
                    <p className="text-white/50">Aún no hay reseñas</p>
                    <p className="text-sm text-white/30">Sé el primero en opinar</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="write" className="mt-6">
                <div className="glass-panel p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-oswald tracking-wider mb-3">
                      CALIFICACIÓN
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1 transition-transform hover:scale-110"
                          data-testid={`star-${star}`}
                        >
                          <Star 
                            size={28} 
                            className={star <= reviewRating ? 'text-neon fill-neon' : 'text-white/20'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-oswald tracking-wider mb-3">
                      TU COMENTARIO
                    </label>
                    <Textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Cuéntanos tu experiencia..."
                      className="bg-surface border-white/10 focus:border-neon min-h-[120px]"
                      data-testid="review-comment"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmitReview}
                    className="btn-neon-filled w-full font-oswald tracking-wider"
                    data-testid="submit-review-btn"
                  >
                    <Send size={18} className="mr-2" />
                    PUBLICAR RESEÑA
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24 space-y-6">
              <h2 className="font-oswald text-xl tracking-wider">RESERVAR</h2>

              {/* Calendar */}
              <div>
                <label className="block text-sm font-oswald tracking-wider mb-3">
                  <CalendarIcon size={16} className="inline mr-2" />
                  FECHA
                </label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  disabled={(date) => date < new Date()}
                  className="bg-surface border border-white/10 p-3"
                  data-testid="booking-calendar"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-oswald tracking-wider mb-3">
                  <Clock size={16} className="inline mr-2" />
                  DURACIÓN
                </label>
                <Select 
                  value={selectedDuration} 
                  onValueChange={setSelectedDuration}
                >
                  <SelectTrigger 
                    className="bg-surface border-white/20"
                    data-testid="duration-select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-white/10">
                    {durationOptions.map(dur => (
                      <SelectItem key={dur} value={dur.toString()}>
                        {dur} minutos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-oswald tracking-wider mb-3">
                  HORARIO
                </label>
                <TimeSlotPicker
                  slots={timeSlots}
                  selectedSlot={selectedTime}
                  onSelectSlot={setSelectedTime}
                  bookedSlots={bookedSlots}
                  duration={parseInt(selectedDuration)}
                />
              </div>

              {/* Price Summary */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Total</span>
                  <span className="font-oswald text-2xl text-neon">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={!selectedTime}
                  className="w-full btn-neon-filled py-6 font-oswald text-lg tracking-wider disabled:opacity-50"
                  data-testid="book-now-btn"
                >
                  RESERVAR AHORA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-surface border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-oswald text-xl tracking-wider">
              CONFIRMAR RESERVA
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Completa tus datos para solicitar la reserva
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="glass-panel p-4 space-y-2">
              <p className="font-oswald text-neon">{court.name}</p>
              <p className="text-sm text-white/60">
                {selectedDate.toLocaleDateString('es-AR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-white/60">
                {selectedTime} - {selectedDuration} minutos
              </p>
              <p className="font-oswald text-lg mt-2">
                Total: {formatPrice(totalPrice)}
              </p>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Nombre completo"
                value={bookingForm.clientName}
                onChange={(e) => setBookingForm({...bookingForm, clientName: e.target.value})}
                className="bg-surface border-white/20"
                data-testid="booking-name"
              />
              <Input
                type="email"
                placeholder="Email"
                value={bookingForm.clientEmail}
                onChange={(e) => setBookingForm({...bookingForm, clientEmail: e.target.value})}
                className="bg-surface border-white/20"
                data-testid="booking-email"
              />
              <Input
                placeholder="Teléfono"
                value={bookingForm.clientPhone}
                onChange={(e) => setBookingForm({...bookingForm, clientPhone: e.target.value})}
                className="bg-surface border-white/20"
                data-testid="booking-phone"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="flex-1 border-white/20"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmBooking}
              className="flex-1 btn-neon-filled font-oswald tracking-wider"
              data-testid="confirm-booking-btn"
            >
              CONFIRMAR
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourtDetailPage;
