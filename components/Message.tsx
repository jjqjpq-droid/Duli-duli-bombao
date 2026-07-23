'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  timestamp: Date;
}

interface MessageProps {
  message: ChatMessage;
}

export default function Message({ message }: MessageProps) {
  const [showThinking, setShowThinking] = useState(false);
  const [copied, setCopied] = useState(false);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      <div
        className={`max-w-lg lg:max-w-2xl ${
          isUser
            ? 'bg-primary text-white rounded-3xl rounded-tr-lg'
            : 'bg-card border border-border rounded-3xl rounded-tl-lg'
        }`}
      >
        {/* Thinking Display */}
        {!isUser && message.thinking && (
          <div className="px-4 py-3 border-b border-border">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition w-full"
            >
              {showThinking ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <span className="font-semibold">🧠 AI Thinking</span>
            </button>

            {showThinking && (
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted space-y-2 max-h-48 overflow-y-auto">
                {message.thinking.split('\n').map((line, i) => (
                  <p key={i} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Message Content */}
        <div className="px-4 py-3 space-y-2">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>

          <div className="flex items-center justify-between gap-2 pt-2">
            <span className="text-xs opacity-70">
              {formatTime(message.timestamp)}
            </span>

            {!isUser && (
              <button
                onClick={handleCopy}
                className="opacity-70 hover:opacity-100 transition p-1 hover:bg-background/50 rounded"
                title="Copy message"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-accent" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
