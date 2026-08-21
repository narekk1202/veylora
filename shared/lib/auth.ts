import { PrismaClient } from "@/shared/generated/prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL! });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
