
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { coursesData } from '@/data/coursesData';

export const useCourseSelection = (allCoursesData: any[] = []) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    // For initial page load, we'll use the actual coursesData from our data file
    // This ensures we're working with the most current data
    let filteredCourses = [];
    
    if (showAllCourses) {
      // When showing all courses, use all courses regardless of department
      filteredCourses = allCoursesData.length > 0 ? allCoursesData : coursesData;
    } else if (user?.department) {
      // Filter by user's department if they have one
      filteredCourses = allCoursesData.length > 0 
        ? allCoursesData.filter(course => course.department === user.department)
        : coursesData.filter(course => course.department === user.department);
    } else {
      // If no department (or we're testing), show all courses
      filteredCourses = allCoursesData.length > 0 ? allCoursesData : coursesData;
    }
    
    setDisplayedCourses(filteredCourses);
    
    // Select the first course if there are any
    if (filteredCourses.length > 0) {
      setSelectedCourse(filteredCourses[0]);
    } else {
      setSelectedCourse(null);
      if (!showAllCourses) {
        toast({
          title: "No courses available",
          description: `No courses found for ${user?.department || 'your'} department.`,
          variant: "destructive",
        });
      }
    }
  }, [user, toast, showAllCourses, allCoursesData]);

  const filteredCourses = displayedCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase?.includes(searchQuery.toLowerCase())
  );

  const toggleShowAllCourses = () => {
    setShowAllCourses(prev => !prev);
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredCourses,
    selectedCourse,
    setSelectedCourse,
    showAllCourses,
    toggleShowAllCourses
  };
};
