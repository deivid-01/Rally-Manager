const Stage = require('../models/stage.js');
const Category = require('../models/category.js');
const PartialResult = require('../models/partialresult.js');
const partialresult = require('../models/partialresult.js');
const stage = require('../models/stage.js');
const stageCtrl = {};

stageCtrl.getOne= async ( req , res ) =>
{
  try
  {
    await Stage.findById(req.params.id).
    populate({
      path:"categories",select:"categorytype",
      populate:{path:"categorytype",select:"name"}}).
      populate('waypoints').
      populate({
        path:"partialresults",select:["competitor",'start_time','arrival_time','neutralization','penalization'],
        populate:{path:"competitor",select:["name",'lastname','categorytype'],
        populate:{path:'categorytype',select:'name'}}})
      
      .exec((err,stage)=>{
        if (err) return res.status(400).json(err);
        return res.json(stage);
    });
  }
  catch(err)
  {
    return res.status(400).json(err);
  }
  
}
stageCtrl.getOneByCategory = async ( req , res ) => {
  
  var {id:stage_id, categorytype_id } = req.params
 
  try
  {
    await Stage.findById(stage_id).
    populate({
      path:"categories",select:"categorytype",
      populate:{path:"categorytype",select:"name"}}).
      populate('waypoints').
      populate({
        path:"partialresults",select:["competitor",'start_time','arrival_time','neutralization','penalization','gpx_uploaded'],
        populate:{path:"competitor",select:["name",'lastname','categorytype'],
        populate:{path:'categorytype',select:'name'}}})
      
      .exec((err,stage)=>{
        
        if (err) return res.status(400).json(err);

        stage = stageCtrl.filterByCategoryType(stage,categorytype_id)
        return res.json(stage);
    });
  }
  catch(err)
  {
    return res.status(200).json(err)
  }

}
stageCtrl.filterByCategoryType = (stage,categorytype_id) => {
  //Filter categorytype
  stage.categories = stage.categories.filter((category)=>String(category.categorytype._id).localeCompare(categorytype_id)==0)
  stage.partialresults = stage.partialresults
                        .filter((partialresult)=>
                        String(partialresult.competitor.categorytype._id).localeCompare(categorytype_id)==0)
  
  return stage
}
stageCtrl.getAll= async ( req , res ) =>
{
  await Stage.find(). 
    populate({
      path:"categories",select:"categorytype",
      populate:{path:"categorytype",select:"name"}}).
    populate({
        path:"partialresults",select:"competitor",
        populate:{path:"competitor",select:"name"}}).
    populate('waypoints')
      .exec((err,stages)=>{
      res.json(stages);
    });
}
stageCtrl.createOne = async ( req , res ) =>
{
  
  try
  {


    var stage = new Stage(req.body);
    await stage.save().then(async()=>{

      //Adding stages to category
        for ( category_id of stage.categories)
        {
          var category = await Category.findById(category_id);
          
          //Create partial results
          for ( competitor_id of category.competitors )
          {
              item = {}
              item.stage = stage._id
              item.competitor = competitor_id

              var partialResult = new PartialResult(item)

              await partialResult.save().then(async()=>{
                stage.partialresults.push(partialResult._id);
              });

          }

          category.stages.push(stage._id);

          await category.save();

          await stage.save();

        }

        res.status(200).json({msg:"Stage created",id:stage._id});
      

    });



  }
  catch(err)
  {
    return res.json(err);
  }
 
 
}

stageCtrl.deleteOne = async ( req,res) => {

  //THIS IS NOT HAS BEEN TESTED YET
  
  //Delete from Category
  var category = await Category.findById({"_id":req.body.category_id});
  category.stages =categorys.stages.filter((stage_id)=> (String(stage_id)).localeCompare(req.params.id));
  await Category.findByIdAndUpdate(category._id,category);

  //Delete  Stage
  await Stage.findByIdAndDelete(req.params.id);
   res.json({'status': 'Stage Deleted'})
}

stageCtrl.deleteAll = async ( req, res ) => {

  //THIS IS NOT HAS BEEN TESTED YET

  //Delete from Category
  var category = await Category.findById({"_id":req.body.category_id});
  category.stages =[]
  await Category.findByIdAndUpdate(category._id,category);

  //Delete All stages
  await Stage.deleteMany({});
  res.json({'status': 'All stages deleted'})

}



module.exports = stageCtrl;