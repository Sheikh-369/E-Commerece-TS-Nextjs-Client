"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { resetPassword } from "@/lib/store/auth/auth-slice";
import { Status } from "@/lib/global-type/type";
import { IAuthFormData } from "@/lib/store/auth/auth-slice-type";

interface ResetPasswordModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  onClose,
  onSwitchToLogin,
}) => {
  const dispatch = useAppDispatch();
  const { resetPasswordStatus } = useAppSelector((store) => store.auth);

  const [formData, setFormData] = useState<IAuthFormData>({
    userEmail: "",
    OTP: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { userEmail, OTP, newPassword } = formData;

    if (!userEmail?.trim() || !String(OTP).trim() || !newPassword?.trim()) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    dispatch(resetPassword(formData));
  };

  // Redirect to login modal on success
  useEffect(() => {
    if (resetPasswordStatus === Status.SUCCESS) {
      // You can optionally delay closing/resetting status here if you want a message shown before redirect
      onSwitchToLogin();
    }
  }, [resetPasswordStatus, onSwitchToLogin]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative">
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
          Reset Your Password
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              htmlFor="userEmail"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              value={formData.userEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="OTP" className="text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              id="OTP"
              name="OTP"
              type="text"
              placeholder="Enter the OTP"
              value={formData.OTP}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={resetPasswordStatus === Status.LOADING}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {resetPasswordStatus === Status.LOADING ? (
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
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          {resetPasswordStatus === Status.ERROR && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              Failed to reset password. Please check your input and try again.
            </div>
          )}
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            Back to{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
