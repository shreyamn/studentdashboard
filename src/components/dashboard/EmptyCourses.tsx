
import { BookOpen } from 'lucide-react';

interface EmptyCoursesProps {
  department?: string;
}

export default function EmptyCourses({ department }: EmptyCoursesProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-8 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
        <BookOpen className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No Courses Available</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        {department 
          ? `There are no courses available for the ${department} department.` 
          : 'There are no courses available. Please check back later or contact academic services.'}
      </p>
    </div>
  );
}
