
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ScheduleTabProps {
  nextClass: {
    day: string;
    date: string;
    time: string;
    topic: string;
    materials: string[];
  };
}

export function ScheduleTab({ nextClass }: ScheduleTabProps) {
  return (
    <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-display font-medium">Next Class</h3>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Upcoming</span>
        </Badge>
      </div>
      <div className="p-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium">{nextClass.day}, {nextClass.date}</h4>
              <p className="text-sm text-muted-foreground">{nextClass.time}</p>
            </div>
            <Button variant="outline" size="sm">Add to Calendar</Button>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 mb-3">
            <h5 className="font-medium text-sm mb-1">Topic</h5>
            <p>{nextClass.topic}</p>
          </div>
          <div>
            <h5 className="font-medium text-sm mb-2">Required Materials</h5>
            <ul className="space-y-1">
              {nextClass.materials.map((material, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/70"></div>
                  <span>{material}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
