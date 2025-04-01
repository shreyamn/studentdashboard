import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import CoursesHeader from '@/components/courses/CoursesHeader';
import CourseList from '@/components/courses/CourseList';
import EmptyCourses from '@/components/courses/EmptyCourses';
import DepartmentToggle from '@/components/courses/DepartmentToggle';
import CourseDetails from '@/components/courses/CourseDetails';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { coursesData } from '@/data/coursesData';
import { Course } from '@/data/types';

export default function Courses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(user?.department || null);
  
  // Filter courses based on department and search term
  const filteredCourses = coursesData.filter((course) => {
    const matchesDepartment = !selectedDepartment || course.department === selectedDepartment;
    const matchesSearch = !searchTerm || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (course.code && course.code.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDepartment && matchesSearch;
  });
  
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };
  
  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  return (
    <PageTransition>
      <div className="container relative pt-6">
        <CoursesHeader />

        <div className="md:grid md:grid-cols-[220px_1fr] md:gap-4">
          <aside className="hidden md:block">
            <DepartmentToggle
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
            />
          </aside>

          <div className="w-full">
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {selectedCourse ? (
              <CourseDetails course={selectedCourse} onBackToList={handleBackToList} />
            ) : filteredCourses.length > 0 ? (
              <CourseList courses={filteredCourses} onCourseSelect={handleCourseSelect} />
            ) : (
              <EmptyCourses searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
