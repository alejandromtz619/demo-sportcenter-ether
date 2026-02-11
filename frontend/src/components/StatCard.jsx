import React, { memo } from 'react';
import { cn } from '../lib/utils';

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  variant = 'default' 
}) => {
  return (
    <div 
      className={cn(
        'glass-panel p-5 space-y-3 transition-all duration-300 hover:border-neon/30',
        variant === 'highlight' && 'border-neon/30 bg-neon/5'
      )}
      data-testid={`stat-card-${title.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-oswald tracking-wider text-white/50 uppercase">
          {title}
        </span>
        {Icon && (
          <div className={cn(
            'w-8 h-8 flex items-center justify-center',
            variant === 'highlight' ? 'bg-neon text-black' : 'bg-surface-highlight'
          )}>
            <Icon size={16} />
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className={cn(
          'font-oswald text-3xl tracking-tight',
          variant === 'highlight' ? 'text-neon' : 'text-white'
        )}>
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-white/50">{subtitle}</p>
        )}
      </div>
      
      {trend && (
        <div className={cn(
          'flex items-center gap-1 text-xs',
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        )}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
};

export default memo(StatCard);
