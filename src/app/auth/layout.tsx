import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { BgClientWrapper } from "@/components/ui/bg-client-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BgClientWrapper>
      <div className="absolute z-51 inset-0 top-0 left-0 p-4">
        <div className="flex justify-end items-center">
          <div className="rounded-lg border-primary border-2 flex items-center justify-center p-2">
            <AnimatedThemeToggler className="size-6 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="absolute z-50 inset-0 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
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
    </BgClientWrapper>
  );
}
