"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import Navbar from "./components/navbar/navbar";
import ReduxInitializer from "./components/ReduxInitializer";
import AuthProvider from "./components/auth/auth-provider";
import { usePathname } from "next/navigation";
import Footer from "./components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  //navbar blockage
  const hideNavbarRoutes = [
    "/admin",
    "/admin/products",
    "/admin/settings",
    "/user",
    "/check-out",
  ];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  //footer blockage
  // Define routes where footer should NOT be shown
  const hideFooterRoutes = [
    "/admin",
    "/admin/products",
    "/admin/settings",
    "/user",
    "/check-out",
  ];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200`}
      >
        <Provider store={store}>
          <ReduxInitializer />
          <AuthProvider>
            {!shouldHideNavbar && <Navbar />}
            {children}
            {!shouldHideFooter && <Footer />}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
