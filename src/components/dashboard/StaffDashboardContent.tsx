
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
    date: '2023-11-15',
    setupTime: '07:00 AM',
    eventTime: '10:00 AM - 3:00 PM',
    requirements: ['30 Tables', '100 Chairs', 'Projector', 'Audio System']
  },
  {
    id: 2,
    title: 'Guest Lecture Preparation',
    location: 'Computer Science Building, Auditorium',
    date: '2023-11-20',
    setupTime: '12:00 PM',
    eventTime: '2:00 PM - 4:00 PM',
    requirements: ['Podium', 'Microphone', 'Projector', 'Water Station']
  },
  {
    id: 3,
    title: 'Student Club Meetup',
    location: 'Student Center, Room 202',
    date: '2023-11-10',
    setupTime: '4:00 PM',
    eventTime: '5:00 PM - 7:00 PM',
    requirements: ['10 Tables', '30 Chairs', 'Whiteboard']
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
    toast({
      title: "Task reassigned",
      description: "The task has been reassigned to another team",
    });
  };

  const handleViewAll = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleMarkEventReady = (eventId: number) => {
    toast({
      title: "Event marked as ready",
      description: "The event setup has been marked as ready",
    });
  };

  const handleViewBuildingIssues = (building: string) => {
    setActiveTab('buildings');
    toast({
      title: `${building} selected`,
      description: `Viewing issues for ${building}`,
    });
  };

  const handleAssignAlert = (alertId: number) => {
    toast({
      title: "Alert assigned",
      description: "This alert has been assigned to the maintenance team",
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
  
  return (
    <div className="space-y-6">
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
                  <span className="text-2xl font-bold">{eventsSetupData.length}</span>
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
                  <span className="text-2xl font-bold">{alertsData.length}</span>
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
                {alertsData.slice(0, 2).map((alert) => (
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
                      
                      <Badge 
                        variant="outline" 
                        className={`${
                          alert.status === 'Assigned' ? 'bg-green-100 text-green-800 border-green-200' : 
                          'bg-amber-100 text-amber-800 border-amber-200'
                        }`}
                      >
                        {alert.status}
                      </Badge>
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
              {eventsSetupData.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-background rounded-lg p-6 border border-border"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
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
                      <Button onClick={() => handleMarkEventReady(event.id)}>Mark Ready</Button>
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
          <h2 className="text-2xl font-bold tracking-tight">Building Status</h2>
          <AnimatedCard>
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(buildingStatusData).map(([building, status]) => (
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
                          {status.percentage}% Resolved
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <Progress 
                          value={status.percentage} 
                          className="h-2.5" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <p className="text-sm text-muted-foreground">Resolved</p>
                          <p className="text-xl font-bold text-green-600">{status.issuesResolved}</p>
                        </div>
                        
                        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-xl font-bold text-red-600">{status.totalIssues - status.issuesResolved}</p>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-blue-600">{status.totalIssues}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline">
                        View Issues
                      </Button>
                      <Button>
                        Add Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Maintenance Alerts</h2>
          <AnimatedCard>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-medium text-lg">Current Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  {alertsData.length} alerts requiring attention
                </p>
              </div>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report New Issue
              </Button>
            </div>
            
            <div className="space-y-4">
              {alertsData.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`bg-background rounded-lg p-5 border ${
                    alert.priority === 'High' ? 'border-red-200' : 
                    alert.priority === 'Medium' ? 'border-amber-200' : 
                    'border-blue-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
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
                      </div>
                      
                      <p className="text-base mb-2">{alert.description}</p>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{alert.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Reported at {alert.reportedAt}</span>
                      </div>
                      
                      {alert.assignedTo && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Assigned to {alert.assignedTo}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {alert.status === 'Pending' ? (
                        <Button onClick={() => handleAssignAlert(alert.id)}>Assign Task</Button>
                      ) : (
                        <Button variant="outline">View Details</Button>
                      )}
                      <Button variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
