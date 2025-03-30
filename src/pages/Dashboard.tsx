
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/ui/PageTransition';

// Dashboard headers
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FacultyDashboardHeader from '@/components/dashboard/FacultyDashboardHeader';
import StaffDashboardHeader from '@/components/dashboard/StaffDashboardHeader';

// Dashboard content components
import StudentDashboardContent from '@/components/dashboard/StudentDashboardContent';
import FacultyDashboardContent from '@/components/dashboard/FacultyDashboardContent';
import StaffDashboardContent from '@/components/dashboard/StaffDashboardContent';

// Data
import {
  scheduleData,
  coursesData,
  assignmentsData,
  eventsData,
  cafeteriaMenuData,
  notificationsData
} from '@/data/dashboardData';

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              {/* Render different dashboard based on user role */}
              {user?.role === 'faculty' ? (
                <>
                  <FacultyDashboardHeader />
                  <FacultyDashboardContent />
                </>
              ) : user?.role === 'staff' ? (
                <>
                  <StaffDashboardHeader />
                  <StaffDashboardContent />
                </>
              ) : (
                <>
                  <DashboardHeader />
                  <StudentDashboardContent
                    scheduleData={scheduleData}
                    coursesData={coursesData}
                    assignmentsData={assignmentsData}
                    eventsData={eventsData}
                    cafeteriaMenuData={cafeteriaMenuData}
                    notificationsData={notificationsData}
                  />
                </>
              )}
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
