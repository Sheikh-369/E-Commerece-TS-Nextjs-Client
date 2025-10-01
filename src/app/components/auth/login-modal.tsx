// components/LoginModal.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Status } from "@/lib/global-type/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import { IUserData } from "@/lib/store/auth/auth-slice-type";
import { userLogin } from "@/lib/store/auth/auth-slice";

interface AuthModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.auth);

  const [userLoginData, setUserLoginData] = useState<IUserData>({
    userEmail: "",
    userPassword: "",
    userName: "", // not needed here, but kept for same structure
    token: "",
  });

  const [error, setError] = useState("");

  const handleLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
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
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={status === Status.LOADING}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {status === Status.LOADING ? "Logging in..." : "Login"}
          </button>

          {status === Status.SUCCESS && (
            <p className="text-green-600 text-sm text-center">Login successful!</p>
          )}
          {status === Status.ERROR && (
            <p className="text-red-600 text-sm text-center">Invalid credentials or server error.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
