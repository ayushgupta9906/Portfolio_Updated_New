import type { Metadata } from "next";
import { Space_Grotesk as FontHeading, Outfit as FontBody } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/ui/preloader";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontBody = FontBody({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
});

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
        "min-h-screen bg-background font-body antialiased selection:bg-primary/30 selection:text-primary-foreground",
        fontBody.variable,
        fontHeading.variable
      )}>
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Preloader /> */}
            <ScrollProgress />
            {/* Navbar will be replaced by Dock later, keeping for now or hiding */}
            {/* <Navbar /> */}
            <main className="flex-grow pt-0">
              {children}
            </main>
            {/* <Footer /> */}
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
