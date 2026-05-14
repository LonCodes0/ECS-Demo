import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";

import { ScenarioProvider } from "@/components/providers/scenario-provider";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Environmental Card System (ECS) Demo",
  description: "Interactive judges demo for the Environmental Card System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetBrainsMono.variable} antialiased`}>
        <ScenarioProvider>{children}</ScenarioProvider>
      </body>
    </html>
  );
}
