
import React, { useEffect, useRef, useState } from 'react';
import { Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatbot } from '@/context/ChatbotContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const ChatbotInterface = () => {
  const { messages, sendMessage, isOpen } = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-border"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-primary p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage 
                src="/campus-assistant.png" 
                alt="Campus Assistant" 
              />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-white">Campus Assistant</h3>
              <p className="text-xs text-white/80">Ask me anything about your studies!</p>
            </div>
          </div>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {message.sender === 'user' ? (
                <div className="bg-primary text-white p-2 rounded-lg rounded-tr-none max-w-[80%]">
                  {message.content}
                </div>
              ) : (
                <div className="bg-secondary p-2 rounded-lg rounded-tl-none max-w-[80%]">
                  {message.content}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              autoFocus
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
