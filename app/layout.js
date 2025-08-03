import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatBot from "@/components/chatBot.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trackify",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <ChatBot />
          <Toaster richColors />

          {/* Minimal Footer */}
          <footer className="bg-gradient-to-b from-blue-50 to-white py-8 border-t border-gray-200/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <p className="text-gray-600 text-sm">
                    © {new Date().getFullYear()} Trackify - Smarter Finance Management
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
                    Terms
                  </Link>
                  <Link 
                    href="https://github.com/yourusername/trackify" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}