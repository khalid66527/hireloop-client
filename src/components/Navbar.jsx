"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "../lib/auth-client";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Better Auth Session Hook
  const { data: session, isPending } = useSession();
// console.log("session", session, "isPending", isPending)

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        }
      }
    });
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Dashboard", href: "/dashboard/recruiter" },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-purple-600">
            HireLoop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {/* Auth Section */}
            {!isPending && session ? (
              <div className="flex items-center gap-4">
                {/* User Profile */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-gray-800">
                      {session.user?.name || "User"}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {session.user?.email || ""}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-red-600 transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition"
                >
                  Sign in
                </Link>

                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? "transform rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t mt-2 pt-4 pb-4 flex flex-col gap-4 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-purple-600 py-1"
              >
                {item.name}
              </Link>
            ))}

            <div className="h-px bg-gray-300 my-2"></div>

            {!isPending && session ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{session.user?.name}</p>
                    <p className="text-xs text-gray-500">{session.user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full py-3 text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium hover:bg-red-100 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center py-3 text-gray-700 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center py-3 bg-purple-600 text-white rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
