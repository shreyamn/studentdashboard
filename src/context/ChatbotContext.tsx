
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Define types for our chatbot messages
export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Define the context type
type ChatbotContextType = {
  messages: MessageType[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  isOpen: boolean;
  toggleChatbot: () => void;
};

// Create the context with a default value
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// Create a provider component
export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'Hello! How can I assist you today? 😊',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        content: 'Hello! How can I assist you today? 😊',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  // Function to generate responses based on user input
  const generateResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    const name = user?.name?.split(' ')[0] || 'there';
    
    // Greeting patterns
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage === 'hey') {
      return `Hi ${name}! How can I help you today?`;
    }
    
    if (lowerCaseMessage.includes('who are you')) {
      return "I'm your student assistant chatbot! I can help with your studies, answer questions about your courses, and provide guidance. What do you need help with?";
    }
    
    // Subject help
    if (lowerCaseMessage.includes('help with math') || lowerCaseMessage.includes('math help')) {
      return "I'd be happy to help with math! What specific topic are you struggling with? Algebra, calculus, statistics?";
    }
    
    if (lowerCaseMessage.includes('calculus') || lowerCaseMessage.includes('integral')) {
      return "Calculus can be challenging! Do you need help with derivatives, integrals, or limits? I can explain the concepts or guide you through practice problems.";
    }
    
    // Course related questions
    if (lowerCaseMessage.includes('course') && lowerCaseMessage.includes('register')) {
      return "To register for courses, you should visit the Courses section in your dashboard. If you have specific questions about prerequisites or availability, I can help with those too!";
    }
    
    // Assignment questions
    if (lowerCaseMessage.includes('assignment') || lowerCaseMessage.includes('homework')) {
      return "Need help with an assignment? While I can't complete it for you, I can definitely guide you through the process. What subject is it for?";
    }
    
    // Exam preparation
    if (lowerCaseMessage.includes('exam') || lowerCaseMessage.includes('test')) {
      return "Preparing for exams? Make sure to create a study schedule, review your notes regularly, and practice with previous exam questions. Would you like me to suggest more specific study strategies?";
    }
    
    // Motivational responses
    if (lowerCaseMessage.includes('fail') || lowerCaseMessage.includes('stressed') || lowerCaseMessage.includes('worried')) {
      return "It's normal to feel stressed about your studies. Remember that challenges are opportunities to grow! Take breaks when needed, focus on one task at a time, and don't hesitate to ask for help from your instructors. You've got this! 💪";
    }
    
    // Fun/casual
    if (lowerCaseMessage.includes('joke')) {
      const jokes = [
        "Why was the math book sad? Because it had too many problems! 😄",
        "What did one wall say to the other wall? I'll meet you at the corner! 😆",
        "Why did the student bring a ladder to the library? Because they wanted to check out the higher education! 📚",
        "What's a computer's favorite snack? Microchips! 💻"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Department-specific responses
    if (user?.department) {
      if (user.department === "Computer Science" && lowerCaseMessage.includes('programming')) {
        return "Programming is a key skill in Computer Science! Are you working with a specific language? I can recommend resources for Python, Java, or web development.";
      }
      if (user.department === "Mathematics" && lowerCaseMessage.includes('theorem')) {
        return "Mathematics is all about theorems and proofs! Which specific theorem are you studying? I can help explain the underlying concepts.";
      }
      if (user.department === "Business" && lowerCaseMessage.includes('marketing')) {
        return "Marketing is a fascinating field in Business studies! Are you looking at traditional marketing or digital strategies? I can point you to some case studies.";
      }
    }
    
    // Default responses
    const defaultResponses = [
      "I'm here to help! Could you provide more details about your question?",
      "That's an interesting question. Can you tell me more about what you're looking for?",
      "I'd like to help you with that. Could you elaborate a bit more?",
      "I'm not sure I fully understand. Could you rephrase your question?",
      "Thanks for your question! Let me know if you need specific information about your courses, assignments, or campus resources."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response with slight delay to simulate thinking
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        sendMessage,
        clearMessages,
        isOpen,
        toggleChatbot,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

// Create a custom hook for using the chatbot context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
