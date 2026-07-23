'use client';

import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

export default function PasswordModal({ onSubmit }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const correctPassword = '@NGYT777GGG';

    setTimeout(() => {
      if (password === correctPassword) {
        onSubmit();
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/20 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full backdrop-blur-sm">
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white rounded-t-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-6 h-6" />
            <h1 className="text-2xl font-bold">AI Chat Access</h1>
          </div>
          <p className="text-primary/90 text-sm">Enter the password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !password}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Checking...' : 'Unlock Chat'}
          </button>
        </form>

        <div className="bg-background/50 p-4 rounded-b-2xl text-xs text-muted text-center border-t border-border">
          Password protected access • Rate limited to 20 requests/min
        </div>
      </div>
    </div>
  );
}
