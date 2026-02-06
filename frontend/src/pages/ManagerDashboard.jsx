import React, { useState, useMemo } from 'react';
import { 
  Calendar,
  Clock,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Hourglass,
  ChevronDown,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import StatCard from '../components/StatCard';
import ReviewCard from '../components/ReviewCard';
import { useApp } from '../context/AppContext';
import { courts, STATUS_LABELS, BOOKING_STATUS } from '../data/seedData';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const STATUS_COLORS = {
  solicitado: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  en_seña: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  confirmado: 'bg-neon/20 text-neon border-neon/50',
  finalizado: 'bg-gray-500/20 text-gray-400 border-gray-500/50'
};

const PIE_COLORS = ['#CCFF00', '#3B82F6', '#EAB308', '#6B7280'];

const ManagerDashboard = () => {
  const { bookings, reviews, updateBookingStatus, getDashboardStats } = useApp();
  const stats = getDashboardStats();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.clientName.toLowerCase().includes(query) ||
        b.courtName.toLowerCase().includes(query) ||
        b.clientEmail.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter);
    }

    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bookings, searchQuery, statusFilter]);

  // Chart data
  const statusChartData = [
    { name: 'Confirmado', value: stats.statusCounts.confirmado, color: '#CCFF00' },
    { name: 'En Seña', value: stats.statusCounts.en_seña, color: '#3B82F6' },
    { name: 'Solicitado', value: stats.statusCounts.solicitado, color: '#EAB308' },
    { name: 'Finalizado', value: stats.statusCounts.finalizado, color: '#6B7280' },
  ];

  const courtUsageData = courts.map(court => ({
    name: court.name.split(' ').slice(0, 2).join(' '),
    reservas: bookings.filter(b => b.courtId === court.id).length
  }));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    toast.success(`Estado actualizado a ${STATUS_LABELS[newStatus]}`);
  };

  const getNextStatuses = (currentStatus) => {
    const flow = {
      [BOOKING_STATUS.REQUESTED]: [BOOKING_STATUS.DEPOSIT, BOOKING_STATUS.CONFIRMED],
      [BOOKING_STATUS.DEPOSIT]: [BOOKING_STATUS.CONFIRMED],
      [BOOKING_STATUS.CONFIRMED]: [BOOKING_STATUS.FINISHED],
      [BOOKING_STATUS.FINISHED]: []
    };
    return flow[currentStatus] || [];
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-20" data-testid="manager-dashboard">
      {/* Header */}
      <div className="bg-surface/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-neon" />
            <span className="font-oswald text-neon text-sm tracking-[0.3em]">
              PANEL DE GESTIÓN
            </span>
          </div>
          <h1 className="font-oswald text-4xl lg:text-5xl tracking-wider">
            DASHBOARD
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Reservas"
            value={stats.totalBookings}
            icon={Calendar}
            variant="highlight"
          />
          <StatCard
            title="Ingresos"
            value={formatPrice(stats.totalRevenue)}
            icon={DollarSign}
            subtitle="Confirmados + Finalizados"
          />
          <StatCard
            title="Pendientes"
            value={stats.pendingBookings}
            icon={AlertCircle}
            subtitle="Requieren acción"
          />
          <StatCard
            title="Rating Promedio"
            value={stats.avgRating}
            icon={Star}
            subtitle={`${stats.totalReviews} reseñas`}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <div className="glass-panel p-6">
            <h3 className="font-oswald text-lg tracking-wider mb-6">
              DISTRIBUCIÓN POR ESTADO
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121212', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 0
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {statusChartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-white/60">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Court Usage */}
          <div className="glass-panel p-6">
            <h3 className="font-oswald text-lg tracking-wider mb-6">
              USO POR CANCHA
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courtUsageData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80}
                    stroke="rgba(255,255,255,0.3)"
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121212', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 0
                    }}
                  />
                  <Bar dataKey="reservas" fill="#CCFF00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabs for Bookings and Reviews */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="w-full max-w-md bg-surface border border-white/10 p-1 mb-6">
            <TabsTrigger 
              value="bookings" 
              className="flex-1 data-[state=active]:bg-neon data-[state=active]:text-black font-oswald tracking-wider"
              data-testid="tab-bookings"
            >
              RESERVAS
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="flex-1 data-[state=active]:bg-neon data-[state=active]:text-black font-oswald tracking-wider"
              data-testid="tab-reviews"
            >
              RESEÑAS
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <Input
                  type="text"
                  placeholder="Buscar por cliente, cancha..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-surface border-white/10"
                  data-testid="search-bookings"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-surface border-white/20" data-testid="status-filter">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-white/10">
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value={BOOKING_STATUS.REQUESTED}>Solicitado</SelectItem>
                  <SelectItem value={BOOKING_STATUS.DEPOSIT}>En Seña</SelectItem>
                  <SelectItem value={BOOKING_STATUS.CONFIRMED}>Confirmado</SelectItem>
                  <SelectItem value={BOOKING_STATUS.FINISHED}>Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bookings Table */}
            <div className="glass-panel overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="font-oswald tracking-wider text-white/60">CLIENTE</TableHead>
                      <TableHead className="font-oswald tracking-wider text-white/60">CANCHA</TableHead>
                      <TableHead className="font-oswald tracking-wider text-white/60">FECHA</TableHead>
                      <TableHead className="font-oswald tracking-wider text-white/60">HORA</TableHead>
                      <TableHead className="font-oswald tracking-wider text-white/60">TOTAL</TableHead>
                      <TableHead className="font-oswald tracking-wider text-white/60">ESTADO</TableHead>
                      <TableHead className="font-oswald tracking-wider text-white/60">ACCIONES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow 
                        key={booking.id} 
                        className="border-white/10 hover:bg-white/5"
                        data-testid={`booking-row-${booking.id}`}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.clientName}</p>
                            <p className="text-xs text-white/50">{booking.clientEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{booking.courtName}</TableCell>
                        <TableCell>{formatDate(booking.date)}</TableCell>
                        <TableCell>{booking.startTime} ({booking.duration}min)</TableCell>
                        <TableCell className="font-oswald text-neon">
                          {formatPrice(booking.totalPrice)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`border ${STATUS_COLORS[booking.status]}`}>
                            {STATUS_LABELS[booking.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedBooking(booking)}
                              className="h-8 w-8"
                              data-testid={`view-booking-${booking.id}`}
                            >
                              <Eye size={16} />
                            </Button>
                            
                            {getNextStatuses(booking.status).length > 0 && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-white/20"
                                    data-testid={`change-status-${booking.id}`}
                                  >
                                    Cambiar
                                    <ChevronDown size={14} className="ml-1" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-surface border-white/10">
                                  {getNextStatuses(booking.status).map(status => (
                                    <DropdownMenuItem
                                      key={status}
                                      onClick={() => handleStatusChange(booking.id, status)}
                                      className="cursor-pointer"
                                    >
                                      {STATUS_LABELS[status]}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-white/20" />
                  <p className="text-white/50">No se encontraron reservas</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map(review => {
                const court = courts.find(c => c.id === review.courtId);
                return (
                  <div key={review.id} className="space-y-2">
                    <p className="text-xs text-neon font-oswald tracking-wider">
                      {court?.name || 'Cancha'}
                    </p>
                    <ReviewCard review={review} />
                  </div>
                );
              })}
            </div>

            {reviews.length === 0 && (
              <div className="text-center py-12 glass-panel">
                <Star className="w-12 h-12 mx-auto mb-4 text-white/20" />
                <p className="text-white/50">No hay reseñas aún</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="bg-surface border-white/10 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-oswald text-xl tracking-wider">
              DETALLE DE RESERVA
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <div className="glass-panel p-4">
                <Badge className={`border ${STATUS_COLORS[selectedBooking.status]} mb-3`}>
                  {STATUS_LABELS[selectedBooking.status]}
                </Badge>
                <h3 className="font-oswald text-lg text-neon mb-2">
                  {selectedBooking.courtName}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/50">Fecha</p>
                    <p>{formatDate(selectedBooking.date)}</p>
                  </div>
                  <div>
                    <p className="text-white/50">Horario</p>
                    <p>{selectedBooking.startTime} ({selectedBooking.duration}min)</p>
                  </div>
                  <div>
                    <p className="text-white/50">Total</p>
                    <p className="font-oswald text-neon">{formatPrice(selectedBooking.totalPrice)}</p>
                  </div>
                  <div>
                    <p className="text-white/50">Creada</p>
                    <p>{new Date(selectedBooking.createdAt).toLocaleString('es-AR')}</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-4">
                <p className="text-white/50 text-sm mb-2">Cliente</p>
                <p className="font-medium">{selectedBooking.clientName}</p>
                <p className="text-sm text-white/60">{selectedBooking.clientEmail}</p>
                <p className="text-sm text-white/60">{selectedBooking.clientPhone}</p>
              </div>

              {getNextStatuses(selectedBooking.status).length > 0 && (
                <div className="flex gap-2">
                  {getNextStatuses(selectedBooking.status).map(status => (
                    <Button
                      key={status}
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, status);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 btn-neon font-oswald tracking-wider"
                    >
                      Pasar a {STATUS_LABELS[status]}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerDashboard;
