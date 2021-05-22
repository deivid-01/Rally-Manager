const moongose = require("mongoose");
const {Schema} = moongose;



const PartialResultSchema = new Schema({

    competitor:{type: Schema.Types.ObjectId, ref :'Competitor'} ,
    start_time     : { type: Number, required: false},
    arrival_time     : { type: Number, required: false},
    neutralization     : { type: Number, required: false},
    penalization     : { type: Number, required: false},
    discount      : { type: Number, required: false},
    waypointsMissed      : [{type: Schema.Types.ObjectId, ref :'Waypoint'} ],
    speedingZones      : { type: Number, required: false},
    total     : { type: Number, required: false},
    stage:{type: Schema.Types.ObjectId, ref :'Stage'}  

});

module.exports = moongose.model('PartialResult',PartialResultSchema);