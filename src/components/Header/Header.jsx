import React, { useEffect, useState } from "react";
import { Container, LogoutButton } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [displayName, setDisplayName] = useState("User");
  const navigate = useNavigate();

  // Update the display name when userData or authStatus changes
  useEffect(() => {
    if (authStatus && userData && userData.name) {
      setDisplayName(userData.name);  // Set to the current user's name
    } else {
      setDisplayName("User");  // Reset to default when logged out or no user data
    }
  }, [userData, authStatus]);  // Re-run the effect when userData or authStatus changes

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="relative bg-black text-gray-300 py-4 shadow-lg border-b border-gray-900 overflow-hidden">
      <div className="relative z-10">
        <Container>
          <nav className="flex items-center justify-between space-x-6">
            <div className="flex-1 flex justify-center">
              <h1 className="text-2xl font-bold text-white">Blog</h1>
            </div>
            <div className="flex-1 flex justify-center">
              <ul className="flex space-x-8">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-6 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <div className="flex-1 flex justify-center items-center">
              {authStatus && (
                <>
                  <span className="text-gray-300 px-4">
                    Welcome, {displayName}
                  </span>
                  <li>
                    <LogoutButton />
                  </li>
                </>
              )}
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
