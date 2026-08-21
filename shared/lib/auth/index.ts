import { env } from "@/shared/config/env";
import { PrismaClient } from "@/shared/generated/prisma/client";
import { createTemplatedAuthEmail } from "@/shared/lib/auth/emails";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createBetterAuthEmail } from "supersendtx-better-auth";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const tx = createBetterAuthEmail({
  from: "noreply@veylora.space",
  apiKey: env.SUPERSENDTX_API_KEY,
  appUrl: env.BETTER_AUTH_URL,
});

const email = createTemplatedAuthEmail(tx);

export const auth = betterAuth({
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

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
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
});
