import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {applyLeave} from '../../features/leaves/leaveSlice'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyLeaveForm = () => {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        type: 'casual',
        reason: ''
      });
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const result = await dispatch(applyLeave(formData));
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('Leave application submitted successfully!', {
                  position: "top-right",
                  autoClose: 3000,
            });
            setFormData({ fromDate: '', toDate: '', type: 'casual', reason: '' });
            }else if(result.meta.requestStatus === 'rejected'){
                toast.error(result.payload?.message || 'Failed to submit leave application', {
                    position: "top-right",
                    autoClose: 3000,
                  });
            }
        }catch (error) {
            toast.error('An unexpected submition error occurred', {
              position: "top-right",
              autoClose: 3000,
            });
          }      
    };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Apply for Leave</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={formData.fromDate}
              onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={formData.toDate}
              onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        {/* Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
          </select>
        </div>
        {/* Reason */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            required
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow transition"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}

export default ApplyLeaveForm