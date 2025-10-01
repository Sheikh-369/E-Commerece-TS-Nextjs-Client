"use client";
import React, { useState } from "react";
import RegisterModal from "../auth/register-modal";
import LoginModal from "../auth/login-modal";
import ForgotPasswordModal from "../auth/forgot-password-modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import { userLogout } from "@/lib/store/auth/auth-slice";
import ResetPasswordModal from "../auth/reset-password";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const token = user?.token;

  const [authModalType, setAuthModalType] = useState<
    "login" | "register" | "forgot-password" | "reset-password" | null
  >(null);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            E-Shop
          </div>

          <div className="hidden md:flex gap-6 text-gray-700">
            <a href="/" className="hover:text-blue-500">Home</a>
            <a href="/shop" className="hover:text-blue-500">Shop</a>
            <a href="/cart" className="hover:text-blue-500">Cart</a>
            <a href="/about" className="hover:text-blue-500">About</a>
          </div>

          <div className="flex items-center gap-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalType("login")}
                  className="text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModalType("register")}
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {authModalType === "register" && (
        <RegisterModal
          onClose={() => setAuthModalType(null)}
          onSwitchToLogin={() => setAuthModalType("login")}
        />
      )}

      {authModalType === "login" && (
        <LoginModal
          onClose={() => setAuthModalType(null)}
          onSwitchToRegister={() => setAuthModalType("register")}
          onSwitchToForgotPassword={() => setAuthModalType("forgot-password")}
        />
      )}

      {authModalType === "forgot-password" && (
        <ForgotPasswordModal
          onClose={() => setAuthModalType(null)}
          onSwitchToLogin={() => setAuthModalType("login")}
          onSwitchToResetPassword={() => setAuthModalType("reset-password")}  // <-- here!
        />
      )}

      {authModalType === "reset-password" && (
        <ResetPasswordModal
          onClose={() => setAuthModalType(null)}
          onSwitchToLogin={() => setAuthModalType("login")}
        />
      )}
    </>
  );
};

export default Navbar;
