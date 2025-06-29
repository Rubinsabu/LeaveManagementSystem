import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

import React from 'react'

const Sidebar = () => {

    const { user } = useSelector((state) => state.auth);
    return (
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
      <nav className="flex flex-col gap-5 text-gray-700 font-medium">
        {user?.role === 'employee' && (
          <>
            <Link
              to="/dashboard"
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/apply"
              className="hover:text-blue-600 transition-colors"
            >
              Apply Leave
            </Link>
            <Link
              to="/dashboard/history"
              className="hover:text-blue-600 transition-colors"
            >
              Leave History
            </Link>
          </>
        )}
        {user?.role === 'manager' && (
          <Link to="/admin" className="hover:text-blue-600 transition-colors">
            Admin Dashboard
          </Link>
        )}
      </nav>
    </aside>
    )
}

export default Sidebar