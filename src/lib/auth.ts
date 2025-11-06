import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/server/db";
import { nextCookies } from "better-auth/next-js";
import { api } from "@/trpc/server";
import { toast } from "sonner";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await api.mailing.sendPasswordResetEmail({
        to: user.email,
        url: url,
      });
    },
    onPasswordReset: async () => {
      toast.success("Password reset successfully");
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async (data) => {
      await api.mailing.sendVerificationEmail({
        to: data.user.email,
        url: data.url,
        name: data.user.name,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
});
