
import React from 'react';
import { Headphones, MessageSquare, Phone, Mail, FileQuestion } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SupportContactProps {
  onTabChange: (tab: string) => void;
}

const SupportContact: React.FC<SupportContactProps> = ({ onTabChange }) => {
  const { toast } = useToast();
  
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
          onClick={() => onTabChange('chat')}
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
          onClick={() => onTabChange('faq')}
        >
          <FileQuestion className="mr-2 h-4 w-4" />
          View FAQ
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupportContact;
