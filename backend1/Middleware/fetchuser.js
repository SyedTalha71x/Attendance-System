import CryptoJS from "crypto-js";
import User from "../Models/User.js";

const Secret = '3699018882';

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    try {
        if (!token) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const bytes = CryptoJS.AES.decrypt(token, Secret);
        const decoded = bytes.toString(CryptoJS.enc.Utf8);

        if (!decoded) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const { email } = JSON.parse(decoded);
        const user = await User.findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default fetchuser;
