
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
  
  // Get subject-specific title based on user's department/major
  const getMajorSpecificTitle = () => {
    if (!user?.department) return "General Studies Courses";
    
    switch(user.department) {
      case "Computer Science":
        return "Computer Science Courses";
      case "Biology":
        return "Biology Courses";
      case "Mathematics":
        return "Mathematics Courses";
      case "Nursing":
        return "Nursing Courses";
      default:
        return `${user.department} Courses`;
    }
  };
  
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
        <h2 className="font-display font-medium text-lg">{getMajorSpecificTitle()}</h2>
        <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center" onClick={handleViewAllClick}>
          View all courses
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.map((course) => {
          // Format instructor display based on type
          const instructorDisplay = typeof course.instructor === 'string' 
            ? course.instructor
            : course.instructor.name;
            
          return (
            <div key={course.id} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{course.code}</p>
                    <h3 className="font-medium">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Instructor: {instructorDisplay}</p>
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
                    to="/map" 
                    className="text-primary text-sm hover:underline flex items-center"
                    onClick={() => course.classroom && handleLocateOnMap(course.classroom)}
                  >
                    <MapPin className="mr-1 h-4 w-4" />
                    Locate on map
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
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
