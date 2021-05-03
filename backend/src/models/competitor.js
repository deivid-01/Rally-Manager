const mongoose = require('mongoose');
const { Schema } = mongoose;



var ResultSchema = new Schema({
    startTime     : { type: Number, required: false},
    arrivalTime     : { type: Number, required: false},
    neutralization     : { type: Number, required: false},
    penalization     : { type: Number, required: false},
    discount      : { type: Number, required: false},
    waypointsMissed      : [{type: Schema.Types.ObjectId, ref :'Waypoint'} ],
    speedingZones      : { type: Number, required: false},
    total     : { type: Number, required: false},
});

const  CompetitorSchema = new Schema({
   
    _id: { type: Number},
    name : {type: String , required : true},
    lastname : {type: String , required : true},
    category: { type: String, required: true},
    vehicle: {type:String, required: false},
    results: [ ResultSchema ] //Results per stage
},
{
    _id : false
}
);

module.exports = mongoose.model('Competitor',CompetitorSchema);
