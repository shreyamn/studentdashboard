
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { AppSidebar } from '@/components/layout/Sidebar';
import PageTransition from '@/components/ui/PageTransition';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TodaySchedule from '@/components/dashboard/TodaySchedule';
import AssignmentsWidget from '@/components/dashboard/AssignmentsWidget';
import CoursesWidget from '@/components/dashboard/CoursesWidget';
import EventsWidget from '@/components/dashboard/EventsWidget';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget';
import CafeteriaWidget from '@/components/dashboard/CafeteriaWidget';
import AttendanceWidget from '@/components/dashboard/AttendanceWidget';

// Mock data
const assignmentsData = [
  { id: 1, title: 'Research Paper', course: 'Advanced Biology', dueDate: '2023-11-15', status: 'In Progress' },
  { id: 2, title: 'Problem Set 3', course: 'Calculus II', dueDate: '2023-11-10', status: 'Not Started' },
  { id: 3, title: 'Group Project', course: 'Business Ethics', dueDate: '2023-11-20', status: 'In Progress' },
];

const eventsData = [
  { id: 1, title: 'Career Fair', location: 'Main Hall', date: '2023-11-12', time: '10:00 AM' },
  { id: 2, title: 'Guest Lecture', location: 'Science Building', date: '2023-11-14', time: '2:00 PM' },
  { id: 3, title: 'Student Council Meeting', location: 'Meeting Room 103', date: '2023-11-16', time: '4:30 PM' },
];

const coursesData = [
  { id: 1, name: 'Advanced Biology', code: 'BIO301', instructor: 'Dr. Emily Chen', progress: 65 },
  { id: 2, name: 'Calculus II', code: 'MATH202', instructor: 'Prof. Robert Miller', progress: 78 },
  { id: 3, name: 'Business Ethics', code: 'BUS240', instructor: 'Dr. Sarah Johnson', progress: 42 },
  { id: 4, name: 'Computer Science', code: 'CS101', instructor: 'Prof. Alan Turing', progress: 90 },
];

const todaySchedule = [
  { id: 1, course: 'Advanced Biology', startTime: '09:00 AM', endTime: '10:30 AM', location: 'Science Building 301' },
  { id: 2, name: 'Lunch Break', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Student Center' },
  { id: 3, course: 'Calculus II', startTime: '01:30 PM', endTime: '03:00 PM', location: 'Math Building 105' },
  { id: 4, name: 'Study Group', startTime: '04:00 PM', endTime: '06:00 PM', location: 'Library, Room 203' },
];

const notificationsData = [
  { id: 1, title: 'Assignment Due Soon', description: 'Problem Set 3 is due in 3 days', time: '1 hour ago', type: 'warning' },
  { id: 2, title: 'New Announcement', description: 'Class cancelled for tomorrow', time: '3 hours ago', type: 'info' },
  { id: 3, title: 'Grade Posted', description: 'Midterm grade posted for BIO301', time: '1 day ago', type: 'success' },
];

const cafeteriaMenu = [
  { id: 1, meal: 'Breakfast', items: ['Pancakes', 'Scrambled Eggs', 'Fresh Fruit', 'Coffee/Tea'] },
  { id: 2, meal: 'Lunch', items: ['Grilled Chicken Sandwich', 'Vegetable Soup', 'Caesar Salad', 'Brownies'] },
  { id: 3, meal: 'Dinner', items: ['Pasta Primavera', 'Roast Beef', 'Steamed Vegetables', 'Ice Cream'] },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              <DashboardHeader />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <TodaySchedule scheduleData={todaySchedule} />
                <AssignmentsWidget assignmentsData={assignmentsData} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <CoursesWidget coursesData={coursesData} />
                <EventsWidget eventsData={eventsData} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NotificationsWidget notificationsData={notificationsData} />
                <CafeteriaWidget menuData={cafeteriaMenu} />
              </div>
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
