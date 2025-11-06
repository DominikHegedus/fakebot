"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EmailInput } from "@/components/form-fields/email-input/server/email-input";
import Link from "next/link";
import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormSchema,
} from "../forgot-password-form.schema";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordFormSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <EmailInput
                  autoFocus
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
        >
          Send reset password email
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Remember your password?{" "}
        <Link
          href="/auth/sign-in"
          className="text-primary underline"
        >
          Back to Sign In
        </Link>
      </p>
    </Form>
  );
}
