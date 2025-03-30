
import { useAuth } from '@/context/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();
  
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
        Welcome back, {user?.name?.split(' ')[0]}
      </h1>
      <p className="text-muted-foreground">
        Here's what's happening with your academic journey today
      </p>
    </header>
  );
}
