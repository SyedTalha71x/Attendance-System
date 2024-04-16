import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: String },
    lineancytime: { type: Number },
    role: { type: String, default: 'user' },
    days: { type: [String] }
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User;
