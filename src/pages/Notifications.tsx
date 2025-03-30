
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, Info, CheckCircle, Clock, FileText, BookOpen, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/ui/PageTransition';

// Mock notifications data with role-specific notifications
const allNotificationsData = [
  // Student notifications
  {
    id: 1,
    title: 'Assignment Due: Research Paper',
    description: 'Your research paper for BIO 302 is due tomorrow at 11:59 PM',
    time: '2 hours ago',
    type: 'alert',
    course: 'BIO 302',
    read: false,
    roles: ['student']
  },
  {
    id: 2,
    title: 'Grade Posted: Midterm Exam',
    description: 'Your grade for the MATH 201 midterm has been posted',
    time: '1 day ago',
    type: 'info',
    course: 'MATH 201',
    read: true,
    roles: ['student']
  },
  {
    id: 3,
    title: 'Campus Alert: Building Closure',
    description: 'The Science Building will be closed for maintenance this weekend',
    time: '3 days ago',
    type: 'warning',
    course: null,
    read: true,
    roles: ['student', 'faculty', 'staff', 'admin']
  },
  {
    id: 4,
    title: 'Course Registration Open',
    description: 'Spring semester course registration is now open for all students',
    time: '4 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['student']
  },
  {
    id: 5,
    title: 'Assignment Graded: Lab Report',
    description: 'Your lab report for CHEM 110 has been graded',
    time: '5 days ago',
    type: 'success',
    course: 'CHEM 110',
    read: false,
    roles: ['student']
  },
  // Faculty notifications
  {
    id: 6,
    title: 'Grade Submission Deadline',
    description: 'Final grades for all courses must be submitted by Friday',
    time: '1 day ago',
    type: 'alert',
    course: null,
    read: false,
    roles: ['faculty']
  },
  {
    id: 7,
    title: 'Department Meeting',
    description: 'Quarterly department meeting on Thursday at 2PM in Room 301',
    time: '2 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['faculty']
  },
  {
    id: 8,
    title: 'Student Requests Office Hours',
    description: 'John Doe has requested additional office hours for BIO 302',
    time: '3 days ago',
    type: 'info',
    course: 'BIO 302',
    read: false,
    roles: ['faculty']
  },
  // Staff notifications
  {
    id: 9,
    title: 'Maintenance Request: Room 205',
    description: 'Projector repair needed in Room 205 before Monday classes',
    time: '1 day ago',
    type: 'alert',
    course: null,
    read: false,
    roles: ['staff']
  },
  {
    id: 10,
    title: 'Supply Shipment Arrived',
    description: 'New office supplies have arrived and need to be inventoried',
    time: '2 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['staff']
  },
  {
    id: 11,
    title: 'Staff Meeting',
    description: 'Monthly staff meeting on Monday at 9AM in the Conference Room',
    time: '3 days ago',
    type: 'info',
    course: null,
    read: false,
    roles: ['staff']
  },
  {
    id: 12,
    title: 'ID Card System Maintenance',
    description: 'ID card system will be offline for maintenance on Saturday',
    time: '3 days ago',
    type: 'warning',
    course: null,
    read: true,
    roles: ['staff']
  },
  // Admin notifications
  {
    id: 13,
    title: 'Budget Review Meeting',
    description: 'Annual budget review meeting scheduled for next Tuesday',
    time: '1 day ago',
    type: 'alert',
    course: null,
    read: false,
    roles: ['admin']
  },
  {
    id: 14,
    title: 'Faculty Performance Reviews Due',
    description: 'Complete all faculty performance reviews by the end of the month',
    time: '2 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['admin']
  },
];

export default function Notifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    if (user) {
      // Filter notifications based on user's role
      const filteredNotifications = allNotificationsData.filter(notification => 
        notification.roles.includes(user.role)
      );
      setNotifications(filteredNotifications);
    }
  }, [user]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification dismissed",
      description: "This notification has been removed",
    });
  };

  const handleViewDetails = (notification) => {
    // In a real app, this would navigate to a detail view
    // For now, we'll just show a toast with details
    toast({
      title: notification.title,
      description: notification.description,
      duration: 5000,
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getSecondaryIcon = (notification) => {
    if (notification.course) {
      return <BookOpen className="h-4 w-4" />;
    }
    
    if (notification.title.toLowerCase().includes('meeting')) {
      return <Calendar className="h-4 w-4" />;
    }
    
    if (notification.title.toLowerCase().includes('assignment')) {
      return <FileText className="h-4 w-4" />;
    }
    
    return <Bell className="h-4 w-4" />;
  };

  const displayedNotifications = showAll 
    ? notifications 
    : notifications.slice(0, displayCount);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-3xl font-bold">Notifications</h1>
                    <p className="text-muted-foreground">
                      You have {notifications.filter(n => !n.read).length} unread notifications
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                    Mark all as read
                  </Button>
                </div>
                
                {notifications.length === 0 ? (
                  <Card className="text-center p-8">
                    <div className="flex flex-col items-center justify-center">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <h2 className="text-xl font-semibold mb-2">No notifications</h2>
                      <p className="text-muted-foreground">
                        You don't have any notifications at this time.
                      </p>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {displayedNotifications.map((notification) => (
                      <Card 
                        key={notification.id} 
                        className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                      >
                        <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                          <div className={`p-2 rounded-full bg-${
                            notification.type === 'alert' ? 'red' : 
                            notification.type === 'warning' ? 'amber' : 
                            notification.type === 'success' ? 'green' : 
                            'blue'
                          }-100 mr-3 shrink-0`}>
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{notification.title}</CardTitle>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {notification.time}
                              </div>
                            </div>
                            {notification.course && (
                              <Badge variant="outline" className="mt-1">
                                {notification.course}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{notification.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDismiss(notification.id)}
                            >
                              Dismiss
                            </Button>
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(notification)}
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                    {!showAll && notifications.length > displayCount ? (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4" 
                        onClick={() => setShowAll(true)}
                      >
                        View all notifications
                        <Bell className="ml-2 h-4 w-4" />
                      </Button>
                    ) : notifications.length > displayCount && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4" 
                        onClick={() => setShowAll(false)}
                      >
                        Show fewer notifications
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
