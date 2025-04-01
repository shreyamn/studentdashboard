
import { Notification, ComponentNotificationType } from './types';

// Export notification data for student dashboard
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

// Export all notifications for the notifications page
export const allNotificationsData: Notification[] = [
  ...notificationsData,
  {
    id: 5,
    title: 'Tuition Payment Due',
    description: 'Your tuition payment for the current semester is due in 3 days',
    time: '2 days ago',
    type: 'warning',
  },
  {
    id: 6,
    title: 'Event Registration Open',
    description: 'Registration for the Spring Career Fair is now open',
    time: '3 days ago',
    type: 'info',
  },
  {
    id: 7,
    title: 'Campus Survey',
    description: 'Please complete the annual student satisfaction survey',
    time: '5 days ago',
    type: 'info',
  },
];

// Extended notifications data with additional fields for the Notifications page
export const extendedNotificationsData: ComponentNotificationType[] = allNotificationsData.map(notification => ({
  ...notification,
  course: notification.id % 3 === 0 ? 'CS101' : (notification.id % 2 === 0 ? 'MATH202' : null),
  read: false,
  roles: ['student', 'faculty', 'staff'],
}));
