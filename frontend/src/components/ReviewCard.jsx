import React, { memo } from 'react';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-neon fill-neon' : 'text-white/20'}
      />
    ));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="glass-panel p-4 space-y-3"
      data-testid={`review-card-${review.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface-highlight flex items-center justify-center">
            <User size={18} className="text-white/50" />
          </div>
          <div>
            <p className="font-medium text-sm">{review.clientName}</p>
            <p className="text-xs text-white/50">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {renderStars(review.rating)}
        </div>
      </div>
      
      <p className="text-sm text-white/70 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

export default memo(ReviewCard);
