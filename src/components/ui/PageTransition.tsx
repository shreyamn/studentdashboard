
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
