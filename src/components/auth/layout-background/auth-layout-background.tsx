"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function AuthLayoutBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    theme as "light" | "dark"
  );

  return (
    <BackgroundGradientAnimation theme={currentTheme}>
      <div className="absolute z-51 inset-0 top-0 left-0 p-4 h-6">
        <div className="flex justify-end items-center">
          <div className="rounded-lg border-primary border-2 flex items-center justify-center p-2">
            <AnimatedThemeToggler
              className="size-6 cursor-pointer"
              onThemeChange={(theme) => setCurrentTheme(theme)}
            />
          </div>
        </div>
      </div>
      <div className="absolute z-50 inset-0 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        {children}
      </div>
    </BackgroundGradientAnimation>
  );
}
