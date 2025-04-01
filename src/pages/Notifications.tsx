
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { motion } from 'framer-motion';
import { Bell, Search, Filter, Trash2, CheckCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { staffNotificationsData } from '@/data/staffNotificationsData';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

export default function Notifications() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(() => {
    // Use staff notifications if the user is a staff member
    if (user?.role === 'staff') {
      return staffNotificationsData;
    }
    
    // Default notifications for other roles
    return [
      {
        id: 1,
        title: 'Assignment Deadline Extended',
        description: 'The deadline for your Data Structures assignment has been extended by 48 hours.',
        time: '2 hours ago',
        type: 'info',
      },
      {
        id: 2,
        title: 'New Course Material Available',
        description: 'New lecture slides for Introduction to Machine Learning are now available.',
        time: '1 day ago',
        type: 'success',
      },
      {
        id: 3,
        title: 'Upcoming Exam Reminder',
        description: 'Reminder: Your Calculus midterm exam is scheduled for next Monday at 10:00 AM.',
        time: '3 days ago',
        type: 'warning',
      },
      {
        id: 4,
        title: 'Campus Event: Tech Talk',
        description: 'Join us for a tech talk on AI Advancements this Friday at the Student Center.',
        time: '1 week ago',
        type: 'info',
      },
      {
        id: 5,
        title: 'Library Hours Change',
        description: 'The campus library will have extended hours during the finals week.',
        time: '1 week ago',
        type: 'info',
      },
      {
        id: 6,
        title: 'Scholarship Application Open',
        description: 'Applications for the Merit Scholarship program are now open until the end of the month.',
        time: '2 weeks ago',
        type: 'success',
      },
      {
        id: 7,
        title: 'Building Closure Notice',
        description: 'The Science Building will be closed this Saturday for maintenance.',
        time: '2 weeks ago',
        type: 'alert',
      },
      {
        id: 8,
        title: 'Tuition Payment Reminder',
        description: 'This is a reminder that your tuition payment for the next semester is due in 2 weeks.',
        time: '3 weeks ago',
        type: 'warning',
      }
    ];
  });

  // Filter notifications by type
  const filteredNotifications = notifications.filter(notification => {
    // Apply type filter
    if (filter !== 'all' && notification.type !== filter) return false;
    
    // Apply search filter to title and description
    if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !notification.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Mark all as read
  const handleMarkAllAsRead = () => {
    toast.success('All notifications marked as read');
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  // Handle notification click
  const handleNotificationClick = (id: number) => {
    toast.info(`Viewing notification details`);
  };

  // Get notification type color
  const getNotificationTypeColor = (type: string) => {
    switch(type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200'; // info
    }
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay updated with important announcements and information
          </p>
        </header>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto md:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border border-border rounded-md">
              <Button 
                variant={filter === 'all' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('all')}
                className="rounded-r-none"
              >
                All
              </Button>
              <Button 
                variant={filter === 'info' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('info')}
                className="rounded-none"
              >
                Info
              </Button>
              <Button 
                variant={filter === 'success' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('success')}
                className="rounded-none"
              >
                Success
              </Button>
              <Button 
                variant={filter === 'warning' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('warning')}
                className="rounded-none"
              >
                Warning
              </Button>
              <Button 
                variant={filter === 'alert' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('alert')}
                className="rounded-l-none"
              >
                Alert
              </Button>
            </div>
            
            <Button variant="outline" size="icon" onClick={handleMarkAllAsRead}>
              <CheckCheck className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredNotifications.length > 0 ? (
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredNotifications.map((notification) => (
              <motion.div 
                key={notification.id}
                variants={itemVariants}
                onClick={() => handleNotificationClick(notification.id)}
                className="bg-background rounded-lg p-4 border border-border cursor-pointer hover:border-primary/50 transition-colors flex items-start gap-4"
              >
                <div className={`p-2 rounded-full ${getNotificationTypeColor(notification.type)}`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                  </p>
                  <div className="mt-2">
                    <Badge 
                      variant="outline" 
                      className={`${getNotificationTypeColor(notification.type)}`}
                    >
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-muted/50 rounded-xl border border-border">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-medium mb-2">No notifications</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You don't have any notifications at the moment. Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
