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
      className="inline-bock px-6 py-2 duration-200 hover:bg-gray-900 rounded-xl"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
