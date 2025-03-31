
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import TodaySchedule from '@/components/dashboard/TodaySchedule';
import CoursesWidget from '@/components/dashboard/CoursesWidget';
import AssignmentsWidget from '@/components/dashboard/AssignmentsWidget';
import EventsWidget from '@/components/dashboard/EventsWidget';
import CafeteriaWidget from '@/components/dashboard/CafeteriaWidget';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget';
import AttendanceWidget from '@/components/dashboard/AttendanceWidget';

// Types for dashboard data
interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "warning" | "info" | "success" | "alert";
}

interface ScheduleItem {
  id: number;
  course?: string;
  name?: string;
  startTime: string;
  endTime: string;
  location: string;
  department?: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  progress: number;
  department?: string;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  department?: string;
}

interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
}

interface MenuItem {
  id: number;
  meal: string;
  items: string[];
}

interface StudentDashboardContentProps {
  scheduleData: ScheduleItem[];
  coursesData: Course[];
  assignmentsData: Assignment[];
  eventsData: Event[];
  cafeteriaMenuData: MenuItem[];
  notificationsData: Notification[];
}

export default function StudentDashboardContent({
  scheduleData,
  coursesData,
  assignmentsData,
  eventsData,
  cafeteriaMenuData,
  notificationsData
}: StudentDashboardContentProps) {
  const { user } = useAuth();
  
  // Filter data based on user department
  const userDepartment = user?.department || '';
  
  // Filter courses by department if user has a specific department
  const filteredCourses = user?.department 
    ? coursesData.filter(course => {
        // For department-specific emails, filter by exact department
        if (user.email.includes('@edu.in')) {
          return course.department === user.department;
        }
        // For generic users, show all courses (or could filter by related fields)
        return true;
      })
    : coursesData;
    
  // Filter schedule by department if appropriate
  const filteredSchedule = user?.department && user.email.includes('@edu.in')
    ? scheduleData.filter(item => !item.department || item.department === user.department)
    : scheduleData;
    
  // Filter assignments by department if appropriate
  const filteredAssignments = user?.department && user.email.includes('@edu.in')
    ? assignmentsData.filter(assignment => !assignment.department || assignment.department === user.department)
    : assignmentsData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TodaySchedule scheduleData={filteredSchedule} />
      <div className="hidden md:block">
        <AttendanceWidget />
      </div>
      <CoursesWidget coursesData={filteredCourses} />
      <AssignmentsWidget assignmentsData={filteredAssignments} />
      <EventsWidget eventsData={eventsData} />
      <CafeteriaWidget menuData={cafeteriaMenuData} />
      <NotificationsWidget notificationsData={notificationsData} />
      <div className="md:hidden block">
        <AttendanceWidget />
      </div>
    </div>
  );
}
