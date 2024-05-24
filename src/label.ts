import { escape } from "@std/html";

/**
 * Renders a hashtag into an HTML string.
 */
export function spanHashAndTag(hashtag: string): string {
  if (hashtag.startsWith("#")) {
    hashtag = hashtag.substring(1);
  }
  return `<span class="hash">#</span><span class="tag">${
    escape(hashtag)
  }</span>`;
}
