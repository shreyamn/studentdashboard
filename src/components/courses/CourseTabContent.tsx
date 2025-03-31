
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssignmentsTab } from './AssignmentsTab';
import { ScheduleTab } from './ScheduleTab';
import { PlaceholderTab } from './PlaceholderTab';
import { FileText, Calendar, BookMarked, Star } from 'lucide-react';

interface CourseTabContentProps {
  selectedCourse: any;
}

export function CourseTabContent({ selectedCourse }: CourseTabContentProps) {
  if (!selectedCourse) return null;

  return (
    <Tabs defaultValue="assignments" className="mb-6">
      <TabsList className="mb-4">
        <TabsTrigger value="assignments">
          <FileText className="h-4 w-4 mr-2" />
          Assignments
        </TabsTrigger>
        <TabsTrigger value="schedule">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </TabsTrigger>
        <TabsTrigger value="materials">
          <BookMarked className="h-4 w-4 mr-2" />
          Materials
        </TabsTrigger>
        <TabsTrigger value="grades">
          <Star className="h-4 w-4 mr-2" />
          Grades
        </TabsTrigger>
      </TabsList>

      <TabsContent value="assignments" className="space-y-4">
        <AssignmentsTab assignments={selectedCourse.assignments} />
      </TabsContent>

      <TabsContent value="schedule">
        <ScheduleTab nextClass={selectedCourse.nextClass} />
      </TabsContent>

      <TabsContent value="materials">
        <PlaceholderTab 
          icon={BookMarked} 
          title="Course Materials" 
          description="Access lecture notes, readings, and learning resources" 
          buttonText="Browse Materials" 
        />
      </TabsContent>

      <TabsContent value="grades">
        <PlaceholderTab 
          icon={Star} 
          title="Grades & Feedback" 
          description="View your grades and instructor feedback" 
          buttonText="View Grades" 
        />
      </TabsContent>
    </Tabs>
  );
}
