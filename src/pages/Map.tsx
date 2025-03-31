
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { AppSidebar } from '@/components/layout/Sidebar';
import PageTransition from '@/components/ui/PageTransition';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { SearchIcon, MapPin, BookOpen, Coffee, Pizza, Library, Users, LayoutGrid, List, Clock, BookMarked } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data for campus locations
const locations = [
  {
    id: 1,
    name: 'Main Building',
    category: 'academic',
    floor: 4,
    description: 'Houses administrative offices and lecture halls',
    coordinates: { x: 35, y: 22 },
    icon: BookOpen,
    rooms: ['Room 101', 'Room 102', 'Room 103', 'Room 104']
  },
  {
    id: 2,
    name: 'Science Complex',
    category: 'academic',
    floor: 3,
    description: 'Labs and research facilities for natural sciences',
    coordinates: { x: 55, y: 35 },
    icon: BookOpen,
    rooms: ['Lab 102', 'Room 203', 'Room 204', 'Lab 304']
  },
  {
    id: 3,
    name: 'University Library',
    category: 'facility',
    floor: 5,
    description: 'Central library with study rooms and research resources',
    coordinates: { x: 20, y: 40 },
    icon: Library,
    rooms: ['Study Room 1', 'Study Room 2', 'Conference Room A']
  },
  {
    id: 4,
    name: 'Student Center',
    category: 'facility',
    floor: 2,
    description: 'Student services, clubs, and recreation spaces',
    coordinates: { x: 45, y: 60 },
    icon: Users,
    rooms: ['Club Space', 'Activity Hall', 'Student Lounge']
  },
  {
    id: 5,
    name: 'Cafeteria',
    category: 'dining',
    floor: 1,
    description: 'Main dining hall for students and faculty',
    coordinates: { x: 70, y: 50 },
    icon: Pizza,
    rooms: ['Main Dining Area', 'Private Dining Room']
  },
  {
    id: 6,
    name: 'Coffee Shop',
    category: 'dining',
    floor: 1,
    description: 'Grab a coffee or snack between classes',
    coordinates: { x: 30, y: 65 },
    icon: Coffee,
    rooms: ['Coffee Shop']
  },
  {
    id: 7,
    name: 'Computer Science Building',
    category: 'academic',
    floor: 3,
    description: 'Home to Computer Science department and technology labs',
    coordinates: { x: 60, y: 25 },
    icon: BookOpen,
    rooms: ['Room 305', 'Lab 301', 'Room 302', 'Room 303']
  },
  {
    id: 8,
    name: 'Math Building',
    category: 'academic',
    floor: 2,
    description: 'Houses Mathematics department classrooms and offices',
    coordinates: { x: 48, y: 30 },
    icon: BookOpen,
    rooms: ['Room 201', 'Room 202', 'Room 203']
  },
  {
    id: 9,
    name: 'Biology Building',
    category: 'academic',
    floor: 2,
    description: 'Biology department classrooms and research labs',
    coordinates: { x: 52, y: 40 },
    icon: BookOpen,
    rooms: ['Room 203', 'Lab 201', 'Room 204']
  },
  {
    id: 10,
    name: 'Nursing Building',
    category: 'academic',
    floor: 3,
    description: 'Nursing and Health Sciences department',
    coordinates: { x: 38, y: 45 },
    icon: BookOpen,
    rooms: ['Room 105', 'Simulation Lab', 'Room 106']
  },
];

// Mock data for bookable spaces
const bookableSpaces = [
  {
    id: 1,
    name: 'Study Room 101',
    location: 'University Library, 1st Floor',
    capacity: 4,
    amenities: ['Whiteboard', 'Projector', 'Power outlets'],
    availability: [
      { time: '9:00 AM - 11:00 AM', status: 'available' },
      { time: '11:00 AM - 1:00 PM', status: 'booked' },
      { time: '1:00 PM - 3:00 PM', status: 'available' },
      { time: '3:00 PM - 5:00 PM', status: 'available' },
    ],
  },
  {
    id: 2,
    name: 'Conference Room A',
    location: 'Main Building, 2nd Floor',
    capacity: 12,
    amenities: ['Video conferencing', 'Whiteboard', 'Large display'],
    availability: [
      { time: '9:00 AM - 11:00 AM', status: 'booked' },
      { time: '11:00 AM - 1:00 PM', status: 'booked' },
      { time: '1:00 PM - 3:00 PM', status: 'available' },
      { time: '3:00 PM - 5:00 PM', status: 'available' },
    ],
  },
  {
    id: 3,
    name: 'Collaboration Space',
    location: 'Student Center, Ground Floor',
    capacity: 8,
    amenities: ['Movable furniture', 'Whiteboard walls', 'Power outlets'],
    availability: [
      { time: '9:00 AM - 11:00 AM', status: 'available' },
      { time: '11:00 AM - 1:00 PM', status: 'available' },
      { time: '1:00 PM - 3:00 PM', status: 'booked' },
      { time: '3:00 PM - 5:00 PM', status: 'booked' },
    ],
  },
  {
    id: 4,
    name: 'Media Lab',
    location: 'Science Complex, 3rd Floor',
    capacity: 6,
    amenities: ['Audio/Video equipment', 'Editing software', 'Green screen'],
    availability: [
      { time: '9:00 AM - 11:00 AM', status: 'available' },
      { time: '11:00 AM - 1:00 PM', status: 'available' },
      { time: '1:00 PM - 3:00 PM', status: 'available' },
      { time: '3:00 PM - 5:00 PM', status: 'booked' },
    ],
  },
];

export default function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [highlightedRoom, setHighlightedRoom] = useState<string | null>(null);
  
  // Get query params from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomParam = queryParams.get('room');

  useEffect(() => {
    // If there's a room parameter, find its location and highlight it
    if (roomParam) {
      const roomToFind = roomParam.trim();
      
      // Find location that contains this room
      for (const loc of locations) {
        if (loc.rooms.some(room => room.toLowerCase().includes(roomToFind.toLowerCase()))) {
          setSelectedLocation(loc.id);
          setHighlightedRoom(roomToFind);
          setSelectedRoom(loc.rooms.find(room => 
            room.toLowerCase().includes(roomToFind.toLowerCase())
          ) || null);
          
          // Show toast notification
          toast.info(`Showing location of "${roomToFind}"`);
          break;
        }
      }
    }
  }, [roomParam]);

  const handleLocationClick = (id: number) => {
    setSelectedLocation(id === selectedLocation ? null : id);
    setSelectedRoom(null); // Reset selected room when changing location
  };

  const handleRoomClick = (room: string) => {
    setSelectedRoom(room === selectedRoom ? null : room);
  };

  const filteredLocations = locations.filter(
    (location) => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           location.rooms.some(room => room.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch && (!selectedCategory || location.category === selectedCategory);
    }
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              <header className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
                      Campus Map
                    </h1>
                    <p className="text-muted-foreground">
                      Navigate the university campus and find classrooms
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search locations or rooms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-full md:w-[280px]"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-secondary' : ''}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-secondary' : ''}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </header>

              <Tabs defaultValue="map" className="mb-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="map">
                    <MapPin className="h-4 w-4 mr-2" />
                    Campus Map
                  </TabsTrigger>
                  <TabsTrigger value="book">
                    <BookMarked className="h-4 w-4 mr-2" />
                    Book a Space
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="map">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className="glass-card subtle-shadow rounded-xl overflow-hidden mb-6">
                        <div className="p-4 border-b border-border">
                          <h3 className="font-display font-medium">Locations</h3>
                        </div>
                        <div className="p-3">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCategory(null)}
                              className={!selectedCategory ? 'bg-secondary' : ''}
                            >
                              All
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCategory('academic')}
                              className={selectedCategory === 'academic' ? 'bg-secondary' : ''}
                            >
                              <BookOpen className="h-3.5 w-3.5 mr-1" />
                              Academic
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCategory('facility')}
                              className={selectedCategory === 'facility' ? 'bg-secondary' : ''}
                            >
                              <Library className="h-3.5 w-3.5 mr-1" />
                              Facilities
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCategory('dining')}
                              className={selectedCategory === 'dining' ? 'bg-secondary' : ''}
                            >
                              <Pizza className="h-3.5 w-3.5 mr-1" />
                              Dining
                            </Button>
                          </div>

                          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                            {filteredLocations.length > 0 ? (
                              viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {filteredLocations.map((location) => (
                                    <motion.div
                                      key={location.id}
                                      whileHover={{ scale: 1.02 }}
                                      transition={{ duration: 0.2 }}
                                      onClick={() => handleLocationClick(location.id)}
                                      className={`p-3 bg-background rounded-lg border cursor-pointer transition-colors ${
                                        selectedLocation === location.id
                                          ? 'border-primary'
                                          : 'border-border hover:border-primary/50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                                          <location.icon className="h-4 w-4" />
                                        </div>
                                        <h4 className="font-medium text-sm">{location.name}</h4>
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {location.description.substring(0, 50)}
                                        {location.description.length > 50 ? '...' : ''}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                filteredLocations.map((location) => (
                                  <motion.div
                                    key={location.id}
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => handleLocationClick(location.id)}
                                    className={`p-3 bg-background rounded-lg border flex items-center cursor-pointer ${
                                      selectedLocation === location.id
                                        ? 'border-primary'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                                  >
                                    <div className="p-2 rounded-md bg-primary/10 text-primary mr-3">
                                      <location.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium">{location.name}</h4>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {location.description}
                                      </p>
                                    </div>
                                    <Badge variant="outline">{location.floor}F</Badge>
                                  </motion.div>
                                ))
                              )
                            ) : (
                              <div className="text-center p-4 text-muted-foreground">
                                No locations found
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {selectedLocation && (
                        <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
                          <div className="p-4 border-b border-border">
                            <h3 className="font-display font-medium">Location Details</h3>
                          </div>
                          <div className="p-4">
                            {(() => {
                              const location = locations.find((loc) => loc.id === selectedLocation);
                              if (!location) return null;
                              
                              return (
                                <div>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 rounded-md bg-primary/10 text-primary">
                                      <location.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-lg">{location.name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-background p-3 rounded-lg border border-border">
                                      <h5 className="text-sm font-medium mb-1">Description</h5>
                                      <p className="text-sm">{location.description}</p>
                                    </div>
                                    
                                    <div className="bg-background p-3 rounded-lg border border-border">
                                      <h5 className="text-sm font-medium mb-1">Building Details</h5>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                          <span className="text-muted-foreground">Floor:</span>
                                          <span className="ml-2">{location.floor}</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Hours:</span>
                                          <span className="ml-2">7:00 AM - 9:00 PM</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-background p-3 rounded-lg border border-border">
                                      <h5 className="text-sm font-medium mb-2">Classrooms & Rooms</h5>
                                      <div className="grid grid-cols-2 gap-2">
                                        {location.rooms.map((room, idx) => (
                                          <div 
                                            key={idx}
                                            onClick={() => handleRoomClick(room)}
                                            className={`p-2 border rounded-md text-sm cursor-pointer ${
                                              selectedRoom === room || highlightedRoom === room
                                                ? 'bg-primary/10 border-primary/30'
                                                : 'hover:bg-muted'
                                            }`}
                                          >
                                            <div className="flex items-center">
                                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                                              <span>{room}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                      <Button onClick={() => toast.success("Directions to " + location.name)}>
                                        Get Directions
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-2">
                      <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
                        <div className="relative" style={{ height: '600px' }}>
                          <div className="absolute inset-0 bg-background/70">
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900">
                                  {/* Interactive map with highlighted rooms */}
                                  <div className="w-full h-full opacity-75">
                                    <svg
                                      width="100%"
                                      height="100%"
                                      viewBox="0 0 100 100"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      {/* Buildings */}
                                      <rect x="10" y="10" width="30" height="20" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 1 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="50" y="15" width="30" height="30" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 2 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="15" y="40" width="25" height="20" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 3 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="45" y="55" width="20" height="20" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 4 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="70" y="45" width="15" height="15" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 5 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="25" y="65" width="15" height="15" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 6 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      
                                      {/* New academic buildings */}
                                      <rect x="60" y="20" width="20" height="15" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 7 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="45" y="30" width="15" height="12" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 8 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="50" y="40" width="18" height="12" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 9 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      <rect x="35" y="45" width="12" height="15" className={`fill-primary/30 stroke-primary/50 ${selectedLocation === 10 ? 'fill-primary/40 stroke-primary' : ''}`} strokeWidth="0.5" />
                                      
                                      {/* Paths */}
                                      <path d="M25 30 L25 40" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />
                                      <path d="M40 20 L50 30" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />
                                      <path d="M50 30 L50 55" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />
                                      <path d="M40 40 L45 55" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />
                                      <path d="M65 45 L70 45" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />
                                      <path d="M40 60 L45 65" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />
                                      <path d="M60 35 L60 40" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />
                                      <path d="M45 42 L50 42" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="0.75" />

                                      {/* Green Spaces */}
                                      <circle cx="35" cy="50" r="5" className="fill-green-500/20 stroke-green-500/40" strokeWidth="0.5" />
                                      <circle cx="60" cy="70" r="8" className="fill-green-500/20 stroke-green-500/40" strokeWidth="0.5" />
                                      
                                      {/* Location Pins */}
                                      {filteredLocations.map((location) => (
                                        <g
                                          key={location.id}
                                          transform={`translate(${location.coordinates.x - 2}, ${location.coordinates.y - 5})`}
                                          className={`cursor-pointer ${selectedLocation === location.id ? 'opacity-100' : 'opacity-70'}`}
                                          onClick={() => handleLocationClick(location.id)}
                                        >
                                          <circle
                                            cx="2"
                                            cy="2"
                                            r="2"
                                            className={selectedLocation === location.id ? 'fill-primary' : 'fill-slate-500'}
                                          />
                                          <path
                                            d="M2 0 C3.1 0 4 0.9 4 2 C4 3.1 3.1 4 2 4 C0.9 4 0 3.1 0 2 C0 0.9 0.9 0 2 0 Z M2 4 L2 7"
                                            className={selectedLocation === location.id ? 'stroke-primary' : 'stroke-slate-500'}
                                            strokeWidth="0.75"
                                          />
                                          {selectedLocation === location.id && (
                                            <rect
                                              x="-6"
                                              y="-15"
                                              width="16"
                                              height="12"
                                              rx="2"
                                              className="fill-white/90 dark:fill-slate-800/90 stroke-primary/50"
                                              strokeWidth="0.5"
                                            />
                                          )}
                                          {selectedLocation === location.id && (
                                            <text
                                              x="2"
                                              y="-7"
                                              textAnchor="middle"
                                              className="fill-foreground text-[2px]"
                                              style={{ fontWeight: 500 }}
                                            >
                                              {location.name}
                                            </text>
                                          )}
                                          
                                          {/* Show selected room if applicable */}
                                          {selectedLocation === location.id && selectedRoom && (
                                            <g transform="translate(0, 12)">
                                              <rect
                                                x="-10"
                                                y="-5"
                                                width="24"
                                                height="10"
                                                rx="2"
                                                className="fill-primary/20 stroke-primary"
                                                strokeWidth="0.3"
                                              />
                                              <text
                                                x="2"
                                                y="0"
                                                textAnchor="middle"
                                                className="fill-primary text-[1.8px]"
                                                style={{ fontWeight: 500 }}
                                              >
                                                {selectedRoom}
                                              </text>
                                            </g>
                                          )}
                                        </g>
                                      ))}
                                    </svg>
                                  </div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg shadow-sm border border-border">
                                  <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-1.5">
                                      <div className="h-2.5 w-2.5 rounded-sm bg-primary"></div>
                                      <span>Academic</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <div className="h-2.5 w-2.5 rounded-sm bg-green-500"></div>
                                      <span>Green Space</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <div className="h-2.5 w-2.5 rounded-sm bg-slate-400 dark:bg-slate-600"></div>
                                      <span>Pathways</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="book">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookableSpaces.map((space) => (
                      <motion.div
                        key={space.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-card subtle-shadow rounded-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-border flex items-center justify-between">
                          <h3 className="font-display font-medium">{space.name}</h3>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>Capacity: {space.capacity}</span>
                          </Badge>
                        </div>
                        <div className="p-4">
                          <div className="mb-4">
                            <p className="text-sm mb-2">
                              <MapPin className="h-3.5 w-3.5 inline mr-1.5 text-muted-foreground" />
                              {space.location}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {space.amenities.map((amenity, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            Available Time Slots
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {space.availability.map((slot, index) => (
                              <div
                                key={index}
                                className={`p-2 rounded-md border text-sm ${
                                  slot.status === 'available'
                                    ? 'border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900'
                                    : 'border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{slot.time}</span>
                                  <Badge
                                    variant={slot.status === 'available' ? 'default' : 'outline'}
                                    className={slot.status === 'available' ? 'bg-green-500 hover:bg-green-600' : ''}
                                  >
                                    {slot.status === 'available' ? 'Available' : 'Booked'}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-end">
                            <Button>Book Space</Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
