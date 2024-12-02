var express = require('express');
var router = express.Router();
//lấy toàn bộ danh sách user
//locolhost:2002/users/all
var userModel = require("../modes/UserAppModel");
const JWT = require('jsonwebtoken');
const config = require("../fill/tokenConfig");


router.get("/all", async function (req, res) {
  var list = await userModel.find();
  // var list = await userModel.find({old :{$gte:26}});// lấy tất cả
  res.json(list);
});
//Query
router.get("/finOld", async function (req, res) {
  const { oldX } = req.query;
  var list = await userModel.find({ old: { $gt: oldX } });
  res.json(list);
});
//params
router.get("/finOld2/:oldX", async function (req, res) {
  const { oldX } = req.query;
  var list = await userModel.find({ old: { $gt: oldX } });
  res.json(list);
});


router.post("/login", async function (req, res) {
  try {
    const { username, password } = req.body;
    const checkUser = await userModel.findOne({ username: username, password: password });
    if (checkUser == null) {
      res.status(200).json({ status: false, massage: "Username hoac passsword khong dung " })
    } else {
      const token = JWT.sign({ username: username }, config.SECRETKEY, { expiresIn: '30s' });
      const refreshToken = JWT.sign({ username: username }, config.SECRETKEY, { expiresIn: '1d' });
      res.status(200).json({ status: true, massage: "dang nhap thanh cong", token: token, refreshToken: refreshToken });
    }
  } catch (e) {
    res.status(200).json({ status: false, massage: "da xay ra loi !" });
  }
});



module.exports = router;
