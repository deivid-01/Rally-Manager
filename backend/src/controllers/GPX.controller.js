const WaypointCompetitor = require('../models/gpx.js');
let GPX = require('gpxparser');
const gpxCtrl = {};

gpxCtrl.getGPX = async ( req , res ) =>
{
  const waypoints = await WaypointCompetitor.find();
  res.json(waypoints);
}
gpxCtrl.createGPX = async ( req , res ) =>
{
  
  const waypoints =  new WaypointCompetitor(req.body);
   await waypoints.save();
  res.json({
      'status': 'Waypointss Competitor saved'
  });
}

gpxCtrl.createWaypoints = async ( req , res ) =>
{
  if (req.files === null) {
    return res.status(400).json({msg:'No file uploaded'});
  }

  const file = req.files.file;
  var data = file.data.toString('utf8');
  var gpx = new GPX();
  gpx.parse(data);
  console.log(gpx.waypoints);

}



module.exports = gpxCtrl;