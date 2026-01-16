import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Chat: React.FC = () => {
  const { currentSession, messages, isLoading, error, createSession, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [sessionInitialized, setSessionInitialized] = useState(false);

  // Initialize chat session on component mount
  useEffect(() => {
    if (!currentSession && !sessionInitialized) {
      const userId = localStorage.getItem('user_id') || uuidv4();
      localStorage.setItem('user_id', userId);
      createSession(userId).then(() => setSessionInitialized(true));
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <Layout showBack={true} showHome={true}>
      <div className="flex-1 flex flex-col h-full max-w-2xl mx-auto w-full">
        {/* Chat Header */}
        <div className="border-b p-4">
          <h2 className="text-accessible-lg font-semibold">AI Chat Assistant</h2>
          <p className="text-accessible-sm text-muted-foreground">
            Ask questions about government schemes and services
          </p>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <p className="text-accessible text-muted-foreground">
                  Start a conversation by sending a message
                </p>
                <p className="text-accessible-sm text-muted-foreground mt-2">
                  Example: "What are the eligibility criteria for pension?"
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card
                  className={`max-w-xs lg:max-w-md px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-accessible">{msg.content}</p>
                </Card>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-muted px-4 py-2">
                <p className="text-accessible text-muted-foreground">Thinking...</p>
              </Card>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <Card className="bg-destructive/10 border-destructive px-4 py-2">
                <p className="text-accessible text-destructive">{error}</p>
              </Card>
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading || !currentSession}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || !currentSession || !inputValue.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
