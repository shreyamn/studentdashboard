import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Headphones, FileQuestion, Phone, Mail, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CurrentDateTime } from '@/components/ui/CurrentDateTime';
import AppLayout from '@/layouts/AppLayout';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const supportResponses = [
  "Hi there! How can I help you with your university experience today?",
  "I understand that can be frustrating. Let me see what I can do to help you.",
  "Thanks for reaching out! I'd be happy to assist with your question about the course registration.",
  "That's a great question. Have you checked the student resources section in your dashboard?",
  "I'm looking into this issue for you. It's definitely something we can resolve together.",
  "I appreciate your patience. Let me connect you with the right department to get this resolved quickly.",
  "I can see why that would be concerning. Let's look at your options here.",
  "You're absolutely right to bring this up. Let me check what's happening with your account.",
  "I'm here to help make your university experience better. Let's tackle this together.",
  "Thanks for sharing that with me. I think I know exactly what might be happening here."
];

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm Sarah from student support. How can I help you today?",
    sender: 'support',
    timestamp: new Date()
  }
];

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by going to the login page and clicking 'Forgot Password'. Follow the instructions sent to your email."
  },
  {
    question: "How do I access my course materials?",
    answer: "Course materials can be accessed from your course details page. Navigate to 'Courses', select your course, and click on the 'Materials' tab."
  },
  {
    question: "When are tuition fees due?",
    answer: "Tuition fees are typically due at the beginning of each semester. Specific deadlines can be found in the Finance section of your student portal."
  },
  {
    question: "How do I join a student club?",
    answer: "You can browse available clubs in the 'Clubs' section and click 'Join' on any club you're interested in. Club membership is free and instant."
  },
  {
    question: "Where can I find the academic calendar?",
    answer: "The academic calendar is available on the university website under 'Academics'. It includes important dates like exam periods, holidays, and semester start/end dates."
  },
  {
    question: "How do I access my grades?",
    answer: "Grades can be accessed through your Dashboard or by navigating to the specific course and selecting the 'Grades' tab."
  }
];

export default function Support() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isTyping, setIsTyping] = useState(false);
  
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
  
  const handleCallSupport = () => {
    toast({
      title: "Support Call Initiated",
      description: "Sarah from student support will call you shortly.",
    });
  };
  
  const handleEmailSupport = () => {
    toast({
      title: "Email Sent",
      description: "Your inquiry has been submitted. Sarah will respond within 24 hours.",
    });
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
            Support Center
          </h1>
          <p className="text-muted-foreground">
            Get help with University Hub and connect with our support team
          </p>
          <CurrentDateTime className="mt-2" />
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${isMobile && activeTab === 'chat' ? 'hidden' : 'block'} lg:col-span-1 space-y-6`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Headphones className="mr-2 h-5 w-5" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Choose how you want to get help
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('chat')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Live Chat with Sarah
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleCallSupport}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleEmailSupport}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('faq')}
                >
                  <FileQuestion className="mr-2 h-4 w-4" />
                  View FAQ
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                  <div className="pt-4 text-sm text-muted-foreground">
                    <p>All times are in Eastern Time (ET)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs 
              defaultValue="chat" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="space-y-4 mt-4">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://ui-avatars.com/api/?name=Sarah+Support&background=6366F1&color=fff" />
                        <AvatarFallback>SU</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                        <CardDescription>
                          Student Support Specialist
                        </CardDescription>
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
              </TabsContent>
              
              <TabsContent value="faq" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileQuestion className="h-5 w-5" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Find quick answers to common questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {faqData.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium text-lg">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                        {index < faqData.length - 1 && <hr className="my-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
      
      <style jsx global>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #888;
          margin: 0 2px;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
      `}</style>
    </AppLayout>
  );
}
