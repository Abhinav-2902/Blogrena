import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-700">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-wrap -mx-6">
          {/* Logo & Description */}
          <div className="w-full md:w-1/2 lg:w-5/12 px-6 mb-10 md:mb-0">
            <Logo width="120px" className="mb-4" />
            <p className="text-gray-400 text-sm">
              &copy; 2023 DevUI. All rights reserved. Empowering developers with modern web experiences.
            </p>
          </div>

          {/* Company Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-2/12 px-6 mb-10 sm:mb-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Features</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Pricing</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Affiliate Program</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-2/12 px-6 mb-10 sm:mb-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Account</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Help</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Contact Us</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-3/12 px-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">Legals</h3>
            <ul className="space-y-3">
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
