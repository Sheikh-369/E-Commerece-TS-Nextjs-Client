"use client";
import React, { useState } from "react";
import RegisterModal from "../auth/register-modal";
import LoginModal from "../auth/login-modal";
import ForgotPasswordModal from "../auth/forgot-password-modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { userLogout } from "@/lib/store/auth/auth-slice";
import ResetPasswordModal from "../auth/reset-password";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const token = user?.token;
  //cart items counter logic
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items ?? []);
  //compute count: sum of quantities (safer than length)
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  const [authModalType, setAuthModalType] = useState<
    "login" | "register" | "forgot-password" | "reset-password" | null
  >(null);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-sky-100 border-b border-gray-200 shadow-sm rounded">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            E-Shop
          </div>

          <div className="hidden md:flex gap-6 text-gray-700">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link href="/shop" className="hover:text-blue-500">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-blue-500">
              Cart
            </Link>
            <Link href="/about" className="hover:text-blue-500">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (token) {
                  router.push("/user/dashboard/cart");
                } else {
                  setAuthModalType("login");
                }
              }}
              className="relative inline-flex items-center"
            >
              <ShoppingCart
                size={22}
                className="text-gray-700 hover:text-blue-600 transition"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
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
          onSwitchToResetPassword={() => setAuthModalType("reset-password")} // <-- here!
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
