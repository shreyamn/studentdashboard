
import { toast } from 'sonner';

interface DepartmentToggleProps {
  showAllCourses: boolean;
  toggleShowAllCourses: () => void;
}

export function DepartmentToggle({ showAllCourses, toggleShowAllCourses }: DepartmentToggleProps) {
  const handleToggle = () => {
    toggleShowAllCourses();
    toast(showAllCourses ? "Showing your department courses" : "Showing all courses");
  };

  return (
    <div className="mb-4 flex justify-end">
      <button
        onClick={handleToggle}
        className="text-sm font-medium text-primary hover:underline"
      >
        {showAllCourses ? "Show only my department courses" : "Show all courses"}
      </button>
    </div>
  );
}
