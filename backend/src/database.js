const mongoose = require('mongoose');

const URI = 'mongodb://localhost/gpxanalyzer';

mongoose.connect( URI, { useNewUrlParser: true , useUnifiedTopology:true} )
    .then(db => console.log("DB is connected"))
    .catch( err => console.error(err));

module.exports = mongoose ; 
