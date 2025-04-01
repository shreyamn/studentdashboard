
import React from 'react';
import { AlertCircle, Bell, BookOpen, Calendar, CheckCircle, Clock, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ComponentNotificationType } from '@/data/types';

interface NotificationItemProps {
  notification: ComponentNotificationType;
  onMarkAsRead: (id: number) => void;
  onDismiss: (id: number) => void;
  onViewDetails: (notification: ComponentNotificationType) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDismiss,
  onViewDetails
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getSecondaryIcon = (notification: ComponentNotificationType) => {
    if (notification.course) {
      return <BookOpen className="h-4 w-4" />;
    }
    
    if (notification.title.toLowerCase().includes('meeting')) {
      return <Calendar className="h-4 w-4" />;
    }
    
    if (notification.title.toLowerCase().includes('assignment')) {
      return <FileText className="h-4 w-4" />;
    }
    
    return <Bell className="h-4 w-4" />;
  };

  return (
    <Card 
      className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
    >
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className={`p-2 rounded-full bg-${
          notification.type === 'alert' ? 'red' : 
          notification.type === 'warning' ? 'amber' : 
          notification.type === 'success' ? 'green' : 
          'blue'
        }-100 mr-3 shrink-0`}>
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{notification.title}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {notification.time}
            </div>
          </div>
          {notification.course && (
            <Badge variant="outline" className="mt-1">
              {notification.course}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{notification.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDismiss(notification.id)}
          >
            Dismiss
          </Button>
          {!notification.read && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onMarkAsRead(notification.id)}
            >
              Mark as read
            </Button>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(notification)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationItem;
