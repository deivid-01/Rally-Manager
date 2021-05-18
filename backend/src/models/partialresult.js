const moongose = require("mongoose");
const {Schema} = moongose;



const PartialResultSchema = new Schema({

    startTime     : { type: Number, required: false},
    arrivalTime     : { type: Number, required: false},
    neutralization     : { type: Number, required: false},
    penalization     : { type: Number, required: false},
    discount      : { type: Number, required: false},
    waypointsMissed      : [{type: Schema.Types.ObjectId, ref :'Waypoint'} ],
    speedingZones      : { type: Number, required: false},
    total     : { type: Number, required: false},

});

module.exports = moongose.model('PartialResult',PartialResultSchema);