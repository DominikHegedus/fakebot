import { z } from "zod";

export const createBotFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(32, { message: "Name must be less than 32 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(512, { message: "Description must be less than 1000 characters" }),
  isPublic: z.boolean().default(false).optional(),
});

export type CreateBotFormSchema = z.infer<typeof createBotFormSchema>;
