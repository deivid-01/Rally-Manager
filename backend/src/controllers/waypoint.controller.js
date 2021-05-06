const Waypoint = require('../models/waypoint');
const Stage = require('../models/stage');
const toolsCtrl = require('../controllers/tools.controller');
const waypointCtrl = {};

waypointCtrl.getAll = async ( req , res ) =>
{
  const waypoints = await Waypoint.find();
  res.json(waypoints);
}

waypointCtrl.createOne = async ( req , res ) =>
{
    const waypoint =  new Waypoint(req.body);
   await waypoint.save();
  res.json({
      'status': 'Waypoint saved'
  });
}

waypointCtrl.createOne_ = async ( wayPointData,stage_id) =>
{
  var stage =  await  Stage.findById({"_id":stage_id } );
  const waypoint =  new Waypoint(wayPointData);
 
  await waypoint.save(async (err)=>{
    if ( err ) return err;     
      //console.log(waypoint._id);
      stage.waypoints.push(waypoint._id);
      await Stage.findByIdAndUpdate(stage._id,stage);

    }
);


}
waypointCtrl.createAll = async ( req , res ) =>
{
  if (req.files === null) {
    return res.status(400).json({msg:'No file uploaded'});
  }
 

  if (!req.files.file.name.endsWith('.csv'))
  {
    return res.status(400).json({msg:'File type must be .CSV'});
  }
  
  await  Waypoint.deleteMany({}); // Reset database

  //Cleaning waypoints

  var waypoints = toolsCtrl.getWaypointsFromFile(req.files.file) // Data pre-processing
  
  //Send to database
  try
  {
    await Waypoint.insertMany(waypoints,async (err,savedData)=>{
      if ( err ) return err;
      try
      {
        //Save Waypoints in Stage
        var stage =  await  Stage.findById({"_id":req.body.stage_id } );
        stage.waypoints =[] //reset waypoints 
        savedData.forEach((wp)=>{
            stage.waypoints.push(wp._id);
          })

        await Stage.findByIdAndUpdate(stage._id,stage);
        res.status(201).json({msg:' Waypoints uploaded'});
      }
      catch(err)
      {
        await Waypoint.deleteMany({});
        return res.status(400).json({msg : " stage_id don't founded",solution:"check stage_id in body request"});
  
      }
      

  
    })
  }
  catch(err)
  {
    return res.json(err);
  }

  

  

 
}
waypointCtrl.deleteAll = async (req,res) =>
{
  
  await Waypoint.deleteMany({});
  res.json({
    'status': 'All Waypoints deleted'

});
  
  
}

waypointCtrl.deleteOne = async ( req,res) => {

  //THIS IS NOT HAS BEEN TESTED YET
  //Delete from Stage
  var stage = await Stage.findById({"_id":req.body.stage_id});
  stage.waypoints =stage.waypoints.filter((wp_id)=> (String(wp_id)).localeCompare(req.params.id));
  await Stage.findByIdAndUpdate(stage._id,stage);

  //Delete  Waypoints
  await Waypoint.findByIdAndDelete(req.params.id);
   res.json({'status': 'Waypoint Deleted'})
}

waypointCtrl.deleteAll = async ( req, res ) => {

  //THIS IS NOT HAS BEEN TESTED YET

  //Delete from Stage
  var stage = await Stage.findById({"_id":req.body.stage_id});
  stage.waypoints =[]
  await Stage.findByIdAndUpdate(stage._id,stage);

  //Delete All waypoints
  await Waypoint.deleteMany({});
  res.json({'status': 'All waypoints deleted'})

}



module.exports = waypointCtrl;
