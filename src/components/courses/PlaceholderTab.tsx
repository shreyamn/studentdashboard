
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaceholderTabProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
}

export function PlaceholderTab({ icon: Icon, title, description, buttonText }: PlaceholderTabProps) {
  return (
    <div className="glass-card subtle-shadow rounded-xl p-6 flex items-center justify-center text-muted-foreground h-60">
      <div className="text-center">
        <Icon className="h-12 w-12 mx-auto mb-3 text-primary/70" />
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="max-w-md mx-auto mb-4">
          {description}
        </p>
        <Button>{buttonText}</Button>
      </div>
    </div>
  );
}
