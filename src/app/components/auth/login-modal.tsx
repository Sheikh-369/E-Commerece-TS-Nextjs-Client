// components/LoginModal.tsx
"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Status } from "@/lib/global-type/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { userLogin } from "@/lib/store/auth/auth-slice";
interface AuthModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void; // 🔹 Added this prop
}

const LoginModal: React.FC<AuthModalProps> = ({
  onClose,
  onSwitchToRegister,
  onSwitchToForgotPassword, // 🔹 Receive the prop
}) => {
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector((store) => store.auth);

  interface LoginFormData {
    userEmail: string;
    userPassword: string;
  }

  const [userLoginData, setUserLoginData] = useState<LoginFormData>({
    userEmail: "",
    userPassword: "",
  });

  const [error, setError] = useState("");

  const handleLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Google sign-in will be implemented later
  const handleGoogleSignIn = async () => {
    setError("Google sign-in is not available yet.");
  };

  const handleLoginDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userEmail, userPassword } = userLoginData;

    if (!userEmail || !userPassword) {
      setError("Email and password are required");
      return;
    }

    try {
      dispatch(userLogin(userLoginData));
      onClose();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // Removed duplicate Google login function as we're using handleGoogleSignIn

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-all duration-200 mb-6"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        {/* OR Separator */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-t border-gray-200" />
          <span className="px-4 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-200" />
        </div>

        <form className="space-y-4" onSubmit={handleLoginDataSubmission}>
          <div className="space-y-1">
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={userLoginData.userEmail}
              onChange={handleLoginData}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              name="userPassword"
              placeholder="Password"
              value={userLoginData.userPassword}
              onChange={handleLoginData}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loginStatus === Status.LOADING}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loginStatus === Status.LOADING ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          {loginStatus === Status.SUCCESS && (
            <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg">
              Login successful!
            </div>
          )}
        </form>

        {/* Switch to Register */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
