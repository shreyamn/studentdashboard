
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
}

interface AssignmentsWidgetProps {
  assignmentsData: Assignment[];
}

export default function AssignmentsWidget({ assignmentsData }: AssignmentsWidgetProps) {
  return (
    <AnimatedCard delay={0.2}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Assignments Due Soon</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <FileText className="mr-1 h-3 w-3" /> {assignmentsData.length} Tasks
        </Badge>
      </div>
      
      <div className="space-y-3">
        {assignmentsData.map((assignment) => (
          <div 
            key={assignment.id} 
            className="bg-background rounded-lg p-3 border border-border flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{assignment.title}</h3>
              <p className="text-sm text-muted-foreground">{assignment.course}</p>
            </div>
            <div className="text-right">
              <Badge 
                variant={
                  assignment.status === 'In Progress' 
                    ? 'secondary' 
                    : 'outline'
                }
                className="mb-1"
              >
                {assignment.status}
              </Badge>
              <p className="text-xs text-muted-foreground">
                Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
