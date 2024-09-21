import { Container } from "../components/index";
import { Link } from "react-router-dom";

function NotLoggedIn() {
 

 
    return (
      <div className="relative w-full py-8 min-h-screen bg-black overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Container */}
        <Container>
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 text-center">
            {/* Card for empty posts message */}
            <div className="bg-neutral-900 border border-gray-800 text-gray-100 p-8 rounded-lg shadow-lg w-full max-w-2xl">
              {/* Main heading */}
              <h2 className="text-2xl font-bold mb-4">No posts available yet!</h2>
              
              {/* Fun blog-related facts */}
              <div className="text-gray-400 text-lg leading-relaxed">
                <p className="mb-4">
                  Did you know that the first blog ever created was by Justin Hall in 1994? Blogging has since evolved into one of the most powerful forms of communication on the internet.
                </p>
                <p className="mb-4">
                  Blogs are a great way to share your knowledge, tell your story, or start meaningful conversations. Whether you're a writer, reader, or just looking for inspiration, blogs offer something for everyone.
                </p>
                <p>
                  Interested in joining millions of others in the blogging community? Log in to explore unique perspectives, insightful stories, and useful tips from writers around the world.
                </p>
              </div>

              {/* Call-to-action */}
              <br />
              <div className="mt-8 ">
                <p className="text-lg font-semibold mb-4">
                  Please <Link to={"/login"} className="text-blue-400">login</Link> to check out our posts!
                </p>
              
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
}

export default NotLoggedIn;
