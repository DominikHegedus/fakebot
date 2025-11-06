import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(z.object({ email: z.email(), password: z.string().min(8) }))
    .mutation(async ({ ctx, input }) => {
      return await auth.api.signInEmail({
        body: { email: input.email, password: input.password },
      });
    }),

  signUp: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.email(),
        password: z.string().min(8),
        passwordConfirmation: z.string().min(8),
        termsAndConditions: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const data = await auth.api.signUpEmail({
          body: {
            name: input.name,
            email: input.email,
            password: input.password,
          },
        });

        ctx.db.user.update({
          where: { email: input.email },
          data: {
            termsAndConditions: input.termsAndConditions,
            emailVerified: data.user.emailVerified,
          },
        });
      } catch (error) {
        return { error: "Failed to sign up" };
      }

      return { success: true };
    }),

  requestResetPassword: publicProcedure
    .input(z.object({ email: z.email() }))
    .mutation(async ({ ctx, input }) => {
      return await auth.api.requestPasswordReset({
        body: {
          email: input.email,
          redirectTo: `${process.env.BETTER_AUTH_URL}/auth/reset-password`,
        },
      });
    }),

  resetPassword: publicProcedure
    .input(
      z.object({
        token: z.string(),
        newPassword: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await auth.api.resetPassword({
        body: {
          newPassword: input.newPassword,
          token: input.token,
        },
      });
    }),

  changePassword: publicProcedure
    .input(
      z.object({
        currentPassword: z.string().min(8),
        newPassword: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await auth.api.changePassword({
        body: {
          currentPassword: input.currentPassword,
          newPassword: input.newPassword,
          revokeOtherSessions: true,
        },
        headers: await headers(),
      });
    }),
});
