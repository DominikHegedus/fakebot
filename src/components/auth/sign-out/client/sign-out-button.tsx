"use client";

import LoadingButton from "@/components/shared/loading-button/server/loading-button";
import type { ButtonVariantProps } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton({
  variant,
  size,
  className,
  children,
}: ButtonVariantProps & { className?: string; children?: React.ReactNode }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    try {
      setPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setPending(false);
    }
  }

  return (
    <LoadingButton
      variant={variant}
      size={size}
      className={className}
      pending={pending}
      onClick={handleSignOut}
    >
      {children}
    </LoadingButton>
  );
}
