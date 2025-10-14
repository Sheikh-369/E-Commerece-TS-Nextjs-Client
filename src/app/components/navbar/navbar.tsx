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
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../searchbar/searchbar";
import { signInWithGoogle, signOut } from "@/lib/supabaseClient";
import Image from "next/image";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  //for live global search
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const user = useAppSelector((store) => store.auth.user);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(userLogout());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // ✅ dynamic search
  const handleSearch = (query: string) => {
    setQuery(query);
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const token = user?.token;
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
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              E-Shop
            </Link>
          </div>

          {/* Center: Search + Links */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 px-4">
            <div className="w-full max-w-md hidden md:block">
              <SearchBar
                value={query}
                onSearch={handleSearch}
                placeholder="Search for products..."
              />
            </div>
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium ${
                  pathname === "/" ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600 transition-colors duration-200 relative group`}
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
              <Link
                href="/categories"
                className={`text-sm font-medium ${
                  pathname === "/categories" ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600 transition-colors duration-200 relative group`}
              >
                Categories
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
              <Link
                href="/products"
                className={`text-sm font-medium ${
                  pathname === "/products" ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600 transition-colors duration-200 relative group`}
              >
                Products
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium ${
                  pathname === "/about" ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600 transition-colors duration-200 relative group`}
              >
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Right: Cart + Auth */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <button
              onClick={() => {
                if (token) {
                  router.push("/user/dashboard/cart");
                } else {
                  setAuthModalType("login");
                }
              }}
              className="relative inline-flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ShoppingCart
                size={24}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
                  {user.avatar_url && (
                    <Image
                      src={user.avatar_url}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-white shadow-sm"
                    />
                  )}
                  <div className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {user.name || user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAuthModalType("login")}
                  className="text-sm px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Sign in
                </button>
                <button
                  onClick={() => setAuthModalType("register")}
                  className="text-sm px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Register
                </button>
              </div>
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
