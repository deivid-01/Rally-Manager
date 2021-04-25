const Trackpoint = require('../models/trackpoint.js');
const toolsCtrl = require('../controllers/tools.controller');
const trackpointCtrl = {};

trackpointCtrl.getAll= async ( req , res ) =>
{
  const trackpoints = await Trackpoint.find();
  res.json(trackpoints);
}
trackpointCtrl.createOne = async ( req , res ) =>
{
  
  var trackpoint =  new Trackpoint(req.body);
   await trackpoint.save();
  res.json({
      'status': 'Waypointss Competitor Saved'
  });
}

trackpointCtrl.createOne_ = async ( trackpoint ) =>
{  
  var  trackpoint =  new Trackpoint(trackpoint);
   await trackpoint.save();
}

trackpointCtrl.createAll = async ( req , res ) =>
{

  if (req.files === null) {
    return res.status(400).json({msg:'No file uploaded'});
  }
  await Trackpoint.deleteMany({});

  var trackpoints =  toolsCtrl.gargabeOutGPXFile(req.files.file);  
  trackpoints.forEach(async function(elem,i) {
       
    try{
      var trackpoint={};
      trackpoint._id= i +1; 
      trackpoint.latitude = elem.lat;
      trackpoint.longitude = elem.lon;
      trackpoint.elevation= elem.ele;
      trackpoint.time = elem.time.toString();
      await   trackpointCtrl.createOne_ (trackpoint);     
    }
    catch(err)
    {
      console.log(err);
    }

  
  });
  res.json({
    'status': 'Trackpoints saved'
  });


}



module.exports = trackpointCtrl;