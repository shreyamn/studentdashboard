
import { Notification } from './types';

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
