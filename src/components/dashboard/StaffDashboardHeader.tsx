
import { useAuth } from '@/context/AuthContext';

export default function StaffDashboardHeader() {
  const { user } = useAuth();
  
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
        Welcome {user?.name}
      </h1>
      <p className="text-muted-foreground">
        Here's your staff tasks and campus maintenance schedule for today
      </p>
    </header>
  );
}
