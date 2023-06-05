const jwt = require('jsonwebtoken');

require('dotenv').config();


const authenticate = (req, res, next) => {
    try {
        const autheHeader = req.header('Authorization');
        const token = autheHeader && autheHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Bạn chưa đăng nhập" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const authorize = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Bạn không có quyền truy cập" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    authenticate,
    authorize
};