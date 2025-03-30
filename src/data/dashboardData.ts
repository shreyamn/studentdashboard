
// Types
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
}

export interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  progress: number;
}

export interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
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

// Student dashboard data
export const scheduleData: ScheduleItem[] = [
  {
    id: 1,
    course: 'Introduction to Computer Science',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    location: 'Room 305, Computer Science Building',
  },
  {
    id: 2,
    course: 'Calculus II',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    location: 'Room 201, Math Building',
  },
  {
    id: 3,
    name: 'Lunch Break',
    startTime: '12:30 PM',
    endTime: '01:30 PM',
    location: 'Student Center Cafeteria',
  },
  {
    id: 4,
    course: 'Physics Lab',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    location: 'Lab 102, Science Building',
  },
];

export const coursesData: Course[] = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Alan Turing',
    progress: 75,
  },
  {
    id: 2,
    name: 'Calculus II',
    code: 'MATH202',
    instructor: 'Prof. Robert Miller',
    progress: 60,
  },
  {
    id: 3,
    name: 'Physics for Engineers',
    code: 'PHYS205',
    instructor: 'Dr. Marie Curie',
    progress: 85,
  },
  {
    id: 4,
    name: 'Introduction to Psychology',
    code: 'PSYC101',
    instructor: 'Dr. Sigmund Freud',
    progress: 40,
  },
];

export const assignmentsData: Assignment[] = [
  {
    id: 1,
    title: 'Problem Set 3',
    course: 'Calculus II',
    dueDate: '2023-11-10',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Programming Assignment 2',
    course: 'Introduction to Computer Science',
    dueDate: '2023-11-15',
    status: 'Not Started',
  },
  {
    id: 3,
    title: 'Lab Report',
    course: 'Physics for Engineers',
    dueDate: '2023-11-08',
    status: 'Completed',
  },
];

export const eventsData: Event[] = [
  {
    id: 1,
    title: 'Career Fair',
    location: 'Student Center, Main Hall',
    date: '2023-11-15',
    time: '10:00 AM - 3:00 PM',
  },
  {
    id: 2,
    title: 'Guest Lecture: AI Advances',
    location: 'Computer Science Building, Auditorium',
    date: '2023-11-20',
    time: '2:00 PM - 4:00 PM',
  },
  {
    id: 3,
    title: 'Student Club Meetup',
    location: 'Student Center, Room 202',
    date: '2023-11-10',
    time: '5:00 PM - 7:00 PM',
  },
];

export const cafeteriaMenuData: MenuItem[] = [
  {
    id: 1,
    meal: 'Breakfast (7:00 AM - 9:30 AM)',
    items: ['Scrambled Eggs', 'Pancakes', 'Fresh Fruit', 'Coffee/Tea'],
  },
  {
    id: 2,
    meal: 'Lunch (11:30 AM - 2:00 PM)',
    items: ['Grilled Chicken Sandwich', 'Vegetable Soup', 'Caesar Salad', 'Pasta Bar'],
  },
  {
    id: 3,
    meal: 'Dinner (5:00 PM - 8:00 PM)',
    items: ['Baked Salmon', 'Vegetable Stir-Fry', 'Mashed Potatoes', 'Ice Cream'],
  },
];

export const notificationsData: Notification[] = [
  {
    id: 1,
    title: 'Assignment Due Soon',
    description: 'Problem Set 3 for Calculus II is due tomorrow',
    time: '2 hours ago',
    type: 'warning',
  },
  {
    id: 2,
    title: 'New Course Material',
    description: 'New lecture notes uploaded for CS101',
    time: '5 hours ago',
    type: 'info',
  },
  {
    id: 3,
    title: 'Grade Posted',
    description: 'Your Physics Lab Report has been graded',
    time: '1 day ago',
    type: 'success',
  },
  {
    id: 4,
    title: 'Campus Alert',
    description: 'Library closing early at 6PM today for maintenance',
    time: '1 day ago',
    type: 'alert',
  },
];
