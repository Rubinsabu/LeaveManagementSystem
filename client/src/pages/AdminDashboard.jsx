import LeaveRequestsTable from '../components/Admin/LeaveRequestsTable';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

import React from 'react'

const AdminDashboard = () => {
  return (
    <DashboardLayout>
        <LeaveRequestsTable/>
    </DashboardLayout>
  )
}

export default AdminDashboard