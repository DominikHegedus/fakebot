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
                <PasswordInput field={field} />
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
                <PasswordInput field={field} />
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
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary-600 has-aria-checked:bg-primary-50 dark:has-aria-checked:border-primary-900 dark:has-aria-checked:bg-primary-950">
                  <Checkbox
                    id="terms-and-conditions"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600 data-[state=checked]:text-white dark:data-[state=checked]:border-primary-700 dark:data-[state=checked]:bg-primary-700"
                    aria-describedby="terms-and-conditions-description"
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
              <FormDescription>
                I accept the terms and conditions.
              </FormDescription>
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
