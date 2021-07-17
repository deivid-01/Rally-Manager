const analysisCtrl = require('./analysis.controller');
const Stages = require('../models/stage');
const Trackpoints = require('../models/trackpoint');
const raceCtrl = require('./race.controller');
const waypoint = require('../models/waypoint');
const toolsCtrl = require('./tools.controller');



const resultCtrl = {};

resultCtrl.filterStageByCategoryType = (stage,categorytype_id) => {
  //Filter categorytype
  stage.partialresults = stage.partialresults
                        .filter((partialresult)=>
                        String(partialresult.competitor.categorytype._id).localeCompare(categorytype_id)==0)
  
  return stage
}

resultCtrl.getStageResult=async(req,res)=>{
    
  //Gets Stage
  var {id:stage_id, categorytype_id } = req.params
  try
  {
    await Stages.findById(stage_id)
    .populate("waypoints")
    .populate({
      path:"partialresults",
      select:["competitor",
              'start_time',
              'gpx_uploaded',
              'arrival_time',
              'neutralization',
              'penalization',
              'discount',
              'waypointsMissed'],
      populate:{path:"competitor",select:["name",'lastname','categorytype'],
      populate:{path:'categorytype',select:'name'}}})
    .exec(async (err,stage)=>{
      stage = resultCtrl.filterStageByCategoryType (stage,categorytype_id)
      if ( stage)
      {
        var waypoints = stage.waypoints;
        var partialresults = stage.partialresults;
  
        for ( partialR of partialresults)
        {  
        
          if ( partialR.gpx_uploaded)
          {
            var trackpoints = await Trackpoints.find({partialresult:partialR._id});
        
            if(trackpoints.length> 0 )
            {
              var analysisRes  = analysisCtrl.checkWaypoints(waypoints,trackpoints);
     
              partialR.penalization = toolsCtrl.hoursToHHMMSS(analysisRes[1]/60) //WARNING : Convert to hours
             
              partialR.waypointsMissed = analysisRes[0]
  
              partialR.save()
            }
          }
      

          

       
        }

        partialresults=partialresults.filter((pRes,err)=> pRes.gpx_uploaded)
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

  var posResults=[
    
  ]

  results.forEach((result,i)=>{
 
      var item = {
        id:result._id,
        start_time:result.start_time,
        arrival_time:result.arrival_time,
        partial_time:toolsCtrl.hoursToHHMMSS(toolsCtrl.HHMMSSToHours(result.arrival_time)-toolsCtrl.HHMMSSToHours(result.start_time)),
        neutralization:result.neutralization,
        penalization:"+"+result.penalization,
        competitor_name:result.competitor.name,
        competitor_lastname:result.competitor.lastname,
        competitor_category:result.competitor.categorytype.name,
        total:'',
        waypointsMissed:result.waypointsMissed
      }
      var totalHours = toolsCtrl.HHMMSSToHours(result.arrival_time)-toolsCtrl.HHMMSSToHours(result.start_time)
      item.total = toolsCtrl.hoursToHHMMSS(totalHours + toolsCtrl.HHMMSSToHours(result.penalization) - toolsCtrl.HHMMSSToHours(result.neutralization))
     
      posResults.push(item)
    })

  
    return posResults
}



raceCtrl.getWaypointsMissed = (waypoints) => {
  ids = []
  waypoints.forEach(waypoint =>{
    ids.push(waypoint._id)
  })
  return ids
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