
import React from 'react';
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
}

interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  progress: number;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
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
  return (
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
  );
}
