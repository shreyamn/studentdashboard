
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Sample attendance data structure
export interface AttendanceRecord {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

interface AttendanceContextType {
  attendanceRecords: AttendanceRecord[];
  getUserAttendance: (userId: string) => AttendanceRecord[];
  getUserAttendanceStats: (userId: string) => {
    present: number;
    absent: number;
    late: number;
    excused: number;
    total: number;
    presentPercentage: number;
  };
}

const AttendanceContext = createContext<AttendanceContext | undefined>(undefined);

// Sample attendance data
const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: '1',
    userId: '1',
    courseId: 'CS101',
    courseName: 'Introduction to Computer Science',
    date: '2023-09-01',
    status: 'present',
  },
  {
    id: '2',
    userId: '1',
    courseId: 'CS101',
    courseName: 'Introduction to Computer Science',
    date: '2023-09-03',
    status: 'present',
  },
  {
    id: '3',
    userId: '1',
    courseId: 'CS101',
    courseName: 'Introduction to Computer Science',
    date: '2023-09-05',
    status: 'absent',
  },
  {
    id: '4',
    userId: '1',
    courseId: 'MATH201',
    courseName: 'Linear Algebra',
    date: '2023-09-02',
    status: 'present',
  },
  {
    id: '5',
    userId: '1',
    courseId: 'MATH201',
    courseName: 'Linear Algebra',
    date: '2023-09-04',
    status: 'late',
  },
  {
    id: '6',
    userId: '1',
    courseId: 'MATH201',
    courseName: 'Linear Algebra',
    date: '2023-09-06',
    status: 'excused',
  },
  {
    id: '7',
    userId: '2',
    courseId: 'ENG101',
    courseName: 'English Composition',
    date: '2023-09-01',
    status: 'present',
  },
];

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Load attendance data (in a real app, this would be from an API)
    setAttendanceRecords(MOCK_ATTENDANCE);
  }, []);

  const getUserAttendance = (userId: string) => {
    return attendanceRecords.filter(record => record.userId === userId);
  };

  const getUserAttendanceStats = (userId: string) => {
    const userRecords = getUserAttendance(userId);
    const total = userRecords.length;
    
    const present = userRecords.filter(record => record.status === 'present').length;
    const absent = userRecords.filter(record => record.status === 'absent').length;
    const late = userRecords.filter(record => record.status === 'late').length;
    const excused = userRecords.filter(record => record.status === 'excused').length;
    
    const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return {
      present,
      absent,
      late,
      excused,
      total,
      presentPercentage,
    };
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendanceRecords,
        getUserAttendance,
        getUserAttendanceStats,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

type AttendanceContext = AttendanceContextType;
