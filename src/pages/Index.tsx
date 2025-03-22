
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Index() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <div className="container mx-auto py-24 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl font-display font-bold tracking-tight mb-6">
                Welcome to Campus App
              </h1>
              <p className="text-xl text-muted-foreground mb-10">
                Your all-in-one platform for managing your campus life
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">Create Account</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
