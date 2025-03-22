
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

const AnimatedCard = ({
  children,
  className = '',
  delay = 0,
  hover = true,
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      whileHover={
        hover
          ? {
              y: -5,
              transition: { duration: 0.3, ease: 'easeOut' },
            }
          : undefined
      }
      className={cn(
        'rounded-xl overflow-hidden glass-card subtle-shadow p-6',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
