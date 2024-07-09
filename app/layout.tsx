import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/nav-bar";
import Provider from "@/components/provider";
import Footer from "@/components/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TODOx",
  description: "Just simple todo app!",
  creator: "@nuwanperera-me",
  openGraph: {
    title: "TODOx",
    description: "Just simple todo app!",
    images: ["https://todo-web-app-amber.vercel.app/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TODOx",
    description: "Just simple todo app!",
    images: ["https://todo-web-app-amber.vercel.app/og-image.png"],
    creator: "@nuwanperera-me",
  },
  metadataBase: new URL("https://todo-web-app-amber.vercel.app/")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="max-w-screen-xl min-h-screen flex  flex-col justify-between mx-auto pt-16 font-sans px-4 ">
            {children}
          <Footer />
          </main>
        </ThemeProvider>
      </Provider>
      </body>
    </html>
  );
}
