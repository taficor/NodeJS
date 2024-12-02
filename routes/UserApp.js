var express = require('express');
var router = express.Router();
var UserModel=require("../modes/UserAppModel");
const JWT = require('jsonwebtoken');
const config = require("../fill/tokenConfig");
//Tonken
router.post("/dangnhap", async function (req, res) {
    try {
        const { Phone, PassWord } = req.body;
        const checkUser = await UserModel.findOne({ Phone: Phone, PassWord: PassWord });
        if (checkUser == null) {
            res.status(200).json({ status: false, massage: "MSSV hoặc HoTen không đúng " })
        } else {
            const token = JWT.sign({ Phone: Phone }, config.SECRETKEY, { expiresIn: '30s' });
            const refreshToken = JWT.sign({ Phone: Phone }, config.SECRETKEY, { expiresIn: '1d' });
            res.status(200).json({ status: true, massage: "đăng nhập thành công", token: token, refreshToken: refreshToken });
        }
    } catch (e) {
        res.status(200).json({ status: false, massage: "Đã xãy ra lỗi !" });
    }
});
//Lấy thông tin
// router.get("/all",async function (req, res){
//     try{
//       var list = await UserModel.find().populate.apply("Addres");
//       res.status(200).json(list);
//     }catch(e){
//       res.status(400).json({status: false, massage :"Có lỗi xãy ra !"});
//     }
//   });
router.get('/all', async (req, res) => {
    try {

        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ "status": false, "err": err + err });
                } else {
                    //xử lý chức năng tương ứng với API
                    var list = await UserModel.find().populate("Addres");
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


module.exports = router;