import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { clearPosts } from '../../store/postSlice'; // Import clearPosts
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(clearPosts()); // Clear posts on logout
      navigate("/notloggedin"); // Redirect to login page after logout
    });
  };

  return (
    <button
      className="inline-block px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-600 rounded-xl hover:bg-gray-900 hover:text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
