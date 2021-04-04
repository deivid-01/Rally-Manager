const mongoose = require('mongoose');
const { Schema } = mongoose;

const  WaypointSchema = new Schema({
    name: { type: String, required: true},
    num: { type: Number, required: true},
});

module.exports = mongoose.model('Waypoint',WaypointSchema);