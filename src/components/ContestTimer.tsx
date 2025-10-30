import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface ContestTimerProps {
  totalMinutes: number;
  onTimeUp?: () => void;
}

export default function ContestTimer({ totalMinutes, onTimeUp }: ContestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(totalMinutes * 60); // in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formatTime = () => {
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining < 300) return 'bg-red-100 text-red-700 border-red-300'; // < 5 mins
    if (timeRemaining < 600) return 'bg-yellow-100 text-yellow-700 border-yellow-300'; // < 10 mins
    return 'bg-green-100 text-green-700 border-green-300';
  };

  const isUrgent = timeRemaining < 300;

  return (
    <Badge className={`${getTimerColor()} px-4 py-2 gap-2`}>
      {isUrgent ? (
        <AlertCircle className="w-4 h-4 animate-pulse" />
      ) : (
        <Clock className="w-4 h-4" />
      )}
      <span className="text-lg">{formatTime()}</span>
    </Badge>
  );
}
