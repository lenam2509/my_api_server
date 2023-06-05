var express = require('express');
const { DangKy, DangNhap, LayDanhSachUser, LayThongTinUser } = require('../controllers/user');
const { authenticate, authorize } = require('../middleware/auth');
var router = express.Router();



router.post('/dangky', DangKy);
router.post('/dangnhap', DangNhap);
router.get('/', authenticate, authorize, LayDanhSachUser);
router.get('/:id', LayThongTinUser);

module.exports = router;
