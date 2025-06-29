import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";

import React from 'react'

const DashboardLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <main className="ml-64 pt-16 p-8 min-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 h-full">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout