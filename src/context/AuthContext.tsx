
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, AuthContextType } from '@/data/types';

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: 'John Student',
    email: 'john.student@university.edu',
    role: 'student',
    department: 'Computer Science',
    image: 'https://picsum.photos/id/1005/200',
    profileImage: 'https://picsum.photos/id/1005/200',
    year: 2
  },
  {
    id: "2",
    name: 'Emma Faculty',
    email: 'emma.faculty@faculty.university.edu',
    role: 'faculty',
    department: 'Computer Science',
    image: 'https://picsum.photos/id/1011/200',
    profileImage: 'https://picsum.photos/id/1011/200'
  },
  {
    id: "3",
    name: 'Mike Staff',
    email: 'mike.staff@staff.university.edu',
    role: 'staff',
    chore: 'Events',
    image: 'https://picsum.photos/id/1012/200',
    profileImage: 'https://picsum.photos/id/1012/200'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('university_hub_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    // In a real app, you'd verify password here
    // For demo, we'll accept any password
    
    // Save to local storage
    localStorage.setItem('university_hub_user', JSON.stringify(foundUser));
    
    // Update state
    setUser(foundUser);
    setIsAuthenticated(true);
    
    return Promise.resolve();
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('university_hub_user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  // Register function
  const register = async (userData: Partial<User> & { password: string }) => {
    // Check if email exists
    const emailExists = mockUsers.some(
      u => u.email?.toLowerCase() === userData.email?.toLowerCase()
    );
    
    if (emailExists) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'student',
      ...(userData.department && { department: userData.department }),
      ...(userData.chore && { chore: userData.chore }),
      profileImage: 'https://picsum.photos/id/1019/200', // Default profile image
      image: 'https://picsum.photos/id/1019/200' // Default profile image
    };
    
    // In a real app, you'd save to database and hash password
    // For demo, we'll just add to mock data
    mockUsers.push(newUser);
    
    // Save to local storage & update state
    localStorage.setItem('university_hub_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    
    return Promise.resolve();
  };
  
  // Update profile image
  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: imageUrl, image: imageUrl };
      setUser(updatedUser);
      localStorage.setItem('university_hub_user', JSON.stringify(updatedUser));
    }
  };
  
  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfileImage
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
