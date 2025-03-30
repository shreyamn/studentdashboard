
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationItem, { NotificationType } from './NotificationItem';

interface NotificationsListProps {
  notifications: NotificationType[];
  displayedNotifications: NotificationType[];
  showAll: boolean;
  displayCount: number;
  onMarkAsRead: (id: number) => void;
  onDismiss: (id: number) => void;
  onViewDetails: (notification: NotificationType) => void;
  setShowAll: (showAll: boolean) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  displayedNotifications,
  showAll,
  displayCount,
  onMarkAsRead,
  onDismiss,
  onViewDetails,
  setShowAll
}) => {
  return (
    <div className="space-y-4">
      {displayedNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDismiss={onDismiss}
          onViewDetails={onViewDetails}
        />
      ))}

      {!showAll && notifications.length > displayCount ? (
        <Button 
          variant="outline" 
          className="w-full mt-4" 
          onClick={() => setShowAll(true)}
        >
          View all notifications
          <Bell className="ml-2 h-4 w-4" />
        </Button>
      ) : notifications.length > displayCount && (
        <Button 
          variant="outline" 
          className="w-full mt-4" 
          onClick={() => setShowAll(false)}
        >
          Show fewer notifications
        </Button>
      )}
    </div>
  );
};

export default NotificationsList;
