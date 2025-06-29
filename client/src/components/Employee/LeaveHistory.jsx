import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchLeaves, cancelLeave} from '../../features/leaves/leaveSlice';

import React from 'react'

const LeaveHistory = () => {

    const dispatch = useDispatch();
    const {leaves, loading, error} = useSelector((state)=>state.leaves);


    useEffect(() => {
        dispatch(fetchLeaves());
      }, [dispatch]);
      
    const handleCancel = (id) =>{
        dispatch(cancelLeave(id));
    };

    const totalApproved = leaves.filter(l => l.status === 'Approved').length;

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div >
  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Leave History</h2>
  <div className="overflow-x-auto">
  <p className="mb-5 font-semibold">Total Approved Leaves: {totalApproved}</p>
    <table className="w-full border border-gray-300 rounded-md overflow-hidden">
      <thead className="bg-blue-50">
        <tr>
          {['From', 'To', 'Type', 'Reason', 'Status', 'Actions'].map((header) => (
            <th
              key={header}
              className="text-left px-4 py-3 text-sm font-semibold text-gray-600 border-b border-gray-300"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {leaves.map((leave, idx) => (
          <tr
            key={leave._id}
            className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className="text-left px-4 py-3 text-gray-700 border-b border-gray-200">
              {leave.fromDate.slice(0, 10)}
            </td>
            <td className="text-left px-4 py-3 text-gray-700 border-b border-gray-200">
              {leave.toDate.slice(0, 10)}
            </td>
            <td className="text-left px-4 py-3 text-gray-700 border-b border-gray-200">
              {leave.type}
            </td>
            <td className="text-left px-4 py-3 text-gray-700 border-b border-gray-200 max-w-xs truncate">
              {leave.reason}
            </td>
            <td className="text-left px-4 py-3 border-b border-gray-200">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  leave.status === 'Approved'
                    ? 'bg-green-100 text-green-800'
                    : leave.status === 'Rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {leave.status}
              </span>
            </td>
            <td className="text-left px-4 py-3 border-b border-gray-200">
              {leave.status === 'Pending' && (
                <button
                  onClick={() => handleCancel(leave._id)}
                  className="text-red-600 hover:text-red-800 font-semibold transition"
                >
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default LeaveHistory