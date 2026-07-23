'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TelegramPopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleJoinTelegram = () => {
    window.open('https://t.me/NGYT777GGG', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4 z-40 animate-fadeIn">
      <div className="bg-card border border-border rounded-t-2xl p-6 w-full max-w-md shadow-2xl animate-slideUp">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Join Our Telegram</h2>
            <p className="text-sm text-muted">Stay updated with the latest features</p>
          </div>
          <button
            onClick={handleClose}
            className="text-muted hover:text-foreground transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted">
            Connect with our community, get updates, and support on Telegram.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleJoinTelegram}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition"
            >
              Join Telegram
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-background hover:bg-border border border-border text-foreground font-semibold py-3 rounded-lg transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
