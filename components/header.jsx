"use client";

import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 shadow-lg z-50 border-b border-blue-300/20 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
        <Image
  src={"/logo.png"}
  alt="Trackify Logo"
  width={200}
  height={70}
  className="h-16 w-auto object-contain drop-shadow-md"
/>

        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-white hover:text-cyan-200 flex items-center gap-2"
            >
              <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow-md">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <a href="/transaction/create">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 border border-blue-200 shadow">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-white",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
