
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { AppSidebar } from '@/components/layout/Sidebar';
import PageTransition from '@/components/ui/PageTransition';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CoursesHeader } from '@/components/courses/CoursesHeader';
import { CourseList } from '@/components/courses/CourseList';
import { CourseDetails } from '@/components/courses/CourseDetails';
import { CourseTabContent } from '@/components/courses/CourseTabContent';
import { EmptyCourses } from '@/components/courses/EmptyCourses';
import { toast } from 'sonner';

const allCoursesData = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: {
      name: 'Dr. Alan Turing',
      image: 'https://i.pravatar.cc/150?img=68',
    },
    schedule: 'Mon, Wed, Fri • 10:00 AM - 11:30 AM',
    location: 'Computer Science Building, Room 305',
    progress: 90,
    credits: 4,
    status: 'In Progress',
    department: 'Computer Science',
    attendanceRate: 95,
    classroom: 'CS Building 305',
    assignments: [
      { title: 'Problem Set 1', due: '2023-11-10', status: 'Completed' },
      { title: 'Midterm Exam', due: '2023-11-15', status: 'Upcoming' },
      { title: 'Final Project', due: '2023-12-05', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Monday',
      date: 'November 7',
      time: '10:00 AM - 11:30 AM',
      topic: 'Algorithms and Data Structures',
      materials: ['Textbook Ch. 5', 'Lecture Slides'],
    },
  },
  {
    id: 2,
    code: 'MATH202',
    name: 'Calculus II',
    instructor: {
      name: 'Prof. Robert Miller',
      image: 'https://i.pravatar.cc/150?img=69',
    },
    schedule: 'Tue, Thu • 1:00 PM - 2:30 PM',
    location: 'Math Building, Room 105',
    progress: 78,
    credits: 3,
    status: 'In Progress',
    department: 'Mathematics',
    attendanceRate: 85,
    classroom: 'Math Building 105',
    assignments: [
      { title: 'Problem Set 3', due: '2023-11-09', status: 'In Progress' },
      { title: 'Quiz 2', due: '2023-11-16', status: 'Upcoming' },
      { title: 'Final Exam', due: '2023-12-10', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Tuesday',
      date: 'November 8',
      time: '1:00 PM - 2:30 PM',
      topic: 'Techniques of Integration',
      materials: ['Textbook Ch. 7', 'Practice Problems'],
    },
  },
  {
    id: 3,
    code: 'BIO301',
    name: 'Advanced Biology',
    instructor: {
      name: 'Dr. Emily Chen',
      image: 'https://i.pravatar.cc/150?img=5',
    },
    schedule: 'Mon, Wed • 2:00 PM - 3:30 PM',
    location: 'Science Building, Room 301',
    progress: 65,
    credits: 4,
    status: 'In Progress',
    department: 'Biology',
    attendanceRate: 88,
    classroom: 'Science Building 301',
    assignments: [
      { title: 'Lab Report', due: '2023-11-08', status: 'In Progress' },
      { title: 'Research Paper', due: '2023-11-20', status: 'Not Started' },
      { title: 'Final Presentation', due: '2023-12-08', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Wednesday',
      date: 'November 9',
      time: '2:00 PM - 3:30 PM',
      topic: 'Cellular Respiration',
      materials: ['Lab Manual', 'Research Articles'],
    },
  },
  {
    id: 4,
    code: 'BUS240',
    name: 'Business Ethics',
    instructor: {
      name: 'Dr. Sarah Johnson',
      image: 'https://i.pravatar.cc/150?img=4',
    },
    schedule: 'Tue, Thu • 11:00 AM - 12:30 PM',
    location: 'Business Building, Room 205',
    progress: 42,
    credits: 3,
    status: 'In Progress',
    department: 'Business',
    attendanceRate: 76,
    classroom: 'Business Building 205',
    assignments: [
      { title: 'Case Study Analysis', due: '2023-11-14', status: 'Not Started' },
      { title: 'Group Project', due: '2023-11-28', status: 'In Progress' },
      { title: 'Final Paper', due: '2023-12-12', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Thursday',
      date: 'November 10',
      time: '11:00 AM - 12:30 PM',
      topic: 'Corporate Social Responsibility',
      materials: ['Case Studies', 'Discussion Questions'],
    },
  },
  {
    id: 5,
    code: 'NURS101',
    name: 'Nursing Fundamentals',
    instructor: {
      name: 'Dr. Florence Nightingale',
      image: 'https://i.pravatar.cc/150?img=12',
    },
    schedule: 'Mon, Wed, Fri • 9:00 AM - 10:30 AM',
    location: 'Nursing Building, Room 201',
    progress: 80,
    credits: 4,
    status: 'In Progress',
    department: 'Nursing',
    attendanceRate: 91,
    classroom: 'Nursing Building 201',
    assignments: [
      { title: 'Patient Care Plan', due: '2023-11-12', status: 'In Progress' },
      { title: 'Clinical Skills Assessment', due: '2023-11-18', status: 'Upcoming' },
      { title: 'Medical Ethics Essay', due: '2023-12-01', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Monday',
      date: 'November 7',
      time: '9:00 AM - 10:30 AM',
      topic: 'Patient Assessment Techniques',
      materials: ['Nursing Manual', 'Clinical Guidelines'],
    },
  },
  {
    id: 6,
    code: 'CS202',
    name: 'Data Structures and Algorithms',
    instructor: {
      name: 'Prof. Ada Lovelace',
      image: 'https://i.pravatar.cc/150?img=32',
    },
    schedule: 'Tue, Thu • 3:00 PM - 4:30 PM',
    location: 'Computer Science Building, Room 405',
    progress: 65,
    credits: 4,
    status: 'In Progress',
    department: 'Computer Science',
    attendanceRate: 84,
    classroom: 'CS Building 405',
    assignments: [
      { title: 'Algorithm Analysis', due: '2023-11-11', status: 'In Progress' },
      { title: 'Programming Assignment', due: '2023-11-22', status: 'Not Started' },
      { title: 'Final Project', due: '2023-12-07', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Tuesday',
      date: 'November 8',
      time: '3:00 PM - 4:30 PM',
      topic: 'Binary Search Trees',
      materials: ['Algorithm Handbook', 'Code Samples'],
    },
  },
];

export default function Courses() {
  const { user } = useAuth();
  const { toast: toastNotification } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [coursesData, setCoursesData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    if (user) {
      let filteredCourses = allCoursesData;
      
      // Only filter by department if showAllCourses is false
      if (!showAllCourses && user.department) {
        filteredCourses = allCoursesData.filter(
          course => course.department === user.department
        );
      }
      
      setCoursesData(filteredCourses);
      
      if (filteredCourses.length > 0) {
        setSelectedCourse(filteredCourses[0]);
      } else {
        setSelectedCourse(null);
        toastNotification({
          title: "No courses available",
          description: showAllCourses 
            ? "No courses found in the database." 
            : `No courses found for ${user.department} department.`,
          variant: "destructive",
        });
      }
    }
  }, [user, toastNotification, showAllCourses]);

  const filteredCourses = coursesData.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleShowAllCourses = () => {
    setShowAllCourses(prev => !prev);
    toast(showAllCourses ? "Showing your department courses" : "Showing all courses");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              <CoursesHeader 
                department={user?.department}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <div className="mb-4 flex justify-end">
                <button
                  onClick={toggleShowAllCourses}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {showAllCourses ? "Show only my department courses" : "Show all courses"}
                </button>
              </div>

              {coursesData.length === 0 ? (
                <EmptyCourses department={user?.department} />
              ) : (
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
              )}
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
