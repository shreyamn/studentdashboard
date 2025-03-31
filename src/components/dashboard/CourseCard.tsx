
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookMarked, MapPin, Users } from 'lucide-react';
import { Course } from '@/data/types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
          {course.classroom && (
            <p className="text-xs flex items-center text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {course.classroom}
            </p>
          )}
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
      
      {/* Add attendance percentage */}
      {course.attendancePercentage !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Attendance</span>
            <span className="text-xs font-medium">{course.attendancePercentage}%</span>
          </div>
          <Progress 
            value={course.attendancePercentage} 
            className="h-1.5 bg-secondary"
          />
        </div>
      )}
      
      <div className="mt-3 flex justify-between items-center">
        {course.classroom && (
          <Link 
            to="/map" 
            className="text-xs text-primary hover:underline flex items-center"
          >
            <MapPin className="mr-1 h-3 w-3" />
            Locate on map
          </Link>
        )}
        
        <Link 
          to="/attendance" 
          className="text-xs text-primary hover:underline flex items-center"
        >
          <Users className="mr-1 h-3 w-3" />
          Attendance
        </Link>
      </div>
    </motion.div>
  );
}
