var express = require('express');
var router = express.Router();
var UserModel = require("../modes/UserAppModel");
const JWT = require('jsonwebtoken');
const config = require("../fill/tokenConfig");
//Tonken
router.post("/login", async function (req, res) {
    try {
        const { Phone, PassWord } = req.body;
        const checkUser = await UserModel.findOne({ Phone: Phone, PassWord: PassWord });
        if (checkUser == null) {
            res.status(200).json({ status: false, massage: "Phone hoặc Pass không đúng " })
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
                    res.status(200).json(list);
                }
            });
        } else {
            res.status(401).json({ status: false, massage: "Có lỗi xãy ra !" });
        }
    } catch (e) {
        res.status(400).json({ status: false, massage: "Khong xac thuc" });
    }
});
//Tìm thông tin User theo số điện thoại 
router.get('/timkiem/:phone', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function (err, id) {
                if (err) {
                    res.status(403).json({ status: false, "err": err + err });
                } else {
                    //xử lý chức năng tương ứng với API
                    const User = await UserModel.findOne({ Phone: req.params.phone });
                    if (!User) return res.status(404).json({ message: 'Không tìm thấy User' });
                    res.status(200).json(User);
                }
            });
        } else {
            res.status(401).json({ status: false, massage: "Có lỗi xãy ra !" });
        }
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});
// Thay đổi thông tin  theo Name
router.put('/update/:name', async (req, res) => {
    try {
        const updateUser = await UserModel.findOneAndUpdate(
            { Name: req.params.name },
            req.body,
            { new: true }
        );
        if (!updateUser) return res.status(404).json({ message: 'Không tìm thấy tên USER để update' });
        res.status(200).json(updateUser);
    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});
// 5. Thêm User
router.post('/add', async (req, res) => {
    try {
        const {   Email,Name,  PassWord,Phone } = req.body;
        const newUser={  Email, Name, PassWord,Phone };
        await UserModel.create(newUser)
        res.status(200).json({ status: true, massage: "Thêm thành công !" });

    } catch (e) {
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });
    }
});
//delete
router.delete("delete/:id",async function (req,res) {
    try{
        const {id}=req.params;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ status: true, massage: " thành công !" });

    }catch(e){
        res.status(400).json({ status: false, massage: "Có lỗi xãy ra !" });

    }
});
module.exports = router;