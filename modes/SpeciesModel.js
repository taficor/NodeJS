const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Species = new Schema({
    idSpecies:{type: ObjectId},
    name: {type:String },
});
module.exports = mongoose.models.Species || mongoose.model('Species', Species);