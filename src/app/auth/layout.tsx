import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <Image
              className="rounded-md"
              src="/fakebot-wo-text.png"
              alt="Logo"
              width={64}
              height={64}
            />
          </div>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">{children}</div>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/fakebot-messaging.png"
                  alt="example of a messaging app"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
