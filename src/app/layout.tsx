import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/them-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cancastico Todo",
  description: "My Todo List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <body className={inter.className}>
          <div className="scrollbar scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-background h-screen overflow-auto">
            {children}
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
