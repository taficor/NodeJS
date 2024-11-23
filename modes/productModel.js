const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema = collection 
const ObjectId = Schema.ObjectId; 
const product = new Schema({
    id: { type: ObjectId }, // khóa chính
    maSp: {type: String },
    donGia:{type: String},
    soLuong:{type: Number},
    tenSp:{type:String},

});
module.exports = mongoose.models.product || mongoose.model('product', product);