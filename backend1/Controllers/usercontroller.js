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