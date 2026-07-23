'use client';

import { Info } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RateLimitAlertProps {
  remaining: number;
  resetIn: number;
}

export default function RateLimitAlert({
  remaining,
  resetIn,
}: RateLimitAlertProps) {
  const [displayResetIn, setDisplayResetIn] = useState(resetIn);

  useEffect(() => {
    if (resetIn <= 0) return;

    const interval = setInterval(() => {
      setDisplayResetIn((prev) => Math.max(0, prev - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [resetIn]);

  const seconds = Math.ceil(displayResetIn / 1000);
  const isWarning = remaining <= 5;

  return (
    <div className="max-w-4xl mx-auto px-4 w-full mb-4">
      <div
        className={`border rounded-lg px-4 py-3 flex items-center gap-3 ${
          isWarning
            ? 'bg-yellow-900/30 border-yellow-700 text-yellow-200'
            : 'bg-blue-900/30 border-blue-700 text-blue-200'
        }`}
      >
        <Info className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold">
            {isWarning ? '⚠️ Rate Limit Warning' : '📊 Requests Remaining'}
          </p>
          <p className="text-sm opacity-90">
            {remaining} of 20 requests remaining
            {seconds > 0 && ` • Resets in ${seconds}s`}
          </p>
        </div>
      </div>
    </div>
  );
}
