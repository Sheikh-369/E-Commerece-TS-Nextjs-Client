"use client";

import { Status } from "@/lib/global-type/type";
import { forgotPassword } from "@/lib/store/auth/auth-slice";
import { IUserData } from "@/lib/store/auth/auth-slice-type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface ForgotPasswordModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToResetPassword: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  onClose,
  onSwitchToLogin,
  onSwitchToResetPassword,
}) => {
  const dispatch = useAppDispatch();
  const { forgotPasswordStatus } = useAppSelector((store) => store.auth);

  const [forgotPasswordData, setForgotPasswordData] = useState<IUserData>({
    userEmail: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!forgotPasswordData.userEmail.trim()) {
      setError("Email is required");
      return;
    }

    setError("");
    dispatch(forgotPassword(forgotPasswordData));
  };

  useEffect(() => {
    if (forgotPasswordStatus === Status.SUCCESS) {
      onSwitchToResetPassword(); // ✅ Navigate to Reset Password Modal
    }
  }, [forgotPasswordStatus, onSwitchToResetPassword]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="userEmail"
            type="email"
            placeholder="Enter your email"
            value={forgotPasswordData.userEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={status === Status.LOADING}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {status === Status.LOADING ? "Sending..." : "Send Reset Link"}
          </button>

          {status === Status.ERROR && (
            <p className="text-red-600 text-sm text-center">
              Failed to send reset link.
            </p>
          )}
        </form>

        <p className="text-sm text-center mt-4">
          Remember your password?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
