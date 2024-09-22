import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import PostSkeleton from "../components/PostSkeleton";
import { setPosts } from "../store/postSlice";
import { isLoggedIn } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const loggedIn = useSelector(isLoggedIn);
  const navigate = useNavigate();

  if (!loggedIn) {
    navigate("/notLoggedIn");
  }

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = !posts.length;

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        dispatch(setPosts(posts.documents));
      }
    });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="relative w-full py-8 min-h-screen bg-black overflow-hidden">
        <Container>
          <div className="relative z-10 flex flex-wrap justify-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-2 w-1/4">
                <PostSkeleton />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative w-full py-8 bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
