
import React from 'react';
import { Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';

const EmptyNotifications: React.FC = () => {
  return (
    <Card className="text-center p-8">
      <div className="flex flex-col items-center justify-center">
        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No notifications</h2>
        <p className="text-muted-foreground">
          You don't have any notifications at this time.
        </p>
      </div>
    </Card>
  );
};

export default EmptyNotifications;
