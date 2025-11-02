import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
    termsAndConditions: z.boolean().refine((data) => data, {
      message: "You must accept the terms and conditions",
      path: ["termsAndConditions"],
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
