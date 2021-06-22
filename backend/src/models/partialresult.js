const moongose = require("mongoose");
const {Schema} = moongose;



const PartialResultSchema = new Schema({

    competitor:{type: Schema.Types.ObjectId, ref :'Competitor',required:true} ,
    start_time     : { type: Number, required: false,default:0},
    arrival_time     : { type: Number, required: false,default:0},
    neutralization     : { type: Number, required: false,default:0},
    penalization     : { type: Number, required: false,default:0},
    discount      : { type: Number, required: false,default:0},
    waypointsMissed      : [{type: Schema.Types.ObjectId, ref :'Waypoint'} ],
    speedingZones      : { type: Number, required: false},
    
    stage:{type: Schema.Types.ObjectId, ref :'Stage', required:true}  

});

module.exports = moongose.model('PartialResult',PartialResultSchema);