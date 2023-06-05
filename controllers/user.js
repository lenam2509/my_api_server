const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const DangKy = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hashedPassword, name });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DangNhap = async (req, res) => {
    try {
        const { email, password } = req.body;
        const currentUser = await User.findOne({ email: email });
        if (!currentUser) {
            return res.status(400).json({ error: "Tài khoản không tồn tại" });
        }
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Sai mật khẩu" });
        }
        const payload = {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.status(200).json({ user: currentUser, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const LayDanhSachUser = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const LayThongTinUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    DangKy,
    DangNhap,
    LayDanhSachUser,
    LayThongTinUser
}