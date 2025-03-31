
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

interface CourseListProps {
  filteredCourses: any[];
  selectedCourse: any;
  setSelectedCourse: (course: any) => void;
}

export function CourseList({ filteredCourses, selectedCourse, setSelectedCourse }: CourseListProps) {
  return (
    <div className="lg:col-span-1 space-y-5">
      <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display font-medium">Enrolled Courses</h2>
          <Badge className="ml-2">{filteredCourses.length}</Badge>
        </div>
        <div className="p-2 max-h-[600px] overflow-y-auto">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCourse(course)}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                  selectedCourse?.id === course.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-secondary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{course.code}</Badge>
                  <Badge
                    variant={course.status === 'Completed' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {course.status}
                  </Badge>
                </div>
                <h3 className="font-medium mt-2 mb-1">{course.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5 mr-1" />
                  {course.instructor.name}
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
                
                {/* Add attendance section */}
                {course.attendanceRate !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Attendance
                      </span>
                      <span className="text-xs font-medium">{course.attendanceRate}%</span>
                    </div>
                    <Progress value={course.attendanceRate} className="h-1.5" />
                    <div className="mt-1 text-right">
                      <Link 
                        to="/attendance" 
                        className="text-xs text-primary hover:underline inline-flex items-center"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              No courses found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
