import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

const COURT_TYPE_LABELS = {
  padel: 'Pádel',
  tenis: 'Tenis',
  beach_tenis: 'Beach Tennis',
  futsal: 'Futsal',
  cesped: 'Césped'
};

const CourtCard = ({ court, variant = 'default' }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleImageLoad = (e) => {
    e.target.classList.add('loaded');
  };

  if (variant === 'featured') {
    return (
      <Link
        to={`/canchas/${court.id}`}
        className="group relative block overflow-hidden"
        data-testid={`court-card-featured-${court.id}`}
      >
        <div className="relative h-[400px] lg:h-[500px]">
          <img
            src={court.image}
            alt={court.name}
            onLoad={handleImageLoad}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <Badge className="bg-neon text-black font-oswald mb-3">
              {COURT_TYPE_LABELS[court.type]}
            </Badge>
            <h3 className="font-oswald text-2xl lg:text-3xl tracking-wider mb-2 group-hover:text-neon transition-colors">
              {court.name}
            </h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              {court.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-neon fill-neon" />
                <span className="text-sm font-medium">{court.rating}</span>
                <span className="text-white/50 text-sm">({court.totalReviews})</span>
              </div>
              <span className="font-oswald text-neon text-lg">
                {formatPrice(court.pricePerHour)}/hr
              </span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-4 py-2 bg-neon text-black font-oswald text-sm tracking-wider">
              RESERVAR
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/canchas/${court.id}`}
      className="group block glass-panel overflow-hidden transition-all duration-300 hover:border-neon/50"
      data-testid={`court-card-${court.id}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={court.image}
          alt={court.name}
          loading="lazy"
          onLoad={handleImageLoad}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Badge className="absolute top-3 left-3 bg-surface/80 text-white font-manrope text-xs">
          {COURT_TYPE_LABELS[court.type]}
        </Badge>
        {court.available && (
          <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-oswald text-lg tracking-wider mb-2 group-hover:text-neon transition-colors">
          {court.name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-neon fill-neon" />
            <span>{court.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>8:00 - 22:00</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-white/50 text-sm">Desde</span>
          <span className="font-oswald text-neon">
            {formatPrice(court.pricePerHour)}/hr
          </span>
        </div>
      </div>
    </Link>
  );
};

export default memo(CourtCard);
