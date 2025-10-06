// 'use client';
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Provider } from "react-redux";
// import store from "@/lib/store/store";
// import Navbar from "./components/navbar/navbar";
// import { usePathname } from "next/navigation";
// import { useAppDispatch } from "@/lib/store/auth/hooks";
// import { useEffect } from "react";
// import { loadUserFromStorage } from "@/lib/store/auth/auth-slice";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();
//   const dispatch=useAppDispatch()



//   // List all routes where navbar should be hidden
//   const hideNavbarRoutes = ["/admin", "/admin/products", "/admin/settings","/user"];

//   const shouldHideNavbar = hideNavbarRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   useEffect(() => {
//     dispatch(loadUserFromStorage());
//   }, [dispatch]);

//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <Provider store={store}>
//           {!shouldHideNavbar && <Navbar />}
//           {children}
//         </Provider>
//       </body>
//     </html>
//   );
// }


//part 2


'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import Navbar from "./components/navbar/navbar";
import ReduxInitializer from "./components/ReduxInitializer"; // 👈 import new component
import { usePathname } from "next/navigation";

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

  const hideNavbarRoutes = ["/admin", "/admin/products", "/admin/settings", "/user"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <ReduxInitializer /> {/* ✅ Redux-safe component */}
          {!shouldHideNavbar && <Navbar />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
