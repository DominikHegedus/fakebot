"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import type { ErrorContext } from "better-auth/react";
import { toast } from "sonner";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";
import LoadingButton from "../../../shared/loading-button/server/loading-button";
import { useRouter } from "next/navigation";
import type { ButtonVariantProps } from "../../../ui/button";

export default function GoogleButton({
  variant = "outline",
  size = "lg",
  disabled,
  onIsPendingChange,
}: ButtonVariantProps & {
  disabled?: boolean;
  onIsPendingChange?: (status: boolean) => void;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function signIn(): Promise<void> {
    await authClient.signIn.social(
      {
        provider: "google",
        errorCallbackURL: "/error/auth/sign-in",
        callbackURL: "/app",
      },
      {
        onRequest: () => {
          setIsPending(true);
          onIsPendingChange?.(true);
        },
        onSuccess: () => {
          setIsPending(false);
          onIsPendingChange?.(false);
          router.push("/app");
          toast.success("Signed in successfully!", {
            description: "You are now logged in.",
            icon: <CircleCheckIcon className="h-4 w-4" />,
            richColors: true,
            position: "top-right",
          });
        },
        onError: (ctx: ErrorContext) => {
          setIsPending(false);

          toast.error(
            "Something went wrong while signing in. Please try again!",
            {
              description: ctx.error?.message ?? "",
              icon: <CircleAlertIcon className="h-4 w-4" />,
              richColors: true,
              position: "top-right",
            }
          );
        },
      }
    );
  }

  return (
    <LoadingButton
      variant={variant}
      size={size}
      pending={isPending}
      onClick={signIn}
      className="w-full cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
      Continue with Google
    </LoadingButton>
  );
}
