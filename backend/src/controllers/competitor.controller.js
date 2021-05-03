const Competitor = require("../models/competitor");
const Race = require("../models/race");
const toolsCtrl = require('../controllers/tools.controller');
const competitor = require("../models/competitor");

const competitorCtrl = {}


competitorCtrl.getAll= async ( req , res ) =>
{
  const competitors = await Competitor.find();
  res.json(competitors);
}
competitorCtrl.createOne = async ( req , res ) =>
{ 
  var competitor =  new Competitor(req.body);
   await competitor.save();
  res.json({
      'status': 'Competitor saved'
  });
}

competitorCtrl.createAll = async ( req , res ) =>
{
  if (req.files === null) {
    return res.status(400).json({msg:'No file uploaded'});
  }
 
  if (!req.files.file.name.endsWith('.csv'))
  {
    return res.status(400).json({msg:'File type must be .CSV'});
  }
  
  await  Competitor.deleteMany({}); // Reset database

  //Cleaning File

  var competitors = toolsCtrl.getCompetitorsFromFile(req.files.file) // Data pre-processing
  
  //Send to database

  await Competitor.insertMany(competitors,async (err,savedData)=>{
    if ( err ) return err;

    //Save Competitors in Race
    var race =  await  Race.findById({"_id":req.body.race_id } );
    race.competitors =[] //reset competitors 
    savedData.forEach((comp)=>{
      race.competitors.push(comp._id);
      })

    await Race.findByIdAndUpdate(race._id,race);

  })

  res.status(201).json({msg:' Competitors uploaded'});
}


competitorCtrl.updateAll = async ( req , res ) => {

  if (req.files === null) {
    return res.status(400).json({msg:'No file uploaded'});
  }
 
  if (!req.files.file.name.endsWith('.csv'))
  {
    return res.status(400).json({msg:'File type must be .CSV'});
  }

 toolsCtrl.getPartialResultsFromFile(req.files.file);
  return 0;
}

competitorCtrl.deleteOne = async ( req,res) => {

  //THIS IS NOT HAS BEEN TESTED YET
  
  //Delete from Race
  var race = await Race.findById({"_id":req.body.race_id});
  race.competitors =races.competitors.filter((competitor_id)=> (String(competitor_id)).localeCompare(req.params.id));
  await Race.findByIdAndUpdate(race._id,race);

  //Delete  Competitor
  await Competitor.findByIdAndDelete(req.params.id);
   res.json({'status': 'Competitor Deleted'})
}

competitorCtrl.deleteAll = async ( req, res ) => {

  //THIS IS NOT HAS BEEN TESTED YET

  //Delete from Race
  var race = await Race.findById({"_id":req.body.race_id});
  race.competitors =[]
  await Race.findByIdAndUpdate(race._id,race);

  //Delete All competitors
  await Competitor.deleteMany({});
  res.json({'status': 'All competitors has been deleted'})

}




module.exports = competitorCtrl;