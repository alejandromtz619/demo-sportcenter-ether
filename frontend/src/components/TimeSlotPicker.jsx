import React, { memo } from 'react';
import { cn } from '../lib/utils';
import { Clock } from 'lucide-react';

const TimeSlotPicker = ({ 
  slots, 
  selectedSlot, 
  onSelectSlot, 
  bookedSlots = [],
  duration = 60 
}) => {
  const isSlotBooked = (slot) => {
    return bookedSlots.includes(slot);
  };

  const isSlotAvailable = (slot) => {
    if (isSlotBooked(slot)) return false;
    
    // Check if the duration would overlap with booked slots
    const slotIndex = slots.indexOf(slot);
    const slotsNeeded = duration / 30;
    
    for (let i = 0; i < slotsNeeded; i++) {
      const checkSlot = slots[slotIndex + i];
      if (!checkSlot || isSlotBooked(checkSlot)) {
        return false;
      }
    }
    return true;
  };

  const getSlotStatus = (slot) => {
    if (isSlotBooked(slot)) return 'booked';
    if (!isSlotAvailable(slot)) return 'partial';
    return 'available';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Clock size={16} />
        <span>Selecciona un horario ({duration} min)</span>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-2">
        {slots.map((slot) => {
          const status = getSlotStatus(slot);
          const isSelected = selectedSlot === slot;
          
          return (
            <button
              key={slot}
              onClick={() => status === 'available' && onSelectSlot(slot)}
              disabled={status !== 'available'}
              data-testid={`time-slot-${slot.replace(':', '')}`}
              className={cn(
                'py-3 px-2 text-sm font-manrope transition-all duration-200 border',
                status === 'booked' && 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed line-through',
                status === 'partial' && 'bg-white/5 text-white/40 border-white/10 cursor-not-allowed',
                status === 'available' && !isSelected && 'bg-transparent text-white border-white/20 hover:border-neon hover:text-neon',
                isSelected && 'bg-neon text-black border-neon font-bold'
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>
      
      <div className="flex items-center gap-6 text-xs text-white/50 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-neon" />
          <span>Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-white/20" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white/10" />
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
};

export default memo(TimeSlotPicker);
