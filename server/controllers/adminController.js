import LeaveRequest from '../models/LeaveRequest.js';
import User from '../models/User.js';
import { sendStatusNotification } from '../utils/mailer.js';

export const getAllLeaves = async(req,res)=>{
    
    try{
        const {employeeId, status} = req.query;
        const query = {};
        if(employeeId)  query.employeeId = employeeId;
        if(status)  query.status = status;

        const leaves = await LeaveRequest.find(query).populate('employeeId','name email');
        res.json(leaves);

    }catch(error){
        console.error('Failed to get all leaves',error);
    }
    
}

export const updateLeaveStatus = async(req,res)=>{
    try{
        const {status} = req.body;
        const leave = await LeaveRequest.findByIdAndUpdate(req.params.id, {status},{new:true}).populate('employeeId', 'name email');
        
        try {
            await sendStatusNotification(leave.employeeId.email, status, leave);
          } catch (notificationError) {
            console.error('Notification failed but leave was updated:', notificationError);
          }
        

        res.json(leave);

    }catch(error){
        console.error('Failed to update leave',error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getEmployeeLeaves = async(req,res)=>{
    try{
        const leaves = await LeaveRequest.find({employeeId: req.params.id});
        res.json(leaves);
    }catch(error){
        console.error('Failed to get employee leave',error);
    }  
};