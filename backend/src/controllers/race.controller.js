const Race = require('../models/race.js');
const User = require('../models/user.js');
const raceCtrl = {};

raceCtrl.getAll= async ( req , res ) =>
{
  const races = await Race.find();
  res.json(races);
}
raceCtrl.createOne = async ( req , res ) =>
{
  try
  {
    var race =  new Race(req.body);
    await race.save( async (err)=>{
     if ( err ) return err;
      try
      {
        var user =  await  User.findById({"_id":req.body.user_id } );
       
        user.races.push(race._id);
        await User.findByIdAndUpdate(user._id,user);

        res.json({
          'status': 'Race Saved'
      });
      }
      catch(err){
        
        await Race.findByIdAndDelete(race._id);
        return res.status(400).json({msg : " user_id don't founded",solution:"check user_id in body request"});
     
      }
     }
 
    );
  }
  catch(err)
  {
    return res.json(err);
  }
  
}

raceCtrl.deleteOne = async ( req,res) => {

  //Delete from User
  var user = await User.findById({"_id":req.body.user_id});
  user.races =user.races.filter((race_id)=> (String(race_id)).localeCompare(req.params.id));
  await User.findByIdAndUpdate(user._id,user);

  //Delete  Race
  await Race.findByIdAndDelete(req.params.id);
   res.json({'status': 'Race Deleted'})
}

raceCtrl.deleteAll = async ( req, res ) => {
  //Delete from User
  var user = await User.findById({"_id":req.body.user_id});
  user.races =[]
  await User.findByIdAndUpdate(user._id,user);

  //Delete All races
  await Race.deleteMany({});
  res.json({'status': 'All races deleted'})

}
module.exports = raceCtrl;
