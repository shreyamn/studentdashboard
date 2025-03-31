import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'staff' | 'admin';
  department?: string;
  year?: number;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string, 
    email: string, 
    password: string, 
    role: 'student' | 'faculty' | 'staff'
  ) => Promise<void>;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@university.edu',
    password: 'password123',
    role: 'student',
    department: 'Computer Science',
    year: 3,
    profileImage: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@university.edu',
    password: 'password123',
    role: 'faculty',
    department: 'Mathematics',
    profileImage: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@university.edu',
    password: 'password123',
    role: 'staff',
    department: 'Facilities Management',
    profileImage: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'CS Student',
    email: 'usernameCS@edu.in',
    password: 'password123',
    role: 'student',
    department: 'Computer Science',
    year: 2,
    profileImage: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    name: 'Math Student',
    email: 'usernameM@edu.in',
    password: 'password123',
    role: 'student',
    department: 'Mathematics',
    year: 3,
    profileImage: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '6',
    name: 'Biology Student',
    email: 'usernameB@edu.in',
    password: 'password123',
    role: 'student',
    department: 'Biology',
    year: 2,
    profileImage: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: '7',
    name: 'Nursing Student',
    email: 'usernameN@edu.in',
    password: 'password123',
    role: 'student',
    department: 'Nursing',
    year: 1,
    profileImage: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: '8',
    name: 'CS Professor',
    email: 'usernamefacultyCS@edu.in',
    password: 'password123',
    role: 'faculty',
    department: 'Computer Science',
    profileImage: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: '9',
    name: 'Math Professor',
    email: 'usernamefacultyM@edu.in',
    password: 'password123',
    role: 'faculty',
    department: 'Mathematics',
    profileImage: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '10',
    name: 'Biology Professor',
    email: 'usernamefacultyB@edu.in',
    password: 'password123',
    role: 'faculty',
    department: 'Biology',
    profileImage: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: '11',
    name: 'Nursing Professor',
    email: 'usernamefacultyN@edu.in',
    password: 'password123',
    role: 'faculty',
    department: 'Nursing',
    profileImage: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '12',
    name: 'Cleaning Staff',
    email: 'usernamestaffC@edu.in',
    password: 'password123',
    role: 'staff',
    department: 'Facilities Management - Cleaning',
    profileImage: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '13',
    name: 'Events Staff',
    email: 'usernamestaffE@edu.in',
    password: 'password123',
    role: 'staff',
    department: 'Events Management',
    profileImage: 'https://i.pravatar.cc/150?img=13',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('campusAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (user) {
          // Remove the password before storing user data
          const { password, ...userWithoutPassword } = user;
          setUser(userWithoutPassword as User);
          localStorage.setItem('campusAppUser', JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'student' | 'faculty' | 'staff'
  ) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        
        if (existingUser) {
          setIsLoading(false);
          reject(new Error('User with this email already exists'));
          return;
        }
        
        // Create new user (in a real app, this would be done server-side)
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          role,
          department: role === 'staff' ? 'Facilities Management' : 
                      role === 'faculty' ? 'General Faculty' : 'General Studies',
          profileImage: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        };
        
        // Set as current user
        setUser(newUser);
        localStorage.setItem('campusAppUser', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        profileImage: imageUrl
      };
      setUser(updatedUser);
      localStorage.setItem('campusAppUser', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusAppUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
