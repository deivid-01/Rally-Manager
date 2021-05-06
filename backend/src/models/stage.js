const moongose = require("mongoose");
const {Schema} = moongose;


var SpeedControlSchema = new Schema({
    
    location: {
        // It's important to define type within type field, because
        // mongoose use "type" to identify field's object type.
        type: {type: String, default: 'Point'},
        // Default value is needed. Mongoose pass an empty array to
        // array type by default, but it will fail MongoDB's pre-save
        // validation.
        coordinates: {type: [Number], default: [0, 0]} // x-> fz, y -> dz
    },
    ratio : { type: Number, required: false},
    speedMax : { type: Number, required: false},
})


const StageSchema = new Schema({

    name : { type:String, required:false},
    waypoints : [ {type: Schema.Types.ObjectId, ref :'Waypoint'} ],
    speedControls : [ {type:Number} ],
    categories : [ {type: Schema.Types.ObjectId, ref :'Category'} ]
    //speedRules : {}
    //location : { type:String, required:true},

});

module.exports = moongose.model('Stage',StageSchema);