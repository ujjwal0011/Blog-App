import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="relative z-10 mx-auto w-full max-w-md bg-black rounded-lg p-8 border border-gray-700 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-white">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-white hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="w-full text-whit transition duration-200"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
