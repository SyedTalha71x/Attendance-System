import User from '../Models/User.js';
import CryptoJS from 'crypto-js';

const Secret = '3699018882';

export const signup = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: 'Sorry a user is already exists' });
        }
        const hashpass = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex)

        const token = CryptoJS.AES.encrypt(JSON.stringify({ email: req.body.email }), Secret).toString();

        let newRole;
        if (req.body.role === 'admin') {
            newRole = 'admin';
        }
        else {
            newRole = 'user';
        }
        user = await User({
            email: req.body.email,
            name: req.body.name,
            password: hashpass,
            role: newRole,
        })
        await user.save();
        const AuthToken = token;
        res.status(200).json({ message: 'User has been created', AuthToken, user });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Sorry a user is already exists' })
        }
        const hashpass = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
        if (hashpass !== user.password) {
            return res.status(401).json({ message: 'Invalid' })
        }
        const token = CryptoJS.AES.encrypt(JSON.stringify({ email }), Secret).toString();
        const AuthToken = token;
        res.status(200).json({ AuthToken });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' });
    }
}

export const getuser = async (req, res) => {
    try {
        const userEmail = req.user.email
        const user = await User.findOne({ email: userEmail });
        res.status(200).json(user)
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' });
    }
}

export const addUser = async (req, res) => {
    try {
        const { name, email, password, designation, lineancytime, role, days, arrivaltime, workinghours } = req.body;
        const newUser = new User({
            name, email, password, designation, lineancytime, role, days, arrivaltime, workinghours
        });
        await newUser.save();
        res.status(200).json({ message: 'User has been created', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email, password, designation, lineancytime, role, days, arrivaltime, workinghours } = req.body;
        let newUser = {};
        if (name) {
            newUser.name = name;
        }
        if (email) {
            newUser.email = email;
        }
        if (password) {
            newUser.password = password;
        }
        if (designation) {
            newUser.designation = designation;
        }
        if (lineancytime) {
            newUser.lineancytime = lineancytime;
        }
        if (role) {
            newUser.role = role;
        }
        if (days) {
            newUser.days = days;
        }
        if (arrivaltime) {
            newUser.arrivaltime = arrivaltime;
        }
        if (workinghours) {
            newUser.workinghours = workinghours
        }

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(401).json({ message: 'Not found' });
        }
        user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.status(200).json({ message: 'User has been updated', user })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        let removeuser = await User.findById(req.params.id);
        if (!removeuser) {
            return res.status(401).json({ message: 'Not found' });
        }
        removeuser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User has been deleted' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const fetchalluser = async (req, res) => {
    try {
        let fetchuser = await User.find({ role: 'user' }).sort({ _id: -1 })
        res.status(200).json({ message: 'Fetch al users from records', fetchuser });
    }
    catch (error) {
        console.log(error);
    }
}