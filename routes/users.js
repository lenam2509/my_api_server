var express = require('express');
const { DangKy, DangNhap, LayDanhSachUser, LayThongTinUser } = require('../controllers/user');
var router = express.Router();



router.post('/dangky', DangKy);
router.post('/dangnhap', DangNhap);
router.get('/', LayDanhSachUser);
router.get('/:id', LayThongTinUser);

module.exports = router;
