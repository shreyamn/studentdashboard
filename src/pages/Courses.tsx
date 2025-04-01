
import React, { useState, useEffect } from 'react';
import { AppSidebar } from '../components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import { CoursesHeader } from '../components/courses/CoursesHeader';
import { CourseContent } from '../components/courses/CourseContent';
import { DepartmentToggle } from '../components/courses/DepartmentToggle';
import { useAuth } from '../context/AuthContext';
import { coursesData } from '../data/coursesData';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0] || null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Filter courses based on search query and department
    let filtered = coursesData;
    
    // Filter by user's department if not showing all courses
    if (user?.department && !showAllCourses) {
      filtered = filtered.filter(course => course.department === user.department);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => {
        // Handle instructor being either string or object
        const instructorName = typeof course.instructor === 'string' 
          ? course.instructor.toLowerCase()
          : course.instructor.name.toLowerCase();
          
        return course.name.toLowerCase().includes(query) || 
          course.code.toLowerCase().includes(query) ||
          instructorName.includes(query);
      });
    }
    
    setFilteredCourses(filtered);
    
    // Update selected course if it's not in the filtered list
    if (filtered.length > 0 && !filtered.find(course => course.id === selectedCourse?.id)) {
      setSelectedCourse(filtered[0]);
    }
  }, [searchQuery, user?.department, showAllCourses, selectedCourse?.id]);

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto py-8">
              <CoursesHeader 
                department={!showAllCourses && user?.department ? user.department : undefined} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              
              <DepartmentToggle 
                showAllCourses={showAllCourses}
                toggleShowAllCourses={toggleShowAllCourses}
              />
              
              <CourseContent 
                filteredCourses={filteredCourses}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                department={!showAllCourses ? user?.department : undefined}
                showAllCourses={showAllCourses}
              />
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Courses;
