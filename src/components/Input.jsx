import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        id={id}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition duration-200 ease-in-out
          ${className}
        `}
        {...props}
      />
    </div>
  )
})

export default Input
