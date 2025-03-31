
import { BookOpen } from 'lucide-react';

interface EmptyCoursesProps {
  department?: string;
}

export function EmptyCourses({ department }: EmptyCoursesProps) {
  return (
    <div className="glass-card subtle-shadow rounded-xl p-12 text-center">
      <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary/50" />
      <h2 className="text-2xl font-display font-medium mb-3">No Courses Available</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        {department 
          ? `There are currently no courses available for the ${department} department.` 
          : 'There are currently no courses available in the system.'}
        {' '}
        Please check back later or contact your academic advisor.
      </p>
    </div>
  );
}
