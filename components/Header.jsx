"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MyApp
      </Link>

      {/* Navigation */}
      <nav className="flex gap-6">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
