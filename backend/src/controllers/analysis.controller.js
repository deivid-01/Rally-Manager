var Polycircle = require('./Polycircle.js');

const analysisCtrl = {};

analysisCtrl.printExam = ()=>{
    console.log(Polycircle.vertices(latitude=31.611878, longitude=34.505351, radius=100, number_of_vertices=100));
}



module.exports = analysisCtrl;