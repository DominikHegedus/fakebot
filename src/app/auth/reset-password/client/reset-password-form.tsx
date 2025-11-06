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
import { PasswordInput } from "@/components/form-fields/password-input/client/password-input";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormSchema,
} from "../reset-password-form.schema";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/shared/loading-button/server/loading-button";
import { use } from "react";

export default function ResetPasswordForm({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = use(searchParams);
  const router = useRouter();

  if (!params.token) {
    redirect("/auth/sign-in");
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
      router.push("/auth/sign-in");
    },
    onError: () => {
      toast.error("Failed to reset password");
    },
  });

  function onSubmit({ password }: ResetPasswordFormSchema) {
    if (!params.token) {
      return;
    }

    resetPassword.mutate({
      newPassword: password,
      token: params.token,
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
