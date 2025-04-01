
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Calendar, MapPin, Clock, Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { CurrentDateTime } from '@/components/ui/CurrentDateTime';
import AppLayout from '@/layouts/AppLayout';

// Sample club data
const clubsData = [
  {
    id: 1,
    name: "Computer Science Society",
    description: "A community for computer science enthusiasts to collaborate on projects, participate in hackathons, and network with industry professionals.",
    category: "Academic",
    memberCount: 87,
    meetingDay: "Tuesdays",
    meetingTime: "5:00 PM - 7:00 PM",
    location: "Computer Science Building, Room 305",
    image: "https://ui-avatars.com/api/?name=CS+Society&background=6366F1&color=fff",
    upcoming: {
      title: "Hackathon Prep Session",
      date: "October 15, 2025",
      description: "Learn the essentials for competitive hackathons and form teams."
    }
  },
  {
    id: 2,
    name: "Biology Research Club",
    description: "For students interested in biological research. Features guest speakers, research paper discussions, and lab visit opportunities.",
    category: "Academic",
    memberCount: 54,
    meetingDay: "Mondays",
    meetingTime: "4:30 PM - 6:00 PM",
    location: "Science Building, Room 203",
    image: "https://ui-avatars.com/api/?name=Bio+Research&background=22C55E&color=fff",
    upcoming: {
      title: "Guest Speaker: Dr. Emma Chen",
      date: "October 10, 2025",
      description: "Learn about cutting-edge genetic research from the renowned geneticist."
    }
  },
  {
    id: 3,
    name: "Mathematics Problem Solving",
    description: "Weekly meetings to tackle interesting mathematical problems, prepare for mathematics competitions, and discuss mathematical concepts.",
    category: "Academic",
    memberCount: 42,
    meetingDay: "Thursdays",
    meetingTime: "6:00 PM - 7:30 PM",
    location: "Mathematics Building, Room 104",
    image: "https://ui-avatars.com/api/?name=Math+Problem&background=EAB308&color=fff",
    upcoming: {
      title: "IMO Problem Workshop",
      date: "October 20, 2025",
      description: "Practice solving International Mathematical Olympiad problems."
    }
  },
  {
    id: 4,
    name: "Nursing Students Association",
    description: "A support network for nursing students, featuring study groups, professional development workshops, and volunteer opportunities.",
    category: "Academic",
    memberCount: 63,
    meetingDay: "Wednesdays",
    meetingTime: "5:30 PM - 7:00 PM",
    location: "Health Sciences Building, Room 215",
    image: "https://ui-avatars.com/api/?name=Nursing+Assoc&background=14B8A6&color=fff",
    upcoming: {
      title: "Healthcare Career Fair Prep",
      date: "October 18, 2025",
      description: "Resume workshop and interview practice for healthcare positions."
    }
  },
  {
    id: 5,
    name: "Photography Club",
    description: "For photography enthusiasts of all skill levels. Activities include photo walks, technique workshops, and campus exhibitions.",
    category: "Arts",
    memberCount: 35,
    meetingDay: "Fridays",
    meetingTime: "3:00 PM - 4:30 PM",
    location: "Arts Building, Room 122",
    image: "https://ui-avatars.com/api/?name=Photo+Club&background=EC4899&color=fff",
    upcoming: {
      title: "Campus Photo Walk",
      date: "October 12, 2025",
      description: "Capture autumn on campus with guidance from professional photographers."
    }
  },
  {
    id: 6,
    name: "Chess Club",
    description: "Weekly chess matches, strategy discussions, and tournament preparation for players of all levels.",
    category: "Games",
    memberCount: 28,
    meetingDay: "Sundays",
    meetingTime: "2:00 PM - 4:00 PM",
    location: "Student Center, Room 107",
    image: "https://ui-avatars.com/api/?name=Chess+Club&background=8B5CF6&color=fff",
    upcoming: {
      title: "Blitz Tournament",
      date: "October 17, 2025",
      description: "Campus-wide speed chess tournament with prizes for winners."
    }
  }
];

export default function Clubs() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joinedClubs, setJoinedClubs] = useState<number[]>([]);
  
  // Filter clubs based on search query and category
  const filteredClubs = clubsData.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle joining a club
  const handleJoinClub = (clubId: number, clubName: string) => {
    if (joinedClubs.includes(clubId)) {
      // Leave the club
      setJoinedClubs(joinedClubs.filter(id => id !== clubId));
      toast({
        title: "Left Club",
        description: `You have left the ${clubName}.`,
      });
    } else {
      // Join the club
      setJoinedClubs([...joinedClubs, clubId]);
      toast({
        title: "Joined Club!",
        description: `You have successfully joined the ${clubName}.`,
      });
    }
  };
  
  // Get list of joined clubs
  const userJoinedClubs = clubsData.filter(club => joinedClubs.includes(club.id));
  
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
            Student Clubs & Organizations
          </h1>
          <p className="text-muted-foreground">
            Discover and join clubs that match your interests and passions
          </p>
          <CurrentDateTime className="mt-2" />
        </header>
        
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="browse">Browse Clubs</TabsTrigger>
            <TabsTrigger value="joined">
              My Clubs
              {joinedClubs.length > 0 && (
                <Badge className="ml-2" variant="secondary">{joinedClubs.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search clubs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <Button 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                <Button 
                  variant={selectedCategory === 'Academic' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory('Academic')}
                >
                  Academic
                </Button>
                <Button 
                  variant={selectedCategory === 'Arts' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory('Arts')}
                >
                  Arts
                </Button>
                <Button 
                  variant={selectedCategory === 'Games' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory('Games')}
                >
                  Games
                </Button>
              </div>
            </div>
            
            {/* Clubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <Card key={club.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Avatar className="h-12 w-12 mr-2">
                        <AvatarImage src={club.image} alt={club.name} />
                        <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Badge>{club.category}</Badge>
                    </div>
                    <CardTitle className="mt-2">{club.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{club.memberCount} members</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {club.description}
                    </p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <span>{club.meetingDay}, {club.meetingTime}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <span>{club.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <p className="font-medium text-sm">Upcoming: {club.upcoming.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {club.upcoming.date}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                    <Button 
                      variant={joinedClubs.includes(club.id) ? "secondary" : "default"}
                      size="sm"
                      onClick={() => handleJoinClub(club.id, club.name)}
                    >
                      {joinedClubs.includes(club.id) ? (
                        <>
                          Leave Club
                        </>
                      ) : (
                        <>
                          Join Club
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredClubs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Clubs Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="joined">
            <div className="space-y-6">
              <h2 className="text-xl font-medium">My Clubs</h2>
              
              {userJoinedClubs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userJoinedClubs.map((club) => (
                    <Card key={club.id} className="flex flex-col h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage src={club.image} alt={club.name} />
                              <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{club.name}</CardTitle>
                              <CardDescription>
                                <Badge className="mt-1">{club.category}</Badge>
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-6 flex-1">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Meeting Schedule</h4>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                              <span>{club.meetingDay}, {club.meetingTime}</span>
                            </div>
                            <div className="flex items-center text-sm mt-1">
                              <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                              <span>{club.location}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Next Event</h4>
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="font-medium text-sm">{club.upcoming.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {club.upcoming.date}
                              </p>
                              <p className="text-xs mt-1">
                                {club.upcoming.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t flex justify-between">
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleJoinClub(club.id, club.name)}
                        >
                          Leave Club
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">You haven't joined any clubs yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Explore clubs and join ones that match your interests
                  </p>
                  <Button onClick={() => document.querySelector('[value="browse"]')?.click()}>
                    Browse Clubs
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
}
