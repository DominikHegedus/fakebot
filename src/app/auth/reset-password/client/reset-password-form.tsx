"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PasswordInput } from "@/components/form-fields/password-input/client/password-input";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormSchema,
} from "../reset-password-form.schema";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import LoadingButton from "@/components/shared/loading-button/server/loading-button";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  if (!token) {
    router.push("/auth/sign-in");
  }

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const resetPassword = api.auth.resetPassword.useMutation({
    onSuccess: () => {
      toast.success("Password reset successfully");
      redirect("/auth/sign-in");
    },
    onError: () => {
      toast.error("Failed to reset password");
    },
  });

  function onSubmit({ password }: ResetPasswordFormSchema) {
    if (!token) {
      return;
    }

    resetPassword.mutate({
      newPassword: password,
      token: token,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  autoComplete="new-password"
                  placeholder="Password"
                />
              </FormControl>
              <FormDescription>Enter your password to sign up.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  autoComplete="new-password"
                  placeholder="Password Confirmation"
                />
              </FormControl>
              <FormDescription>Confirm your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          pending={resetPassword.isPending}
          type="submit"
          className="w-full cursor-pointer"
        >
          Reset Password
        </LoadingButton>
      </form>
    </Form>
  );
}
