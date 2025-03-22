
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const eventsData = [
  {
    id: 1,
    title: 'Welcome Week',
    description: 'Activities and events to welcome new students',
    date: 'August 28, 2023',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Campus',
  },
  {
    id: 2,
    title: 'Career Fair',
    description: 'Connect with potential employers',
    date: 'September 15, 2023',
    time: '10:00 AM - 3:00 PM',
    location: 'Student Center',
  },
  {
    id: 3,
    title: 'Guest Lecture: AI Ethics',
    description: 'Featuring Dr. Sarah Johnson from MIT',
    date: 'October 5, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Auditorium A',
  },
  {
    id: 4,
    title: 'Homecoming Game',
    description: 'Annual football game against rival university',
    date: 'November 12, 2023',
    time: '7:00 PM',
    location: 'University Stadium',
  },
];

export default function Events() {
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
              <h1 className="text-3xl font-bold mb-6">Campus Events</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">Register</Button>
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
