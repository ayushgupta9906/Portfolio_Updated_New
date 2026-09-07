import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ayush Gupta | Portfolio",
  description: "Full-Stack Developer & UI/UX Innovator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased selection:bg-primary/30 selection:text-primary-foreground"
      )}>
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProgress />
            <main className="flex-grow pt-0">
              {children}
            </main>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
