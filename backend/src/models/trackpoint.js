const mongoose = require('mongoose');
const { Schema } = mongoose;

const  TrackpointSchema = new Schema({
    _id : {type: Number},
    location: {
        // It's important to define type within type field, because
        // mongoose use "type" to identify field's object type.
        type: {type: String, default: 'Trackpoint'},
        // Default value is needed. Mongoose pass an empty array to
        // array type by default, but it will fail MongoDB's pre-save
        // validation.
        coordinates: {type: [Number], default: [0, 0]}
    },
    elevation: {type:Number, required: false},
    time: { type: String, required:false},
    competitor: { type: Schema.Types.ObjectId, ref: 'Competitor',required: true }

},
{
    _id : false
}
);

module.exports = mongoose.model('Trackpoint',TrackpointSchema);
