import { env } from "@/shared/config/env";
import { createTemplatedAuthEmail } from "@/shared/lib/auth/emails";
import { prisma } from "@/shared/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { createBetterAuthEmail } from "supersendtx-better-auth";

const tx = createBetterAuthEmail({
  from: "noreply@veylora.space",
  apiKey: env.SUPERSENDTX_API_KEY,
  appUrl: env.BETTER_AUTH_URL,
});

const email = createTemplatedAuthEmail(tx);

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://veylora.space",
    "https://www.veylora.space",
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: email.sendResetPassword,
  },

  emailVerification: {
    sendVerificationEmail: email.sendVerificationEmail,
  },

  user: {
    additionalFields: {
      onboardingCompleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
    },
  },

  plugins: [nextCookies()],
});
