import { env } from "@/app/env";
import { PrismaClient } from "@/shared/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createBetterAuthEmail } from "supersendtx-better-auth";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const email = createBetterAuthEmail({
  from: "noreply@mail.supersendtx.com",
  apiKey: env.SUPERSENDTX_API_KEY,
  appUrl: env.BETTER_AUTH_URL,
});

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
});
