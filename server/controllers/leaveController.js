import LeaveRequest from "../models/LeaveRequest.js";
import { sendLeaveNotification } from "../utils/mailer.js";
import User from '../models/User.js'

export const applyLeave = async(req,res)=>{

    try{
        const {fromDate, toDate, type, reason} = req.body;
    const leave = await LeaveRequest.create({
        employeeId: req.user._id,
        fromDate,
        toDate,
        type,
        reason,
    });
    const employee = await User.findById(req.user._id);
    await sendLeaveNotification(employee.name, leave);

    res.status(201).json(leave);
    
    }catch(error){
        console.error('Failed to apply leave',error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMyLeaves = async(req,res)=>{
    
    try{
        const leaves = await LeaveRequest.find({employeeId: req.user._id});
        res.json(leaves);
    }catch(error){
        console.error('Failed to get leaves',error);
    }
}

export const cancelLeave = async(req,res)=>{
    try{
        const leave = await LeaveRequest.findById(req.params.id);
        if(leave.employeeId.toString() !== req.user._id.toString() || leave.status !== 'Pending'){
            return res.status(400).json({message: 'Cannot cancel'});
        }
        await LeaveRequest.findByIdAndDelete(req.params.id);
        res.json({message: 'Leave Cancelled'});

    }catch(error){
        console.error('Failed to cancel leave',error);
    }
}