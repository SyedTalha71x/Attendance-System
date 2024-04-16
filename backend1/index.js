import express from 'express'
import mongoose from 'mongoose';
import UserRoutes from './Routes/userroutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = 4001;

const connectDB = async () => {
    try {
        const DATABASECONNECTION = 'mongodb+srv://syedtalha102x:Talha12$@cluster0.ap6u2dd.mongodb.net/Attendance?retryWrites=true&w=majority&appName=Cluster0'
        if (!DATABASECONNECTION) {
            console.log('Connection is not provided');
        }
        if (DATABASECONNECTION) {
            await mongoose.connect(DATABASECONNECTION);
            console.log("Connection Successful");
        } else {
            console.log('Failed to Connect');
        }
    } catch (error) {
        console.error(error);
    }
}
connectDB();

app.use('/api/user', UserRoutes)

app.get("/", (req, res) => {
    res.send("Hello Backend is Working Fine");
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
