
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AnimatedCard from '@/components/ui/AnimatedCard';
import TeachingScheduleWidget from '@/components/dashboard/TeachingScheduleWidget';
import EventsWidget from '@/components/dashboard/EventsWidget';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Clock, BookOpen, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data
const teachingClassesData = [
  {
    id: 1,
    course: 'Introduction to Computer Science',
    courseCode: 'CS101',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    location: 'Room 305, Computer Science Building',
    studentsEnrolled: 42,
    department: 'Computer Science'
  },
  {
    id: 2,
    course: 'Advanced Algorithms',
    courseCode: 'CS401',
    day: 'Tuesday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    location: 'Room 201, CS Building',
    studentsEnrolled: 28,
    department: 'Computer Science'
  },
  {
    id: 3,
    course: 'Calculus I',
    courseCode: 'MATH101',
    day: 'Wednesday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    location: 'Room 102, Mathematics Building',
    studentsEnrolled: 38,
    department: 'Mathematics'
  },
  {
    id: 4,
    course: 'Linear Algebra',
    courseCode: 'MATH201',
    day: 'Thursday',
    startTime: '01:00 PM',
    endTime: '02:30 PM',
    location: 'Room 308, Mathematics Building',
    studentsEnrolled: 35,
    department: 'Mathematics'
  },
  {
    id: 5,
    course: 'Cell Biology',
    courseCode: 'BIO201',
    day: 'Monday',
    startTime: '10:30 AM',
    endTime: '12:00 PM',
    location: 'Lab 202, Biology Building',
    studentsEnrolled: 30,
    department: 'Biology'
  },
  {
    id: 6,
    course: 'Anatomy & Physiology',
    courseCode: 'NURS101',
    day: 'Tuesday',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    location: 'Lab 105, Nursing Building',
    studentsEnrolled: 25,
    department: 'Nursing'
  },
];

const eventsData = [
  {
    id: 1,
    title: 'Faculty Meeting',
    location: 'Conference Room A',
    date: '2023-11-15',
    time: '10:00 AM - 11:30 AM',
  },
  {
    id: 2,
    title: 'Research Symposium',
    location: 'Main Auditorium',
    date: '2023-11-18',
    time: '2:00 PM - 5:00 PM',
  },
  {
    id: 3,
    title: 'Department Social',
    location: 'Faculty Lounge',
    date: '2023-11-25',
    time: '4:00 PM - 6:00 PM',
  },
];

const notificationsData = [
  {
    id: 1,
    title: 'Grades Due Soon',
    description: 'Final grades for CS101 due by Friday',
    time: '2 hours ago',
    type: 'warning',
  },
  {
    id: 2,
    title: 'Office Hours Change',
    description: 'Your office hours have been updated in the system',
    time: '5 hours ago',
    type: 'info',
  },
  {
    id: 3,
    title: 'Research Grant Approved',
    description: 'Your research proposal has been approved',
    time: '1 day ago',
    type: 'success',
  },
];

export default function FacultyDashboardContent() {
  const { user } = useAuth();
  const [currentDay] = useState(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  });
  
  // Filter classes by faculty department
  const filteredClasses = user?.department 
    ? teachingClassesData.filter(cls => cls.department === user.department)
    : teachingClassesData;
  
  // Classes for today
  const todayClasses = filteredClasses.filter(cls => cls.day === currentDay);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Today's Teaching Schedule */}
      <TeachingScheduleWidget 
        classesData={filteredClasses} 
        today={currentDay} 
      />
      
      {/* Stats Cards */}
      <div className="col-span-1 grid grid-cols-1 gap-4">
        <AnimatedCard delay={0.4}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">
                {filteredClasses.reduce((sum, cls) => sum + cls.studentsEnrolled, 0)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {filteredClasses.length} classes
            </p>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard delay={0.5}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">
                {todayClasses.length}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Classes today
            </p>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard delay={0.6}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">
                {filteredClasses.length}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total classes this week
            </p>
          </CardContent>
        </AnimatedCard>
      </div>
      
      {/* Weekly Teaching Schedule */}
      <AnimatedCard delay={0.7} className="col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-medium text-lg">Weekly Overview</h2>
          <Button variant="outline" size="sm">
            <Calendar className="mr-1 h-4 w-4" />
            View Calendar
          </Button>
        </div>
        
        <Tabs defaultValue="schedule">
          <TabsList className="mb-4">
            <TabsTrigger value="schedule">
              <BookOpen className="mr-1 h-4 w-4" />
              Class Schedule
            </TabsTrigger>
            <TabsTrigger value="students">
              <GraduationCap className="mr-1 h-4 w-4" />
              Students
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule">
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                const dayClasses = filteredClasses.filter(cls => cls.day === day);
                return (
                  <div key={day} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Badge variant="outline" className={`
                          ${day === 'Monday' ? 'bg-blue-100 text-blue-800' : 
                            day === 'Tuesday' ? 'bg-purple-100 text-purple-800' : 
                            day === 'Wednesday' ? 'bg-green-100 text-green-800' : 
                            day === 'Thursday' ? 'bg-orange-100 text-orange-800' : 
                            'bg-pink-100 text-pink-800'}
                        `}>
                          {day}
                        </Badge>
                        <span className="ml-2 text-sm font-medium">
                          {dayClasses.length} Classes
                        </span>
                      </div>
                    </div>
                    
                    {dayClasses.length > 0 ? (
                      <div className="space-y-2">
                        {dayClasses.map(cls => (
                          <div key={cls.id} className="pl-2 text-sm flex items-center justify-between">
                            <div>
                              <span className="font-medium">{cls.courseCode}</span>
                              <span className="text-muted-foreground ml-2">
                                {cls.startTime} - {cls.endTime}
                              </span>
                            </div>
                            <span>{cls.location.split(',')[0]}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="pl-2 text-sm text-muted-foreground">No classes scheduled</p>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="students">
            <div className="space-y-3">
              {filteredClasses.map(cls => (
                <div key={cls.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{cls.course}</div>
                      <div className="text-sm text-muted-foreground">
                        {cls.courseCode} • {cls.studentsEnrolled} students
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Roster</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedCard>
      
      {/* Events and Notifications */}
      <EventsWidget eventsData={eventsData} />
      <NotificationsWidget notificationsData={notificationsData} />
    </div>
  );
}
