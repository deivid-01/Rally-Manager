const GPX = require('../models/gpx.js');

const gpxCtrl = {};

gpxCtrl.getGPX = async ( req , res ) =>
{
  const gpx = await GPX.find();
  res.json(gpx);
}
gpxCtrl.createGPX = async ( req , res ) =>
{
  
  const gpx =  new GPX(req.body);
   await gpx.save();
  res.json({
      'status': 'GPX saved'
  });
}

module.exports = gpxCtrl;