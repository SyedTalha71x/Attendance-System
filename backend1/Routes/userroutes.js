import { signup, login, getuser, addUser, updateUser, deleteUser, fetchalluser, attendanceMark, sampleEntry } from "../Controllers/usercontroller.js";
import express from 'express';
import fetchuser from '../Middleware/fetchuser.js'

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/get', fetchuser, getuser);
router.post('/adduser', fetchuser, addUser);
router.put('/updateuser/:id', fetchuser, updateUser);
router.delete('/deleteuser/:id', fetchuser, deleteUser);
router.get('/fetchallusers', fetchalluser);
router.post('/Markattendance', attendanceMark);
router.post('/sampleentry', sampleEntry);

export default router;