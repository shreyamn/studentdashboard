
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationsList from '@/components/notifications/NotificationsList';
import EmptyNotifications from '@/components/notifications/EmptyNotifications';
import { extendedNotificationsData } from '@/data/notificationsData';
import { Notification } from '@/data/types';

// Define a type that matches what the NotificationItem component expects
type ComponentNotificationType = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "info" | "success" | "warning" | "alert";
  read?: boolean;
  roles?: string[];
};

export default function Notifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    if (user) {
      // Filter notifications based on user's role
      const filteredNotifications = extendedNotificationsData.filter(notification => 
        notification.roles?.includes(user.role)
      );
      setNotifications(filteredNotifications);
    }
  }, [user]);

  // Convert our notifications to the type expected by the components
  const convertToComponentType = (notification: Notification): ComponentNotificationType => {
    return {
      ...notification,
      // Ensure type is one of the allowed values
      type: (notification.type as "info" | "success" | "warning" | "alert") || "info",
    };
  };

  const componentNotifications = notifications.map(convertToComponentType);

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification dismissed",
      description: "This notification has been removed",
    });
  };

  const handleViewDetails = (notification: ComponentNotificationType) => {
    // In a real app, this would navigate to a detail view
    // For now, we'll just show a toast with details
    toast({
      title: notification.title,
      description: notification.description,
      duration: 5000,
    });
  };

  const displayedNotifications = showAll 
    ? componentNotifications 
    : componentNotifications.slice(0, displayCount);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NotificationsHeader 
                  unreadCount={notifications.filter(n => !n.read).length}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
                
                {notifications.length === 0 ? (
                  <EmptyNotifications />
                ) : (
                  <NotificationsList
                    notifications={componentNotifications}
                    displayedNotifications={displayedNotifications}
                    showAll={showAll}
                    displayCount={displayCount}
                    onMarkAsRead={handleMarkAsRead}
                    onDismiss={handleDismiss}
                    onViewDetails={handleViewDetails}
                    setShowAll={setShowAll}
                  />
                )}
              </motion.div>
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
