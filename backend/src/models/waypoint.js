const mongoose = require('mongoose');
const { Schema } = mongoose;

const  WaypointSchema = new Schema(
{
    _id : {type : Number},
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
    type: { type: String, required: true},
    distance: { type: String, required: true},
    speed: { type: String}
},
{
    _id : false
}  
);


module.exports = mongoose.model('Waypoint',WaypointSchema);

