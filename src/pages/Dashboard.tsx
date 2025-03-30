
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

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get department from user or default to "Computer Science"
  const department = user?.department || "Computer Science";

  // Department-specific content
  const getDepartmentSpecificData = () => {
    switch(department) {
      case "Computer Science":
        return {
          assignments: [
            { id: 1, title: 'Programming Assignment', course: 'Algorithms', dueDate: '2023-11-15', status: 'In Progress' },
            { id: 2, title: 'Database Design', course: 'Database Systems', dueDate: '2023-11-10', status: 'Not Started' },
            { id: 3, title: 'UI/UX Project', course: 'Human-Computer Interaction', dueDate: '2023-11-20', status: 'In Progress' },
          ],
          courses: [
            { id: 1, name: 'Algorithms', code: 'CS301', instructor: 'Dr. Emily Chen', progress: 65 },
            { id: 2, name: 'Database Systems', code: 'CS304', instructor: 'Prof. Robert Miller', progress: 78 },
            { id: 3, name: 'Human-Computer Interaction', code: 'CS310', instructor: 'Dr. Sarah Johnson', progress: 42 },
            { id: 4, name: 'Operating Systems', code: 'CS315', instructor: 'Prof. Alan Turing', progress: 90 },
          ],
          events: [
            { id: 1, title: 'Tech Talk: AI Trends', location: 'Computer Lab', date: '2023-11-12', time: '10:00 AM' },
            { id: 2, title: 'Hackathon', location: 'Science Building', date: '2023-11-14', time: '2:00 PM' },
            { id: 3, title: 'Programming Club Meeting', location: 'Room 103', date: '2023-11-16', time: '4:30 PM' },
          ],
          notifications: [
            { id: 1, title: 'Coding Assignment Due', description: 'Database project due in 3 days', time: '1 hour ago', type: 'warning' },
            { id: 2, title: 'New Lecture Materials', description: 'Algorithm notes uploaded', time: '3 hours ago', type: 'info' },
            { id: 3, title: 'Project Feedback', description: 'UI/UX project grades posted', time: '1 day ago', type: 'success' },
          ],
          schedule: [
            { id: 1, course: 'Algorithms', startTime: '09:00 AM', endTime: '10:30 AM', location: 'Science Building 301' },
            { id: 2, name: 'Lunch Break', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Student Center' },
            { id: 3, course: 'Database Systems', startTime: '01:30 PM', endTime: '03:00 PM', location: 'Tech Building 105' },
            { id: 4, name: 'Coding Study Group', startTime: '04:00 PM', endTime: '06:00 PM', location: 'Library, Room 203' },
          ]
        };
      case "Mathematics":
        return {
          assignments: [
            { id: 1, title: 'Problem Set 3', course: 'Calculus II', dueDate: '2023-11-15', status: 'In Progress' },
            { id: 2, title: 'Statistics Project', course: 'Applied Statistics', dueDate: '2023-11-10', status: 'Not Started' },
            { id: 3, title: 'Research Analysis', course: 'Linear Algebra', dueDate: '2023-11-20', status: 'In Progress' },
          ],
          courses: [
            { id: 1, name: 'Calculus II', code: 'MATH202', instructor: 'Dr. Hannah Lee', progress: 65 },
            { id: 2, name: 'Applied Statistics', code: 'MATH240', instructor: 'Prof. Michael Brown', progress: 78 },
            { id: 3, name: 'Linear Algebra', code: 'MATH220', instructor: 'Dr. William Jackson', progress: 42 },
            { id: 4, name: 'Discrete Mathematics', code: 'MATH215', instructor: 'Prof. Susan Clark', progress: 90 },
          ],
          events: [
            { id: 1, title: 'Math Olympiad', location: 'Math Building', date: '2023-11-12', time: '10:00 AM' },
            { id: 2, title: 'Statistics Workshop', location: 'Science Building', date: '2023-11-14', time: '2:00 PM' },
            { id: 3, title: 'Math Club Meeting', location: 'Room 205', date: '2023-11-16', time: '4:30 PM' },
          ],
          notifications: [
            { id: 1, title: 'Math Assignment Due', description: 'Problem Set 3 due in 3 days', time: '1 hour ago', type: 'warning' },
            { id: 2, title: 'New Formula Sheet', description: 'Calculus II formula sheet uploaded', time: '3 hours ago', type: 'info' },
            { id: 3, title: 'Test Results', description: 'Linear Algebra test grades posted', time: '1 day ago', type: 'success' },
          ],
          schedule: [
            { id: 1, course: 'Calculus II', startTime: '09:00 AM', endTime: '10:30 AM', location: 'Math Building 201' },
            { id: 2, name: 'Lunch Break', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Student Center' },
            { id: 3, course: 'Linear Algebra', startTime: '01:30 PM', endTime: '03:00 PM', location: 'Math Building 105' },
            { id: 4, name: 'Math Study Group', startTime: '04:00 PM', endTime: '06:00 PM', location: 'Library, Room 203' },
          ]
        };
      case "Business":
        return {
          assignments: [
            { id: 1, title: 'Business Plan', course: 'Entrepreneurship', dueDate: '2023-11-15', status: 'In Progress' },
            { id: 2, title: 'Market Analysis', course: 'Marketing', dueDate: '2023-11-10', status: 'Not Started' },
            { id: 3, title: 'Financial Report', course: 'Accounting', dueDate: '2023-11-20', status: 'In Progress' },
          ],
          courses: [
            { id: 1, name: 'Entrepreneurship', code: 'BUS301', instructor: 'Dr. Sarah Johnson', progress: 65 },
            { id: 2, name: 'Marketing', code: 'BUS240', instructor: 'Prof. David Wilson', progress: 78 },
            { id: 3, name: 'Accounting', code: 'BUS220', instructor: 'Dr. Maria Garcia', progress: 42 },
            { id: 4, name: 'Business Ethics', code: 'BUS215', instructor: 'Prof. James Anderson', progress: 90 },
          ],
          events: [
            { id: 1, title: 'Career Fair', location: 'Business Building', date: '2023-11-12', time: '10:00 AM' },
            { id: 2, title: 'Networking Event', location: 'Conference Hall', date: '2023-11-14', time: '2:00 PM' },
            { id: 3, title: 'Business Club Meeting', location: 'Room 305', date: '2023-11-16', time: '4:30 PM' },
          ],
          notifications: [
            { id: 1, title: 'Business Plan Due', description: 'Entrepreneurship project due in 3 days', time: '1 hour ago', type: 'warning' },
            { id: 2, title: 'Guest Speaker', description: 'CEO talk tomorrow at noon', time: '3 hours ago', type: 'info' },
            { id: 3, title: 'Internship Opportunity', description: 'New finance internship posted', time: '1 day ago', type: 'success' },
          ],
          schedule: [
            { id: 1, course: 'Entrepreneurship', startTime: '09:00 AM', endTime: '10:30 AM', location: 'Business Building 301' },
            { id: 2, name: 'Lunch Break', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Student Center' },
            { id: 3, course: 'Marketing', startTime: '01:30 PM', endTime: '03:00 PM', location: 'Business Building 105' },
            { id: 4, name: 'Networking Event', startTime: '04:00 PM', endTime: '06:00 PM', location: 'Conference Hall, Room 2' },
          ]
        };
      default:
        // Default data for other departments
        return {
          assignments: [
            { id: 1, title: 'Research Paper', course: 'Advanced Studies', dueDate: '2023-11-15', status: 'In Progress' },
            { id: 2, title: 'Problem Set 3', course: 'Core Subject', dueDate: '2023-11-10', status: 'Not Started' },
            { id: 3, title: 'Group Project', course: 'Elective Course', dueDate: '2023-11-20', status: 'In Progress' },
          ],
          courses: [
            { id: 1, name: 'Advanced Studies', code: 'DEP301', instructor: 'Dr. Emily Chen', progress: 65 },
            { id: 2, name: 'Core Subject', code: 'DEP202', instructor: 'Prof. Robert Miller', progress: 78 },
            { id: 3, name: 'Elective Course', code: 'DEP240', instructor: 'Dr. Sarah Johnson', progress: 42 },
            { id: 4, name: 'Foundations', code: 'DEP101', instructor: 'Prof. Alan Turing', progress: 90 },
          ],
          events: [
            { id: 1, title: 'Department Meeting', location: 'Main Hall', date: '2023-11-12', time: '10:00 AM' },
            { id: 2, title: 'Guest Lecture', location: 'Science Building', date: '2023-11-14', time: '2:00 PM' },
            { id: 3, title: 'Student Council Meeting', location: 'Meeting Room 103', date: '2023-11-16', time: '4:30 PM' },
          ],
          notifications: [
            { id: 1, title: 'Assignment Due Soon', description: 'Project due in 3 days', time: '1 hour ago', type: 'warning' },
            { id: 2, title: 'New Announcement', description: 'Department meeting tomorrow', time: '3 hours ago', type: 'info' },
            { id: 3, title: 'Grade Posted', description: 'Course grades posted', time: '1 day ago', type: 'success' },
          ],
          schedule: [
            { id: 1, course: 'Advanced Studies', startTime: '09:00 AM', endTime: '10:30 AM', location: 'Department Building 301' },
            { id: 2, name: 'Lunch Break', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Student Center' },
            { id: 3, course: 'Core Subject', startTime: '01:30 PM', endTime: '03:00 PM', location: 'Department Building 105' },
            { id: 4, name: 'Study Group', startTime: '04:00 PM', endTime: '06:00 PM', location: 'Library, Room 203' },
          ]
        };
    }
  };

  // Get data based on department
  const data = getDepartmentSpecificData();

  // Standard cafeteria menu for all departments
  const cafeteriaMenu = [
    { id: 1, meal: 'Breakfast', items: ['Pancakes', 'Scrambled Eggs', 'Fresh Fruit', 'Coffee/Tea'] },
    { id: 2, meal: 'Lunch', items: ['Grilled Chicken Sandwich', 'Vegetable Soup', 'Caesar Salad', 'Brownies'] },
    { id: 3, meal: 'Dinner', items: ['Pasta Primavera', 'Roast Beef', 'Steamed Vegetables', 'Ice Cream'] },
  ];

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
                <TodaySchedule scheduleData={data.schedule} />
                <AssignmentsWidget assignmentsData={data.assignments} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <CoursesWidget coursesData={data.courses} />
                <EventsWidget eventsData={data.events} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NotificationsWidget notificationsData={data.notifications} />
                <CafeteriaWidget menuData={cafeteriaMenu} />
              </div>
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
