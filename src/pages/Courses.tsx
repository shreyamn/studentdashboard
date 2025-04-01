
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { useCourseSelection } from '@/hooks/useCourseSelection';
import { useAuth } from '@/context/AuthContext';
import { coursesData } from '@/data/coursesData';
import { CoursesHeader } from '@/components/courses/CoursesHeader';
import { CourseList } from '@/components/courses/CourseList';
import { EmptyCourses } from '@/components/courses/EmptyCourses';
import { DepartmentToggle } from '@/components/courses/DepartmentToggle';
import { CourseDetails } from '@/components/courses/CourseDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Courses() {
  const { user } = useAuth();
  const { department: routeDepartment } = useParams<{ department?: string }>();
  const [selectedDepartment, setSelectedDepartment] = useState(routeDepartment || 'all');
  const [isGridView, setIsGridView] = useState(true);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedCourse, setSelectedCourse, filteredCourses, showAllCourses, toggleShowAllCourses } = useCourseSelection(coursesData);

  useEffect(() => {
    if (routeDepartment) {
      setSelectedDepartment(routeDepartment);
    } else {
      setSelectedDepartment('all');
    }
  }, [routeDepartment]);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const departmentFilteredCourses = filteredCourses.filter(course => {
    return selectedDepartment === 'all' || course.department === selectedDepartment;
  });

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const handleCloseCourseDetails = () => {
    setShowCourseDetails(false);
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-8">
        <CoursesHeader
          department={selectedDepartment}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="md:flex gap-4">
          <aside className="w-full md:w-1/4 mb-4 md:mb-0">
            <DepartmentToggle
              showAllCourses={showAllCourses}
              toggleShowAllCourses={toggleShowAllCourses}
            />
          </aside>

          <main className="w-full md:w-3/4">
            {departmentFilteredCourses.length > 0 ? (
              <CourseList
                filteredCourses={departmentFilteredCourses}
                selectedCourse={selectedCourse}
                setSelectedCourse={handleCourseClick}
              />
            ) : (
              <EmptyCourses
                department={showAllCourses ? "all departments" : selectedDepartment}
              />
            )}
          </main>
        </div>

        {showCourseDetails && selectedCourse && (
          <CourseDetails
            selectedCourse={selectedCourse}
          />
        )}
      </div>
    </Layout>
  );
}
