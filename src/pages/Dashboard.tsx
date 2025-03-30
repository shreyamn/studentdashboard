import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/ui/PageTransition';

// Student dashboard components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TodaySchedule from '@/components/dashboard/TodaySchedule';
import CoursesWidget from '@/components/dashboard/CoursesWidget';
import AssignmentsWidget from '@/components/dashboard/AssignmentsWidget';
import EventsWidget from '@/components/dashboard/EventsWidget';
import CafeteriaWidget from '@/components/dashboard/CafeteriaWidget';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget';
import AttendanceWidget from '@/components/dashboard/AttendanceWidget';

// Faculty dashboard components
import FacultyDashboardHeader from '@/components/dashboard/FacultyDashboardHeader';
import FacultyDashboardContent from '@/components/dashboard/FacultyDashboardContent';

// Staff dashboard components
import StaffDashboardHeader from '@/components/dashboard/StaffDashboardHeader';
import StaffDashboardContent from '@/components/dashboard/StaffDashboardContent';

// Types for dashboard data
interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "warning" | "info" | "success" | "alert"; // Added "alert" type
}

// Sample data for student dashboard
const scheduleData = [
  {
    id: 1,
    course: 'Introduction to Computer Science',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    location: 'Room 305, Computer Science Building',
  },
  {
    id: 2,
    course: 'Calculus II',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    location: 'Room 201, Math Building',
  },
  {
    id: 3,
    name: 'Lunch Break',
    startTime: '12:30 PM',
    endTime: '01:30 PM',
    location: 'Student Center Cafeteria',
  },
  {
    id: 4,
    course: 'Physics Lab',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    location: 'Lab 102, Science Building',
  },
];

const coursesData = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Alan Turing',
    progress: 75,
  },
  {
    id: 2,
    name: 'Calculus II',
    code: 'MATH202',
    instructor: 'Prof. Robert Miller',
    progress: 60,
  },
  {
    id: 3,
    name: 'Physics for Engineers',
    code: 'PHYS205',
    instructor: 'Dr. Marie Curie',
    progress: 85,
  },
  {
    id: 4,
    name: 'Introduction to Psychology',
    code: 'PSYC101',
    instructor: 'Dr. Sigmund Freud',
    progress: 40,
  },
];

const assignmentsData = [
  {
    id: 1,
    title: 'Problem Set 3',
    course: 'Calculus II',
    dueDate: '2023-11-10',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Programming Assignment 2',
    course: 'Introduction to Computer Science',
    dueDate: '2023-11-15',
    status: 'Not Started',
  },
  {
    id: 3,
    title: 'Lab Report',
    course: 'Physics for Engineers',
    dueDate: '2023-11-08',
    status: 'Completed',
  },
];

const eventsData = [
  {
    id: 1,
    title: 'Career Fair',
    location: 'Student Center, Main Hall',
    date: '2023-11-15',
    time: '10:00 AM - 3:00 PM',
  },
  {
    id: 2,
    title: 'Guest Lecture: AI Advances',
    location: 'Computer Science Building, Auditorium',
    date: '2023-11-20',
    time: '2:00 PM - 4:00 PM',
  },
  {
    id: 3,
    title: 'Student Club Meetup',
    location: 'Student Center, Room 202',
    date: '2023-11-10',
    time: '5:00 PM - 7:00 PM',
  },
];

const cafeteriaMenuData = [
  {
    id: 1,
    meal: 'Breakfast (7:00 AM - 9:30 AM)',
    items: ['Scrambled Eggs', 'Pancakes', 'Fresh Fruit', 'Coffee/Tea'],
  },
  {
    id: 2,
    meal: 'Lunch (11:30 AM - 2:00 PM)',
    items: ['Grilled Chicken Sandwich', 'Vegetable Soup', 'Caesar Salad', 'Pasta Bar'],
  },
  {
    id: 3,
    meal: 'Dinner (5:00 PM - 8:00 PM)',
    items: ['Baked Salmon', 'Vegetable Stir-Fry', 'Mashed Potatoes', 'Ice Cream'],
  },
];

const notificationsData: Notification[] = [
  {
    id: 1,
    title: 'Assignment Due Soon',
    description: 'Problem Set 3 for Calculus II is due tomorrow',
    time: '2 hours ago',
    type: 'warning',
  },
  {
    id: 2,
    title: 'New Course Material',
    description: 'New lecture notes uploaded for CS101',
    time: '5 hours ago',
    type: 'info',
  },
  {
    id: 3,
    title: 'Grade Posted',
    description: 'Your Physics Lab Report has been graded',
    time: '1 day ago',
    type: 'success',
  },
  {
    id: 4,
    title: 'Campus Alert',
    description: 'Library closing early at 6PM today for maintenance',
    time: '1 day ago',
    type: 'warning',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              {/* Render different dashboard based on user role */}
              {user?.role === 'faculty' ? (
                <>
                  <FacultyDashboardHeader />
                  <FacultyDashboardContent />
                </>
              ) : user?.role === 'staff' ? (
                <>
                  <StaffDashboardHeader />
                  <StaffDashboardContent />
                </>
              ) : (
                <>
                  <DashboardHeader />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TodaySchedule scheduleData={scheduleData} />
                    <div className="hidden md:block">
                      <AttendanceWidget />
                    </div>
                    <CoursesWidget coursesData={coursesData} />
                    <AssignmentsWidget assignmentsData={assignmentsData} />
                    <EventsWidget eventsData={eventsData} />
                    <CafeteriaWidget menuData={cafeteriaMenuData} />
                    <NotificationsWidget notificationsData={notificationsData} />
                    <div className="md:hidden block">
                      <AttendanceWidget />
                    </div>
                  </div>
                </>
              )}
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
