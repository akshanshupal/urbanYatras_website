// Shared Diwali offer constants (safe for client + server).

// Offer is live until 8 Nov 2026, 11:59:59 PM IST. Extend by moving this date.
export const DIWALI_OFFER_END = new Date("2026-11-08T23:59:59+05:30");

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isDiwaliOfferActive(now: number = Date.now()): boolean {
  return now < DIWALI_OFFER_END.getTime();
}

export function splitRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
