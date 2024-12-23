const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema = collection 
const ObjectId = Schema.ObjectId; 
const login = new Schema({
    id: { type: ObjectId }, // khóa chính
    username: {
        type: String, // kiểu dữ liệu
        // required: true, // bắt buộc phải có
        // unique: true, // không được trùng
        // trim: true, // bỏ khoảng trắng 2 đầu
        // minlength: 3, // độ dài tối thiểu
        // maxlength: 50, // độ dài tối đa
        // default: 'No name' // giá trị mặc định
    },
    password:{type: Number},
});
module.exports = mongoose.models.login || mongoose.model('login', login);
