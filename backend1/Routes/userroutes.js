import { signup, login, getuser, addUser, updateUser, getallUsers, deleteUser, weeklyReport, fetchalluser, attendanceMark, fetchallemails, sampleEntry, generateReport, fetchallusers } from "../Controllers/usercontroller.js";
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
router.post('/generatereport/:days', generateReport);
router.get('/fetchall', fetchallusers);
router.get('/fetchallemails', fetchallemails)
router.get('/getallUsers', getallUsers);
router.get('/weeklyReport/:days', weeklyReport)
export default router;