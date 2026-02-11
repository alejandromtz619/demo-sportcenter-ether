import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { 
  initialBookings, 
  initialReviews, 
  initialNotifications, 
  demoUsers,
  BOOKING_STATUS 
} from '../data/seedData';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User role state
  const [userRole, setUserRole] = useState('client');
  const [currentUser, setCurrentUser] = useState(demoUsers.client);

  // Data states
  const [bookings, setBookings] = useState(initialBookings);
  const [reviews, setReviews] = useState(initialReviews);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Switch user role
  const switchRole = useCallback((role) => {
    setUserRole(role);
    setCurrentUser(role === 'manager' ? demoUsers.manager : demoUsers.client);
  }, []);

  // Add new booking
  const addBooking = useCallback((booking) => {
    const newBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: BOOKING_STATUS.REQUESTED,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    
    // Add notification
    addNotification({
      type: 'booking',
      title: 'Nueva reserva',
      message: `${booking.clientName} solicitó ${booking.courtName} para el ${booking.date}`
    });
    
    return newBooking;
  }, []);

  // Update booking status
  const updateBookingStatus = useCallback((bookingId, newStatus) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
      const booking = updated.find(b => b.id === bookingId);
      if (booking) {
        addNotification({
          type: 'booking',
          title: 'Estado actualizado',
          message: `Reserva de ${booking.clientName} actualizada a ${newStatus}`
        });
      }
      return updated;
    });
  }, [addNotification]);

  // Cancel booking
  const cancelBooking = useCallback((bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  }, []);

  // Add review
  const addReview = useCallback((review) => {
    const newReview = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    
    addNotification({
      type: 'review',
      title: 'Nueva reseña',
      message: `${review.clientName} dejó una reseña de ${review.rating} estrellas`
    });
    
    return newReview;
  }, []);

  // Get reviews for court
  const getCourtReviews = useCallback((courtId) => {
    return reviews.filter(r => r.courtId === courtId);
  }, [reviews]);

  // Add notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  // Mark notification as read
  const markNotificationRead = useCallback((notifId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notifId ? { ...n, read: true } : n)
    );
  }, []);

  // Mark all notifications as read
  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // Get unread notifications count
  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Get client bookings
  const getClientBookings = useCallback(() => {
    return bookings.filter(b => b.clientEmail === currentUser.email);
  }, [bookings, currentUser.email]);

  // Get dashboard stats
  const getDashboardStats = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => b.date === today);
    const totalRevenue = bookings
      .filter(b => b.status === BOOKING_STATUS.CONFIRMED || b.status === BOOKING_STATUS.FINISHED)
      .reduce((sum, b) => sum + b.totalPrice, 0);
    
    const statusCounts = {
      solicitado: bookings.filter(b => b.status === BOOKING_STATUS.REQUESTED).length,
      en_seña: bookings.filter(b => b.status === BOOKING_STATUS.DEPOSIT).length,
      confirmado: bookings.filter(b => b.status === BOOKING_STATUS.CONFIRMED).length,
      finalizado: bookings.filter(b => b.status === BOOKING_STATUS.FINISHED).length
    };

    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    return {
      totalBookings: bookings.length,
      todayBookings: todayBookings.length,
      totalRevenue,
      pendingBookings: statusCounts.solicitado + statusCounts.en_seña,
      statusCounts,
      avgRating,
      totalReviews: reviews.length
    };
  }, [bookings, reviews]);

  // Check if time slot is available
  const isSlotAvailable = useCallback((courtId, date, startTime, duration) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + duration;
    
    return !bookings.some(b => {
      if (b.courtId !== courtId || b.date !== date || b.status === BOOKING_STATUS.FINISHED) {
        return false;
      }
      const bookingStart = timeToMinutes(b.startTime);
      const bookingEnd = bookingStart + b.duration;
      return (startMinutes < bookingEnd && endMinutes > bookingStart);
    });
  }, [bookings]);

  const value = useMemo(() => ({
    userRole,
    currentUser,
    bookings,
    reviews,
    notifications,
    switchRole,
    addBooking,
    updateBookingStatus,
    cancelBooking,
    addReview,
    getCourtReviews,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadCount,
    getClientBookings,
    getDashboardStats,
    isSlotAvailable
  }), [
    userRole,
    currentUser,
    bookings,
    reviews,
    notifications,
    switchRole,
    addBooking,
    updateBookingStatus,
    cancelBooking,
    addReview,
    getCourtReviews,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadCount,
    getClientBookings,
    getDashboardStats,
    isSlotAvailable
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Helper function
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export default AppContext;
