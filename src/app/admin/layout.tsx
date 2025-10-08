"use client";
import React, { ReactNode } from "react";
import Sidebar from "../components/admin-dashboard/sidebar/sidebar";

interface Props {
  children: ReactNode;
}

const AdminDashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <Sidebar />

      {/* Right Side: header + children */}
      <div className="ml-64 min-h-screen bg-gray-50">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-sky-700 to-sky-600 shadow-sm border-b border-sky-800">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  Dashboard Overview
                </h1>
                <p className="text-yellow-200 text-sm mt-1">
                  Welcome back, here&apos;s what&apos;s happening today
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
        </header>
        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
