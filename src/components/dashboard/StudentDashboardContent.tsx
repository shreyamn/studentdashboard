
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TodaySchedule from './TodaySchedule';
import CoursesWidget from './CoursesWidget';
import AssignmentsWidget from './AssignmentsWidget';
import EventsWidget from './EventsWidget';
import CafeteriaWidget from './CafeteriaWidget';
import NotificationsWidget from './NotificationsWidget';
import AttendanceWidget from './AttendanceWidget';
import { useAuth } from '@/context/AuthContext';
import { 
  ScheduleItem, 
  Course, 
  Assignment, 
  Event, 
  MenuItem, 
  Notification 
} from '@/data/types';

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
  
  // Filter assignments and schedule by department, but let the CoursesWidget handle course filtering
  const filteredAssignments = user?.department 
    ? assignmentsData.filter(assignment => 
        !assignment.department || assignment.department === user.department
      )
    : assignmentsData;
  
  const filteredSchedule = user?.department
    ? scheduleData.filter(item => 
        !item.department || item.department === user.department
      )
    : scheduleData;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Today's Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TodaySchedule scheduleData={filteredSchedule} />
            <EventsWidget eventsData={eventsData} />
            <CafeteriaWidget menuData={cafeteriaMenuData} />
            <NotificationsWidget notifications={notificationsData} />
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">My Courses</h2>
          <CoursesWidget coursesData={coursesData} />
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Assignments</h2>
          <AssignmentsWidget assignmentsData={filteredAssignments} />
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">My Attendance</h2>
          <AttendanceWidget />
        </TabsContent>
      </Tabs>
    </div>
  );
}
