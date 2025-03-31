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

// Student dashboard data
export const scheduleData: ScheduleItem[] = [
  {
    id: 1,
    course: 'Introduction to Computer Science',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    location: 'Room 305, Computer Science Building',
    department: 'Computer Science',
  },
  {
    id: 2,
    course: 'Calculus II',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    location: 'Room 201, Math Building',
    department: 'Mathematics',
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
    department: 'Physics',
  },
  {
    id: 5,
    course: 'Cell Biology',
    startTime: '09:30 AM',
    endTime: '11:00 AM',
    location: 'Room 203, Biology Building',
    department: 'Biology',
  },
  {
    id: 6,
    course: 'Anatomy & Physiology',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Room 105, Nursing Building',
    department: 'Nursing',
  },
];

export const coursesData: Course[] = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Alan Turing',
    progress: 75,
    department: 'Computer Science',
  },
  {
    id: 2,
    name: 'Calculus II',
    code: 'MATH202',
    instructor: 'Prof. Robert Miller',
    progress: 60,
    department: 'Mathematics',
  },
  {
    id: 3,
    name: 'Physics for Engineers',
    code: 'PHYS205',
    instructor: 'Dr. Marie Curie',
    progress: 85,
    department: 'Physics',
  },
  {
    id: 4,
    name: 'Introduction to Psychology',
    code: 'PSYC101',
    instructor: 'Dr. Sigmund Freud',
    progress: 40,
    department: 'Psychology',
  },
  {
    id: 5,
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    instructor: 'Prof. Ada Lovelace',
    progress: 65,
    department: 'Computer Science',
  },
  {
    id: 6,
    name: 'Advanced Calculus',
    code: 'MATH301',
    instructor: 'Dr. Katherine Johnson',
    progress: 55,
    department: 'Mathematics',
  },
  {
    id: 7,
    name: 'Cell Biology',
    code: 'BIO201',
    instructor: 'Dr. Francis Crick',
    progress: 70,
    department: 'Biology',
  },
  {
    id: 8,
    name: 'Nursing Fundamentals',
    code: 'NURS101',
    instructor: 'Dr. Florence Nightingale',
    progress: 80,
    department: 'Nursing',
  },
];

export const assignmentsData: Assignment[] = [
  {
    id: 1,
    title: 'Problem Set 3',
    course: 'Calculus II',
    dueDate: '2023-11-10',
    status: 'In Progress',
    department: 'Mathematics',
  },
  {
    id: 2,
    title: 'Programming Assignment 2',
    course: 'Introduction to Computer Science',
    dueDate: '2023-11-15',
    status: 'Not Started',
    department: 'Computer Science',
  },
  {
    id: 3,
    title: 'Lab Report',
    course: 'Physics for Engineers',
    dueDate: '2023-11-08',
    status: 'Completed',
    department: 'Physics',
  },
  {
    id: 4,
    title: 'Research Paper',
    course: 'Cell Biology',
    dueDate: '2023-11-20',
    status: 'Not Started',
    department: 'Biology',
  },
  {
    id: 5,
    title: 'Patient Care Plan',
    course: 'Nursing Fundamentals',
    dueDate: '2023-11-12',
    status: 'In Progress',
    department: 'Nursing',
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
