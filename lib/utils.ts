import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const diffSeconds = now - timestamp;

  if (diffSeconds < 0) {
    return "in the future";
  }

  const intervals: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [604800, "w"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
    [1, "s"],
  ];

  for (const [secondsInInterval, intervalName] of intervals) {
    const intervalCount = Math.floor(diffSeconds / secondsInInterval);
    if (intervalCount >= 1) {
      return `${intervalCount}${intervalName} ago`;
    }
  }

  return "just now";
}

export function truncateUrl(url: string, maxLength: number = 100): string {
  if (url.length <= maxLength) return url;

  // Truncate and add ellipsis
  return url.substring(0, maxLength - 3) + "...";
}
