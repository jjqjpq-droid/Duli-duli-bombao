'use client';

import { Send } from 'lucide-react';

export default function TelegramButton() {
  const handleTelegramClick = () => {
    window.open('https://t.me/NGYT777GGG', '_blank');
  };

  return (
    <button
      onClick={handleTelegramClick}
      className="bg-accent hover:bg-accent/90 text-background px-4 py-2 rounded-lg transition font-semibold flex items-center gap-2 text-sm"
    >
      <Send className="w-4 h-4" />
      <span>Join Telegram</span>
    </button>
  );
}
