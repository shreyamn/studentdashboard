
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/ui/PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            {children}
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
