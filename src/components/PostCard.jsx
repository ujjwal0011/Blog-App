import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage, userName, createdAt }) {
  const postDate = () => {
    if (!createdAt) return "Unknown Date";

    const date =
      typeof createdAt === "number"
        ? new Date(createdAt * 1000)
        : new Date(createdAt);

    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-neutral-900 rounded-xl p-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 border border-gray-800">
        <div className="w-full justify-center mb-4">
          {featuredImage ? (
            <img
              src={service.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl object-cover w-full h-48"
            />
          ) : (
            <div className="h-48 bg-gray-700 flex items-center justify-center rounded-xl">
              <p className="text-gray-400">No Image</p>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="mt-2 text-gray-400">
          <p>By: {userName || "Unknown User"}</p>
          <p>Date: {postDate()}</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
