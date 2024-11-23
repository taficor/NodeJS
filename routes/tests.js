var express = require('express');
var router = express.Router();
//lấy toàn bộ danh sách user
//locolhost:2002/users/all
var testModel = require("../modes/testModel");
const JWT = require('jsonwebtoken');
const config = require("../fill/tokenConfig");
//Tonken
router.post("/dangnhap", async function (req, res) {
    try {
        const { MSSV, HoTen } = req.body;
        const checkUser = await testModel.findOne({ MSSV: MSSV, HoTen: HoTen });
        if (checkUser == null) {
            res.status(200).json({ status: false, massage: "MSSV hoặc HoTen không đúng " })
        } else {
            const token = JWT.sign({ MSSV: MSSV }, config.SECRETKEY, { expiresIn: '30s' });
            const refreshToken = JWT.sign({ MSSV: MSSV }, config.SECRETKEY, { expiresIn: '1d' });
            res.status(200).json({ status: true, massage: "đăng nhập thành công", token: token, refreshToken: refreshToken });
        }
    } catch (e) {
        res.status(200).json({ status: false, massage: "Đã xãy ra lỗi !" });
    }
});
// 1. Lấy toàn bộ danh sách sinh viên
router.get('/all', async (req, res) => {
    try {

        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ "status": false, "err": err + err });
                } else {
                    //xử lý chức năng tương ứng với API
                    var sinhVienList = await testModel.find();
                    res.status(200).json(sinhVienList);
                }
            });
        } else {
            res.status(401).json({ status: false, massage: "Có lỗi xãy ra !" });
        }
    } catch (e) {
        res.status(400).json({ status: false, massage: "Khong xac thuc" });
    }
});
// 2. Lấy toàn bộ danh sách sinh viên thuộc khoa CNTT
router.get('/khoa/cntt', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ status: false, "err": err + err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const sinhVienCNTT = await testModel.find({ BoMon: 'CNTT' });
                    res.status(200).json(sinhVienCNTT);
                }
            });
        } else {
            res.status(401).json({ status: false, massage: "Có lỗi xãy ra !" });
        }
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 3. Lấy danh sách sinh viên có điểm trung bình từ 6.5 đến 8.5
router.get('/diemtb', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ status: false, "err": err + err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const sinhVienDiem = await testModel.find({ DiemTB: { $gte: 6.5, $lte: 8.5 } });
                    res.status(200).json(sinhVienDiem);
                }
            });
        } else {
            res.status(401).json({ status: false, massage: "Có lỗi xãy ra !" });
        }

    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 4. Tìm kiếm thông tin của sinh viên theo MSSV
router.get('/:mssv', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ status: false, "err": err + err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const sinhVien = await testModel.findOne({ MSSV: req.params.mssv });
                    if (!sinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
                    res.status(200).json(sinhVien);
                }
            });
        } else {
            res.status(401).json({ status: false, massage: "Có lỗi xãy ra !" });
        }
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 5. Thêm mới một sinh viên
router.post('/add', async (req, res) => {
    const { MSSV, HoTen, DiemTB, BoMon, Tuoi } = req.body;
    const sinhVien = new SinhVien({ MSSV, HoTen, DiemTB, BoMon, Tuoi });

    try {
        const newSinhVien = await testModel.save();
        res.status(201).json(newSinhVien);
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 6. Thay đổi thông tin sinh viên theo MSSV
router.put('/:mssv', async (req, res) => {
    try {
        const updatedSinhVien = await testModel.findOneAndUpdate(
            { MSSV: req.params.mssv },
            req.body,
            { new: true }
        );
        if (!updatedSinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.status(200).json(updatedSinhVien);
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 7. Xóa một sinh viên ra khỏi danh sách
router.delete('/:mssv', async (req, res) => {
    try {
        const deletedSinhVien = await testModel.findOneAndDelete({ MSSV: req.params.mssv });
        if (!deletedSinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.status(200).json({ message: 'Đã xóa sinh viên', deletedSinhVien });
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 8. Lấy danh sách các sinh viên thuộc BM CNTT và có DTB từ 9.0
router.get('/cntt/diemcao', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ status: false, "err": err + err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const sinhVienDiemCao = await testModel.find({ BoMon: 'CNTT', DiemTB: { $gte: 9.0 } });
                    res.status(200).json(sinhVienDiemCao);
                }
            });
        } else {
            res.status(401).json({ status: false, massage: "Có lỗi xãy ra !" });
        }
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });;
    }
});

// 9. Lấy ra danh sách các sinh viên có độ tuổi từ 18 đến 20 thuộc CNTT có điểm trung bình từ 6.5
router.get('/cntt/tuoi18-20', async (req, res) => {
    try {
        const sinhVienTuoi = await testModel.find({
            BoMon: 'CNTT',
            Tuoi: { $gte: 18, $lte: 20 },
            DiemTB: { $gte: 6.5 }
        });
        res.status(200).json(sinhVienTuoi);
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 10. Sắp xếp danh sách sinh viên tăng dần theo DiemTB
router.get('/sort/dtb', async (req, res) => {
    try {
        const sinhVienSorted = await testModel.find().sort({ DiemTB: 1 });
        res.status(200).json(sinhVienSorted);
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});

// 11. Tìm sinh viên có điểm trung bình cao nhất thuộc BM CNTT
router.get('/cntt/top1', async (req, res) => {
    try {
        const topSinhVien = await testModel.findOne({ BoMon: 'CNTT' }).sort({ DiemTB: -1 });
        if (!topSinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.status(200).json(topSinhVien);
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});


module.exports = router;
