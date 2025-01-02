"use client";

import Image from "next/image";
import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        window.location.href = "/";
      } else {
        setError(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex bg-green-5 rounded-3xl drop-shadow-lg p-10 gap-10">
        <div className="">
          <Image
            src="/illustrations/login-illustration.svg"
            alt="ilustrasi login"
            width={450}
            height={450}
          />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <h1 className="text-6xl font-bold text-green-1 text-center mb-4">
              Login
            </h1>
            <span className="h-[1px] w-full bg-black"></span>
          </div>
          <form
            className="space-y-4 w-96 flex flex-col"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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

            {error && <p className="text-red-500 text-center">{error}</p>}

            <p className="self-end">
              Don't have account? Sign Up{" "}
              <span className="text-blue-1 underline cursor-pointer">
                <a href="/sign-up">here</a>
              </span>
            </p>

            {/* Tombol login */}
            <button
              type="submit"
              className="self-end w-full bg-green-1 text-green-5 font-semibold py-3 rounded-lg shadow-md hover:bg-green-2 focus:outline-none focus:ring-2 focus:ring-green-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
