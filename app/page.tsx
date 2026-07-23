'use client';

import { useState, useEffect } from 'react';
import PasswordModal from '@/components/PasswordModal';
import TelegramPopup from '@/components/TelegramPopup';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('chatAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setShowTelegramPopup(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    setIsAuthenticated(true);
    localStorage.setItem('chatAuth', 'true');
    setShowTelegramPopup(true);
  };

  return (
    <main>
      {!isAuthenticated ? (
        <PasswordModal onSubmit={handlePasswordSubmit} />
      ) : (
        <>
          {showTelegramPopup && (
            <TelegramPopup onClose={() => setShowTelegramPopup(false)} />
          )}
          <ChatInterface />
        </>
      )}
    </main>
  );
}
