const mongoose = require('mongoose');
const { schema } = require('./loginModel');
const Schema = mongoose.Schema; // Schema = collection 
const ObjectId = Schema.ObjectId; 
const Addres= new Schema({
    id: { type: ObjectId },
    UserApp:{type:ObjectId,ref:"UserApp" }
});
module.exports = mongoose.models.Addres || mongoose.model('Addres', Addres);
