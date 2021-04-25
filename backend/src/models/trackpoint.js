const mongoose = require('mongoose');
const { Schema } = mongoose;

const  TrackpointSchema = new Schema({
    latitude: { type: String, required: true},
    longitude: { type: String, required: true},
    elevation: {type:String, required: false},
    time: { type: String, required:true}
});

module.exports = mongoose.model('trackPoints',TrackpointSchema);
