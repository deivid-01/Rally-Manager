const moongose = require("mongoose");
const {Schema} = moongose;



const CategorySchema = new Schema({

    categoryType : {type: Schema.Types.ObjectId, ref :'CategoryType'},
    competitors : [ {type: Schema.Types.Number, ref :'Competitor'} ],
    stages : [ {type: Schema.Types.ObjectId, ref :'Stage'} ],
    race : {type: Schema.Types.ObjectId, ref :'Race'}

});

module.exports = moongose.model('Category',CategorySchema);