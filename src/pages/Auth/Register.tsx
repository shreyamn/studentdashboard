
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Briefcase, HelpingHand } from 'lucide-react';
import { User } from '@/data/types';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'faculty' | 'staff'>('student');
  const [major, setMajor] = useState('');
  const [chore, setChore] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate email based on name and role
  const generateEmail = () => {
    if (!name) return '';
    
    const nameParts = name.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    
    const uniqueId = Math.floor(1000 + Math.random() * 9000);
    
    switch(role) {
      case 'student':
        return `${firstName}.${lastName}${uniqueId}@university.edu`;
      case 'faculty':
        return `${firstName}.${lastName}@faculty.university.edu`;
      case 'staff':
        return `${firstName}.${lastName}@staff.university.edu`;
      default:
        return `${firstName}.${lastName}${uniqueId}@university.edu`;
    }
  };
  
  const email = generateEmail();
  
  // Available majors for students and faculty
  const majors = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Nursing', label: 'Nursing' }
  ];
  
  // Available chore types for staff
  const choreTypes = [
    { value: 'Events', label: 'Events Management' },
    { value: 'Cleaning', label: 'Cleaning and Maintenance' },
    { value: 'Security', label: 'Security' },
    { value: 'Food Services', label: 'Food Services' },
    { value: 'Facilities', label: 'Facilities Management' }
  ];
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let userData: Partial<User> & { password: string } = {
        name,
        email,
        password,
        role
      };
      
      if (role === 'student' || role === 'faculty') {
        userData.department = major;
      } else if (role === 'staff') {
        userData.chore = chore;
      }
      
      // Register user
      await register(userData);
      
      toast.success("Registration successful!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-muted-foreground">
              Join the university hub to access all your campus resources
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                type="text" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email" 
                value={email}
                readOnly
                className="w-full bg-gray-50"
              />
              <p className="text-xs text-muted-foreground">
                Your email is generated automatically based on your name and role
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Create a secure password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label>I am a...</Label>
              <RadioGroup 
                value={role} 
                onValueChange={setRole}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-2 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex items-center cursor-pointer">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-2 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="faculty" id="faculty" />
                  <Label htmlFor="faculty" className="flex items-center cursor-pointer">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Faculty
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-2 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="staff" id="staff" />
                  <Label htmlFor="staff" className="flex items-center cursor-pointer">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Staff
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Conditional field based on role */}
            {(role === 'student' || role === 'faculty') && (
              <div className="space-y-2">
                <Label htmlFor="major">
                  {role === 'student' ? 'Select Major' : 'Department You Teach'}
                </Label>
                <Select value={major} onValueChange={setMajor} required>
                  <SelectTrigger>
                    <SelectValue placeholder={role === 'student' ? 'Choose your major' : 'Choose your department'} />
                  </SelectTrigger>
                  <SelectContent>
                    {majors.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {role === 'staff' && (
              <div className="space-y-2">
                <Label htmlFor="chore">Select Department</Label>
                <Select value={chore} onValueChange={setChore} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your department" />
                  </SelectTrigger>
                  <SelectContent>
                    {choreTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !name || !password || (role === 'student' && !major) || (role === 'faculty' && !major) || (role === 'staff' && !chore)}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
