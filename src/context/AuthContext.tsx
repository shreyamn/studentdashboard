
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// User types
type UserRole = 'student' | 'faculty' | 'staff' | 'admin';

interface User {
  id: string | number;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  major?: string;
  year?: number;
  image?: string;
  chore?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole, department?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('university_hub_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('university_hub_user');
      }
    }
  }, []);

  // Sample users for demo - in a real app this would be in a database
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'student@example.com',
      role: 'student',
      department: 'Computer Science',
      major: 'Computer Science',
      year: 3,
      image: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'student2@example.com',
      role: 'student',
      department: 'Biology',
      major: 'Biology',
      year: 2,
      image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=83C5BE&color=fff'
    },
    {
      id: '3',
      name: 'Emilia Clarke',
      email: 'student3@example.com',
      role: 'student',
      department: 'Mathematics',
      major: 'Applied Mathematics',
      year: 4,
      image: 'https://ui-avatars.com/api/?name=Emilia+Clarke&background=FFDDD2&color=006D77'
    },
    {
      id: '4',
      name: 'Robert Johnson',
      email: 'student4@example.com',
      role: 'student',
      department: 'Nursing',
      major: 'Nursing Practice',
      year: 2,
      image: 'https://ui-avatars.com/api/?name=Robert+Johnson&background=E29578&color=fff'
    },
    {
      id: '5',
      name: 'Prof. Anderson',
      email: 'faculty@example.com',
      role: 'faculty',
      department: 'Computer Science',
      image: 'https://ui-avatars.com/api/?name=Prof+Anderson&background=006D77&color=fff'
    },
    {
      id: '6',
      name: 'Prof. Williams',
      email: 'faculty2@example.com',
      role: 'faculty',
      department: 'Biology',
      image: 'https://ui-avatars.com/api/?name=Prof+Williams&background=006D77&color=fff'
    },
    {
      id: '7',
      name: 'Alex Johnson',
      email: 'staff@example.com',
      role: 'staff',
      chore: 'Maintenance',
      image: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=EDF6F9&color=006D77'
    }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simple validation
      if (!email || !password) {
        toast.error('Please provide both email and password');
        return false;
      }

      // In a real app, this would be an API call
      // For demo purposes, we're using the sample users
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        // Simulate successful login
        setUser(foundUser);
        setIsAuthenticated(true);
        
        // Store user in localStorage
        localStorage.setItem('university_hub_user', JSON.stringify(foundUser));
        
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error('Invalid credentials. Try using student@example.com / faculty@example.com / staff@example.com with any password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
      return false;
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole,
    department?: string
  ): Promise<boolean> => {
    try {
      // Simple validation
      if (!name || !email || !password) {
        toast.error('Please fill in all required fields');
        return false;
      }

      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        toast.error('A user with this email already exists');
        return false;
      }

      // Create new user - in a real app, this would be an API call
      const newUser: User = {
        id: String(users.length + 1),
        name,
        email,
        role,
        department,
        image: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0D8ABC&color=fff`
      };

      // Add to users array (in a real app, this would be saved to a database)
      users.push(newUser);

      // Log user in
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Store user in localStorage
      localStorage.setItem('university_hub_user', JSON.stringify(newUser));
      
      toast.success('Registration successful! Welcome to University Hub.');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('university_hub_user');
    toast.success('You have been logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
