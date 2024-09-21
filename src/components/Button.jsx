import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-white",
  textColor = "text-black",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`w-full px-4 py-3 rounded-lg transition duration-200 ease-in-out 
                  ${bgColor} ${textColor} ${className} 
                  hover:bg-opacity-90 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:ring-opacity-50`}
      {...props}
    >
      {children}
    </button>
  );
}
