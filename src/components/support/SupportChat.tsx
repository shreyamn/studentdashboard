
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Message, supportResponses, initialMessages } from './types';

const SupportChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
      
      const supportName = user?.name ? `, ${user.name.split(' ')[0]}` : '';
      const personalizedResponse = randomResponse.replace('Hi there!', `Hi there${supportName}!`);
      
      const supportMessage: Message = {
        id: messages.length + 2,
        text: personalizedResponse,
        sender: 'support',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, supportMessage]);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://ui-avatars.com/api/?name=Sarah+Support&background=6366F1&color=fff" />
            <AvatarFallback>SU</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Sarah Johnson</h3>
            <p className="text-sm text-muted-foreground">
              Student Support Specialist
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.sender === 'support' && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Sarah+Support&background=6366F1&color=fff" />
                      <AvatarFallback>SU</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src={user?.image || "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-2">
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="https://ui-avatars.com/api/?name=Sarah+Support&background=6366F1&color=fff" />
                    <AvatarFallback>SU</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="typing-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} type="submit">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportChat;
