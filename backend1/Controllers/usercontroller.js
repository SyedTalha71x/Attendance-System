import Attendance from '../Models/Attendance.js';
import Sample from '../Models/Sample.js';
import User from '../Models/User.js';
import CryptoJS from 'crypto-js';
import moment from 'moment-timezone';

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

export const sampleEntry = async (req, res) => {
    try {
        const { name } = req.body;
        let a = new Sample({
            name
        })
        await a.save();
        res.status(400).json({ a })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Internal Server Error' })
    }
}

export const attendanceMark = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found in Record' });
        }

        const currentDate = moment().startOf('day');

        const existingAttendanceRecord = await Attendance.findOne({ userId: user._id, arrivetime: { $gte: currentDate }, leavetime: { $ne: null } });

        if (existingAttendanceRecord) {
            return res.status(400).json({ message: 'Attendance record already exists for Current Day' });
        }

        let attendanceRecord = await Attendance.findOne({ userId: user._id, arrivetime: { $gte: currentDate }, leavetime: null });

        const currentTime = moment.tz('Asia/Karachi').utc();
        const companyArrivalTime = moment().tz('Asia/Karachi').set({
            'hour': currentTime.hour(),
            'minute': currentTime.minute(),
        }).utc();

        if (!attendanceRecord) {
            let arrivalMessage;

            const lineancyTime = moment(companyArrivalTime).add(user.lineancytime.minutes, 'minutes');

            if (currentTime.isSameOrBefore(companyArrivalTime)) {
                arrivalMessage = 'User has arrived on time';
            } else if (currentTime.isSame(lineancyTime)) {
                arrivalMessage = 'User arrived but within lineancy time';
            } else {
                arrivalMessage = 'User has arrived too late';
                console.log(currentTime);
            }

            attendanceRecord = new Attendance({
                userId: user._id,
                arrivetime: currentTime,
                leavetime: null,
                ArriveMessage: arrivalMessage,
                LeaveMessage: null
            });

            await attendanceRecord.save();

            // Format arrival time for response
            const formattedArrivalTime = moment.utc(attendanceRecord.arrivetime).format('YYYY-MM-DD HH:mm:ss');

            res.status(200).json({
                attendanceRecord: {
                    userId: attendanceRecord.userId,
                    arrivetime: formattedArrivalTime,
                    leavetime: attendanceRecord.leavetime,
                    ArriveMessage: attendanceRecord.ArriveMessage,
                    LeaveMessage: attendanceRecord.LeaveMessage,
                    _id: attendanceRecord._id,
                    __v: attendanceRecord.__v
                },
                arrivalMessage
            });
        } else {
            const userLeaveTime = currentTime;
            const workingHours = user.workinghours;
            const Extraminutes = 30;
            let leaveMessage;

            if (userLeaveTime.isBefore(companyArrivalTime.clone().add(workingHours, 'hours'))) {
                leaveMessage = 'User has gone too early and before its working hours';
            } else if (userLeaveTime.isSameOrAfter(companyArrivalTime.clone().add(workingHours, 'hours'))) {
                if (userLeaveTime.isAfter(companyArrivalTime.clone().add((workingHours * 60) + Extraminutes, 'minutes'))) {
                    leaveMessage = 'User has worked 30 minutes extra after its working hours';
                } else {
                    leaveMessage = 'User has gone';
                }
            }

            attendanceRecord.leavetime = userLeaveTime;
            attendanceRecord.LeaveMessage = leaveMessage;

            await attendanceRecord.save();

            // Format both arrival and leave times for response
            const formattedArrivalTime = moment.utc(attendanceRecord.arrivetime).format('YYYY-MM-DD HH:mm:ss');
            const formattedLeaveTime = moment.utc(attendanceRecord.leavetime).format('YYYY-MM-DD HH:mm:ss');

            res.status(200).json({
                attendanceRecord: {
                    userId: attendanceRecord.userId,
                    arrivetime: formattedArrivalTime,
                    leavetime: formattedLeaveTime,
                    ArriveMessage: attendanceRecord.ArriveMessage,
                    LeaveMessage: attendanceRecord.LeaveMessage,
                    _id: attendanceRecord._id,
                    __v: attendanceRecord.__v
                },
                message: leaveMessage
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




export const generateReport = async (req, res) => {
    try {
        const { days } = req.params;
        const { email } = req.body;

        // const endDate = moment().endOf('day'); // End date is the current day
        const startDate = moment().subtract(days - 1, 'days').startOf('day'); // Start date is (days - 1) days ago

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const findRecord = await Attendance.find({
            userId: user._id,
            arrivetime: { $gte: startDate },
            leavetime: { $ne: null },
        });

        const detailedAttendanceRecord = [];
        const presentDaysSet = new Set();
        // adding a set because taky agr koi same record mojod hu database mai to sirf unique hi uth kr aie 

        for (let record of findRecord) {
            const date = moment(record.arrivetime).startOf('day').toDate(); // date lerhy moment sai
            presentDaysSet.add(date);

            detailedAttendanceRecord.push({
                date: moment(record.arrivetime).format('YYYY-MM-DD'),
                arrivetime: moment(record.arrivetime).format('YYYY-MM-DD HH:mm:ss'),
                leavetime: moment(record.leavetime).format('YYYY-MM-DD HH:mm:ss'),
                ArriveMessage: record.ArriveMessage,
                LeaveMessage: record.LeaveMessage
            });
        }

        let presentDays = presentDaysSet.size;
        let totalDaysInRange = days; // Calculate total days in range directly from the 'days' parameter
        let absentDays = totalDaysInRange - presentDays;

        res.status(200).json({
            message: 'Report generated successfully',
            report: {
                name: user.name,
                email: user.email,
                designation: user.designation,
                presentDays,
                absentDays,
                detailedAttendanceRecord // Include detailed attendance records
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const fetchallusers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}







