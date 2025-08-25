import React from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Join Blogrena Today
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create an account to start sharing your posts, engage with readers, and grow your blog.
          </p>
        </div>

        {/* Signup Form */}
        <SignupComponent />

        {/* Extra Links */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
            >
              Sign In
            </a>
          </p>
          <p className="mt-2">
            By signing up, you agree to our{' '}
            <a
              href="/terms"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
            >
              Terms & Conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
