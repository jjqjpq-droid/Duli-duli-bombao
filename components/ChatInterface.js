'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader, AlertCircle, LogOut, MessageCircle } from 'lucide-react';
import Message from './Message';
import RateLimitAlert from './RateLimitAlert';
import TelegramButton from './TelegramButton';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError('');

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setRateLimitInfo({
            remaining: data.remaining,
            resetIn: data.resetIn,
          });
          setError(data.error || 'Rate limit exceeded. Please try again later.');
        } else {
          setError(data.error || 'Failed to get response');
        }
        return;
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        thinking: data.thinking,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setRateLimitInfo({
        remaining: data.remaining,
        resetIn: data.resetIn,
      });
    } catch (err) {
      setError('Error connecting to AI service. Please try again.');
      console.error('[v0] Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chatAuth');
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Chat</h1>
              <p className="text-xs text-muted">Secure & Password Protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TelegramButton />
            <button
              onClick={handleLogout}
              className="bg-background hover:bg-border border border-border text-foreground px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted/50 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Welcome to AI Chat</h2>
              <p className="text-muted">
                Start a conversation by typing a message below.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-card border border-border rounded-lg p-3 text-sm text-left">
                  <p className="font-semibold text-primary mb-1">Rate Limited:</p>
                  <p className="text-muted">20 requests per minute</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 text-sm text-left">
                  <p className="font-semibold text-accent mb-1">AI Thinking:</p>
                  <p className="text-muted">Shows reasoning process</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <Loader className="w-5 h-5 text-primary animate-spin" />
                <span className="text-muted">AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {rateLimitInfo && (
        <RateLimitAlert
          remaining={rateLimitInfo.remaining}
          resetIn={rateLimitInfo.resetIn}
        />
      )}

      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message... (20 requests/min limit)"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition flex items-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
