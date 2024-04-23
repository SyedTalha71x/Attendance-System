import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    arrivetime: { type: Date },
    leavetime: { type: Date },
    ArriveMessage: { type: String },
    LeaveMessage: { type: String }
});

export default mongoose.models.attendance || mongoose.model('attendance', AttendanceSchema);
