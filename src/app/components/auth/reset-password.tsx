"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import { resetPassword } from "@/lib/store/auth/auth-slice";
import { Status } from "@/lib/global-type/type";
import { IUserData } from "@/lib/store/auth/auth-slice-type";

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

  const [formData, setFormData] = useState<Partial<IUserData>>({
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
    dispatch(resetPassword(formData as IUserData));
  };

  // Redirect to login modal on success
  useEffect(() => {
    if (resetPasswordStatus === Status.SUCCESS) {
      // You can optionally delay closing/resetting status here if you want a message shown before redirect
      onSwitchToLogin();
    }
  }, [resetPasswordStatus, onSwitchToLogin]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="userEmail"
            type="email"
            placeholder="Enter your email"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="OTP"
            type="text"
            placeholder="Enter the OTP"
            value={formData.OTP}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={resetPasswordStatus === Status.LOADING}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {resetPasswordStatus === Status.LOADING ? "Resetting..." : "Reset Password"}
          </button>

          {resetPasswordStatus === Status.ERROR && (
            <p className="text-red-600 text-sm text-center">
              Failed to reset password. Check your input.
            </p>
          )}
        </form>

        <p className="text-sm text-center mt-4">
          Back to{" "}
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

export default ResetPasswordModal;
