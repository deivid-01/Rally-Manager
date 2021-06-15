const analysisCtrl = require('./analysis.controller');
const Stages = require('../models/stage');
const Trackpoints = require('../models/trackpoint');
const raceCtrl = require('./race.controller');



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
      
      if ( stage)
      {
        var waypoints = stage.waypoints;
        var categories = stage.categories
        var partialresults = stage.partialresults;
   
        for ( partialR of partialresults)
        {  
          var trackpoints = await Trackpoints.find({partialresult:partialR._id});
        
          if(trackpoints.length> 0 )
          {
            var analysisRes  = analysisCtrl.checkWaypoints(waypoints,trackpoints);
   
            partialR.penalization = analysisRes[1]/60 //WARNING : Convert to hours
     
            partialR.waypointsMissed = analysisRes[0]
     
            partialR.save()
          }
       
        }
        return res.status(200).json(resultCtrl.translateResults(partialresults))

      }

      return res.status(400).json({msg:'Stage dont fround'})

      
 
 
     })
  }
  catch(err)
  {
    console.log(err)
    return res.status(400).json({msg:"Wrong id"})
  }
   

 
};

resultCtrl.translateResults = (results) => {

    results.forEach((result,i)=>{
        results[i].start_time = raceCtrl.hoursToHHMMSS(result.start_time)
        if ( i == 0)
        {
          console.log(results[i])
        }

    })
   
    return results
}

raceCtrl.hoursToHHMMSS = (hours) => {

  var HH = Math.floor(hours)
  var num = (hours-HH)*60
  var MM = Math.floor(num)
  var SS = Math.floor ((num-MM)*60)


  return String(HH)+":"+String(MM)+':'+String(SS)



}

resultCtrl.getRaceResult=async(req,res)=>{
    //req.params.id id de la carrera
    
};

module.exports = resultCtrl;