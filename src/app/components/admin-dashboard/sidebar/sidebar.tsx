'use client';
import Link from 'next/link';
import React from 'react';

function Sidebar() {
  const sidebarItems = [
    { name: "Users", icon: "users", path: "/admin/users" },
    { name: "Products", icon: "shopping-bag", path: "/admin/products" },
    { name: "Category", icon: "tags", path: "/admin/categories" },
    { name: "Order", icon: "shopping-cart", path: "/admin/order" },
  ];

  return (
    <div>
      {/* Include Font Awesome and meta */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Cordes Admin Dashboard</title>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sky-600 to-sky-700 shadow-xl z-50">
        <div className="flex items-center justify-center h-16 bg-sky-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <i className="fas fa-cube text-sky-700 text-lg" />
            </div>
            <span className="text-white text-xl font-bold">Cordes</span>
          </div>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center px-4 py-3 text-white hover:bg-sky-800 hover:text-yellow-200 rounded-lg transition-colors group"
              >
                <i
                  className={`fas fa-${item.icon} mr-3 text-yellow-300 group-hover:text-yellow-200`}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Admin Profile */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-sky-800 rounded-lg p-4 flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/17003/17003310.png"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-white text-sm font-medium">John Admin</p>
              <p className="text-yellow-200 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Shift */}
      {/* <div className="ml-64"> */}
        {/* Top Header */}
        {/* <header className="bg-gradient-to-r from-sky-700 to-sky-600 shadow-sm border-b border-sky-800">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
                <p className="text-yellow-200 text-sm mt-1">
                  Welcome back, here's what's happening today
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-red-500 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-transparent outline-none text-white bg-sky-600 placeholder-yellow-200"
                  />
                </div>
                <div className="relative">
                  <button className="p-2 text-white hover:text-yellow-200 hover:bg-red-700 rounded-lg transition-colors">
                    <i className="fas fa-bell text-xl" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-red-700 text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header> */}

        {/* Add your page content here (children etc.) */}
      {/* </div> */}
    </div>
  );
}

export default Sidebar;
