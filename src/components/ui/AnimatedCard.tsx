
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  hoverEffect?: boolean;
}

export default function AnimatedCard({ 
  children, 
  delay = 0, 
  className,
  hoverEffect = true
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(className)}
    >
      <Card className="h-full overflow-hidden">
        <div className="p-5 h-full">{children}</div>
      </Card>
    </motion.div>
  );
}
