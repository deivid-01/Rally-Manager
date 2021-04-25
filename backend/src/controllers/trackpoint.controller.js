const Trackpoint = require('../models/trackpoint.js');
let GPX = require('gpxparser');
const trackpointCtrl = {};

trackpointCtrl.getAll= async ( req , res ) =>
{
  const trackpoints = await Trackpoint.find();
  res.json(trackpoints);
}
trackpointCtrl.createOne = async ( req , res ) =>
{
  
  const trackpoint =  new Trackpoint(req.body);
   await trackpoint.save();
  res.json({
      'status': 'Waypointss Competitor saved'
  });
}

trackpointCtrl.createAll = async ( req , res ) =>
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



module.exports = trackpointCtrl;