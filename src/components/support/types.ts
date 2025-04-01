
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export const supportResponses = [
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

export const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm Sarah from student support. How can I help you today?",
    sender: 'support',
    timestamp: new Date()
  }
];

export const faqData = [
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
