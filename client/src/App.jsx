import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ApplyLeaveForm from './components/Employee/ApplyLeaveForm';
import LeaveHistory from './components/Employee/LeaveHistory';

function App() {
  const {user} = useSelector((state)=> state.auth);

  const ProtectedRoute = ({children, role})=>{
    if(!user)
        return <Navigate to='/login'/>
    if(role && user.role !== role)
        return <Navigate to='/'/>
    return children;
  };

  return (
    <>
    <Routes>

      <Route path='/' element={<Navigate to={user?.role === 'manager' ? '/admin':'/dashboard/apply'}/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>}/>

      <Route 
        path='/dashboard' 
        element={<ProtectedRoute role='employee'><EmployeeDashboard/></ProtectedRoute>}
      >
        <Route path="apply" element={<ApplyLeaveForm/>}/>
        <Route path='history' element={<LeaveHistory/>}/>
      
      </Route>

      <Route path='/admin' element={<ProtectedRoute role="manager"><AdminDashboard/></ProtectedRoute>}/>
    
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
