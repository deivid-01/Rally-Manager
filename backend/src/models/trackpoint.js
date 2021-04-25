const mongoose = require('mongoose');
const { Schema } = mongoose;

const  TrackpointSchema = new Schema({
    _id : {type: Number},
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
    elevation: {type:Number, required: false},
    time: { type: String, required:true}
},
{
    _id : false
}
);

module.exports = mongoose.model('trackPoints',TrackpointSchema);
