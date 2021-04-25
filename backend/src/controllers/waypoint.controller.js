const Waypoint = require('../models/waypoint');
const parse = require('papaparse');
const toolsCtrl = require('../controllers/tools.controller');
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

waypointCtrl.createWaypoint_ = async ( wayPointData) =>
{
  const waypoint =  new Waypoint(wayPointData);
  await waypoint.save();

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
       
      try{
        var waypoint={};
        waypoint._id= i +1; 
        waypoint.latitude =toolsCtrl.DDM2DD( elem[1], typeAD = 1);
        waypoint.longitude =toolsCtrl.DDM2DD( elem[2],typeAD = 2);
        waypoint.type= elem[3];
        waypoint.distance = elem[4];
        waypoint.speed= elem[6]; 

        await   waypointCtrl.createWaypoint_ (waypoint);     
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
