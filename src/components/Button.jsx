import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  fullWidth = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${
        fullWidth ? "w-full" : "inline-block"
      } px-5 py-3 rounded-lg font-medium shadow-md transition duration-200 ease-in-out
         ${bgColor} ${textColor} hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
