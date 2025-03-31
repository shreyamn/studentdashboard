
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, MapPin } from 'lucide-react';
import { Course } from '@/data/types';
import CourseCard from './CourseCard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

  const handleViewAllClick = () => {
    toast.success("Navigating to all courses");
  };

  const handleViewCourse = () => {
    toast.info("Viewing course details");
  };

  const handleTrackAttendance = () => {
    toast.info("Tracking attendance");
  };

  const handleLocateOnMap = (classroom: string) => {
    toast.info(`Locating ${classroom} on campus map`);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Your General Studies Courses</h2>
        <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center" onClick={handleViewAllClick}>
          View all courses
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-background rounded-lg p-4 border border-border">
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">{course.code}</p>
                  <h3 className="font-medium">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Instructor: {course.instructor}</p>
                  {course.classroom && (
                    <p className="text-xs flex items-center text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      Classroom: {course.classroom}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Course Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Link 
                  to="/courses" 
                  className="text-primary text-sm hover:underline flex items-center"
                  onClick={handleViewCourse}
                >
                  <BookOpen className="mr-1 h-4 w-4" />
                  View course
                </Link>
                
                <Link 
                  to="/attendance" 
                  className="text-primary text-sm hover:underline flex items-center"
                  onClick={handleTrackAttendance}
                >
                  <Users className="mr-1 h-4 w-4" />
                  Track attendance
                </Link>
              </div>
              
              {course.classroom && (
                <div className="mt-2 flex justify-end">
                  <Link 
                    to="/map" 
                    className="text-primary text-sm hover:underline flex items-center"
                    onClick={() => handleLocateOnMap(course.classroom!)}
                  >
                    <MapPin className="mr-1 h-4 w-4" />
                    Locate on map
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button asChild>
          <Link to="/courses">
            Manage All Courses
          </Link>
        </Button>
      </div>
    </>
  );
}
