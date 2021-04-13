const mongoose = require('mongoose');
const { Schema } = mongoose;

const  GPXSchema = new Schema({
    latitude: { type: String, required: true},
    longitude: { type: String, required: true},
    elevation: {type:String, required: false},
    name: { type: String, required: true},
    distance: { type: String, required: true},
    danger: { type: String}, //??? Si lo ponemos? Que significa?
});

module.exports = mongoose.model('GPX',GPXSchema);