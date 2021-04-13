const Waypoint = require('../models/waypoint');

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



module.exports = waypointCtrl;
