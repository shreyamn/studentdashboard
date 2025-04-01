
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import TeachingScheduleWidget from './TeachingScheduleWidget';
import FacultyChoresWidget from './FacultyChoresWidget';
import { coursesData } from '@/data/coursesData';
import CourseCard from './CourseCard';
import { Course } from '@/data/types';
import NotificationsWidget from './NotificationsWidget';
import { notificationsData } from '@/data/notificationsData';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Download, Upload, Users, BookOpen } from 'lucide-react';

export default function FacultyDashboardContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  // Filter courses based on faculty's department
  const departmentCourses = user?.department 
    ? coursesData.filter(course => course.department === user.department)
    : [];
  
  const handleTakeAttendance = () => {
    toast.success("Attendance feature opened");
  };
  
  const handleUploadGrades = () => {
    toast.success("Upload grades feature opened");
  };
  
  const handleDownloadReports = () => {
    toast.success("Reports downloaded");
  };
  
  const handleManageStudents = () => {
    toast.success("Student management opened");
  };

  // Department specific teaching data
  const getTeachingSchedule = () => {
    // Base teaching schedule
    const schedule = [
      {
        id: 1,
        course: "Introduction to Computer Science",
        courseCode: "CS101",
        day: "Monday",
        startTime: "10:00 AM",
        endTime: "11:50 AM",
        location: "Science Building, Room 301",
        studentsEnrolled: 45,
        department: "Computer Science"
      },
      {
        id: 2,
        course: "Data Structures",
        courseCode: "CS202",
        day: "Tuesday",
        startTime: "2:00 PM",
        endTime: "3:50 PM",
        location: "Computer Lab, Room 105",
        studentsEnrolled: 32,
        department: "Computer Science"
      },
      {
        id: 3,
        course: "Algorithms Analysis",
        courseCode: "CS305",
        day: "Wednesday",
        startTime: "9:30 AM",
        endTime: "11:20 AM",
        location: "Science Building, Room 201",
        studentsEnrolled: 28,
        department: "Computer Science"
      },
      {
        id: 4,
        course: "Database Systems",
        courseCode: "CS340",
        day: "Friday",
        startTime: "1:00 PM",
        endTime: "2:50 PM",
        location: "Science Building, Room 301",
        studentsEnrolled: 38,
        department: "Computer Science"
      },
      {
        id: 5,
        course: "Calculus I",
        courseCode: "MATH101",
        day: "Monday",
        startTime: "9:00 AM",
        endTime: "10:50 AM",
        location: "Mathematics Building, Room 201",
        studentsEnrolled: 40,
        department: "Mathematics"
      },
      {
        id: 6,
        course: "Linear Algebra",
        courseCode: "MATH202",
        day: "Wednesday",
        startTime: "1:00 PM",
        endTime: "2:50 PM",
        location: "Mathematics Building, Room 105",
        studentsEnrolled: 35,
        department: "Mathematics"
      },
      {
        id: 7,
        course: "Financial Accounting",
        courseCode: "BUS101",
        day: "Tuesday",
        startTime: "11:00 AM",
        endTime: "12:50 PM",
        location: "Business Building, Room 301",
        studentsEnrolled: 55,
        department: "Business"
      },
      {
        id: 8,
        course: "Marketing Principles",
        courseCode: "BUS220",
        day: "Thursday",
        startTime: "3:00 PM",
        endTime: "4:50 PM",
        location: "Business Building, Room 205",
        studentsEnrolled: 50,
        department: "Business"
      }
    ];
    
    return schedule;
  };

  return (
    <div className="space-y-8">
      {/* Department indicator and quick stats */}
      <div className="bg-muted/50 rounded-lg p-4 md:p-6">
        <h2 className="font-medium text-lg mb-4">
          {user?.department} Department Overview
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">{departmentCourses.length}</p>
            <p className="text-sm text-muted-foreground">Courses</p>
          </div>
          
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">127</p>
            <p className="text-sm text-muted-foreground">Students</p>
          </div>
          
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">24</p>
            <p className="text-sm text-muted-foreground">Pending Assignments</p>
          </div>
          
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Faculty Members</p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleTakeAttendance}>
          <Users className="h-5 w-5" />
          <span className="text-sm">Take Attendance</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleUploadGrades}>
          <Upload className="h-5 w-5" />
          <span className="text-sm">Upload Grades</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleDownloadReports}>
          <Download className="h-5 w-5" />
          <span className="text-sm">Download Reports</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleManageStudents}>
          <BookOpen className="h-5 w-5" />
          <span className="text-sm">Manage Students</span>
        </Button>
      </div>
      
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-3'} w-full`}>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="schedule">Teaching Schedule</TabsTrigger>
          <TabsTrigger value="tasks">Department Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight mb-4">My {user?.department} Courses</h2>
          
          {departmentCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentCourses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No courses assigned for your department.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
          <TeachingScheduleWidget classesData={getTeachingSchedule()} />
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FacultyChoresWidget />
            <NotificationsWidget notifications={notificationsData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
