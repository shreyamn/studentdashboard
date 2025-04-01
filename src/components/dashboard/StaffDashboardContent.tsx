
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { StaffChoresWidget } from './StaffChoresWidget';
import NotificationsWidget from './NotificationsWidget';
import { staffNotificationsData } from '@/data/staffNotificationsData';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { 
  Tool, CheckSquare, AlertTriangle, Calendar, ClipboardList, 
  Building, Settings, Map, Users, Bell
} from 'lucide-react';

export default function StaffDashboardContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const handleTaskAction = (action: string) => {
    toast.success(`${action} action initiated`);
  };
  
  const handleMaintenanceAction = (action: string) => {
    toast.success(`${action} request processed`);
  };
  
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-1">
              <ClipboardList className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center">5</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">Today's Tasks</p>
              <div className="text-xs text-muted-foreground mt-2">1 completed, 1 in progress</div>
              <Button 
                className="mt-2 w-full" 
                size={isMobile ? "sm" : "default"}
                onClick={() => handleTaskAction("View Tasks")}
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-1">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center">3</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">Upcoming Events</p>
              <div className="text-xs text-muted-foreground mt-2">Requiring setup this week</div>
              <Button 
                className="mt-2 w-full" 
                size={isMobile ? "sm" : "default"}
                onClick={() => handleTaskAction("View Events")}
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-1">
              <Tool className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center">11</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">Building Issues</p>
              <div className="text-xs text-muted-foreground mt-2">Open maintenance requests</div>
              <Button 
                className="mt-2 w-full" 
                size={isMobile ? "sm" : "default"}
                onClick={() => handleMaintenanceAction("View Maintenance")}
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-1">
              <AlertTriangle className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center">3</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">Alerts</p>
              <div className="text-xs text-muted-foreground mt-2">Pending attention</div>
              <Button 
                className="mt-2 w-full" 
                size={isMobile ? "sm" : "default"}
                onClick={() => handleTaskAction("View Alerts")}
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
        <Button variant="outline" className="h-auto py-2 md:py-4 flex flex-col items-center justify-center gap-1 md:gap-2" onClick={() => handleMaintenanceAction("New maintenance request")}>
          <Building className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">Facilities</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-2 md:py-4 flex flex-col items-center justify-center gap-1 md:gap-2" onClick={() => handleTaskAction("Schedule event")}>
          <Calendar className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">Events</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-2 md:py-4 flex flex-col items-center justify-center gap-1 md:gap-2" onClick={() => handleTaskAction("View campus map")}>
          <Map className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">Map</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-2 md:py-4 flex flex-col items-center justify-center gap-1 md:gap-2" onClick={() => handleTaskAction("Manage staff")}>
          <Users className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">Staff</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-2 md:py-4 flex flex-col items-center justify-center gap-1 md:gap-2" onClick={() => handleTaskAction("View notifications")}>
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm">Alerts</span>
        </Button>
      </div>
      
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} w-full`}>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          {!isMobile && <TabsTrigger value="notifications">Notifications</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="tasks" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <StaffChoresWidget />
            {isMobile && <NotificationsWidget notifications={staffNotificationsData} />}
          </div>
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, location: "Science Building Room 301", issue: "Broken projector", priority: "High", reporter: "Dr. Alan Turing" },
                  { id: 2, location: "Library Second Floor", issue: "Air conditioning malfunction", priority: "Medium", reporter: "Jane Smith" },
                  { id: 3, location: "Cafeteria", issue: "Leaking sink", priority: "Medium", reporter: "Food Services" },
                  { id: 4, location: "Dormitory B", issue: "Broken window", priority: "Low", reporter: "Resident Advisor" }
                ].map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1 mb-3 md:mb-0">
                      <p className="font-medium">{item.location}</p>
                      <p className="text-sm text-muted-foreground">{item.issue}</p>
                      <div className="flex items-center mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                          item.priority === "High" 
                            ? "bg-red-100 text-red-800" 
                            : item.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {item.priority}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">Reported by: {item.reporter}</span>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button size="sm" onClick={() => handleMaintenanceAction(`Assigned maintenance for ${item.location}`)}>
                        Assign
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleMaintenanceAction(`Maintenance details for ${item.location}`)}>
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsWidget notifications={staffNotificationsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
