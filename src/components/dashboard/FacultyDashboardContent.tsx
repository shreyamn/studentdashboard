
import { useState, useEffect } from 'react';
import TeachingScheduleWidget from './TeachingScheduleWidget';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Users, FileText, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock teaching schedule data
const teachingScheduleData = [
  {
    id: 1,
    course: 'Mathematics 101',
    courseCode: 'MATH101',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    location: 'Math Building, Room 305',
    studentsEnrolled: 42,
  },
  {
    id: 2,
    course: 'Advanced Calculus',
    courseCode: 'MATH301',
    day: 'Monday',
    startTime: '01:00 PM',
    endTime: '02:30 PM',
    location: 'Science Hall, Room 201',
    studentsEnrolled: 28,
  },
  {
    id: 3,
    course: 'Linear Algebra',
    courseCode: 'MATH201',
    day: 'Tuesday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    location: 'Math Building, Room 105',
    studentsEnrolled: 35,
  },
  {
    id: 4,
    course: 'Differential Equations',
    courseCode: 'MATH302',
    day: 'Wednesday',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    location: 'Engineering Hall, Room 210',
    studentsEnrolled: 25,
  },
  {
    id: 5,
    course: 'Statistics for Scientists',
    courseCode: 'MATH205',
    day: 'Thursday',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    location: 'Science Hall, Room 110',
    studentsEnrolled: 38,
  },
];

// Pending tasks data
const pendingTasksData = [
  { id: 1, title: 'Grade MATH101 quizzes', dueDate: '2023-11-08' },
  { id: 2, title: 'Prepare lecture notes for MATH301', dueDate: '2023-11-09' },
  { id: 3, title: 'Review research papers from graduate students', dueDate: '2023-11-12' },
  { id: 4, title: 'Department meeting preparation', dueDate: '2023-11-15' },
];

// Student attendance data
const attendanceData = {
  MATH101: { present: 38, total: 42, percentage: 90 },
  MATH201: { present: 30, total: 35, percentage: 86 },
  MATH301: { present: 23, total: 28, percentage: 82 },
  MATH302: { present: 20, total: 25, percentage: 80 },
  MATH205: { present: 32, total: 38, percentage: 84 },
};

export default function FacultyDashboardContent() {
  const [currentDay, setCurrentDay] = useState('');
  
  useEffect(() => {
    // Get the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    setCurrentDay(today);
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Teaching Schedule */}
      <TeachingScheduleWidget 
        classesData={teachingScheduleData} 
        today={currentDay} 
      />
      
      {/* Weekly Schedule */}
      <div className="col-span-1">
        <AnimatedCard delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-medium text-lg">Weekly Classes</h2>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Calculator className="mr-1 h-3 w-3" /> 5 Courses
            </Badge>
          </div>
          
          <div className="space-y-3">
            {Object.keys(attendanceData).map((courseCode, index) => {
              const course = teachingScheduleData.find(c => c.courseCode === courseCode);
              if (!course) return null;
              
              return (
                <div 
                  key={index} 
                  className="bg-background rounded-lg p-3 border border-border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{course.course}</h3>
                    <Badge variant="outline">
                      {course.day}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {course.startTime} - {course.endTime} • {course.location}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Attendance</span>
                      <span className="text-xs font-medium">
                        {attendanceData[courseCode as keyof typeof attendanceData].present}/{attendanceData[courseCode as keyof typeof attendanceData].total} students
                      </span>
                    </div>
                    <Progress 
                      value={attendanceData[courseCode as keyof typeof attendanceData].percentage} 
                      className="h-1.5" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>
      </div>
      
      {/* Stats and Tasks */}
      <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">168</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all your courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">85%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all your courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{pendingTasksData.length}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tasks requiring your attention</p>
          </CardContent>
        </Card>
        
        {/* Tasks */}
        <div className="col-span-1 md:col-span-3">
          <AnimatedCard delay={0.5}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-medium text-lg">Pending Tasks</h2>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <AlertCircle className="mr-1 h-3 w-3" /> {pendingTasksData.length} Items
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pendingTasksData.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-background rounded-lg p-3 border border-border"
                >
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
