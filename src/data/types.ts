
// Type definitions for the university hub app

export interface ScheduleItem {
  id: number;
  courseCode: string;
  courseName: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  type: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  progress: number;
  classroom?: string;
  department?: string;
  attendancePercentage?: number;
}

export interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  department?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface MenuItem {
  id: number;
  meal: string;
  items: string[];
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
}

export interface FacultyChore {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  department: string;
  type: string;
}

export interface StaffChore {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  department: string;
  assignedTo: string;
}
