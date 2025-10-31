import "@/styles/globals.css";

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "FakeBot",
  description: "FakeBot is a platform for creating and sharing fake news.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable}`}
    >
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
