
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookMarked } from 'lucide-react';
import { Course } from '@/data/types';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-background rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <Badge variant="outline" className="mb-2">{course.code}</Badge>
          <h3 className="font-medium">{course.name}</h3>
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
        </div>
        <BookMarked className="h-5 w-5 text-primary/70" />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{course.progress}%</span>
        </div>
        <Progress value={course.progress} className="h-1.5" />
      </div>
    </motion.div>
  );
}
