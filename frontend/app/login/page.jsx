"use client";

import Image from "next/image";
import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const users = [
    { email: "approver2@example.com", password: "18p3Wj8vbwEK" },
    { email: "approver1@example.com", password: "wv2HEiVSY3fq" },
    { email: "admin@example.com", password: "wMk0A8UsovPa" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      alert("Login successful!");
      if (user.email === "admin@example.com") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/approver";
      }
    } else {
      setError("Invalid email or password!");
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
