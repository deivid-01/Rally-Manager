const moongose = require("mongoose");
const {Schema} = moongose;



const RaceSchema = new Schema({

    name : { type:String, required:true},
    competitors : [ {type: Schema.Types.Number, ref :'Competitor'} ],
    stages : [ {type: Schema.Types.ObjectId, ref :'Stage'} ],
    //location : { type:String, required:true},

});

module.exports = moongose.model('Race',RaceSchema);