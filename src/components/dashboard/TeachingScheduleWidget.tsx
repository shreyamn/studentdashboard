
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Link } from 'react-router-dom';

interface TeachingClass {
  id: number;
  course: string;
  courseCode: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  studentsEnrolled: number;
}

interface TeachingScheduleWidgetProps {
  classesData: TeachingClass[];
  today?: string; // Optional parameter to filter for today's classes
}

export default function TeachingScheduleWidget({ classesData, today }: TeachingScheduleWidgetProps) {
  // Filter classes for today if provided
  const displayClasses = today 
    ? classesData.filter(cls => cls.day.toLowerCase() === today.toLowerCase())
    : classesData;
  
  // Get day badge color
  const getDayColor = (day: string) => {
    switch (day.toLowerCase()) {
      case 'monday': return 'bg-blue-100 text-blue-800';
      case 'tuesday': return 'bg-purple-100 text-purple-800';
      case 'wednesday': return 'bg-green-100 text-green-800';
      case 'thursday': return 'bg-orange-100 text-orange-800';
      case 'friday': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AnimatedCard delay={0.3} className="col-span-1 md:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">
          {today ? "Today's Teaching Schedule" : "Weekly Teaching Schedule"}
        </h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Calendar className="mr-1 h-3 w-3" /> {displayClasses.length} Classes
        </Badge>
      </div>
      
      {displayClasses.length > 0 ? (
        <div className="space-y-4">
          {displayClasses.map((cls) => (
            <div key={cls.id} className="flex items-center gap-4">
              <div className="min-w-[90px] text-sm font-medium">
                {cls.startTime}
              </div>
              <div className="flex-1 bg-background rounded-lg p-3 border border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{cls.courseCode}</Badge>
                      <Badge variant="outline" className={getDayColor(cls.day)}>
                        {cls.day}
                      </Badge>
                    </div>
                    <h3 className="font-medium">{cls.course}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{cls.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>{cls.studentsEnrolled} students enrolled</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    <Clock className="inline h-3.5 w-3.5 mr-1" />
                    {cls.startTime} - {cls.endTime}
                  </span>
                </div>
                <div className="mt-2 flex justify-end">
                  <Link 
                    to="/map" 
                    className="text-xs text-primary hover:underline flex items-center"
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    Locate on map
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <p className="text-muted-foreground">No classes scheduled {today ? "today" : "this week"}.</p>
        </div>
      )}
    </AnimatedCard>
  );
}
