
import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { faqData } from './types';

const SupportFAQ: React.FC = () => {
  return (
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
  );
};

export default SupportFAQ;
