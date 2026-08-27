import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.url(),
    DATABASE_URL: z.url(),
    SUPERSENDTX_API_KEY: z.string(),
    CRON_SECRET: z.string().min(16),
    FROM_EMAIL: z.string().email(),
  },
  client: {},
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    SUPERSENDTX_API_KEY: process.env.SUPERSENDTX_API_KEY,
    CRON_SECRET: process.env.CRON_SECRET,
    FROM_EMAIL: process.env.FROM_EMAIL,
  },
});
