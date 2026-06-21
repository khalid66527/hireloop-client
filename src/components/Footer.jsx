// "use client";

import Link from "next/link";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-white font-semibold text-lg">
                HireLoop
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              
              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                <LogoFacebook className="w-4 h-4 text-white" />
              </div>

              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                <LogoGithub className="w-4 h-4 text-white" />
              </div>

              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                <LogoLinkedin className="w-4 h-4 text-white" />
              </div>

            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition">Job discovery</Link></li>
              <li><Link href="#" className="hover:text-white transition">Worker AI</Link></li>
              <li><Link href="#" className="hover:text-white transition">Companies</Link></li>
              <li><Link href="#" className="hover:text-white transition">Salary data</Link></li>
            </ul>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigations</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition">Help center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Career library</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition">Brand Guideline</Link></li>
              <li><Link href="#" className="hover:text-white transition">Newsroom</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">

          <p>
            Copyright 2024 — Hire Loop
          </p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="#" className="hover:text-white transition">Terms &amp; Policy</Link>
            <span>-</span>
            <Link href="#" className="hover:text-white transition">Privacy Guideline</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}