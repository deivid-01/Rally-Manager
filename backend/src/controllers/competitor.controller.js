const Competitor = require("../models/competitor");
const Category = require("../models/category");
const Race = require("../models/race");
const toolsCtrl = require('../controllers/tools.controller');

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

  await Race.findById({"_id":req.body.race_id}).populate('categories').exec(function(err,race){
    if (err) return err;

    race.categories.forEach(async (category)=>{
      //Filter Competitors by category
      var comps=  competitors.filter( competitor => competitor.category == category.name);
      comps.forEach((comp)=>{category.competitors.push(comp._id);   })
      //Save Competitors
      await Competitor.insertMany(comps);
      //Update Category with comps id
      await category.save();

    })
    res.status(201).json({msg:' Competitors uploaded'});
  })

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
  
  //Delete from Category
  var category = await Category.findById({"_id":req.body.category_id});
  category.competitors =category.competitors.filter((competitor_id)=> (String(competitor_id)).localeCompare(req.params.id));
  await Category.findByIdAndUpdate(category._id,category);

  //Delete  Competitor
  await Competitor.findByIdAndDelete(req.params.id);
   res.json({'status': 'Competitor Deleted'})
}

competitorCtrl.deleteAll = async ( req, res ) => {

  //THIS IS NOT HAS BEEN TESTED YET

  //Delete from Category
  var category = await Category.findById({"_id":req.body.category_id});
  category.competitors =[]
  await Category.findByIdAndUpdate(category._id,category);

  //Delete All competitors
  await Competitor.deleteMany({});
  res.json({'status': 'All competitors has been deleted'})

}




module.exports = competitorCtrl;