
import { Link } from 'react-router-dom';
import { ArrowRight, BookMarked } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Course } from '@/data/dashboardData';

interface CoursesWidgetProps {
  coursesData: Course[];
}

export default function CoursesWidget({ coursesData }: CoursesWidgetProps) {
  return (
    <AnimatedCard delay={0.3} className="col-span-1 md:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Your Courses</h2>
        <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center">
          View all courses
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coursesData.map((course) => (
          <div 
            key={course.id} 
            className="bg-background rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant="outline" className="mb-2">{course.code}</Badge>
                <h3 className="font-medium">{course.name}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
              <BookMarked className="h-5 w-5 text-primary/70" />
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1.5" />
            </div>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
