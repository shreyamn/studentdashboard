
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, Info, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const notificationsData = [
  {
    id: 1,
    title: 'Assignment Due: Research Paper',
    description: 'Your research paper for BIO 302 is due tomorrow at 11:59 PM',
    time: '2 hours ago',
    type: 'alert',
    course: 'BIO 302',
    read: false,
  },
  {
    id: 2,
    title: 'Grade Posted: Midterm Exam',
    description: 'Your grade for the MATH 201 midterm has been posted',
    time: '1 day ago',
    type: 'info',
    course: 'MATH 201',
    read: true,
  },
  {
    id: 3,
    title: 'Campus Alert: Building Closure',
    description: 'The Science Building will be closed for maintenance this weekend',
    time: '3 days ago',
    type: 'warning',
    course: null,
    read: true,
  },
  {
    id: 4,
    title: 'Course Registration Open',
    description: 'Spring semester course registration is now open for all students',
    time: '4 days ago',
    type: 'info',
    course: null,
    read: true,
  },
  {
    id: 5,
    title: 'Assignment Graded: Lab Report',
    description: 'Your lab report for CHEM 110 has been graded',
    time: '5 days ago',
    type: 'success',
    course: 'CHEM 110',
    read: false,
  },
];

export default function Notifications() {
  const getIcon = (type: string) => {
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="container mx-auto py-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Notifications</h1>
                <Button variant="outline" size="sm">Mark all as read</Button>
              </div>
              
              <div className="space-y-4">
                {notificationsData.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                  >
                    <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                      <div className="mr-2">{getIcon(notification.type)}</div>
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
                      <Button variant="ghost" size="sm">Dismiss</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
