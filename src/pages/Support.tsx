
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrentDateTime } from '@/components/ui/CurrentDateTime';
import AppLayout from '@/layouts/AppLayout';
import { useIsMobile } from '@/hooks/use-mobile';
import SupportChat from '@/components/support/SupportChat';
import SupportFAQ from '@/components/support/SupportFAQ';
import SupportContact from '@/components/support/SupportContact';
import SupportHours from '@/components/support/SupportHours';
import '@/components/support/typing-animation.css';

export default function Support() {
  const [activeTab, setActiveTab] = useState('chat');
  const isMobile = useIsMobile();

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
            <SupportContact onTabChange={setActiveTab} />
            <SupportHours />
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
                <SupportChat />
              </TabsContent>
              
              <TabsContent value="faq" className="space-y-4 mt-4">
                <SupportFAQ />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
