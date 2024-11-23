const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema = collection 
const ObjectId = Schema.ObjectId; 
const SinhVien = new Schema({
    id: { type: ObjectId }, 
    MSSV: { type: String },
    HoTen: { type: String },
    DiemTB: { type: Number },
    BoMon: { type: String },
    Tuoi: { type: Number }

});

module.exports = mongoose.models.SinhVien || mongoose.model('SinhVien', SinhVien);
