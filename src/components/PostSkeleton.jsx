import React from "react";

export default function PostSkeleton() {
  return (
    <div className="p-4 bg-black shadow-md rounded-lg animate-pulse">
      <div className="h-40 bg-gray-700 rounded mb-4"></div>
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-2/3"></div>
    </div>
  );
}
