import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession({ callbackUrl }: { callbackUrl: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/auth/sign-in?callbackURL=${callbackUrl}`);
  }

  return session;
}
