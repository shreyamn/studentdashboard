
import { useState, useEffect } from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ClipboardCheck, Clock, Trash2, Wrench, Building, Users, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

export default function StaffDashboardContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('maintenance');
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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Today's Tasks */}
      <div className="col-span-2">
        <AnimatedCard delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-medium text-lg">Today's Tasks</h2>
            <div className="flex space-x-2">
              <Button 
                variant={activeTab === 'maintenance' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveTab('maintenance')}
              >
                <Wrench className="mr-1 h-4 w-4" />
                Maintenance
              </Button>
              <Button 
                variant={activeTab === 'events' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveTab('events')}
              >
                <Calendar className="mr-1 h-4 w-4" />
                Events Setup
              </Button>
            </div>
          </div>
          
          {activeTab === 'maintenance' ? (
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
          ) : (
            <div className="space-y-3">
              {eventsSetupData.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-background rounded-lg p-4 border border-border"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span className="mr-3">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span className="mr-3">Setup: {event.setupTime}</span>
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>Event: {event.eventTime}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-medium">Requirements:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {event.requirements.map((req, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      Mark Ready
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedCard>
      </div>
      
      {/* Building Maintenance Status */}
      <div className="col-span-1">
        <AnimatedCard delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-medium text-lg">Building Status</h2>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Building className="mr-1 h-3 w-3" /> 5 Buildings
            </Badge>
          </div>
          
          <div className="space-y-4">
            {Object.entries(buildingStatusData).map(([building, status]) => (
              <div 
                key={building} 
                className="bg-background rounded-lg p-3 border border-border"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{building}</h3>
                  <Badge variant="outline">
                    {status.issuesResolved}/{status.totalIssues} Issues Resolved
                  </Badge>
                </div>
                <div className="mt-2">
                  <Progress 
                    value={status.percentage} 
                    className="h-1.5" 
                  />
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>
      
      {/* Stats */}
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
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
              {tasks.filter(t => t.status === 'Completed').length} completed
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
              <span className="text-2xl font-bold">
                {Object.values(buildingStatusData).reduce((sum, building) => sum + (building.totalIssues - building.issuesResolved), 0)}
              </span>
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
              <Bell className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">3</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">New maintenance alerts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
