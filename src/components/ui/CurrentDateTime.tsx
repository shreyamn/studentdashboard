
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface CurrentDateTimeProps {
  showIcon?: boolean;
  showTime?: boolean;
  className?: string;
}

export function CurrentDateTime({ showIcon = true, showTime = false, className = '' }: CurrentDateTimeProps) {
  const [dateTime, setDateTime] = useState(new Date());
  
  useEffect(() => {
    // Update dateTime every minute
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date as: Weekday, Month Day, Year
  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  });
  
  // Format time as: HH:MM AM/PM
  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && <Calendar className="h-4 w-4 text-muted-foreground" />}
      <span>{formattedDate}</span>
      {showTime && <span>• {formattedTime}</span>}
    </div>
  );
}
