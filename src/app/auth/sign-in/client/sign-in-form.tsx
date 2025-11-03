"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInFormSchema,
  type SignInFormSchema,
} from "../sign-in-form.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EmailInput } from "@/components/ui/email-input/server/email-input";
import { PasswordInput } from "@/components/ui/password-input/client/password-input";
import { FieldSeparator } from "@/components/ui/field";
import Link from "next/link";
import GoogleButton from "@/components/ui/google-button/client/google-button";

export default function SignInForm() {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInFormSchema) {
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
              <FormDescription>Enter your email to sign in.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </FormControl>
              <FormDescription>Enter your password to sign in.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
        >
          Sign In
        </Button>
      </form>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-4">
        Or continue with
      </FieldSeparator>

      <GoogleButton />

      <p className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-primary underline"
        >
          Sign Up
        </Link>
      </p>
    </Form>
  );
}
