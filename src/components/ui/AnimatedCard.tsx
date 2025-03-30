
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedCard({ children, delay = 0, className }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      <Card className="h-full">
        <div className="p-5 h-full">{children}</div>
      </Card>
    </motion.div>
  );
}
