import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const mailingRouter = createTRPCRouter({
  sendVerificationEmail: publicProcedure
    .input(
      z.object({
        to: z.email(),
        url: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await fetch(
        `${process.env.MAILING_SERVER_URL}/api/v1/send-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: input.to,
            name: input.name ?? "Anonymous",
            redirectUrl: input.url,
          }),
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send verification email",
        });
      }

      return response.json();
    }),

  sendPasswordResetEmail: publicProcedure
    .input(
      z.object({
        to: z.email(),
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await fetch(
        `${process.env.MAILING_SERVER_URL}/api/v1/send-reset-password-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: input.to,
            redirectUrl: input.url,
          }),
        }
      );
      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send password reset email",
        });
      }

      return response.json();
    }),
});
