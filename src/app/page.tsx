import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>FakeBot</h1>

      <div className="flex gap-2">
        <Button asChild>
          <Link href="/app">Go to App</Link>
        </Button>
        <br />
        <Button asChild>
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
