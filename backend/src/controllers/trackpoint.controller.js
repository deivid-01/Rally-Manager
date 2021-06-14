const Trackpoint = require('../models/trackpoint.js');
const toolsCtrl = require('../controllers/tools.controller');
const trackpointCtrl = {};

trackpointCtrl.getOneByPartialresult = async ( req, res) => {
  try
  {
    const trackpoints = await Trackpoint.find({partialresult:req.params.id});
    res.json(trackpoints);
  }
  
  catch (err)
  {
    res.json(err)
  }
}

trackpointCtrl.getAll= async ( req , res ) =>
{
  try
  {
    const trackpoints = await Trackpoint.find();
    res.json(trackpoints);
  }
  catch
  {
    return res.json(err)
  }

}
trackpointCtrl.createOne = async ( req , res ) =>
{
  
  var trackpoint =  new Trackpoint(req.body);
   await trackpoint.save();
  res.json({
      'status': 'Trackpoint saved'
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
  if (!req.files.file.name.endsWith('.gpx'))
  {
    return res.status(400).json({msg:'File type must be .GPX'});
  }
 

  var trackpoints =  toolsCtrl.getTrackPointsFromFile(req.files.file);  
  trackpoints.forEach((point)=>{
    point.partialresult = req.body.partialresult;
  })
  console.log(trackpoints[0]);
  try
  {
    await Trackpoint.insertMany(trackpoints);
  }
  catch(err)
  {
    console.log(err);
    return res.status(400).json({msg : " id param don't founded",solution:"check id param in body request"});
  
  }


  res.status(201).json({msg:' Trackpoints uploaded'});



}



module.exports = trackpointCtrl;