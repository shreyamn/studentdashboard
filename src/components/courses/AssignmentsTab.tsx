
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AssignmentsTabProps {
  assignments: any[];
}

export function AssignmentsTab({ assignments }: AssignmentsTabProps) {
  return (
    <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-display font-medium">Assignments & Exams</h3>
        <Button variant="link" className="text-primary text-sm p-0 h-auto">
          View All
        </Button>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-background rounded-lg p-3 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  assignment.status === 'Completed' ? 'bg-green-100 text-green-500' :
                  assignment.status === 'In Progress' ? 'bg-amber-100 text-amber-500' :
                  'bg-blue-100 text-blue-500'
                }`}>
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    Due {new Date(assignment.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  assignment.status === 'Completed' ? 'default' :
                  assignment.status === 'In Progress' ? 'secondary' :
                  'outline'
                }
              >
                {assignment.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
