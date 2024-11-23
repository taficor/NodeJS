const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema = collection 
const ObjectId = Schema.ObjectId; 
const sinhvien = new Schema({
    id: { type: ObjectId }, // khóa chính
    maSV: {type: String },
    hoTen:{type: String},
    diemTB:{type: Number},
    boMon:{type:String},
    tuoi:{type:Number},

});
module.exports = mongoose.models.sinhvien || mongoose.model('sinhvien', sinhvien);