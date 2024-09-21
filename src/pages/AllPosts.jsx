import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import service from "../appwrite/config";
import PostSkeleton from "../components/PostSkeleton";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-2 w-1/4">
                  <PostSkeleton />
                </div>
              ))
            : posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard
                    $id={post.$id}
                    title={post.title}
                    featuredImage={post.featuredImage}
                    userName={post.userName}
                    createdAt={post.createdAt}
                  />
                </div>
              ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
