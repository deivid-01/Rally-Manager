const moongose = require("mongoose");
const {Schema} = moongose;

const RaceSchema = new Schema({

    name : { type:String, required:true},
    categories : [ {type: Schema.Types.ObjectId, ref :'Category'} ]
});

module.exports = moongose.model('Race',RaceSchema);