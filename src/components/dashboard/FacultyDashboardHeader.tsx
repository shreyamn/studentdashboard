
import { useAuth } from '@/context/AuthContext';

export default function FacultyDashboardHeader() {
  const { user } = useAuth();
  const department = user?.department || "General";
  
  // Department-specific welcome messages for faculty
  const getDepartmentMessage = () => {
    switch(department) {
      case "Computer Science":
        return "Here's your Computer Science teaching schedule for today";
      case "Mathematics":
        return "Check your Mathematics classes and student attendance";
      case "Business":
        return "Manage your Business lectures and upcoming office hours";
      default:
        return "Here's your teaching schedule and student information";
    }
  };
  
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
        Welcome Professor {user?.name?.split(' ')[1] || user?.name?.split(' ')[0]}
      </h1>
      <p className="text-muted-foreground">
        {getDepartmentMessage()}
      </p>
    </header>
  );
}
