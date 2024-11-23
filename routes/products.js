var express = require('express');
var router = express.Router();
//lấy toàn bộ danh sách user
//locolhost:2002/products/all
var productModel = require("../modes/productModel");
// Lấy danh sách tất cả các sản phẩm
router.get("/all",async function (req, res){
  try{
    var list = await productModel.find().populate( 'category');
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({status: false, massage :"Có lỗi xãy ra !"});
  }
});
//Lấy danh sách tất cả các sản phẩm có số lượng lớn hơn 20
router.get("/finsoLuong",async function(req,res){
  try{
    const {soLuong} =req.query;
    var list = await productModel.find({soLuong:{$gt: 20}});
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({status: false, massage :"Có lỗi xãy ra !"});
  }
});
//Lấy danh sách sản phẩm có giá từ 20000 đến 50000
router.get("/findonGia",async function(req,res){
  try{
      const{min,max}=req.query;
      var list = await productModel.find({donGia:{$gte: min,$lt:max}});
      res.status(200).json(list);
  }catch(e){
    res.status(400).json({status: false, massage :"Có lỗi xãy ra !"});
  }
});
//Lấy danh sách sản phẩm có số lượng nhỏ hơn 10 hoặc giá lớn hơn 15000
router.get("/findsSanpham",async function(req,res){
  try{
    const{soluong,gia}=req.query;
    var list = await productModel.find({$or:[{soLuong:{$lt:soluong}},{donGia:{$gt:gia}}]});
    res.status(200).json(list);

  }catch(e){
    res.status(400).json({status: false, massage :"Có lỗi xãy ra !"});
  }
});


// Lấy thông tin chi tiết của sản phẩm

router.get("/soSanh",async function(req,res){
try{
const{id}=req.params;
var detail=await productModel.findById(id);
res.status(200).json(list);
}catch(e){
  res.status(400).json({status: false, massage :"Có lỗi xãy ra !"});
}
});
//thêm sản phẩm mới
router.post("/add", async function (req,res){
  try{
    const{tenSp,donGia,soLuong}=req.body;
    const newItem ={tenSp,donGia,soLuong};
    await productModel.create(newItem);
    res.status(200).json({status: true,massage:"Thêm thành công"});
    }
    catch(e){
    res.status(400).json({status: false, massage:" Có Lỗi xãy ra" + e});
  }
});
//chỉnh sửa
router.put("/edit", async function(req,res){
  try{
    const{id,soLuong,donGia,tenSp}=req.body;
    //tìm sản phẩm cần chỉnh sửa
    const finProduct= await productModel.findById(id);
    if(finProduct){
      //chỉnh sửa
      finProduct.tenSp= tenSp ? tenSp: finProduct.tenSp;
      finProduct.soLuong= soLuong ? soLuong: finProduct.soLuong;
      finProduct.donGia= donGia ? donGia: finProduct.donGia;
      await finProduct.save();
      res.status(200).json({status:true,massage:"thành công"})
    }else{
      res.status(400).json({status: false, massage:" Không tìm thấy sản phẩm" });

    }
  }catch(e){
    res.status(400).json({status: false, massage:" Có Lỗi xãy ra" + e});
  }
});
//xóa
router.delete("/delete/:id",async function(req,res){
  try{
    const{id}=req.params;
  await productModel.findByIdAndDelete(id);
  res.status(200).json({status:true,massage:"thành công"})
  }catch(e){
    res.status(400).json({status: false, massage:" Có Lỗi xãy ra" + e});
  }
});
module.exports = router;
