
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

  // Get top 4 courses for quick view
  const topFourCourses = coursesData.slice(0, 4);

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
            
            {/* Display 4 courses in the Today tab */}
            <div className="lg:col-span-3">
              <div className="glass-card subtle-shadow rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-medium text-lg">Your Courses (Quick View)</h2>
                  <a href="/courses" className="text-primary text-sm hover:underline">View all courses</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {topFourCourses.map(course => (
                    <div key={course.id} className="bg-background rounded-lg p-4 border border-border">
                      <div className="flex flex-col h-full">
                        <div className="mb-2">
                          <p className="text-xs text-muted-foreground">{course.code}</p>
                          <h3 className="font-medium truncate">{course.name}</h3>
                        </div>
                        <div className="mt-auto">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary h-1.5 rounded-full mt-1">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
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
