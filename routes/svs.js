var express = require('express');
var router = express.Router();
var SinhVien = require('../modes/SinhVienL3Model');

// 1. Lấy toàn bộ danh sách sinh viên
router.get('/all', async (req, res) => {
    try {
        var sinhVienList = await SinhVien.find();
        res.status(200).json(sinhVienList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 2. Lấy toàn bộ danh sách sinh viên thuộc khoa CNTT
router.get('/khoa/cntt', async (req, res) => {
    try {
        const sinhVienCNTT = await SinhVien.find({ BoMon: 'CNTT' });
        res.status(200).json(sinhVienCNTT);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 3. Lấy danh sách sinh viên có điểm trung bình từ 6.5 đến 8.5
router.get('/diemtb', async (req, res) => {
    try {
        const sinhVienDiem = await SinhVien.find({ DiemTB: { $gte: 6.5, $lte: 8.5 } });
        res.status(200).json(sinhVienDiem);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 4. Tìm kiếm thông tin của sinh viên theo MSSV
router.get('/:mssv', async (req, res) => {
    try {
        const sinhVien = await SinhVien.findOne({ MSSV: req.params.mssv });
        if (!sinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.status(200).json(sinhVien);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 5. Thêm mới một sinh viên
router.post('/add', async (req, res) => {
    const { MSSV, HoTen, DiemTB, BoMon, Tuoi } = req.body;
    const sinhVien = new SinhVien({ MSSV, HoTen, DiemTB, BoMon, Tuoi });

    try {
        const newSinhVien = await sinhVien.save();
        res.status(201).json(newSinhVien);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// 6. Thay đổi thông tin sinh viên theo MSSV
router.put('/:mssv', async (req, res) => {
    try {
        const updatedSinhVien = await SinhVien.findOneAndUpdate(
            { MSSV: req.params.mssv },
            req.body,
            { new: true }
        );
        if (!updatedSinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.status(200).json(updatedSinhVien);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 7. Xóa một sinh viên ra khỏi danh sách
router.delete('/:mssv', async (req, res) => {
    try {
        const deletedSinhVien = await SinhVien.findOneAndDelete({ MSSV: req.params.mssv });
        if (!deletedSinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.status(200).json({ message: 'Đã xóa sinh viên', deletedSinhVien });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 8. Lấy danh sách các sinh viên thuộc BM CNTT và có DTB từ 9.0
router.get('/cntt/diemcao', async (req, res) => {
    try {
        const sinhVienDiemCao = await SinhVien.find({ BoMon: 'CNTT', DiemTB: { $gte: 9.0 } });
        res.status(200).json(sinhVienDiemCao);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 9. Lấy ra danh sách các sinh viên có độ tuổi từ 18 đến 20 thuộc CNTT có điểm trung bình từ 6.5
router.get('/cntt/tuoi18-20', async (req, res) => {
    try {
        const sinhVienTuoi = await SinhVien.find({
            BoMon: 'CNTT',
            Tuoi: { $gte: 18, $lte: 20 },
            DiemTB: { $gte: 6.5 }
        });
        res.status(200).json(sinhVienTuoi);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 10. Sắp xếp danh sách sinh viên tăng dần theo DiemTB
router.get('/sort/dtb', async (req, res) => {
    try {
        const sinhVienSorted = await SinhVien.find().sort({ DiemTB: 1 });
        res.status(200).json(sinhVienSorted);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// 11. Tìm sinh viên có điểm trung bình cao nhất thuộc BM CNTT
router.get('/cntt/top1', async (req, res) => {
    try {
        const topSinhVien = await SinhVien.findOne({ BoMon: 'CNTT' }).sort({ DiemTB: -1 });
        if (!topSinhVien) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.status(200).json(topSinhVien);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
