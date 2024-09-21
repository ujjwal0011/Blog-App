import React from "react";

export default function PostDetailSkeleton() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Grid background overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="relative">
        {/* Simulating the featured image */}
        <div className="w-full h-[500px] bg-gray-700"></div>
        {/* Title placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-1/2 h-10 bg-gray-600 rounded"></div>
        </div>
      </div>
      <div className="py-16 max-w-4xl mx-auto text-lg leading-relaxed text-gray-300 space-y-6">
        {/* Simulating post content */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-600 rounded w-3/4"></div>
          <div className="h-6 bg-gray-600 rounded w-full"></div>
          <div className="h-6 bg-gray-600 rounded w-2/3"></div>
          <div className="h-6 bg-gray-600 rounded w-full"></div>
          <div className="h-6 bg-gray-600 rounded w-4/5"></div>
          <div className="h-6 bg-gray-600 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
