
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Course } from '@/data/types';
import CoursesList from './CoursesList';

interface CoursesWidgetProps {
  coursesData: Course[];
}

export default function CoursesWidget({ coursesData }: CoursesWidgetProps) {
  return (
    <AnimatedCard delay={0.3} className="col-span-1 md:col-span-2">
      <CoursesList courses={coursesData} />
    </AnimatedCard>
  );
}
