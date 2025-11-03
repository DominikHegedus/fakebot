import SignOutButton from "@/components/auth/sign-out/client/sign-out-button";
import { checkSession } from "@/server/helpers/check-session";

export default async function AppPage() {
  await checkSession({ callbackUrl: "/app" });

  return (
    <div>
      <h1>App</h1>
      <SignOutButton />
    </div>
  );
}
