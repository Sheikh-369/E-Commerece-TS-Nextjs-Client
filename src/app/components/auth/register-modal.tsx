// components/RegisterModal.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Status } from "@/lib/global-type/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import { IUserData } from "@/lib/store/auth/auth-slice-type";
import { userRegister } from "@/lib/store/auth/auth-slice";

interface AuthModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.auth); // fix here

  const [userRegisterData, setUserRegisterData] = useState<IUserData>({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const [error, setError] = useState("");

  const handleRegisterData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserRegisterData({
      ...userRegisterData,
      [name]: value,
    });
  };

  const handleRegisterDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userName, userEmail, userPassword } = userRegisterData;

    if (!userName || !userEmail || !userPassword) {
      setError("All fields are required");
      return;
    }

    setError("");
    dispatch(userRegister(userRegisterData));
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

        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

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
            disabled={status === Status.LOADING}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {status === Status.LOADING ? "Registering..." : "Register"}
          </button>

          {status === Status.SUCCESS && (
            <p className="text-green-600 text-sm text-center">Registration successful!</p>
          )}
          {status === Status.ERROR && (
            <p className="text-red-600 text-sm text-center">Something went wrong.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
