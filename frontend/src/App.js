import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CourtsPage from './pages/CourtsPage';
import CourtDetailPage from './pages/CourtDetailPage';
import ClientHistoryPage from './pages/ClientHistoryPage';
import ManagerDashboard from './pages/ManagerDashboard';
import './App.css';

// Protected route for manager
const ManagerRoute = ({ children }) => {
  const { userRole } = useApp();
  
  if (userRole !== 'manager') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Protected route for client
const ClientRoute = ({ children }) => {
  const { userRole } = useApp();
  
  if (userRole !== 'client') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppContent = () => {
  const { userRole } = useApp();

  return (
    <div className="App min-h-screen bg-[#050505]">
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            userRole === 'manager' ? <Navigate to="/dashboard" replace /> : <HomePage />
          } 
        />
        <Route path="/canchas" element={<CourtsPage />} />
        <Route path="/canchas/:courtId" element={<CourtDetailPage />} />
        
        {/* Client routes */}
        <Route path="/historial" element={<ClientHistoryPage />} />
        
        {/* Manager routes */}
        <Route 
          path="/dashboard" 
          element={
            <ManagerRoute>
              <ManagerDashboard />
            </ManagerRoute>
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#121212',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: 0,
          },
          className: 'font-manrope',
        }}
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
