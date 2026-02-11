import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Hourglass
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useApp } from '../context/AppContext';
import { courts, STATUS_LABELS, BOOKING_STATUS } from '../data/seedData';
import { toast } from 'sonner';

const STATUS_ICONS = {
  solicitado: AlertCircle,
  en_seña: Hourglass,
  confirmado: CheckCircle,
  finalizado: CheckCircle
};

const STATUS_COLORS = {
  solicitado: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  en_seña: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  confirmado: 'bg-neon/20 text-neon border-neon/50',
  finalizado: 'bg-gray-500/20 text-gray-400 border-gray-500/50'
};

const ClientHistoryPage = () => {
  const { bookings, currentUser, cancelBooking } = useApp();

  // Filter bookings for current client (show all for demo)
  const clientBookings = bookings;

  const upcomingBookings = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return clientBookings
      .filter(b => b.date >= today && b.status !== BOOKING_STATUS.FINISHED)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [clientBookings]);

  const pastBookings = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return clientBookings
      .filter(b => b.date < today || b.status === BOOKING_STATUS.FINISHED)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [clientBookings]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getCourtImage = (courtId) => {
    const court = courts.find(c => c.id === courtId);
    return court?.image || '';
  };

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    toast.success('Reserva cancelada');
  };

  const BookingCard = ({ booking, showCancel = false }) => {
    const StatusIcon = STATUS_ICONS[booking.status];
    
    return (
      <div 
        className="glass-panel overflow-hidden group hover:border-neon/30 transition-all duration-300"
        data-testid={`booking-card-${booking.id}`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Court Image */}
          <div className="relative w-full md:w-48 h-32 md:h-auto bg-surface/30">
            <img
              src={getCourtImage(booking.courtId)}
              alt={booking.courtName}
              loading="lazy"
              onLoad={(e) => e.target.classList.add('loaded')}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 md:hidden" />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-oswald text-lg tracking-wider">
                    {booking.courtName}
                  </h3>
                  <Badge 
                    className={`text-xs border ${STATUS_COLORS[booking.status]}`}
                  >
                    <StatusIcon size={12} className="mr-1" />
                    {STATUS_LABELS[booking.status]}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{booking.startTime} - {booking.duration} min</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-oswald text-xl text-neon">
                  {formatPrice(booking.totalPrice)}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  {new Date(booking.createdAt).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>

            {/* Actions */}
            {showCancel && booking.status === BOOKING_STATUS.REQUESTED && (
              <div className="flex justify-end mt-4 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  data-testid={`cancel-booking-${booking.id}`}
                >
                  <XCircle size={16} className="mr-2" />
                  Cancelar reserva
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-20" data-testid="client-history-page">
      {/* Header */}
      <div className="bg-surface/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-neon" />
            <span className="font-oswald text-neon text-sm tracking-[0.3em]">
              MI CUENTA
            </span>
          </div>
          <h1 className="font-oswald text-4xl lg:text-5xl tracking-wider mb-4">
            MIS RESERVAS
          </h1>
          <p className="text-white/60 font-manrope">
            Bienvenido, {currentUser.name}. Aquí puedes ver el historial de tus reservas.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="glass-panel p-4 text-center">
            <p className="font-oswald text-3xl text-neon">{upcomingBookings.length}</p>
            <p className="text-sm text-white/50">Próximas</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="font-oswald text-3xl">{pastBookings.length}</p>
            <p className="text-sm text-white/50">Finalizadas</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="font-oswald text-3xl">
              {clientBookings.filter(b => b.status === BOOKING_STATUS.CONFIRMED).length}
            </p>
            <p className="text-sm text-white/50">Confirmadas</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="font-oswald text-3xl">
              {clientBookings.filter(b => b.status === BOOKING_STATUS.REQUESTED).length}
            </p>
            <p className="text-sm text-white/50">Pendientes</p>
          </div>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full max-w-md bg-surface border border-white/10 p-1 mb-8">
            <TabsTrigger 
              value="upcoming" 
              className="flex-1 data-[state=active]:bg-neon data-[state=active]:text-black font-oswald tracking-wider"
              data-testid="tab-upcoming"
            >
              PRÓXIMAS ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="flex-1 data-[state=active]:bg-neon data-[state=active]:text-black font-oswald tracking-wider"
              data-testid="tab-past"
            >
              HISTORIAL ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} showCancel />
              ))
            ) : (
              <div className="text-center py-16 glass-panel">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-white/20" />
                <h3 className="font-oswald text-xl tracking-wider mb-2">
                  NO HAY RESERVAS PRÓXIMAS
                </h3>
                <p className="text-white/50 mb-6">
                  ¿Listo para tu próximo partido?
                </p>
                <Link to="/canchas">
                  <Button className="btn-neon font-oswald tracking-wider">
                    RESERVAR CANCHA
                    <ChevronRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-16 glass-panel">
                <Clock className="w-16 h-16 mx-auto mb-4 text-white/20" />
                <h3 className="font-oswald text-xl tracking-wider mb-2">
                  SIN HISTORIAL
                </h3>
                <p className="text-white/50">
                  Aquí aparecerán tus reservas finalizadas
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientHistoryPage;
