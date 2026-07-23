'use client';

import { AlertTriangle } from 'lucide-react';

export default function RateLimitAlert({ remaining, resetIn }) {
  const resetSeconds = Math.ceil(resetIn / 1000);

  return (
    <div className="max-w-4xl mx-auto px-4 w-full pb-4">
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/50 text-primary px-4 py-3 rounded-lg flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1">
          <span className="font-semibold">Rate Limit Status:</span>
          <span className="ml-2 text-sm">
            {remaining} requests remaining • Resets in {resetSeconds}s
          </span>
        </div>
      </div>
    </div>
  );
}
