const analysisCtrl = require('./analysis.controller');
const Stages = require('../models/stage');
const Trackpoints = require('../models/trackpoint');



const resultCtrl = {};

resultCtrl.getStageResult=async(req,res)=>{
    
  //Gets Stage
  try
  {
    await Stages.findById(req.params.id)
    .populate("waypoints")
    .populate("categories")
    .populate("partialresults")
    .exec(async (err,stage)=>{
 
      var waypoints = stage.waypoints;
      var categories = stage.categories
      var partialresults = stage.partialresults;
 
      for ( partialR of partialresults)
      {  
        var trackpoints = await Trackpoints.find({partialresult:partialR._id});
 
        var analysisRes  = analysisCtrl.checkWaypoints(waypoints,trackpoints);
 
        partialR.penalization = analysisRes[1] //WARNING : Convert to hours
 
        partialR.waypointsMissed = analysisRes[0]
 
        partialR.save()
      }
 
      return res.status(200).json(partialresults)
 
     })
  }
  catch(err)
  {
    console.log(err)
    return res.status(400).json({msg:"Wrong id"})
  }
   

 
};

resultCtrl.getRaceResult=async(req,res)=>{
    //req.params.id id de la carrera
    
};

module.exports = resultCtrl;