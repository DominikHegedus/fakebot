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
import { EmailInput } from "@/components/ui/email-input/server/email-input";
import { PasswordInput } from "@/components/ui/password-input/client/password-input";
import {
  signUpFormSchema,
  type SignUpFormSchema,
} from "../sign-up-form.schema";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FieldSeparator } from "@/components/ui/field";
import GoogleButton from "@/components/ui/google-button/client/google-button";

export default function SignInForm() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: SignUpFormSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
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
              <FormDescription>Enter your email to sign up.</FormDescription>
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
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms and Conditions</FormLabel>
              <FormControl>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary has-aria-checked:bg-primary/5 dark:has-aria-checked:border-primary dark:has-aria-checked:bg-primary">
                  <Checkbox
                    id="terms-and-conditions"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      I accept the terms and conditions.
                    </p>
                    <p className="text-muted-foreground text-sm">
                      By signing up, you agree to our{" "}
                      <Link
                        href="/terms-and-conditions"
                        className="text-primary underline"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </Label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
        >
          Sign Up
        </Button>
      </form>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-4">
        Or continue with
      </FieldSeparator>

      <GoogleButton />

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="text-primary underline"
        >
          Sign In
        </Link>
      </p>
    </Form>
  );
}
