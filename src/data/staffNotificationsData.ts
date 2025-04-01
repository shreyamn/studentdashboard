
import { Notification } from './types';

export const staffNotificationsData: Notification[] = [
  {
    id: 1,
    title: 'Maintenance Request Assigned',
    description: 'New maintenance request #4582 for Science Building has been assigned to your team.',
    time: '15 minutes ago',
    type: 'info',
  },
  {
    id: 2,
    title: 'Building Inspection Scheduled',
    description: 'Annual fire safety inspection scheduled for tomorrow at 10:00 AM in the Main Hall.',
    time: '2 hours ago',
    type: 'warning',
  },
  {
    id: 3,
    title: 'Equipment Delivery',
    description: 'New projector equipment delivery arriving at loading dock B at 2:00 PM today.',
    time: '3 hours ago',
    type: 'info',
  },
  {
    id: 4,
    title: 'Staff Meeting Reminder',
    description: 'Reminder: Facilities staff meeting tomorrow at 9:00 AM in Conference Room A.',
    time: '5 hours ago',
    type: 'info',
  },
  {
    id: 5,
    title: 'Urgent Plumbing Issue',
    description: 'Water leak reported in Computer Science Building, Room 302. Immediate attention required.',
    time: '1 day ago',
    type: 'alert',
  },
  {
    id: 6,
    title: 'Work Order Completed',
    description: 'Work order #3291 for HVAC repair has been marked as completed.',
    time: '1 day ago',
    type: 'success',
  },
  {
    id: 7,
    title: 'Safety Training Due',
    description: 'Reminder: Your annual workplace safety certification needs to be renewed within 14 days.',
    time: '2 days ago',
    type: 'warning',
  },
  {
    id: 8,
    title: 'Supply Inventory Low',
    description: 'Cleaning supplies inventory is running low. Please submit a purchase request.',
    time: '3 days ago',
    type: 'warning',
  }
];
