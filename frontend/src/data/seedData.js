// Seed Data for Complejo Sport Center

export const COURT_TYPES = {
  PADEL: 'padel',
  TENNIS: 'tenis',
  BEACH_TENNIS: 'beach_tenis',
  FUTSAL: 'futsal',
  GRASS: 'cesped'
};

export const BOOKING_STATUS = {
  REQUESTED: 'solicitado',
  DEPOSIT: 'en_seña',
  CONFIRMED: 'confirmado',
  FINISHED: 'finalizado'
};

export const STATUS_LABELS = {
  solicitado: 'Solicitado',
  en_seña: 'En Seña',
  confirmado: 'Confirmado',
  finalizado: 'Finalizado'
};

// Duration options per court type (in minutes)
export const DURATION_BY_TYPE = {
  padel: [60, 90, 120],
  tenis: [60, 90, 120],
  beach_tenis: [60, 90],
  futsal: [60, 90, 120],
  cesped: [60, 90, 120]
};

// Price per hour by court type
export const PRICE_BY_TYPE = {
  padel: 2500,
  tenis: 3000,
  beach_tenis: 2800,
  futsal: 4500,
  cesped: 6000
};

export const courts = [
  {
    id: 'court-1',
    name: 'Padel Court Central',
    type: COURT_TYPES.PADEL,
    description: 'Cancha principal de pádel con iluminación LED de última generación. Superficie de cristal templado y césped sintético profesional.',
    image: 'https://images.unsplash.com/photo-1646649853703-7645147474ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMGNvdXJ0fGVufDB8fHx8MTc3MDQxOTc0M3ww&ixlib=rb-4.1.0&q=85',
    features: ['Iluminación LED', 'Césped sintético pro', 'Cristal templado', 'Climatizada'],
    rating: 4.8,
    totalReviews: 45,
    pricePerHour: 2500,
    available: true
  },
  {
    id: 'court-2',
    name: 'Padel Court VIP',
    type: COURT_TYPES.PADEL,
    description: 'Experiencia VIP con vestuarios privados y servicio de bebidas incluido. La cancha preferida por profesionales.',
    image: 'https://images.unsplash.com/photo-1658491830143-72808ca237e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHw0fHxwYWRlbCUyMGNvdXJ0fGVufDB8fHx8MTc3MDQxOTc0M3ww&ixlib=rb-4.1.0&q=85',
    features: ['Vestuario privado', 'Bebidas incluidas', 'Toallas premium', 'Aire acondicionado'],
    rating: 4.9,
    totalReviews: 38,
    pricePerHour: 3500,
    available: true
  },
  {
    id: 'court-3',
    name: 'Padel Court Pro',
    type: COURT_TYPES.PADEL,
    description: 'Cancha de entrenamiento profesional con sistema de grabación para análisis de juego.',
    image: 'https://images.unsplash.com/photo-1689942963385-f5bd03f3b270?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxwYWRlbCUyMGNvdXJ0fGVufDB8fHx8MTc3MDQxOTc0M3ww&ixlib=rb-4.1.0&q=85',
    features: ['Sistema de grabación', 'Análisis de juego', 'Entrenador disponible', 'Equipamiento pro'],
    rating: 4.7,
    totalReviews: 52,
    pricePerHour: 2800,
    available: true
  },
  {
    id: 'court-4',
    name: 'Grand Slam Court',
    type: COURT_TYPES.TENNIS,
    description: 'Cancha de tenis profesional superficie dura. Dimensiones oficiales ATP/WTA.',
    image: 'https://images.unsplash.com/photo-1617144520113-88ae706a86eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHx0ZW5uaXMlMjBjb3VydCUyMGJsdWUlMjBoYXJkJTIwY291cnQlMjBuaWdodCUyMGxpZ2h0c3xlbnwwfHx8fDE3NzA0MTk3MzV8MA&ixlib=rb-4.1.0&q=85',
    features: ['Superficie dura', 'Dimensiones ATP', 'Iluminación nocturna', 'Tribunas'],
    rating: 4.9,
    totalReviews: 67,
    pricePerHour: 3000,
    available: true
  },
  {
    id: 'court-5',
    name: 'Beach Arena',
    type: COURT_TYPES.BEACH_TENNIS,
    description: 'Arena de beach tennis con arena importada. Ambiente tropical con música y bar.',
    image: 'https://images.pexels.com/photos/4330940/pexels-photo-4330940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    features: ['Arena importada', 'Música ambiente', 'Bar integrado', 'Duchas exteriores'],
    rating: 4.6,
    totalReviews: 34,
    pricePerHour: 2800,
    available: true
  },
  {
    id: 'court-6',
    name: 'Futsal Indoor A',
    type: COURT_TYPES.FUTSAL,
    description: 'Cancha de fútbol sala profesional con piso de poliuretano de alta resistencia.',
    image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzb2NjZXIlMjBjb3VydHxlbnwwfHx8fDE3NzA0MTk3NDV8MA&ixlib=rb-4.1.0&q=85',
    features: ['Piso poliuretano', 'Arcos profesionales', 'Marcador digital', 'Vestuarios'],
    rating: 4.5,
    totalReviews: 89,
    pricePerHour: 4500,
    available: true
  },
  {
    id: 'court-7',
    name: 'Futsal Indoor B',
    type: COURT_TYPES.FUTSAL,
    description: 'Segunda cancha de futsal ideal para entrenamientos y partidos amistosos.',
    image: 'https://images.unsplash.com/photo-1763775468707-573c7cd6b0da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxpbmRvb3IlMjBzb2NjZXIlMjBjb3VydHxlbnwwfHx8fDE3NzA0MTk3NDV8MA&ixlib=rb-4.1.0&q=85',
    features: ['Entrenamiento', 'Partidos amistosos', 'Pelotas incluidas', 'Cronómetro'],
    rating: 4.4,
    totalReviews: 56,
    pricePerHour: 4000,
    available: true
  },
  {
    id: 'court-8',
    name: 'Stadium Field',
    type: COURT_TYPES.GRASS,
    description: 'Campo de césped natural de alta calidad. Ideal para fútbol 7 y eventos especiales.',
    image: 'https://images.unsplash.com/photo-1768861171882-9bbfed55b6f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGdyYXNzJTIwbmlnaHQlMjBzdGFkaXVtJTIwbGlnaHRzfGVufDB8fHx8MTc3MDQxOTczN3ww&ixlib=rb-4.1.0&q=85',
    features: ['Césped natural', 'Fútbol 7', 'Iluminación estadio', 'Eventos especiales'],
    rating: 4.8,
    totalReviews: 42,
    pricePerHour: 6000,
    available: true
  }
];

// Generate time slots from 8:00 to 22:00 with 30 min intervals
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 22; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  slots.push('22:00');
  return slots;
};

export const timeSlots = generateTimeSlots();

// Sample bookings
export const initialBookings = [
  {
    id: 'booking-1',
    courtId: 'court-1',
    courtName: 'Padel Court Central',
    clientName: 'Juan Pérez',
    clientEmail: 'juan@email.com',
    clientPhone: '+54 11 1234-5678',
    date: '2026-01-15',
    startTime: '10:00',
    duration: 90,
    status: BOOKING_STATUS.CONFIRMED,
    totalPrice: 3750,
    createdAt: '2026-01-10T14:30:00Z'
  },
  {
    id: 'booking-2',
    courtId: 'court-4',
    courtName: 'Grand Slam Court',
    clientName: 'María García',
    clientEmail: 'maria@email.com',
    clientPhone: '+54 11 2345-6789',
    date: '2026-01-15',
    startTime: '14:00',
    duration: 60,
    status: BOOKING_STATUS.DEPOSIT,
    totalPrice: 3000,
    createdAt: '2026-01-11T09:15:00Z'
  },
  {
    id: 'booking-3',
    courtId: 'court-6',
    courtName: 'Futsal Indoor A',
    clientName: 'Carlos López',
    clientEmail: 'carlos@email.com',
    clientPhone: '+54 11 3456-7890',
    date: '2026-01-16',
    startTime: '18:00',
    duration: 120,
    status: BOOKING_STATUS.REQUESTED,
    totalPrice: 9000,
    createdAt: '2026-01-12T16:45:00Z'
  },
  {
    id: 'booking-4',
    courtId: 'court-2',
    courtName: 'Padel Court VIP',
    clientName: 'Ana Martínez',
    clientEmail: 'ana@email.com',
    clientPhone: '+54 11 4567-8901',
    date: '2026-01-14',
    startTime: '09:00',
    duration: 90,
    status: BOOKING_STATUS.FINISHED,
    totalPrice: 5250,
    createdAt: '2026-01-08T11:20:00Z'
  },
  {
    id: 'booking-5',
    courtId: 'court-8',
    courtName: 'Stadium Field',
    clientName: 'Roberto Sánchez',
    clientEmail: 'roberto@email.com',
    clientPhone: '+54 11 5678-9012',
    date: '2026-01-17',
    startTime: '16:00',
    duration: 120,
    status: BOOKING_STATUS.CONFIRMED,
    totalPrice: 12000,
    createdAt: '2026-01-13T10:00:00Z'
  },
  {
    id: 'booking-6',
    courtId: 'court-5',
    courtName: 'Beach Arena',
    clientName: 'Laura Torres',
    clientEmail: 'laura@email.com',
    clientPhone: '+54 11 6789-0123',
    date: '2026-01-15',
    startTime: '11:00',
    duration: 60,
    status: BOOKING_STATUS.DEPOSIT,
    totalPrice: 2800,
    createdAt: '2026-01-11T15:30:00Z'
  },
  {
    id: 'booking-7',
    courtId: 'court-3',
    courtName: 'Padel Court Pro',
    clientName: 'Diego Fernández',
    clientEmail: 'diego@email.com',
    clientPhone: '+54 11 7890-1234',
    date: '2026-01-13',
    startTime: '20:00',
    duration: 90,
    status: BOOKING_STATUS.FINISHED,
    totalPrice: 4200,
    createdAt: '2026-01-07T18:00:00Z'
  },
  {
    id: 'booking-8',
    courtId: 'court-7',
    courtName: 'Futsal Indoor B',
    clientName: 'Sofía Rodríguez',
    clientEmail: 'sofia@email.com',
    clientPhone: '+54 11 8901-2345',
    date: '2026-01-18',
    startTime: '19:00',
    duration: 60,
    status: BOOKING_STATUS.REQUESTED,
    totalPrice: 4000,
    createdAt: '2026-01-14T12:00:00Z'
  }
];

// Sample reviews
export const initialReviews = [
  {
    id: 'review-1',
    courtId: 'court-1',
    clientName: 'Juan Pérez',
    rating: 5,
    comment: 'Excelente cancha, muy bien mantenida. La iluminación es perfecta para jugar de noche.',
    date: '2026-01-10'
  },
  {
    id: 'review-2',
    courtId: 'court-1',
    clientName: 'Pedro Gómez',
    rating: 4,
    comment: 'Muy buena experiencia. El césped sintético está en perfectas condiciones.',
    date: '2026-01-08'
  },
  {
    id: 'review-3',
    courtId: 'court-2',
    clientName: 'Ana Martínez',
    rating: 5,
    comment: 'El servicio VIP es increíble. Las bebidas y toallas son un plus genial.',
    date: '2026-01-09'
  },
  {
    id: 'review-4',
    courtId: 'court-4',
    clientName: 'María García',
    rating: 5,
    comment: 'La mejor cancha de tenis de la zona. Superficie impecable.',
    date: '2026-01-07'
  },
  {
    id: 'review-5',
    courtId: 'court-4',
    clientName: 'Lucas Ramírez',
    rating: 4,
    comment: 'Muy profesional. Las tribunas le dan un toque especial.',
    date: '2026-01-05'
  },
  {
    id: 'review-6',
    courtId: 'court-5',
    clientName: 'Laura Torres',
    rating: 5,
    comment: 'El ambiente tropical es genial. La arena está perfecta.',
    date: '2026-01-06'
  },
  {
    id: 'review-7',
    courtId: 'court-6',
    clientName: 'Carlos López',
    rating: 4,
    comment: 'Buena cancha para futsal. El piso es muy rápido.',
    date: '2026-01-04'
  },
  {
    id: 'review-8',
    courtId: 'court-8',
    clientName: 'Roberto Sánchez',
    rating: 5,
    comment: 'El césped natural es espectacular. Ideal para partidos importantes.',
    date: '2026-01-03'
  },
  {
    id: 'review-9',
    courtId: 'court-3',
    clientName: 'Diego Fernández',
    rating: 4,
    comment: 'El sistema de grabación es muy útil para mejorar el juego.',
    date: '2026-01-02'
  },
  {
    id: 'review-10',
    courtId: 'court-7',
    clientName: 'Sofía Rodríguez',
    rating: 4,
    comment: 'Perfecta para entrenamientos de equipo. Buen precio.',
    date: '2026-01-01'
  }
];

// Sample notifications
export const initialNotifications = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'Nueva reserva',
    message: 'Carlos López solicitó Futsal Indoor A para el 16/01',
    timestamp: '2026-01-12T16:45:00Z',
    read: false
  },
  {
    id: 'notif-2',
    type: 'review',
    title: 'Nueva reseña',
    message: 'Juan Pérez dejó una reseña 5 estrellas en Padel Court Central',
    timestamp: '2026-01-10T14:30:00Z',
    read: false
  },
  {
    id: 'notif-3',
    type: 'payment',
    title: 'Pago recibido',
    message: 'María García completó la seña para Grand Slam Court',
    timestamp: '2026-01-11T09:15:00Z',
    read: true
  },
  {
    id: 'notif-4',
    type: 'booking',
    title: 'Reserva confirmada',
    message: 'Roberto Sánchez confirmó Stadium Field para el 17/01',
    timestamp: '2026-01-13T10:00:00Z',
    read: false
  },
  {
    id: 'notif-5',
    type: 'reminder',
    title: 'Recordatorio',
    message: 'Hay 3 reservas pendientes de confirmar',
    timestamp: '2026-01-14T08:00:00Z',
    read: false
  }
];

// Demo users
export const demoUsers = {
  client: {
    id: 'user-client',
    name: 'Cliente Demo',
    email: 'cliente@sportcenter.com',
    role: 'client',
    phone: '+54 11 9999-8888'
  },
  manager: {
    id: 'user-manager',
    name: 'Gestor Demo',
    email: 'gestor@sportcenter.com',
    role: 'manager',
    phone: '+54 11 8888-7777'
  }
};

// Get bookings for current client
export const getClientBookings = (clientEmail) => {
  return initialBookings.filter(b => b.clientEmail === clientEmail);
};

// Get reviews for a court
export const getCourtReviews = (courtId) => {
  return initialReviews.filter(r => r.courtId === courtId);
};
