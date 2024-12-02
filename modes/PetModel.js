const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Pet = new Schema({
    id:{type: ObjectId},
    name: {type:String },
    old:{type: Number},
    UserApp:{type : ObjectId, ref:"UserApp"}
});
module.exports = mongoose.models.Pet || mongoose.model('Pet', Pet);