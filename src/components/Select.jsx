import React, { useId } from 'react'

const Select = React.forwardRef(function Select(
  { options = [], label, className = '', ...props },
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
      <select
        {...props}
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition duration-200 ease-in-out
          ${className}
        `}
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-gray-900 dark:text-gray-100">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select
