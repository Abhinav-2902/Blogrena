import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome Back to Blogrena
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to access your personalized dashboard, manage your posts, and engage with your readers.
          </p>
        </div>

        {/* Login Form */}
        <LoginComponent />

        {/* Extra Links */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Don’t have an account?{' '}
            <a
              href="/signup"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
            >
              Create one
            </a>
          </p>
          <p className="mt-2">
            Forgot your password?{' '}
            <a
              href="/forgot-password"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
            >
              Reset here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
