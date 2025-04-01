
import { useState, useEffect } from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  ClipboardCheck, 
  Clock, 
  Trash2, 
  Wrench, 
  Building, 
  Users, 
  Bell,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Mock maintenance tasks data
const maintenanceTasksData = [
  {
    id: 1,
    title: 'Clean Science Building Classrooms',
    location: 'Science Building, Floors 1-3',
    priority: 'High',
    status: 'In Progress',
    dueTime: '11:00 AM',
    assignedTo: 'Facilities Team A'
  },
  {
    id: 2,
    title: 'Fix Projector in Room 305',
    location: 'Computer Science Building, Room 305',
    priority: 'High',
    status: 'Not Started',
    dueTime: '02:00 PM',
    assignedTo: 'IT Support'
  },
  {
    id: 3,
    title: 'Restock Bathroom Supplies',
    location: 'Student Center, All Floors',
    priority: 'Medium',
    status: 'Not Started',
    dueTime: '04:00 PM',
    assignedTo: 'Facilities Team B'
  },
  {
    id: 4,
    title: 'Mow Main Quad Area',
    location: 'Main Quad',
    priority: 'Medium',
    status: 'Completed',
    dueTime: '10:00 AM',
    assignedTo: 'Grounds Crew'
  },
  {
    id: 5,
    title: 'Prepare Auditorium for Guest Lecture',
    location: 'Main Hall, Auditorium',
    priority: 'High',
    status: 'Not Started',
    dueTime: '05:00 PM',
    assignedTo: 'Events Staff'
  }
];

// Mock events setup data
const eventsSetupData = [
  {
    id: 1,
    title: 'Career Fair Setup',
    location: 'Student Center, Main Hall',
    date: '2025-11-15',
    setupTime: '07:00 AM',
    eventTime: '10:00 AM - 3:00 PM',
    requirements: ['30 Tables', '100 Chairs', 'Projector', 'Audio System'],
    isReady: false
  },
  {
    id: 2,
    title: 'Guest Lecture Preparation',
    location: 'Computer Science Building, Auditorium',
    date: '2025-11-20',
    setupTime: '12:00 PM',
    eventTime: '2:00 PM - 4:00 PM',
    requirements: ['Podium', 'Microphone', 'Projector', 'Water Station'],
    isReady: false
  },
  {
    id: 3,
    title: 'Student Club Meetup',
    location: 'Student Center, Room 202',
    date: '2025-11-10',
    setupTime: '4:00 PM',
    eventTime: '5:00 PM - 7:00 PM',
    requirements: ['10 Tables', '30 Chairs', 'Whiteboard'],
    isReady: false
  },
];

// Building maintenance status
const buildingStatusData = {
  'Science Building': { issuesResolved: 12, totalIssues: 15, percentage: 80 },
  'Computer Science Building': { issuesResolved: 8, totalIssues: 10, percentage: 80 },
  'Student Center': { issuesResolved: 15, totalIssues: 18, percentage: 83 },
  'Main Hall': { issuesResolved: 5, totalIssues: 7, percentage: 71 },
  'Library': { issuesResolved: 9, totalIssues: 10, percentage: 90 }
};

// Mock alerts data
const alertsData = [
  {
    id: 1,
    title: 'Water Leak',
    location: 'Library, Floor 2',
    description: 'Water leaking from ceiling in study area',
    priority: 'High',
    reportedAt: '08:15 AM',
    status: 'Assigned',
    assignedTo: 'Maintenance Team'
  },
  {
    id: 2,
    title: 'HVAC Malfunction',
    location: 'Computer Science Building, Room 201',
    description: 'Air conditioning not working, temperature rising',
    priority: 'Medium',
    reportedAt: '09:30 AM',
    status: 'Pending',
    assignedTo: null
  },
  {
    id: 3,
    title: 'Broken Window',
    location: 'Science Building, Room 105',
    description: 'Window cracked and unable to close properly',
    priority: 'Low',
    reportedAt: 'Yesterday, 4:45 PM',
    status: 'Assigned',
    assignedTo: 'Facilities Team B'
  }
];

export default function StaffDashboardContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(maintenanceTasksData);
  const [events, setEvents] = useState(eventsSetupData);
  const [alerts, setAlerts] = useState(alertsData);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  
  const handleMarkAsComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'Completed' } : task
    ));
    
    toast({
      title: "Task completed",
      description: "The task has been marked as completed",
    });
  };
  
  const handleReassign = (taskId: number) => {
    // Find the task
    const task = tasks.find(t => t.id === taskId);
    
    // Define possible teams
    const teams = [
      'Facilities Team A', 
      'Facilities Team B', 
      'IT Support', 
      'Grounds Crew', 
      'Events Staff',
      'Maintenance Team'
    ];
    
    // Filter out current team
    const availableTeams = teams.filter(team => team !== task?.assignedTo);
    
    // Randomly select a new team
    const newTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)];
    
    // Update the task
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, assignedTo: newTeam } : task
    ));
    
    toast({
      title: "Task reassigned",
      description: `The task has been reassigned to ${newTeam}`,
    });
  };

  const handleViewAll = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleMarkEventReady = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, isReady: true } : event
    ));
    
    toast({
      title: "Event marked as ready",
      description: "The event setup has been marked as ready",
    });
  };

  const handleViewBuildingIssues = (building: string) => {
    setActiveTab('buildings');
    setSelectedBuilding(building);
    
    toast({
      title: `${building} selected`,
      description: `Viewing issues for ${building}`,
    });
  };

  const handleAssignAlert = (alertId: number) => {
    // Find teams that are not at capacity
    const availableTeams = [
      'Maintenance Team',
      'Facilities Team A',
      'Facilities Team B',
      'Emergency Response Team'
    ];
    
    // Randomly select a team
    const assignedTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)];
    
    // Update alert
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'Assigned', assignedTo: assignedTeam } : alert
    ));
    
    toast({
      title: "Alert assigned",
      description: `This alert has been assigned to ${assignedTeam}`,
    });
  };

  // Count tasks by status
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const notStartedTasks = tasks.filter(task => task.status === 'Not Started').length;
  
  // Count total open building issues
  const totalOpenIssues = Object.values(buildingStatusData).reduce(
    (sum, building) => sum + (building.totalIssues - building.issuesResolved), 0
  );
  
  // Function to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  
  // Update date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{currentDateTime}</p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="tasks">Today's Tasks</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="buildings">Building Status</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Staff Dashboard</h2>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{tasks.length}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {completedTasks} completed, {inProgressTasks} in progress
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{events.length}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Requiring setup this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Building Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Wrench className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{totalOpenIssues}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Open maintenance requests</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="text-2xl font-bold">{alerts.length}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Pending attention</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Today's High Priority Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedCard delay={0.2}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-medium text-lg">High Priority Tasks</h2>
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  Urgent
                </Badge>
              </div>
              
              <div className="space-y-3">
                {tasks.filter(task => task.priority === 'High' && task.status !== 'Completed').map((task) => (
                  <div 
                    key={task.id} 
                    className="bg-background rounded-lg p-4 border border-red-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.location}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span className="mr-3">Due: {task.dueTime}</span>
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>{task.assignedTo}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkAsComplete(task.id)}
                        >
                          <ClipboardCheck className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {tasks.filter(task => task.priority === 'High' && task.status !== 'Completed').length === 0 && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-green-800 text-center">
                    <p>All high priority tasks are completed! 🎉</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={() => handleViewAll('tasks')}>
                  View all tasks
                </Button>
              </div>
            </AnimatedCard>
            
            {/* Latest Alerts */}
            <AnimatedCard delay={0.3}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-medium text-lg">Latest Alerts</h2>
                <Button variant="outline" size="sm" onClick={() => handleViewAll('alerts')}>
                  View all
                </Button>
              </div>
              
              <div className="space-y-3">
                {alerts.slice(0, 2).map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`bg-background rounded-lg p-4 border ${
                      alert.priority === 'High' ? 'border-red-200' : 
                      alert.priority === 'Medium' ? 'border-amber-200' : 
                      'border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{alert.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`ml-2 ${
                              alert.priority === 'High' ? 'bg-red-100 text-red-800 border-red-200' : 
                              alert.priority === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                              'bg-blue-100 text-blue-800 border-blue-200'
                            }`}
                          >
                            {alert.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.location}</p>
                        <p className="text-sm mt-1">{alert.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Reported: {alert.reportedAt}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant={alert.status === 'Assigned' ? 'outline' : 'secondary'} 
                        size="sm"
                        onClick={() => alert.status !== 'Assigned' && handleAssignAlert(alert.id)}
                        disabled={alert.status === 'Assigned'}
                      >
                        {alert.status === 'Assigned' ? 'Assigned' : 'Assign'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
          
          {/* Building Status Overview */}
          <AnimatedCard delay={0.4}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-medium text-lg">Building Status Overview</h2>
              <Button variant="outline" size="sm" onClick={() => handleViewAll('buildings')}>
                View details
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(buildingStatusData).map(([building, status]) => (
                <div 
                  key={building} 
                  className="bg-background rounded-lg p-3 border border-border"
                >
                  <h3 className="font-medium text-sm mb-1">{building}</h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Issues resolved</span>
                    <span className="text-xs font-medium">
                      {status.issuesResolved}/{status.totalIssues}
                    </span>
                  </div>
                  <Progress 
                    value={status.percentage} 
                    className="h-1.5" 
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2 text-xs"
                    onClick={() => handleViewBuildingIssues(building)}
                  >
                    View issues
                  </Button>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Today's Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Today's Tasks</h2>
          <AnimatedCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-medium text-lg">Maintenance Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  {tasks.filter(t => t.priority === 'High').length} High Priority
                </Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  {tasks.filter(t => t.priority === 'Medium').length} Medium Priority
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`bg-background rounded-lg p-4 border ${
                    task.status === 'Completed' 
                      ? 'border-green-200 bg-green-50' 
                      : task.priority === 'High' 
                        ? 'border-red-200' 
                        : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{task.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            task.priority === 'High' ? 'bg-red-100 text-red-800 border-red-200' : 
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                            'bg-blue-100 text-blue-800 border-blue-200'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            task.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : 
                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{task.location}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span className="mr-3">Due: {task.dueTime}</span>
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{task.assignedTo}</span>
                      </div>
                    </div>
                    
                    {task.status !== 'Completed' && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkAsComplete(task.id)}
                        >
                          <ClipboardCheck className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReassign(task.id)}
                        >
                          Reassign
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Upcoming Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
          <AnimatedCard>
            <div className="space-y-6">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className={`bg-background rounded-lg p-6 border ${
                    event.isReady ? 'border-green-200 bg-green-50' : 'border-border'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        {event.isReady && (
                          <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                            Ready
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">{event.location}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Date</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Setup Time</p>
                            <p className="text-sm text-muted-foreground">{event.setupTime}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Event Time</p>
                        <Badge variant="secondary">{event.eventTime}</Badge>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Requirements</p>
                        <div className="flex flex-wrap gap-2">
                          {event.requirements.map((req, idx) => (
                            <Badge key={idx} variant="outline">{req}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <Button 
                        onClick={() => handleMarkEventReady(event.id)}
                        disabled={event.isReady}
                      >
                        {event.isReady ? 'Ready' : 'Mark Ready'}
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Building Status Tab */}
        <TabsContent value="buildings" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {selectedBuilding ? `${selectedBuilding} Issues` : 'Building Status'}
          </h2>
          <AnimatedCard>
            <div className="grid grid-cols-1 gap-6">
              {selectedBuilding ? (
                <>
                  <div className="bg-background rounded-lg p-6 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{selectedBuilding}</h3>
                      <Button variant="outline" size="sm" onClick={() => setSelectedBuilding(null)}>
                        View All Buildings
                      </Button>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Issue Resolution Status</span>
                        <span className="font-medium">
                          {buildingStatusData[selectedBuilding].issuesResolved} / {buildingStatusData[selectedBuilding].totalIssues}
                        </span>
                      </div>
                      <Progress value={buildingStatusData[selectedBuilding].percentage} className="h-2" />
                    </div>
                    
                    <h4 className="font-medium mb-4">Active Maintenance Issues</h4>
                    
                    <div className="space-y-4">
                      {/* Show sample issues for the selected building */}
                      {[...Array(buildingStatusData[selectedBuilding].totalIssues - buildingStatusData[selectedBuilding].issuesResolved)].map((_, index) => (
                        <div key={index} className="bg-muted rounded-lg p-4 border border-border">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">
                                {['HVAC Malfunction', 'Light Fixture Repair', 'Door Lock Issue', 'Window Seal Replacement', 'Plumbing Leak'][index % 5]}
                              </h5>
                              <p className="text-sm text-muted-foreground">
                                {selectedBuilding}, Room {Math.floor(Math.random() * 400) + 100}
                              </p>
                              <div className="text-xs text-muted-foreground mt-2">
                                Reported: {index === 0 ? 'Today' : `${index + 1} days ago`}
                              </div>
                            </div>
                            <Badge variant={index === 0 ? 'destructive' : 'outline'}>
                              {index === 0 ? 'Urgent' : 'Pending'}
                            </Badge>
                          </div>
                          <div className="mt-3 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">Assign</Button>
                            <Button size="sm">Resolve</Button>
                          </div>
                        </div>
                      ))}
                      
                      {buildingStatusData[selectedBuilding].totalIssues === buildingStatusData[selectedBuilding].issuesResolved && (
                        <div className="bg-green-50 rounded-lg p-4 text-center text-green-800 border border-green-200">
                          <p>No active maintenance issues for this building! 🎉</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                Object.entries(buildingStatusData).map(([building, status]) => (
                  <div 
                    key={building} 
                    className="bg-background rounded-lg p-6 border border-border"
                  >
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{building}</h3>
                          <Badge 
                            variant="outline" 
                            className={`${
                              status.percentage >= 90 ? 'bg-green-100 text-green-800 border-green-200' : 
                              status.percentage >= 75 ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                              status.percentage >= 60 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                              'bg-red-100 text-red-800 border-red-200'
                            }`}
                          >
                            {status.percentage >= 90 ? 'Excellent' : 
                             status.percentage >= 75 ? 'Good' : 
                             status.percentage >= 60 ? 'Fair' : 
                             'Needs Attention'}
                          </Badge>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Issue Resolution Status</span>
                            <span className="font-medium">{status.issuesResolved} / {status.totalIssues}</span>
                          </div>
                          <Progress value={status.percentage} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm font-medium">Outstanding Issues</p>
                            <p className="text-lg font-bold">{status.totalIssues - status.issuesResolved}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Last Inspection</p>
                            <p className="text-sm">2 weeks ago</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <Button onClick={() => handleViewBuildingIssues(building)}>View Issues</Button>
                        <Button variant="outline">Schedule Inspection</Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Maintenance Alerts</h2>
          <AnimatedCard>
            <div className="space-y-6">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`bg-background rounded-lg p-6 border ${
                    alert.priority === 'High' ? 'border-red-200' : 
                    alert.priority === 'Medium' ? 'border-amber-200' : 
                    'border-border'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold">{alert.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            alert.priority === 'High' ? 'bg-red-100 text-red-800 border-red-200' : 
                            alert.priority === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                            'bg-blue-100 text-blue-800 border-blue-200'
                          }`}
                        >
                          {alert.priority} Priority
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            alert.status === 'Assigned' ? 'bg-green-100 text-green-800 border-green-200' : 
                            'bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mt-2">{alert.location}</p>
                      <p className="mt-4">{alert.description}</p>
                      
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Reported</p>
                            <p className="text-sm text-muted-foreground">{alert.reportedAt}</p>
                          </div>
                        </div>
                        
                        {alert.assignedTo && (
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-sm font-medium">Assigned To</p>
                              <p className="text-sm text-muted-foreground">{alert.assignedTo}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      {alert.status !== 'Assigned' ? (
                        <Button onClick={() => handleAssignAlert(alert.id)}>Assign</Button>
                      ) : (
                        <Button variant="outline" onClick={() => {
                          toast({
                            title: "Work order updated",
                            description: "The work order has been updated and sent to the team.",
                          });
                        }}>Update</Button>
                      )}
                      <Button variant="destructive">Mark Critical</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
