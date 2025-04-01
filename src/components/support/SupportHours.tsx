
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SupportHours: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>8:00 AM - 7:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday:</span>
            <span>9:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday:</span>
            <span>Closed</span>
          </div>
          <div className="pt-4 text-sm text-muted-foreground">
            <p>All times are in Eastern Time (ET)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportHours;
