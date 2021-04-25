const Waypoint = require('../models/waypoint');
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

waypointCtrl.createOne_ = async ( wayPointData) =>
{
  const waypoint =  new Waypoint(wayPointData);
  await waypoint.save();

}
waypointCtrl.createAll = async ( req , res ) =>
{
  if (req.files === null) {
    return res.status(400).json({msg:'No file uploaded'});
  }

  await  Waypoint.deleteMany({}); // Cleaning database

  const waypoints = toolsCtrl.garbageOutCSVFile(req.files.file) // Data pre-processing

  waypoints.forEach(async function(elem,i) {
       
      try{
        var waypoint={};
        waypoint._id= i +1; 
        waypoint.latitude =toolsCtrl.DDM2DD( elem[1], typeAD = 1);
        waypoint.longitude =toolsCtrl.DDM2DD( elem[2],typeAD = 2);
        waypoint.type= elem[3];
        waypoint.distance = elem[4];
        waypoint.speed= elem[6]; 

        await   waypointCtrl.createOne_ (waypoint);     
      }
      catch(err)
      {
        console.log(err);
      }

    
  });

  res.json({
    'status': 'Waypoints saved'
});



}
waypointCtrl.deleteAll = async (req,res) =>
{
  
  await Waypoint.deleteMany({});
  res.json({
    'status': 'All Waypoints deleted'

});
  
  
}


module.exports = waypointCtrl;
