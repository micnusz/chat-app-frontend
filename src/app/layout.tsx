import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/lib/tanstack/QueryProvider";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { UserProvider } from "@/components/UserProvider";
import { getCurrentUserServer } from "@/lib/hooks/useCurrentUserServer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat App - Text with anyone, anywhere.",
  description: "App created by Michał Nuszkiewicz as a portfolio project.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUserServer();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className} antialiased bg-background`}>
        <QueryProvider>
          <UserProvider initialUser={user}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
