import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="font-semibold text-gray-900">MediFind</span>
            </div>
            <p className="text-sm text-gray-500">
              Find the right doctor, diagnostics center, or pharmacy — fast.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-500 hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-gray-500 hover:text-blue-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-blue-600">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Account
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-gray-500 hover:text-blue-600">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-500 hover:text-blue-600">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} MediFind. All rights reserved.
        </div>
      </div>
    </footer>
  );
}