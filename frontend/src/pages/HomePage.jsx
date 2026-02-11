import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Calendar, Users, Trophy, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import CourtCard from '../components/CourtCard';
import { courts } from '../data/seedData';

const HomePage = () => {
  const featuredCourt = courts[0];
  const topCourts = courts.slice(1, 5);

  const stats = [
    { icon: Users, value: '2,500+', label: 'Jugadores activos' },
    { icon: Calendar, value: '15,000+', label: 'Reservas mensuales' },
    { icon: Star, value: '4.8', label: 'Rating promedio' },
    { icon: Trophy, value: '50+', label: 'Torneos anuales' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Reserva Instantánea',
      description: 'Asegura tu cancha en segundos con confirmación inmediata.'
    },
    {
      icon: Calendar,
      title: 'Horarios Flexibles',
      description: 'De 8:00 a 22:00, elige el momento que mejor te convenga.'
    },
    {
      icon: Star,
      title: 'Canchas Premium',
      description: '8 canchas de primer nivel con mantenimiento profesional.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1676655079738-af54dfd6318e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwc2lsaG91ZXR0ZSUyMGRhcmslMjBneW18ZW58MHx8fHwxNzcwNDE5NzQ1fDA&ixlib=rb-4.1.0&q=85"
            alt="Hero background"
            loading="eager"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 hero-glow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[2px] bg-neon" />
              <span className="font-oswald text-neon text-sm tracking-[0.3em]">
                COMPLEJO DEPORTIVO
              </span>
            </div>
            
            <h1 className="font-oswald text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6">
              ELEVA TU
              <span className="block text-neon">JUEGO</span>
            </h1>
            
            <p className="text-lg text-white/70 font-manrope mb-8 max-w-lg">
              8 canchas de élite. Pádel, tenis, beach tennis, futsal y césped. 
              Reserva tu próximo partido en el complejo deportivo más moderno de la ciudad.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/canchas">
                <Button 
                  className="btn-neon-filled px-8 py-6 font-oswald text-lg tracking-wider"
                  data-testid="hero-cta-reservar"
                >
                  RESERVAR AHORA
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/canchas">
                <Button 
                  variant="outline"
                  className="btn-neon px-8 py-6 font-oswald text-lg tracking-wider"
                  data-testid="hero-cta-canchas"
                >
                  VER CANCHAS
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-white/40 tracking-widest">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neon to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-surface flex items-center justify-center">
                  <stat.icon size={24} className="text-neon" />
                </div>
                <p className="font-oswald text-3xl lg:text-4xl text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 font-manrope">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Court */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="font-oswald text-neon text-sm tracking-[0.3em] block mb-2">
                DESTACADO
              </span>
              <h2 className="font-oswald text-3xl lg:text-4xl tracking-wider">
                CANCHA PRINCIPAL
              </h2>
            </div>
            <Link 
              to="/canchas" 
              className="hidden sm:flex items-center gap-2 text-neon hover:underline"
            >
              <span className="font-oswald tracking-wider">VER TODAS</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <CourtCard court={featuredCourt} variant="featured" />
        </div>
      </section>

      {/* Courts Grid */}
      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-oswald text-neon text-sm tracking-[0.3em] block mb-2">
              NUESTRAS INSTALACIONES
            </span>
            <h2 className="font-oswald text-3xl lg:text-4xl tracking-wider mb-4">
              ELIGE TU CANCHA
            </h2>
            <p className="text-white/60 font-manrope max-w-xl mx-auto">
              Desde pádel profesional hasta césped natural. Cada cancha diseñada 
              para ofrecer la mejor experiencia deportiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/canchas">
              <Button 
                className="btn-neon px-8 py-4 font-oswald tracking-wider"
                data-testid="view-all-courts-btn"
              >
                VER TODAS LAS CANCHAS
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-oswald text-neon text-sm tracking-[0.3em] block mb-2">
              VENTAJAS
            </span>
            <h2 className="font-oswald text-3xl lg:text-4xl tracking-wider">
              ¿POR QUÉ ELEGIRNOS?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-panel p-8 text-center group hover:border-neon/50 transition-all duration-300"
                data-testid={`feature-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-surface flex items-center justify-center group-hover:bg-neon transition-colors">
                  <feature.icon 
                    size={28} 
                    className="text-neon group-hover:text-black transition-colors" 
                  />
                </div>
                <h3 className="font-oswald text-xl tracking-wider mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 font-manrope text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-neon/5" />
        <div className="absolute inset-0 hero-glow opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-oswald text-4xl lg:text-5xl tracking-wider mb-6">
            ¿LISTO PARA JUGAR?
          </h2>
          <p className="text-white/60 font-manrope mb-8 max-w-lg mx-auto">
            Reserva tu cancha ahora y vive la experiencia Sport Center.
            Tu próximo partido te espera.
          </p>
          <Link to="/canchas">
            <Button 
              className="btn-neon-filled px-12 py-6 font-oswald text-xl tracking-wider"
              data-testid="cta-reservar"
            >
              RESERVAR CANCHA
              <ArrowRight className="ml-3" size={24} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neon flex items-center justify-center">
                <span className="font-oswald font-bold text-black text-lg">SC</span>
              </div>
              <span className="font-oswald text-lg tracking-wider">
                COMPLEJO SPORT CENTER
              </span>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/50">
              <span>© 2026 Sport Center</span>
              <span>Todos los derechos reservados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
