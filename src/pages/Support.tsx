
import React from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, MessageSquare, FileQuestion, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const supportOptions = [
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'Live Chat',
    description: 'Connect with a support agent in real-time',
    action: 'Start Chat',
  },
  {
    icon: <FileQuestion className="h-8 w-8 text-primary" />,
    title: 'Knowledge Base',
    description: 'Find answers to common questions',
    action: 'Browse Articles',
  },
  {
    icon: <Phone className="h-8 w-8 text-primary" />,
    title: 'Phone Support',
    description: 'Call us directly for immediate assistance',
    action: 'View Phone Numbers',
  },
];

const faqItems = [
  {
    question: 'How do I reset my campus account password?',
    answer: 'You can reset your password by visiting the account settings page and clicking on "Reset Password". Follow the instructions sent to your email.',
  },
  {
    question: 'Where can I find my class schedule?',
    answer: 'Your class schedule is available in the Courses section. Click on "Courses" in the sidebar, then select "My Schedule".',
  },
  {
    question: 'How do I access campus WiFi?',
    answer: 'Connect to the "Campus-WiFi" network and enter your student ID and password when prompted.',
  },
];

export default function Support() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="container mx-auto py-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-6">Support Center</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {supportOptions.map((option, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center pb-2 space-y-0">
                      {option.icon}
                      <div className="ml-4">
                        <CardTitle>{option.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{option.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        {option.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="mr-2 h-5 w-5" />
                      Contact Us
                    </CardTitle>
                    <CardDescription>
                      Fill out the form and we'll get back to you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <Input placeholder="Your Name" />
                      </div>
                      <div>
                        <Input placeholder="Email Address" type="email" />
                      </div>
                      <div>
                        <Input placeholder="Subject" />
                      </div>
                      <div>
                        <Textarea placeholder="How can we help?" rows={4} />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Submit Request</Button>
                  </CardFooter>
                </Card>
                
                {/* FAQ Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileQuestion className="mr-2 h-5 w-5" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Quick answers to common questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqItems.map((item, index) => (
                        <div key={index}>
                          <h3 className="font-medium">{item.question}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.answer}
                          </p>
                          {index < faqItems.length - 1 && (
                            <Separator className="my-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All FAQs
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8 bg-muted rounded-lg p-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Support hours: Monday - Friday, 8:00 AM - 8:00 PM | Weekend: 10:00 AM - 4:00 PM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
