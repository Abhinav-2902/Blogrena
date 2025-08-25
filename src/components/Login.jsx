import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-600 mt-6 text-center font-medium">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
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
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
