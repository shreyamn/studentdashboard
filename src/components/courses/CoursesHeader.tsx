
import { SearchIcon, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CoursesHeaderProps {
  department?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CoursesHeader({ department, searchQuery, setSearchQuery }: CoursesHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
            Your {department} Courses
          </h1>
          <p className="text-muted-foreground">
            Manage your enrolled courses and track your academic progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full md:w-[280px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
