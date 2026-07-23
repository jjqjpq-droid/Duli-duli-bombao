const REQUEST_LIMIT = 20; // 20 requests
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

interface RateLimitData {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitData> = new Map();

  checkLimit(identifier: string = 'global'): {
    allowed: boolean;
    remaining: number;
    resetIn: number;
  } {
    const now = Date.now();
    const data = this.store.get(identifier);

    if (!data || now > data.resetTime) {
      // Reset the counter
      const resetTime = now + TIME_WINDOW;
      this.store.set(identifier, {
        count: 1,
        resetTime,
      });

      return {
        allowed: true,
        remaining: REQUEST_LIMIT - 1,
        resetIn: TIME_WINDOW,
      };
    }

    if (data.count >= REQUEST_LIMIT) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: data.resetTime - now,
      };
    }

    data.count += 1;

    return {
      allowed: true,
      remaining: REQUEST_LIMIT - data.count,
      resetIn: data.resetTime - now,
    };
  }

  getRemainingTime(identifier: string = 'global'): number {
    const data = this.store.get(identifier);
    if (!data) return 0;
    return Math.max(0, data.resetTime - Date.now());
  }
}

export const rateLimiter = new RateLimiter();
