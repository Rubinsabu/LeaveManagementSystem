import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const Header = () => {

    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-30">
      <h1 className="text-2xl font-semibold tracking-wide">Leave Management System</h1>
      {user && (
        <button
          onClick={() => {
            dispatch(logout());
            navigate('/login');
          }}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header