
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
}

interface EventsWidgetProps {
  eventsData: Event[];
}

export default function EventsWidget({ eventsData }: EventsWidgetProps) {
  return (
    <AnimatedCard delay={0.4}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Upcoming Events</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Calendar className="mr-1 h-3 w-3" /> {eventsData.length} Events
        </Badge>
      </div>
      
      <div className="space-y-3">
        {eventsData.map((event) => (
          <div 
            key={event.id} 
            className="bg-background rounded-lg p-3 border border-border"
          >
            <h3 className="font-medium">{event.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span className="mr-3">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{event.time}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {event.location}
            </p>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
