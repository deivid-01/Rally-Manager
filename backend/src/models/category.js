const moongose = require("mongoose");
const {Schema} = moongose;



const CategorySchema = new Schema({

    name : { type:String, required:true},
    competitors : [ {type: Schema.Types.Number, ref :'Competitor'} ],
    stages : [ {type: Schema.Types.ObjectId, ref :'Stage'} ]

});

module.exports = moongose.model('Category',CategorySchema);