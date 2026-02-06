import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  LayoutGrid, 
  Calendar, 
  User, 
  Bell, 
  Menu, 
  X,
  Shield,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

const Navbar = () => {
  const { userRole, currentUser, switchRole, notifications, markNotificationRead, markAllNotificationsRead, getUnreadCount } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = getUnreadCount();

  const clientLinks = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/canchas', label: 'Canchas', icon: LayoutGrid },
    { path: '/historial', label: 'Mis Reservas', icon: Calendar },
  ];

  const managerLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { path: '/canchas', label: 'Canchas', icon: Calendar },
  ];

  const links = userRole === 'manager' ? managerLinks : clientLinks;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
            <div className="w-10 h-10 bg-neon flex items-center justify-center">
              <span className="font-oswald font-bold text-black text-lg">SC</span>
            </div>
            <span className="font-oswald text-lg tracking-wider hidden sm:block">
              SPORT CENTER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 font-manrope text-sm tracking-wide transition-all duration-300 flex items-center gap-2 ${
                  isActive(link.path)
                    ? 'text-neon border-b-2 border-neon'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  data-testid="notifications-btn"
                >
                  <Bell size={20} className="text-white/70" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon text-black text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 bg-surface border border-white/10"
                data-testid="notifications-dropdown"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="font-oswald text-sm tracking-wider">NOTIFICACIONES</span>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-xs text-neon hover:underline"
                    >
                      Marcar todas leídas
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map((notif) => (
                    <DropdownMenuItem 
                      key={notif.id}
                      className={`px-4 py-3 cursor-pointer ${!notif.read ? 'bg-white/5' : ''}`}
                      onClick={() => markNotificationRead(notif.id)}
                    >
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-medium ${!notif.read ? 'text-neon' : 'text-white'}`}>
                          {notif.title}
                        </span>
                        <span className="text-xs text-white/60">{notif.message}</span>
                        <span className="text-xs text-white/40">
                          {new Date(notif.timestamp).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {notifications.length === 0 && (
                    <div className="px-4 py-6 text-center text-white/50 text-sm">
                      No hay notificaciones
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="gap-2 px-3"
                  data-testid="role-switcher-btn"
                >
                  {userRole === 'manager' ? (
                    <Shield size={18} className="text-neon" />
                  ) : (
                    <User size={18} className="text-white/70" />
                  )}
                  <span className="hidden sm:block text-sm font-manrope">
                    {currentUser.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-surface border border-white/10"
                data-testid="role-dropdown"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="font-oswald text-sm tracking-wider">CAMBIAR USUARIO</p>
                  <p className="text-xs text-white/50 mt-1">{currentUser.email}</p>
                </div>
                <DropdownMenuItem 
                  onClick={() => switchRole('client')}
                  className="cursor-pointer px-4 py-3"
                  data-testid="switch-to-client"
                >
                  <Users size={16} className="mr-3" />
                  <div>
                    <p className="font-medium">Cliente Demo</p>
                    <p className="text-xs text-white/50">Ver como cliente</p>
                  </div>
                  {userRole === 'client' && (
                    <Badge className="ml-auto bg-neon text-black">Activo</Badge>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => switchRole('manager')}
                  className="cursor-pointer px-4 py-3"
                  data-testid="switch-to-manager"
                >
                  <Shield size={16} className="mr-3" />
                  <div>
                    <p className="font-medium">Gestor Demo</p>
                    <p className="text-xs text-white/50">Ver dashboard</p>
                  </div>
                  {userRole === 'manager' && (
                    <Badge className="ml-auto bg-neon text-black">Activo</Badge>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10" data-testid="mobile-menu">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive(link.path)
                    ? 'text-neon bg-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={18} />
                <span className="font-manrope">{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
