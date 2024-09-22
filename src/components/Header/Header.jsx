import React, { useEffect, useState } from "react";
import { Container, LogoutButton } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [displayName, setDisplayName] = useState("User");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (authStatus && userData && userData.name) {
      setDisplayName(userData.name);
    } else {
      setDisplayName("User");
    }
  }, [userData, authStatus]);

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
    <header className="relative bg-black text-gray-300 py-4 shadow-lg border-b border-gray-900">
      <div className="relative z-10">
        <Container>
          <nav className="flex items-center justify-between">
            <div className="flex-1 flex justify-start">
              <h1 className="text-2xl font-bold text-white">Bliss Note</h1>
            </div>

            <div className="lg:hidden flex-1 flex justify-end">
              <button
                className="text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>

            <div
              className={`lg:flex flex-1 justify-center items-center lg:space-x-8 transition-all duration-300 ${
                isMenuOpen ? "block" : "hidden lg:block"
              }`}
            >
              <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            navigate(item.slug);
                          }}
                          className="px-6 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 transition-colors duration-200"
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
              </ul>
            </div>

            <div className="hidden lg:flex flex-1 justify-end items-center">
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

            {authStatus && (
              <div className="lg:hidden flex justify-end items-center mt-4">
                <span className="text-gray-300 px-4">
                  Welcome, {displayName}
                </span>
                <li>
                  <LogoutButton />
                </li>
              </div>
            )}
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
