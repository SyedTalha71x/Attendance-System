import mongoose, { mongo } from "mongoose";

const SampleSchema = new mongoose.Schema({
    name: { type: String },
    date: { type: Date, default: Date.now }
})

export default mongoose.models.sample || mongoose.model('sample', SampleSchema);