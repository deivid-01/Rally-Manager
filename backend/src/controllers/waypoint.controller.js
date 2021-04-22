const Waypoint = require('../models/waypoint');
const parse = require('papaparse')
const waypointCtrl = {};

waypointCtrl.getWaypoints = async ( req , res ) =>
{
  const waypoints = await Waypoint.find();
  res.json(waypoints);
}

waypointCtrl.createWaypoint = async ( req , res ) =>
{
  
  const waypoint =  new Waypoint(req.body);
   await waypoint.save();
  res.json({
      'status': 'Waypoint saved'
  });
}
 const createWaypointx2 = async ( wayPointData) =>
{
  
  const waypoint =  new Waypoint(wayPointData);
   await waypoint.save();
  /*
   res.json({
      'status': 'Waypoint saved'
  });
  */
}
waypointCtrl.createWaypoints = async ( req , res ) =>
{
  if (req.files === null) {
    return res.status(400).json({msg:'No file uploaded'});
  }

  const file = req.files.file;

  var data = file.data.toString('utf8');

  data = data.split("\n");
  data.splice(0,5);  //Deleting frist 5 rows          

  var result = parse.parse( data.join("\n") ); //CSV to JSON

  result.data=result.data.filter(elem=> elem[3].length>0);

  result.data.forEach(async function(elem,i) {
       
      var waypoint={};
      waypoint.waypoint = elem[0];
      waypoint.latitude = elem[1];
      waypoint.longitude = elem[2];
      waypoint.type= elem[3];
      waypoint.distance = elem[4];
      waypoint.speed= elem[6]; 
      try{

        await  createWaypointx2(waypoint);     
      }
      catch(err)
      {
        console.log("fail");
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
