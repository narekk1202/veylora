import { env } from "@/shared/config/env";

export const SITE_NAME = "Veylora";

export const SITE_TITLE = "Veylora — a private decision journal";

export const SITE_DESCRIPTION =
  "Veylora is a personal decision journal that helps you capture your reasoning, track predictions, review outcomes, and discover patterns in how you make decisions.";

export const NOINDEX_ROBOTS = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
} as const;

export function getSiteUrl() {
  return env.BETTER_AUTH_URL.replace(/\/$/, "");
}
