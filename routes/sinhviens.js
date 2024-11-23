var express = require('express');
var router = express.Router();
var sinhvienModel = require("../modes/sinhvienModel");

router.get("/all",async function (req, res){
    try{
      var list = await sinhvienModel.find();
      res.status(200).json(list);
    }catch(e){
      res.status(400).json({status: false, massage :"Có lỗi xãy ra !"});
    }
  });
  // Lấy toàn bộ danh sách sinh viên thuộc khoa CNTT
router.get("/boMon",async function(req,res){
try{
  var list= await sinhvienModel.find({ boMon: 'CNTT' });
  res.status(200).json(list);
}catch(e){
  res.status(500).json({ message: 'Có lỗi xảy ra!', error: e.message });
}
});
module.exports = router;


