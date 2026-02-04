export class RateLimiter {
    private requests: Map<string, { count: number, expiry: number }> = new Map();
    private limit: number;
    private window: number; // milliseconds

    constructor(limit: number = 5, window: number = 60 * 1000) {
        this.limit = limit;
        this.window = window;
    }

    check(identifier: string): boolean {
        const now = Date.now();
        const record = this.requests.get(identifier);

        if (!record || now > record.expiry) {
            this.requests.set(identifier, { count: 1, expiry: now + this.window });
            return true;
        }

        if (record.count >= this.limit) {
            return false;
        }

        record.count++;
        return true;
    }
}

export const loginRateLimiter = new RateLimiter(5, 60 * 1000); // 5 attempts per minute
