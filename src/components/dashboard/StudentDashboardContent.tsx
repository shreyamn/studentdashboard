
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
import { Link } from 'react-router-dom';
import { 
  ScheduleItem, 
  Course, 
  Assignment, 
  Event, 
  MenuItem, 
  Notification 
} from '@/data/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

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

  // Get top 4 courses ONLY for user's major
  const userDepartmentCourses = user?.department
    ? coursesData.filter(course => course.department === user.department)
    : coursesData;
    
  const topFourCourses = userDepartmentCourses.slice(0, 4);

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
            
            {/* Display major-specific courses in the Today tab */}
            <div className="lg:col-span-3">
              <div className="glass-card subtle-shadow rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-medium text-lg">
                    {user?.department ? `Your ${user.department} Courses` : "Your Courses"}
                  </h2>
                  <Link to="/courses" className="text-primary text-sm hover:underline flex items-center">
                    View all courses
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                
                {userDepartmentCourses.length > 0 ? (
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
                            <div className="mt-3 flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Attendance</span>
                              <Link 
                                to="/attendance" 
                                className="text-xs text-primary hover:underline"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No courses available for your department.</p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-center">
                  <Button asChild>
                    <Link to="/courses">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Manage All Courses
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <EventsWidget eventsData={eventsData} />
            <CafeteriaWidget menuData={cafeteriaMenuData} />
            <NotificationsWidget notifications={notificationsData} />
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold tracking-tight">My Courses</h2>
            <Button asChild>
              <Link to="/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage All Courses
              </Link>
            </Button>
          </div>
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
