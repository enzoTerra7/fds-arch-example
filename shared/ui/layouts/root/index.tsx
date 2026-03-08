import { TRPCReactProvider } from "@/app/_providers/trpc-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "@/app/globals.css";

import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "../../components/sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <TRPCReactProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
