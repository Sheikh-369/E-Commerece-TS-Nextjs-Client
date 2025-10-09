// components/LoginModal.tsx
"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Status } from "@/lib/global-type/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { IUserData } from "@/lib/store/auth/auth-slice-type";
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

  const [userLoginData, setUserLoginData] = useState<IUserData>({
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

  const handleLoginDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userEmail, userPassword } = userLoginData;

    if (!userEmail || !userPassword) {
      setError("Email and password are required");
      return;
    }

    setError("");
    dispatch(userLogin(userLoginData));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleLoginDataSubmission}>
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={userLoginData.userEmail}
            onChange={handleLoginData}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={userLoginData.userPassword}
            onChange={handleLoginData}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <div className="text-right text-sm">
            <button
              type="button"
              onClick={onSwitchToForgotPassword} // 🔹 Trigger forgot password modal
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loginStatus === Status.LOADING}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {loginStatus === Status.LOADING ? "Logging in..." : "Login"}
          </button>

          {loginStatus === Status.SUCCESS && (
            <p className="text-green-600 text-sm text-center">
              Login successful!
            </p>
          )}
          {loginStatus === Status.ERROR && (
            <p className="text-red-600 text-sm text-center">
              Invalid credentials or server error.
            </p>
          )}
        </form>

        {/* Switch to Register */}
        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
