const mongoose = require('mongoose');

const URL = 'mongodb://localhost/racemanager';

mongoose.connect( URL, { useNewUrlParser: true , useUnifiedTopology:true , useFindAndModify:false} )
    .then(db => console.log("DB is connected"))
    .catch( err => console.error(err));

module.exports = mongoose ; 
