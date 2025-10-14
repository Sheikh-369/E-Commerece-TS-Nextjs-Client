"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Status } from "@/lib/global-type/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { IAuthFormData } from "@/lib/store/auth/auth-slice-type";
import { userRegister } from "@/lib/store/auth/auth-slice";

interface AuthModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<AuthModalProps> = ({
  onClose,
  onSwitchToLogin,
}) => {
  const dispatch = useAppDispatch();
  const { registerStatus } = useAppSelector((store) => store.auth);

  const [userRegisterData, setUserRegisterData] = useState<IAuthFormData>({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhoneNumber: "",
  });

  const [error, setError] = useState("");

  const handleRegisterData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterDataSubmission = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { userName, userEmail, userPassword, userPhoneNumber } =
      userRegisterData;

    if (!userName || !userEmail || !userPassword || !userPhoneNumber) {
      setError("All fields are required");
      return;
    }

    setError("");

    // Dispatch registration thunk (you don't wait for a result here)
    dispatch(userRegister(userRegisterData));
  };

  // ✅ Listen for successful registration in Redux state
  useEffect(() => {
    if (registerStatus === Status.SUCCESS) {
      onClose(); // Close register modal
      onSwitchToLogin(); // Open login modal
    }
  }, [registerStatus, onClose, onSwitchToLogin]);

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
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleRegisterDataSubmission}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={userRegisterData.userName}
            onChange={handleRegisterData}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={userRegisterData.userEmail}
            onChange={handleRegisterData}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="userPhoneNumber"
            placeholder="Phone Number"
            value={userRegisterData.userPhoneNumber}
            onChange={handleRegisterData}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={userRegisterData.userPassword}
            onChange={handleRegisterData}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={registerStatus === Status.LOADING}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {registerStatus === Status.LOADING ? "Registering..." : "Register"}
          </button>

          {registerStatus === Status.ERROR && (
            <p className="text-red-600 text-sm text-center">
              Something went wrong. Try again.
            </p>
          )}
        </form>

        {/* Switch to Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
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

export default RegisterModal;
