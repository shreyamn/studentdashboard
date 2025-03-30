
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead
}) => {
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
          You have {unreadCount} unread notifications
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
        Mark all as read
      </Button>
    </motion.div>
  );
};

export default NotificationsHeader;
