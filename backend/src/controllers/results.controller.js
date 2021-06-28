const analysisCtrl = require('./analysis.controller');
const Stages = require('../models/stage');
const Trackpoints = require('../models/trackpoint');
const raceCtrl = require('./race.controller');
const waypoint = require('../models/waypoint');
const toolsCtrl = require('./tools.controller');



const resultCtrl = {};

resultCtrl.getStageResult=async(req,res)=>{
    
  //Gets Stage
  try
  {
    await Stages.findById(req.params.id)
    .populate("waypoints")
    .populate("categories")
    .populate({
      path:"partialresults",
      select:["competitor",
              'start_time',
              'arrival_time',
              'neutralization',
              'penalization',
              'discount',
              'waypointsMissed'],
      populate:{path:"competitor",select:["name",'lastname','categorytype'],
      populate:{path:'categorytype',select:'name'}}})
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
   
            partialR.penalization = toolsCtrl.hoursToHHMMSS(analysisRes[1]/60) //WARNING : Convert to hours
            console.log(penalization)
            partialR.waypointsMissed = analysisRes[0]
     
          }
          else
          {
            partialR.penalization = '00:00:00'
     
            partialR.waypointsMissed = []
     
          }

          partialR.save()

       
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

  var posResults=[
    
  ]

  results.forEach((result,i)=>{
    var item = {
      start_time:'',
      arrival_time:'',
      partial_time:'',
      neutralization:'',
      penalization:'',
      competitor_name:'',
      competitor_lastname:'',
      competitor_category:' ',
      total:'',
      waypointsMissed:[]
    }
    item.id = result._id
    item.start_time = result.start_time
    item.arrival_time = result.arrival_time
    item.partial_time = toolsCtrl.hoursToHHMMSS(toolsCtrl.HHMMSSToHours(result.arrival_time)-toolsCtrl.HHMMSSToHours(result.start_time))
    
    item.penalization ="+"+result.penalization
    item.neutralization = result.neutralization
    item.waypointsMissed = result.waypointsMissed
  
    item.competitor_name = result.competitor.name
    item.competitor_lastname = result.competitor.lastname
    item.competitor_category = result.competitor.categorytype.name
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