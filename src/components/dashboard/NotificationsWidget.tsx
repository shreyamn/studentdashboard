
import { Link } from 'react-router-dom';
import { Bell, BookOpen, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'warning' | 'success' | 'info';
}

interface NotificationsWidgetProps {
  notificationsData: Notification[];
}

export default function NotificationsWidget({ notificationsData }: NotificationsWidgetProps) {
  return (
    <AnimatedCard delay={0.5} className="col-span-1 md:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Recent Notifications</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Bell className="mr-1 h-3 w-3" /> {notificationsData.length} New
        </Badge>
      </div>
      
      <div className="space-y-3">
        {notificationsData.map((notification) => (
          <div 
            key={notification.id} 
            className="bg-background rounded-lg p-3 border border-border flex items-start gap-3"
          >
            <div className={`p-2 rounded-full bg-${
              notification.type === 'warning' ? 'amber' : 
              notification.type === 'success' ? 'green' : 
              'blue'
            }-100 text-${
              notification.type === 'warning' ? 'amber' : 
              notification.type === 'success' ? 'green' : 
              'blue'
            }-500`}>
              {notification.type === 'warning' ? (
                <Bell className="h-4 w-4" />
              ) : notification.type === 'success' ? (
                <BookOpen className="h-4 w-4" />
              ) : (
                <Bell className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{notification.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-4">
          <Button variant="link" className="text-primary text-sm font-medium hover:underline flex items-center mx-auto">
            <Link to="/notifications" className="flex items-center">
              View all notifications
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
}
