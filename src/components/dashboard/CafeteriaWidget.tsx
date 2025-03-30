
import { Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface MenuItem {
  id: number;
  meal: string;
  items: string[];
}

interface CafeteriaWidgetProps {
  menuData: MenuItem[];
}

export default function CafeteriaWidget({ menuData }: CafeteriaWidgetProps) {
  return (
    <AnimatedCard delay={0.6}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-medium text-lg">Today's Menu</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Utensils className="mr-1 h-3 w-3" /> Cafeteria
        </Badge>
      </div>
      
      <div className="space-y-3">
        {menuData.map((menuItem) => (
          <div 
            key={menuItem.id} 
            className="bg-background rounded-lg p-3 border border-border"
          >
            <h3 className="font-medium mb-2">{menuItem.meal}</h3>
            <div className="space-y-1">
              {menuItem.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/70"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
