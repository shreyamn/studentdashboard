
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface ScheduleItem {
  id: number;
  course?: string;
  name?: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface TodayScheduleProps {
  scheduleData: ScheduleItem[];
}

export default function TodaySchedule({ scheduleData }: TodayScheduleProps) {
  return (
    <AnimatedCard delay={0.1} className="col-span-1 md:col-span-2">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-display font-medium text-lg">Today's Schedule</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Clock className="mr-1 h-3 w-3" /> {scheduleData.length} Classes
        </Badge>
      </div>
      
      <div className="space-y-4">
        {scheduleData.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="min-w-[90px] text-sm font-medium">
              {item.startTime}
            </div>
            <div className="flex-1 bg-background rounded-lg p-3 border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">
                    {item.course || item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.location}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.startTime} - {item.endTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
