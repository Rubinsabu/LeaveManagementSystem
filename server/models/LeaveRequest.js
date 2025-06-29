import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
    employeeId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    fromDate: Date,
    toDate: Date,
    type: String,
    reason: String,
    status: {
        type: String, enum:['Pending','Approved','Rejected'], default:'Pending'
    },
},{timestamps: true});

export default mongoose.model('LeaveRequest', leaveRequestSchema);