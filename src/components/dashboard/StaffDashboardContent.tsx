import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import StaffChoresWidget from './StaffChoresWidget';
import { staffNotificationsData } from '@/data/staffNotificationsData';
import NotificationsWidget from './NotificationsWidget';
import { useIsMobile } from '@/hooks/use-mobile';
import { Download, FileText, AlertTriangle, Calendar, BuildingIcon, ClipboardCheck } from 'lucide-react';

export default function StaffDashboardContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const handleDownloadReports = () => {
    toast.success("Reports downloaded");
  };
  
  const handleManageDocuments = () => {
    toast.success("Document management opened");
  };
  
  const handleEmergencyAlerts = () => {
    toast.success("Emergency alerts activated");
  };
  
  const handleScheduleMaintenance = () => {
    toast.success("Maintenance schedule opened");
  };

  return (
    <div className="space-y-8">
      {/* Department indicator and quick stats */}
      <div className="bg-muted/50 rounded-lg p-4 md:p-6">
        <h2 className="font-medium text-lg mb-4">
          {user?.department} Department Overview
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Buildings</p>
          </div>
          
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">37</p>
            <p className="text-sm text-muted-foreground">Staff Members</p>
          </div>
          
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">15</p>
            <p className="text-sm text-muted-foreground">Open Tickets</p>
          </div>
          
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">4</p>
            <p className="text-sm text-muted-foreground">New Alerts</p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleManageDocuments}>
          <FileText className="h-5 w-5" />
          <span className="text-sm">Manage Documents</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleEmergencyAlerts}>
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm">Emergency Alerts</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleScheduleMaintenance}>
          <Calendar className="h-5 w-5" />
          <span className="text-sm">Schedule Maintenance</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleDownloadReports}>
          <Download className="h-5 w-5" />
          <span className="text-sm">Download Reports</span>
        </Button>
      </div>
      
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2'} w-full`}>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="space-y-4">
          <StaffChoresWidget />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsWidget notifications={staffNotificationsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
