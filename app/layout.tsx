import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "HoloTrack | Multi-domain Progress Tracker",
  description:
    "Unified progress tracking hub for fitness coaches, therapists, and educators to support clients, patients, and students."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="absolute inset-0 overflow-hidden">
          <div className="ring-spotlight" />
        </div>
        <main className="relative z-10 flex min-h-screen flex-col items-center py-10 px-4 sm:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
