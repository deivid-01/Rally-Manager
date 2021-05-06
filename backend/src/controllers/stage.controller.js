const Stage = require('../models/stage.js');
const Category = require('../models/category.js');
const stageCtrl = {};

stageCtrl.getAll= async ( req , res ) =>
{
  const stage = await Stage.find();
  res.json(stage);
}
stageCtrl.createOne = async ( req , res ) =>
{
  
  try
  {
    var stage =  new Stage(req.body);
    await stage.save((err,saveData)=>{
        Stage.populate(stage,{path:"categories"},function(err,stage){
          stage.categories.forEach(async(category)=>{
            category.stages.push(stage._id);
            await category.save();
          })
        })
        res.json({
          'status': 'Stage saved'
      });
    })

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