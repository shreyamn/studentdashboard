
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const clubsData = [
  {
    id: 1,
    name: 'Coding Club',
    description: 'Learn programming and work on cool projects',
    members: 42,
    location: 'Tech Building, Room 301',
    meetingDay: 'Tuesdays',
    categories: ['Technology', 'Education'],
  },
  {
    id: 2,
    name: 'Chess Club',
    description: 'Improve your chess skills and compete in tournaments',
    members: 23,
    location: 'Student Center, Room 105',
    meetingDay: 'Thursdays',
    categories: ['Games', 'Strategy'],
  },
  {
    id: 3,
    name: 'Photography Society',
    description: 'Capture and share beautiful moments on campus',
    members: 35,
    location: 'Arts Building, Room 210',
    meetingDay: 'Wednesdays',
    categories: ['Arts', 'Creative'],
  },
  {
    id: 4,
    name: 'Debate Team',
    description: 'Hone your public speaking and critical thinking skills',
    members: 18,
    location: 'Humanities Center, Room 120',
    meetingDay: 'Mondays and Fridays',
    categories: ['Communications', 'Competition'],
  },
];

export default function Clubs() {
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
              <h1 className="text-3xl font-bold mb-6">Campus Clubs</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubsData.map((club) => (
                  <Card key={club.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{club.name}</CardTitle>
                      <CardDescription>{club.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{club.members} members</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{club.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Meetings: {club.meetingDay}</p>
                      <div className="flex flex-wrap gap-2">
                        {club.categories.map((category) => (
                          <Badge key={category} variant="outline" className="flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">Join Club</Button>
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
