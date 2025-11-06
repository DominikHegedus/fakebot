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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EmailInput } from "@/components/form-fields/email-input/server/email-input";
import { PasswordInput } from "@/components/form-fields/password-input/client/password-input";
import { FieldSeparator } from "@/components/ui/field";
import Link from "next/link";
import GoogleButton from "@/components/auth/google-button/client/google-button";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/shared/loading-button/server/loading-button";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();

  const [googleLoginPending, setGoogleLoginPending] = useState(false);
  const [emailPasswordLoginPending, setEmailPasswordLoginPending] =
    useState(false);

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = api.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully");
      router.push("/app");
    },
    onError: () => {
      toast.error("Failed to sign in");
    },
  });

  function onSubmit(values: SignInFormSchema) {
    signIn.mutate(values);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  field={field}
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          pending={signIn.isPending}
          disabled={googleLoginPending}
          type="submit"
          className="w-full cursor-pointer"
        >
          Sign In
        </LoadingButton>
      </form>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-4">
        Or continue with
      </FieldSeparator>

      <GoogleButton
        disabled={emailPasswordLoginPending}
        onIsPendingChange={setGoogleLoginPending}
      />

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
