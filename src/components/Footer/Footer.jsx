import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-300 py-12 border-t border-gray-800 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center gap-5">
              <img className="h-12 mb-4" src="./icon.png" alt="" />
              <h2 className="text-2xl font-bold text-white pt-2">Bliss Note</h2>
            </div>
            <p className="text-sm">
              Building the future of web development, one component at a time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Account
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-white transition-colors">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Bliss Note. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
