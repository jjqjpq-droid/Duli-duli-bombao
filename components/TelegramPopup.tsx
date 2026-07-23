'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface TelegramPopupProps {
  onClose: () => void;
}

export default function TelegramPopup({ onClose }: TelegramPopupProps) {
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinClick = () => {
    window.open('https://t.me/NGYT777GGG', '_blank');
    setHasJoined(true);
    setTimeout(onClose, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Join Our Community</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-foreground">
            Join our Telegram channel to stay updated with the latest features and updates!
          </p>

          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-center text-lg font-semibold text-accent">
              @NGYT777GGG
            </p>
          </div>

          <button
            onClick={handleJoinClick}
            className="w-full bg-accent hover:bg-accent/90 text-background font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {hasJoined ? 'Opening Telegram...' : 'Join Channel'}
          </button>

          <button
            onClick={onClose}
            className="w-full bg-background border border-border hover:bg-border text-foreground font-semibold py-3 rounded-lg transition duration-200"
          >
            Continue to Chat
          </button>
        </div>
      </div>
    </div>
  );
}
