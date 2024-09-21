import React from "react";

const LoaderSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-700 rounded w-3/4 mx-auto"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-3/6 mx-auto"></div>
      </div>
      <div className="h-8 bg-gray-700 rounded w-2/4 mx-auto"></div>
    </div>
  );
};

export default LoaderSkeleton;
