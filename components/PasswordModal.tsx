'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';

interface PasswordModalProps {
  onSubmit: () => void;
}

export default function PasswordModal({ onSubmit }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const CORRECT_PASSWORD = '@NGYT777GGG';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate delay for security feel
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        onSubmit();
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md shadow-2xl animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/20 p-4 rounded-lg">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Access Required</h1>
        <p className="text-muted text-center mb-6">Enter the password to access the AI Chat</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {isLoading ? 'Verifying...' : 'Unlock Access'}
          </button>
        </form>

        <p className="text-xs text-muted text-center mt-6">
          🔒 This chat is password protected
        </p>
      </div>
    </div>
  );
}
