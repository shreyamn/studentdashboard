
// Common types used across dashboard data files
export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "warning" | "info" | "success" | "alert";
}

export interface ScheduleItem {
  id: number;
  course?: string;
  name?: string;
  startTime: string;
  endTime: string;
  location: string;
  department?: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  progress: number;
  department?: string;
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
  location: string;
  date: string;
  time: string;
}

export interface MenuItem {
  id: number;
  meal: string;
  items: string[];
}
