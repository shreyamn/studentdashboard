
export interface NotificationType {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  course: string | null;
  read: boolean;
  roles: string[];
}

// Mock notifications data with role-specific notifications
export const allNotificationsData: NotificationType[] = [
  // Student notifications
  {
    id: 1,
    title: 'Assignment Due: Research Paper',
    description: 'Your research paper for BIO 302 is due tomorrow at 11:59 PM',
    time: '2 hours ago',
    type: 'alert',
    course: 'BIO 302',
    read: false,
    roles: ['student']
  },
  {
    id: 2,
    title: 'Grade Posted: Midterm Exam',
    description: 'Your grade for the MATH 201 midterm has been posted',
    time: '1 day ago',
    type: 'info',
    course: 'MATH 201',
    read: true,
    roles: ['student']
  },
  {
    id: 3,
    title: 'Campus Alert: Building Closure',
    description: 'The Science Building will be closed for maintenance this weekend',
    time: '3 days ago',
    type: 'warning',
    course: null,
    read: true,
    roles: ['student', 'faculty', 'staff', 'admin']
  },
  {
    id: 4,
    title: 'Course Registration Open',
    description: 'Spring semester course registration is now open for all students',
    time: '4 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['student']
  },
  {
    id: 5,
    title: 'Assignment Graded: Lab Report',
    description: 'Your lab report for CHEM 110 has been graded',
    time: '5 days ago',
    type: 'success',
    course: 'CHEM 110',
    read: false,
    roles: ['student']
  },
  // Faculty notifications
  {
    id: 6,
    title: 'Grade Submission Deadline',
    description: 'Final grades for all courses must be submitted by Friday',
    time: '1 day ago',
    type: 'alert',
    course: null,
    read: false,
    roles: ['faculty']
  },
  {
    id: 7,
    title: 'Department Meeting',
    description: 'Quarterly department meeting on Thursday at 2PM in Room 301',
    time: '2 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['faculty']
  },
  {
    id: 8,
    title: 'Student Requests Office Hours',
    description: 'John Doe has requested additional office hours for BIO 302',
    time: '3 days ago',
    type: 'info',
    course: 'BIO 302',
    read: false,
    roles: ['faculty']
  },
  // Staff notifications
  {
    id: 9,
    title: 'Maintenance Request: Room 205',
    description: 'Projector repair needed in Room 205 before Monday classes',
    time: '1 day ago',
    type: 'alert',
    course: null,
    read: false,
    roles: ['staff']
  },
  {
    id: 10,
    title: 'Supply Shipment Arrived',
    description: 'New office supplies have arrived and need to be inventoried',
    time: '2 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['staff']
  },
  {
    id: 11,
    title: 'Staff Meeting',
    description: 'Monthly staff meeting on Monday at 9AM in the Conference Room',
    time: '3 days ago',
    type: 'info',
    course: null,
    read: false,
    roles: ['staff']
  },
  {
    id: 12,
    title: 'ID Card System Maintenance',
    description: 'ID card system will be offline for maintenance on Saturday',
    time: '3 days ago',
    type: 'warning',
    course: null,
    read: true,
    roles: ['staff']
  },
  // Admin notifications
  {
    id: 13,
    title: 'Budget Review Meeting',
    description: 'Annual budget review meeting scheduled for next Tuesday',
    time: '1 day ago',
    type: 'alert',
    course: null,
    read: false,
    roles: ['admin']
  },
  {
    id: 14,
    title: 'Faculty Performance Reviews Due',
    description: 'Complete all faculty performance reviews by the end of the month',
    time: '2 days ago',
    type: 'info',
    course: null,
    read: true,
    roles: ['admin']
  },
];
