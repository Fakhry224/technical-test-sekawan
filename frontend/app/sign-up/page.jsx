"use client";

import Image from "next/image";
import React, { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password do not match!");
      return;
    }

    try {
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_API_BASE_URL}/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful!");

        window.location.href = "/login";
      } else {
        setError(data.message || "Sign up failed!");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError("An error occured. Please try again.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex bg-green-5 rounded-3xl drop-shadow-lg p-10 gap-10">
        <div className="">
          <Image
            src="/illustrations/signup-illustration.svg"
            alt="ilustrasi login"
            width={450}
            height={450}
          />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <h1 className="text-6xl font-bold text-green-1 text-center mb-4">
              Sign Up
            </h1>
            <span className="h-[1px] w-full bg-black"></span>
          </div>
          <form
            className="space-y-4 w-96 flex flex-col"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email"
                className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
                required
              />
              <span
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? (
                  <Image
                    src="/icons/eye-off-icon.svg"
                    alt="icon mata"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/icons/eye-icon.svg"
                    alt="icon tutup mata"
                    width={24}
                    height={24}
                  />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-Enter Your Password"
                className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
                required
              />
              <span
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? (
                  <Image
                    src="/icons/eye-off-icon.svg"
                    alt="icon mata"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/icons/eye-icon.svg"
                    alt="icon tutup mata"
                    width={24}
                    height={24}
                  />
                )}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="self-end">
              have account? Login{" "}
              <span className="text-blue-1 underline cursor-pointer">
                <a href="/login">here</a>
              </span>
            </p>

            {/* Tombol login */}
            <button
              type="submit"
              className="self-end w-full bg-green-1 text-green-5 font-semibold py-3 rounded-lg shadow-md hover:bg-green-2 focus:outline-none focus:ring-2 focus:ring-green-3"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
