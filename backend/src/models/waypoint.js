const mongoose = require('mongoose');
const { Schema } = mongoose;

const  WaypointSchema = new Schema({
    waypoint: { type: String, required: true},
    latitude: { type: String, required: true},
    longitude: { type: String, required: true},
    type: { type: String, required: true},
    distance: { type: String, required: true},
    speed: { type: String},
});


module.exports = mongoose.model('Waypoint',WaypointSchema);

