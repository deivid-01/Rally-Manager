const Competitor = require("../models/competitor");
const Category = require("../models/category");
const CategoryType = require("../models/categorytype");
const Race = require("../models/race");
const toolsCtrl = require('../controllers/tools.controller');

const competitorCtrl = {}


competitorCtrl.getAll= async ( req , res ) =>
{
  await Competitor.find()
  .populate("races","name")
  .populate("categorytype","name")
  .exec((err,competitors)=>{
    res.json(competitors);
  });
 
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

  //Create categories
    var i = 0;
   
    for (competitor of competitors)
   {
      var categoryName = competitor.category;
      var categoryFound = await CategoryType.findOne({name:categoryName});

      if ( categoryFound == null) // new category
      {
        categoryTypedata = {}
        categoryTypedata.name = categoryName;
        var newCategoryType = new CategoryType(categoryTypedata);
        await newCategoryType.save()
        .then(async()=>{     
          competitors[i].categorytype = newCategoryType._id;
            
            data = {}
            data.categoryType = newCategoryType._id;
            var newCategory = new Category(data);        
            await newCategory.save();
          
        });
       
      }
      else
      {
          competitors[i].categorytype = categoryFound._id;
           


      }
      i +=1;
    }


  await Competitor.insertMany(competitors).then(async(competitors)=>{
    
    for ( competitor of competitors)
    {

      var categoryType = await CategoryType.findById(competitor.categorytype);
      var category = await Category.findOne({categoryType:categoryType._id})
  
      
      if (!category.competitors.includes(competitor._id))
      {
        category.competitors.push( competitor._id);
        await category.save();
      }

    }
    var _ids= competitors.map(data=>data._id);

    res.status(201).json({msg:' Competitors uploaded',ids:_ids});
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
 // var category = await Category.findById({"_id":req.body.category_id});
 // category.competitors =[]
 // await Category.findByIdAndUpdate(category._id,category);

  //Delete All competitors
  await Competitor.deleteMany({});
  res.json({'status': 'All competitors has been deleted'})

}




module.exports = competitorCtrl;