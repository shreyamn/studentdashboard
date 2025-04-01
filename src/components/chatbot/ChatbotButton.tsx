
import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatbot } from '@/context/ChatbotContext';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatbotButton = () => {
  const { isOpen, toggleChatbot } = useChatbot();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleChatbot}
          className="w-12 h-12 rounded-full bg-primary shadow-lg hover:bg-primary/90"
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          {isOpen ? 
            <X className="w-5 h-5 text-white" /> : 
            <MessageSquare className="w-5 h-5 text-white" />
          }
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
