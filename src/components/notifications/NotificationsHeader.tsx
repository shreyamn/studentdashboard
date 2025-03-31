
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead
}) => {
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  
  // Role-specific notification messages
  const getRoleSpecificMessage = () => {
    switch(userRole) {
      case 'faculty':
        return "Faculty notifications";
      case 'staff':
        return "Staff alerts and notifications";
      default:
        return "You have notifications from your courses and campus events";
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          {unreadCount > 0 
            ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
            : getRoleSpecificMessage()
          }
        </p>
      </div>
      {unreadCount > 0 && (
        <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
          Mark all as read
        </Button>
      )}
    </motion.div>
  );
};

export default NotificationsHeader;
