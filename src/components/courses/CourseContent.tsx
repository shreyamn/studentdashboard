
import { CourseList } from './CourseList';
import { CourseDetails } from './CourseDetails';
import { CourseTabContent } from './CourseTabContent';
import { EmptyCourses } from './EmptyCourses';

interface CourseContentProps {
  filteredCourses: any[];
  selectedCourse: any;
  setSelectedCourse: (course: any) => void;
  department?: string;
  showAllCourses: boolean;
}

export function CourseContent({ 
  filteredCourses, 
  selectedCourse, 
  setSelectedCourse,
  department,
  showAllCourses
}: CourseContentProps) {
  if (filteredCourses.length === 0) {
    return <EmptyCourses department={showAllCourses ? "all departments" : department} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CourseList 
        filteredCourses={filteredCourses}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />

      <div className="lg:col-span-2">
        {selectedCourse && (
          <>
            <CourseDetails selectedCourse={selectedCourse} />
            <CourseTabContent selectedCourse={selectedCourse} />
          </>
        )}
      </div>
    </div>
  );
}
