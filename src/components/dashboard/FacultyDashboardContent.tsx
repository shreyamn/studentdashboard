
import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  Megaphone, 
  CalendarClock 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeachingScheduleWidget from './TeachingScheduleWidget';
import NotificationsWidget from './NotificationsWidget';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Notification } from '@/data/types';

export default function FacultyDashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('today');
  
  // Define teaching classes data
  const teachingClasses = [
    {
      id: 1,
      course: 'Introduction to Programming',
      courseCode: 'CS 101',
      day: 'Monday',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      location: 'Engineering Block, Room E101',
      studentsEnrolled: 45,
    },
    {
      id: 2,
      course: 'Data Structures and Algorithms',
      courseCode: 'CS 201',
      day: 'Tuesday',
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      location: 'Science Block, Room S202',
      studentsEnrolled: 38,
    },
    {
      id: 3,
      course: 'Database Management Systems',
      courseCode: 'CS 301',
      day: 'Wednesday',
      startTime: '3:00 PM',
      endTime: '4:30 PM',
      location: 'Engineering Block, Room E105',
      studentsEnrolled: 42,
    },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Department Faculty Meeting',
      date: 'Tomorrow, 2:00 PM',
      location: 'Conference Room 3A',
    },
    {
      id: 2,
      title: 'Curriculum Review Committee',
      date: 'Thursday, 11:00 AM',
      location: "Dean's Office",
    },
    {
      id: 3,
      title: 'Research Grant Discussion',
      date: 'Friday, 3:30 PM',
      location: 'Faculty Lounge',
    },
  ];

  const facultyAnnouncements = [
    {
      id: 1,
      title: 'Annual Faculty Performance Reviews',
      description: 'Performance reviews scheduled for next month. Please prepare your teaching and research portfolios.',
      date: 'Posted 2 days ago',
    },
    {
      id: 2,
      title: 'Teaching Excellence Workshop',
      description: 'Optional workshop on innovative teaching methods on Friday at 2 PM in the Faculty Development Center.',
      date: 'Posted 1 week ago',
    },
    {
      id: 3,
      title: 'Research Funding Opportunity',
      description: 'New grants available for interdisciplinary research projects. Deadline for submissions is next month.',
      date: 'Posted 3 days ago',
    },
  ];

  const officeHours = [
    {
      id: 1,
      day: 'Monday',
      hours: '1:00 PM - 3:00 PM',
      location: 'Faculty Office F203',
    },
    {
      id: 2,
      day: 'Wednesday',
      hours: '11:00 AM - 1:00 PM',
      location: 'Faculty Office F203',
    },
    {
      id: 3,
      day: 'Thursday',
      hours: '2:00 PM - 4:00 PM',
      location: 'Faculty Office F203',
    },
  ];

  const recentSubmissions = [
    {
      id: 1,
      studentName: 'Alex Johnson',
      courseName: 'Introduction to Programming',
      assignmentName: 'Final Project',
      submittedOn: 'Today, 9:30 AM',
    },
    {
      id: 2,
      studentName: 'Maria Garcia',
      courseName: 'Data Structures and Algorithms',
      assignmentName: 'Assignment 4',
      submittedOn: 'Yesterday, 11:45 PM',
    },
    {
      id: 3,
      studentName: 'Tyler Robinson',
      courseName: 'Database Management Systems',
      assignmentName: 'Term Paper',
      submittedOn: 'Today, 8:15 AM',
    },
    {
      id: 4,
      studentName: 'Sophia Lee',
      courseName: 'Introduction to Programming',
      assignmentName: 'Lab Exercise 5',
      submittedOn: 'Yesterday, 5:20 PM',
    },
  ];

  const facultyNotifications: Notification[] = [
    {
      id: 1,
      title: 'Performance Review Scheduled',
      description: 'Your annual performance review has been scheduled for next Tuesday at 2 PM with the Department Chair.',
      time: '2 hours ago',
      type: 'info',
    },
    {
      id: 2,
      title: 'New Research Grant Opportunity',
      description: 'A new grant opportunity in your field has been announced with a submission deadline of next month.',
      time: '1 day ago',
      type: 'success',
    },
    {
      id: 3,
      title: 'Student Grade Dispute',
      description: 'A student has submitted a formal grade dispute for your Data Structures course.',
      time: '3 days ago',
      type: 'warning',
    },
    {
      id: 4,
      title: 'Teaching Evaluation Results Available',
      description: 'The results from your last semester\'s teaching evaluations are now available for review.',
      time: '1 week ago',
      type: 'info',
    },
  ];

  // Get current day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="today" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Today's Schedule</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TeachingScheduleWidget classesData={teachingClasses} today={today} />
            
            <Card className="col-span-1 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Office Hours
                </h3>
                <Badge variant="outline">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</Badge>
              </div>
              <div className="space-y-4">
                {officeHours.map(hours => (
                  <div key={hours.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{hours.day}</p>
                      <p className="text-sm text-muted-foreground">{hours.location}</p>
                    </div>
                    <Badge variant="secondary">{hours.hours}</Badge>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="col-span-1 p-6">
              <div className="flex items-center mb-4">
                <Megaphone className="mr-2 h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Announcements</h3>
              </div>
              <div className="space-y-4">
                {facultyAnnouncements.slice(0, 2).map(announcement => (
                  <div key={announcement.id} className="border-b pb-3 last:border-0">
                    <p className="font-medium">{announcement.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{announcement.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  View all announcements
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Events & Tasks</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 p-6">
              <div className="flex items-center mb-4">
                <CalendarClock className="mr-2 h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Upcoming Meetings</h3>
              </div>
              <div className="space-y-4">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="border-b pb-3 last:border-0">
                    <p className="font-medium">{meeting.title}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-muted-foreground">{meeting.date}</p>
                      <p className="text-sm">{meeting.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="col-span-1 p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Recent Submissions</h3>
              </div>
              <div className="space-y-3">
                {recentSubmissions.slice(0, 3).map(submission => (
                  <div key={submission.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <p className="font-medium">{submission.studentName}</p>
                      <Badge variant="outline" className="text-xs">
                        {submission.submittedOn}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {submission.courseName} - {submission.assignmentName}
                    </p>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  View all submissions
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            <NotificationsWidget notifications={facultyNotifications} />
          </div>
        </TabsContent>
        
        <TabsContent value="classes" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">My Classes</h2>
          <div className="grid gap-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Introduction to Programming</h3>
                  <Badge>CS 101</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Schedule</p>
                      <p className="text-sm text-muted-foreground">Mon, Wed, Fri 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Students</p>
                      <p className="text-sm text-muted-foreground">45 Enrolled</p>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full" size="sm">
                      View Class
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Data Structures and Algorithms</h3>
                  <Badge>CS 201</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Schedule</p>
                      <p className="text-sm text-muted-foreground">Tue, Thu 1:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Students</p>
                      <p className="text-sm text-muted-foreground">38 Enrolled</p>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full" size="sm">
                      View Class
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Database Management Systems</h3>
                  <Badge>CS 301</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Schedule</p>
                      <p className="text-sm text-muted-foreground">Mon, Wed 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Students</p>
                      <p className="text-sm text-muted-foreground">42 Enrolled</p>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full" size="sm">
                      View Class
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Faculty Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Teaching Resources</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Faculty Handbook</p>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Grading Policies</p>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Classroom Technology Guide</p>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Academic Calendar</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Research & Development</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Grant Opportunities</p>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Publication Guidelines</p>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Research Ethics Committee</p>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <p>Lab Access Protocols</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
