import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ width = '120px', className = '' }) {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      {/* Replace this div with an SVG or an image for real logo */}
      <div
        style={{ width }}
        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
      >
        DevUI
      </div>
    </Link>
  )
}

export default Logo
