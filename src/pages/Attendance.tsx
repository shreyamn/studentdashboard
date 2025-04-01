
// Assuming this is the file to create - I'm creating a minimal version that fixes the TypeScript errors
import React from 'react';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { useAttendance } from '@/context/AttendanceContext';

export default function Attendance() {
  const { user } = useAuth();
  const { getUserAttendanceStats } = useAttendance();
  
  const renderContent = () => {
    if (!user) {
      return <div>Please log in to view attendance</div>;
    }
    
    // Make sure we pass strings, not numbers
    const stats = getUserAttendanceStats(user.id.toString());
    
    return (
      <div>
        <h1>Attendance</h1>
        <div>
          <p>Present: {stats.present}</p>
          <p>Absent: {stats.absent}</p>
          <p>Attendance Rate: {stats.presentPercentage}%</p>
        </div>
      </div>
    );
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              {renderContent()}
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
