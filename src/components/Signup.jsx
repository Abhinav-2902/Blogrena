import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const user = await authService.getCurrentUser()
        if (user) dispatch(login(user))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="100px" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-600 mt-6 text-center font-medium">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" fullWidth bgColor="bg-blue-600">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
