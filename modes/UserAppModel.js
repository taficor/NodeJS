const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema = collection 
const ObjectId = Schema.ObjectId; 
const UserApp=new Schema({

    id:{ type:ObjectId},
    Name:{type: String},
    Addres:{type:ObjectId,ref:"Addres"},
    Email:{type: String},
    Phone:{type: Number},
    PassWord:{type :String}
});



module.exports = mongoose.models.UserApp || mongoose.model('UserApp', UserApp);