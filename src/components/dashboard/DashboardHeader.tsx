
import { useAuth } from '@/context/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();
  const department = user?.department || "General";
  
  // Department-specific welcome messages
  const getDepartmentMessage = () => {
    switch(department) {
      case "Computer Science":
        return "Here's what's happening in your Computer Science studies today";
      case "Mathematics":
        return "Stay on top of your Mathematics courses and assignments";
      case "Business":
        return "Track your Business courses and upcoming networking opportunities";
      default:
        return "Here's what's happening with your academic journey today";
    }
  };
  
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
        Welcome back, {user?.name?.split(' ')[0]}
      </h1>
      <p className="text-muted-foreground">
        {getDepartmentMessage()}
      </p>
    </header>
  );
}
