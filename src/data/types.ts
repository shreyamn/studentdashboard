
// Type definitions for the university hub app

export interface ScheduleItem {
  id: number;
  courseCode?: string;
  courseName?: string;
  course?: string;
  name?: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor?: string;
  type?: string;
  department?: string;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: "student" | "faculty" | "staff";
  department?: string;
  year?: number;
  profileImage?: string;
  image?: string;
  chore?: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string | { name: string; image: string };
  progress: number;
  classroom?: string;
  department?: string;
  attendancePercentage?: number;
  credits?: number;
  schedule?: string;
  location?: string;
  status?: string;
  attendanceRate?: number;
  assignments?: any[];
  nextClass?: any;
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
  type: "info" | "success" | "warning" | "alert";
  read?: boolean;
  roles?: string[];
  course?: string;
}

export interface ComponentNotificationType {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "info" | "success" | "warning" | "alert";
  read?: boolean;
  roles?: string[];
  course?: string;
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

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfileImage?: (imageUrl: string) => void;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  presentPercentage: number;
}

export type NotificationType = ComponentNotificationType;
