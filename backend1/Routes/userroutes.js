import { signup, login, getuser } from "../Controllers/usercontroller.js";
import express from 'express';
import fetchuser from '../Middleware/fetchuser.js'

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/get', fetchuser, getuser);

export default router;