
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { AppSidebar } from '@/components/layout/Sidebar';
import PageTransition from '@/components/ui/PageTransition';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { 
  Calendar, 
  BookOpen, 
  Bell, 
  Clock, 
  FileText, 
  Utensils, 
  BookMarked,
  ArrowRight
} from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data
const assignmentsData = [
  { id: 1, title: 'Research Paper', course: 'Advanced Biology', dueDate: '2023-11-15', status: 'In Progress' },
  { id: 2, title: 'Problem Set 3', course: 'Calculus II', dueDate: '2023-11-10', status: 'Not Started' },
  { id: 3, title: 'Group Project', course: 'Business Ethics', dueDate: '2023-11-20', status: 'In Progress' },
];

const eventsData = [
  { id: 1, title: 'Career Fair', location: 'Main Hall', date: '2023-11-12', time: '10:00 AM' },
  { id: 2, title: 'Guest Lecture', location: 'Science Building', date: '2023-11-14', time: '2:00 PM' },
  { id: 3, title: 'Student Council Meeting', location: 'Meeting Room 103', date: '2023-11-16', time: '4:30 PM' },
];

const coursesData = [
  { id: 1, name: 'Advanced Biology', code: 'BIO301', instructor: 'Dr. Emily Chen', progress: 65 },
  { id: 2, name: 'Calculus II', code: 'MATH202', instructor: 'Prof. Robert Miller', progress: 78 },
  { id: 3, name: 'Business Ethics', code: 'BUS240', instructor: 'Dr. Sarah Johnson', progress: 42 },
  { id: 4, name: 'Computer Science', code: 'CS101', instructor: 'Prof. Alan Turing', progress: 90 },
];

const todaySchedule = [
  { id: 1, course: 'Advanced Biology', startTime: '09:00 AM', endTime: '10:30 AM', location: 'Science Building 301' },
  { id: 2, name: 'Lunch Break', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Student Center' },
  { id: 3, course: 'Calculus II', startTime: '01:30 PM', endTime: '03:00 PM', location: 'Math Building 105' },
  { id: 4, name: 'Study Group', startTime: '04:00 PM', endTime: '06:00 PM', location: 'Library, Room 203' },
];

const notificationsData = [
  { id: 1, title: 'Assignment Due Soon', description: 'Problem Set 3 is due in 3 days', time: '1 hour ago', type: 'warning' },
  { id: 2, title: 'New Announcement', description: 'Class cancelled for tomorrow', time: '3 hours ago', type: 'info' },
  { id: 3, title: 'Grade Posted', description: 'Midterm grade posted for BIO301', time: '1 day ago', type: 'success' },
];

const cafeteriaMenu = [
  { id: 1, meal: 'Breakfast', items: ['Pancakes', 'Scrambled Eggs', 'Fresh Fruit', 'Coffee/Tea'] },
  { id: 2, meal: 'Lunch', items: ['Grilled Chicken Sandwich', 'Vegetable Soup', 'Caesar Salad', 'Brownies'] },
  { id: 3, meal: 'Dinner', items: ['Pasta Primavera', 'Roast Beef', 'Steamed Vegetables', 'Ice Cream'] },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              <header className="mb-8">
                <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
                  Welcome back, {user?.name?.split(' ')[0]}
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your academic journey today
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <AnimatedCard delay={0.1} className="col-span-1 md:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="font-display font-medium text-lg">Today's Schedule</h2>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <Clock className="mr-1 h-3 w-3" /> {todaySchedule.length} Classes
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {todaySchedule.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="min-w-[90px] text-sm font-medium">
                          {item.startTime}
                        </div>
                        <div className="flex-1 bg-background rounded-lg p-3 border border-border">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">
                                {item.course || item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.location}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {item.startTime} - {item.endTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.2}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-medium text-lg">Assignments Due Soon</h2>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <FileText className="mr-1 h-3 w-3" /> {assignmentsData.length} Tasks
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {assignmentsData.map((assignment) => (
                      <div 
                        key={assignment.id} 
                        className="bg-background rounded-lg p-3 border border-border flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={
                              assignment.status === 'In Progress' 
                                ? 'secondary' 
                                : 'outline'
                            }
                            className="mb-1"
                          >
                            {assignment.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <AnimatedCard delay={0.3} className="col-span-1 md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-medium text-lg">Your Courses</h2>
                    <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center">
                      View all courses
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coursesData.map((course) => (
                      <div 
                        key={course.id} 
                        className="bg-background rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge variant="outline" className="mb-2">{course.code}</Badge>
                            <h3 className="font-medium">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          </div>
                          <BookMarked className="h-5 w-5 text-primary/70" />
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.4}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-medium text-lg">Upcoming Events</h2>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <Calendar className="mr-1 h-3 w-3" /> {eventsData.length} Events
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {eventsData.map((event) => (
                      <div 
                        key={event.id} 
                        className="bg-background rounded-lg p-3 border border-border"
                      >
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span className="mr-3">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedCard delay={0.5} className="col-span-1 md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-medium text-lg">Recent Notifications</h2>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <Bell className="mr-1 h-3 w-3" /> {notificationsData.length} New
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {notificationsData.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="bg-background rounded-lg p-3 border border-border flex items-start gap-3"
                      >
                        <div className={`p-2 rounded-full bg-${
                          notification.type === 'warning' ? 'amber' : 
                          notification.type === 'success' ? 'green' : 
                          'blue'
                        }-100 text-${
                          notification.type === 'warning' ? 'amber' : 
                          notification.type === 'success' ? 'green' : 
                          'blue'
                        }-500`}>
                          {notification.type === 'warning' ? (
                            <Bell className="h-4 w-4" />
                          ) : notification.type === 'success' ? (
                            <BookOpen className="h-4 w-4" />
                          ) : (
                            <Bell className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-primary text-sm font-medium hover:underline flex items-center mx-auto">
                        View all notifications
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.6}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-medium text-lg">Today's Menu</h2>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <Utensils className="mr-1 h-3 w-3" /> Cafeteria
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {cafeteriaMenu.map((menuItem) => (
                      <div 
                        key={menuItem.id} 
                        className="bg-background rounded-lg p-3 border border-border"
                      >
                        <h3 className="font-medium mb-2">{menuItem.meal}</h3>
                        <div className="space-y-1">
                          {menuItem.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/70"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
