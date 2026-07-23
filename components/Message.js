'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export default function Message({ message }) {
  const [showThinking, setShowThinking] = useState(false);
  const [copied, setCopied] = useState(false);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date) => {
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
            ? 'bg-primary text-white rounded-3xl rounded-br-none'
            : 'bg-card border border-border text-foreground rounded-3xl rounded-bl-none'
        } p-4 space-y-2`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>

        {message.thinking && !isUser && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="flex items-center gap-2 text-xs text-muted hover:text-foreground transition"
            >
              {showThinking ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <span>AI Thinking</span>
            </button>

            {showThinking && (
              <div className="mt-2 p-2 bg-background/50 rounded text-xs text-muted whitespace-pre-wrap">
                {message.thinking}
              </div>
            )}
          </div>
        )}

        {!isUser && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-muted hover:text-foreground transition mt-2"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
