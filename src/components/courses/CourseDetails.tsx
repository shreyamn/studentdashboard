
import { Calendar, BookOpen, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CourseDetailsProps {
  selectedCourse: any;
}

export function CourseDetails({ selectedCourse }: CourseDetailsProps) {
  if (!selectedCourse) return null;
  
  return (
    <div className="glass-card subtle-shadow rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{selectedCourse.code}</Badge>
            <Badge variant="secondary">{selectedCourse.credits} Credits</Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {selectedCourse.department}
            </Badge>
          </div>
          <h2 className="text-2xl font-display font-bold mb-3">
            {selectedCourse.name}
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarImage
                src={selectedCourse.instructor.image}
                alt={selectedCourse.instructor.name}
              />
              <AvatarFallback>
                {selectedCourse.instructor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">{selectedCourse.instructor.name}</div>
              <div className="text-xs text-muted-foreground">Course Instructor</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{selectedCourse.schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{selectedCourse.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="rounded-full bg-secondary p-2 flex flex-col items-center justify-center h-24 w-24">
            <div className="text-3xl font-bold text-primary">{selectedCourse.progress}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Course Materials</DropdownMenuItem>
              <DropdownMenuItem>Contact Instructor</DropdownMenuItem>
              <DropdownMenuItem>Course Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
