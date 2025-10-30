
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { COURSE_MODULES } from './constants';
import { CourseModule, Message } from './types';
import { getTutorResponseStream, startNewChat } from './services/geminiService';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Welcome message when the app loads
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Welcome to your interactive graphic design course! I am your AI Tutor. Please select a module from the left to begin your lesson.',
      },
    ]);
  }, []);

  const handleSelectModule = (module: CourseModule) => {
    setSelectedModule(module);
    setIsSidebarOpen(false);
    startNewChat(); // Reset chat session context for the new module

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: `Let's start the lesson on "${module.title}".`,
    };
    
    // Reset messages for the new module topic
    setMessages([
        {
            id: 'welcome-reset',
            sender: 'bot',
            text: 'Welcome to your interactive graphic design course! I am your AI Tutor. Please select a module from the left to begin your lesson.',
        },
        userMessage
    ]);

    setIsLoading(true);

    // Stream the response for the selected module
    streamResponse(`Please provide a comprehensive lesson on "${module.title}: ${module.description}".`);
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    streamResponse(text);
  };

  const streamResponse = async (prompt: string) => {
      let botResponse = '';
      const botMessageId = `bot-${Date.now()}`;
      setMessages((prev) => [
          ...prev,
          { id: botMessageId, sender: 'bot', text: '' },
      ]);

      try {
          // Fix: Use the async generator from the service.
          const stream = getTutorResponseStream(prompt);
          for await (const chunk of stream) {
              botResponse += chunk;
              setMessages((prev) =>
                  prev.map((msg) =>
                      msg.id === botMessageId ? { ...msg, text: botResponse } : msg
                  )
              );
          }
      } catch (error) {
          console.error("Error streaming response:", error);
          setMessages((prev) =>
              prev.map((msg) =>
                  msg.id === botMessageId
                      ? { ...msg, text: "Sorry, I encountered an error. Please try again." }
                      : msg
              )
          );
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="flex h-screen bg-gray-800 text-gray-200 font-sans">
      <Sidebar
        modules={COURSE_MODULES}
        onSelectModule={handleSelectModule}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className="flex-1 flex flex-col h-screen relative">
          <div className="flex items-center p-4 border-b border-gray-700/50 md:hidden sticky top-0 bg-gray-800 z-10">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold ml-4">{selectedModule?.title || 'Design Course'}</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
