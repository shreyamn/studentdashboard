
import React from 'react';
import { Calendar, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { facultyChoresData } from '@/data/facultyChoresData';

export default function FacultyChoresWidget() {
  const { user } = useAuth();
  
  // Filter chores based on user's department
  const filteredChores = facultyChoresData.filter(chore => 
    chore.department === user?.department || chore.department === 'All Departments'
  );
  
  // Sort by priority and deadline
  const sortedChores = [...filteredChores].sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (a.priority !== 'High' && b.priority === 'High') return 1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  return (
    <div className="glass-card subtle-shadow rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Faculty Responsibilities</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Calendar className="mr-1 h-3 w-3" /> {sortedChores.length} Tasks
        </Badge>
      </div>
      
      <div className="space-y-3">
        {sortedChores.slice(0, 4).map((chore) => (
          <div 
            key={chore.id} 
            className="bg-background rounded-lg p-4 border border-border"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{chore.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 ${getPriorityColor(chore.priority)}`}
                  >
                    {chore.priority}
                  </Badge>
                </div>
                <p className="text-sm mt-1">{chore.description}</p>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Due: {new Date(chore.deadline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                  
                  {chore.department !== 'All Departments' && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {chore.department}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {sortedChores.length > 4 && (
          <Button variant="outline" className="w-full mt-2">
            View all {sortedChores.length} tasks
          </Button>
        )}
        
        {sortedChores.length === 0 && (
          <div className="text-center p-4 text-muted-foreground">
            No current tasks for your department.
          </div>
        )}
      </div>
    </div>
  );
}
