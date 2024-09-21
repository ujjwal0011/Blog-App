import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import PostDetailSkeleton from "../components/PostDetailSkeleton";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) {
    return <PostDetailSkeleton />;
  }

  const postDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="relative">
        <img
          src={service.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-4xl font-bold text-white text-center px-4">
            {post.title}
          </h1>
        </div>
        {isAuthor && (
          <div className="absolute right-6 top-6 flex space-x-2">
            <Link to={`/edit-post/${post.$id}`}>
              <Button  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Edit
              </Button>
            </Link>
            <Button  onClick={deletePost} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Delete
            </Button>
          </div>
        )}
      </div>
      <Container>
        <div className="py-16 max-w-4xl mx-auto text-lg leading-relaxed text-gray-300 space-y-6">
          {parse(post.content)}
        </div>
        {/* Display the author's name and post date */}
        <div className="text-gray-400 mt-8">
          <p>Written by: {post.userName}</p>
          <p>Published on: {postDate}</p>
        </div>
      </Container>
    </div>
  );
}
