"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SERVER_IP } from "@/api/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "@/api/login";
import { storeAuthToken } from "@/utils/authStorage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password || !isHuman) {
      setError("Please fill out all fields and confirm you are not a bot.");
      return;
    }
    try {
      const data = await login(username, password);
      storeAuthToken(data.token);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto mb-6 w-16 h-16">
            <Image
              src="/favicon.png"
              alt="Logo"
              width={64}
              height={64}
              priority
              className="mx-auto"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Welcome back!</h1>
          <p className="text-gray-600 text-sm font-medium mb-6">
            Access to the CMS at{" "}
            <button className="text-blue-600 font-semibold">{SERVER_IP}</button>
          </p>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <div className="space-y-5 text-sm">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Username</label>
            <input
              type="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notABot"
              checked={isHuman}
              onChange={(e) => setIsHuman(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="notABot" className="ml-2 text-gray-600 text-sm">
              I am not a bot
            </label>
          </div>
        </div>
        <button
          onClick={handleLogin}
          disabled={!username || !password || !isHuman}
          className={`mt-8 w-full py-2 rounded-md font-medium ${
            !username || !password || !isHuman
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
}
