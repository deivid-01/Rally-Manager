const mongoose = require('mongoose');
const { Schema } = mongoose;

const  WaypointSchema = new Schema(
{
    location: {
        // It's important to define type within type field, because
        // mongoose use "type" to identify field's object type.
        type: {type: String, default: 'Waypoint'},
        // Default value is needed. Mongoose pass an empty array to
        // array type by default, but it will fail MongoDB's pre-save
        // validation.
        coordinates: {type: [Number], default: [0, 0]}
    },
    distance: { type: Number, required: true},
    speed: { type: String},
    rule:{
        penalization: {type:Number},
        ratius: {type:Number},
    },
    stage : {type: Schema.Types.ObjectId, ref :'Stage'}

}
);


module.exports = mongoose.model('Waypoint',WaypointSchema);

