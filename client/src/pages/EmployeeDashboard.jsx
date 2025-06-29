import React from 'react'
import ApplyLeaveForm from '../components/Employee/ApplyLeaveForm';
import LeaveHistory from '../components/Employee/LeaveHistory';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/Dashboard/DashboardLayout';

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <Outlet/>
    </DashboardLayout>
  );
}

export default EmployeeDashboard