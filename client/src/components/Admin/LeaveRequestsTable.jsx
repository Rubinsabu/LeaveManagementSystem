import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllLeaves, updateLeaveStatus} from '../../features/admin/adminSlice';

const LeaveRequestsTable = () => {
    
    const dispatch = useDispatch();
    const { allLeaves } = useSelector((state) => state.admin);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        dispatch(fetchAllLeaves());
    }, [dispatch]);
 
    const filteredLeaves = allLeaves.filter(leave =>{
      const nameMatch = leave.employeeId?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter ? leave.status === statusFilter : true;
      return nameMatch && statusMatch;
    })

    const getTotalLeavesByUser = (userId) => {
      return allLeaves.filter(leave => leave.employeeId?._id === userId && leave.status === 'Approved').length;
    };

    const handleStatusChange = (id, status) => {
        dispatch(updateLeaveStatus({ id, status }));
      };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Leave Requests</h2>
      <div className="overflow-x-auto">

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="bg-blue-50">
            <tr>
              {['Employee', 'From', 'To', 'Type', 'Reason', 'Total Leaves','Status', 'Action'].map((header) => (
                <th
                  key={header}
                  className="text-left px-5 py-3 text-sm font-semibold text-gray-600 border-b border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, idx) => (
              <tr key={leave._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="text-left px-5 py-3 text-gray-700 border-b border-gray-200">
                  {leave.employeeId?.name || 'N/A'}
                </td>
                <td className="text-left px-5 py-3 text-gray-700 border-b border-gray-200">
                  {leave.fromDate.slice(0, 10)}
                </td>
                <td className="text-left px-5 py-3 text-gray-700 border-b border-gray-200">
                  {leave.toDate.slice(0, 10)}
                </td>
                <td className="text-left px-5 py-3 text-gray-700 border-b border-gray-200 capitalize">
                  {leave.type}
                </td>
                <td className="text-left px-5 py-3 text-gray-700 border-b border-gray-200 max-w-xs truncate">
                  {leave.reason}
                </td>
                <td className="text-left px-5 py-3 text-gray-700 border-b border-gray-200 capitalize">
                  {getTotalLeavesByUser(leave.employeeId?._id)}
                </td>
                <td className="text-left px-5 py-3 border-b border-gray-200">
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
                <td className="text-left px-5 py-3 border-b border-gray-200">
                  <select
                    value={leave.status}
                    onChange={(e) => handleStatusChange(leave._id, e.target.value)}
                    className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approve</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredLeaves.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaveRequestsTable