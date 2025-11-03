import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { auth } from "@/lib/auth";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
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
            name: "Anonymous",
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
});
