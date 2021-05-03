const Stage = require('../models/stage.js');
const Race = require('../models/race.js');
const stageCtrl = {};

stageCtrl.getAll= async ( req , res ) =>
{
  const stage = await Stage.find();
  res.json(stage);
}
stageCtrl.createOne = async ( req , res ) =>
{
  
  var stage =  new Stage(req.body);
  await stage.save( async (err)=>{
    if ( err ) return err;

    //Adding stage to Race
      var race =  await  Race.findById({"_id":req.body.race_id } );
      race.stages.push(stage._id);
      await Race.findByIdAndUpdate(race._id,race);
      

    }
);
  res.json({
      'status': 'Stage saved'
  });
}

stageCtrl.deleteOne = async ( req,res) => {

  //THIS IS NOT HAS BEEN TESTED YET
  
  //Delete from Race
  var race = await Race.findById({"_id":req.body.race_id});
  race.stages =races.stages.filter((stage_id)=> (String(stage_id)).localeCompare(req.params.id));
  await Race.findByIdAndUpdate(race._id,race);

  //Delete  Stage
  await Stage.findByIdAndDelete(req.params.id);
   res.json({'status': 'Stage Deleted'})
}

stageCtrl.deleteAll = async ( req, res ) => {

  //THIS IS NOT HAS BEEN TESTED YET

  //Delete from Race
  var race = await Race.findById({"_id":req.body.race_id});
  race.stages =[]
  await Race.findByIdAndUpdate(race._id,race);

  //Delete All stages
  await Stage.deleteMany({});
  res.json({'status': 'All races deleted'})

}



module.exports = stageCtrl;