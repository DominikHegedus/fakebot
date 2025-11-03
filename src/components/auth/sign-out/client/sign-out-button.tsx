"use client";

import LoadingButton from "@/components/shared/loading-button/server/loading-button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
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
      pending={pending}
      onClick={handleSignOut}
    >
      Sign Out
    </LoadingButton>
  );
}
