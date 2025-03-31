
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Course } from '@/data/types';
import CourseCard from './CourseCard';
import { useAuth } from '@/context/AuthContext';

interface CoursesListProps {
  courses: Course[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  const { user } = useAuth();
  
  // Filter courses based on user's department
  const filteredCourses = user?.department
    ? courses.filter(course => course.department === user.department)
    : courses;
    
  if (filteredCourses.length === 0) {
    return (
      <div className="bg-muted/50 rounded-lg p-6 text-center">
        <p className="text-muted-foreground">No courses available for your department.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Your Courses</h2>
        <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center">
          View all courses
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
