const Race = require('../models/race.js');
const Admin = require('../models/admin.js');
const Category = require('../models/category.js');
const Competitor = require('../models/competitor.js');
const raceCtrl = {};

raceCtrl.getAll= async ( req , res ) =>
{
  await Race.find().
  populate({
    path:"categories",select:"categorytype",
    populate:{path:"categorytype",select:"name"}}).
  populate("competitors","name").
  populate("admin","name").
    exec((err,races)=>{
      res.json(races);
  });
}

raceCtrl.getOne= async ( req , res ) =>
{
  try
  {
    await Race.findById(req.params.id).
    populate({
      path:"categories",select:"categoryType",
      populate:{path:"categoryType",select:"name"}}).
    populate("competitors","name").
    populate("admin","name").
      exec((err,race)=>{
        res.status(200).json(race);
    });
    
  }
  catch(err)
  {
    res.status(400).json(err);
  }
}
raceCtrl.createOne = async ( req , res ) =>
{

  
  try
  {
    var race =  new Race(req.body);
    await race.save().then(async (race)=>{
      
      try
      {



            typesAdded = []
           //Create categories

            for ( competitor_id of race.competitors)
            {
              
              
              var competitor = await Competitor.findById(competitor_id);
     
          
                if ( !typesAdded.includes(String(competitor.categorytype)))
                {
                  //Create Category
                    data = {
                      competitors :[]
                    }
                    data.categorytype = competitor.categorytype;
                    data.race = race._id;
                    data.competitors.push(competitor._id);
                    var category = new Category(data);
                    await category.save();
                    typesAdded.push(String(competitor.categorytype));
                }
                else
                {
                  var category = await Category.findOne({race:race._id,categorytype:competitor.categorytype});
            
                  category.competitors.push( competitor._id);
                  await category.save();
                  if(!race.categories.includes(category._id))
                  {
                    race.categories.push(category._id);
                  }
                }

                competitor.races.push(race._id);
                await competitor.save();
                
            }
          
          
        //add race to admin
        var admin =  await  Admin.findById(race.admin);
        admin.races.push(race._id);
        await admin.save();

        await race.save();
        

        res.status(200).json({"msg":"Race Saved"});
      }
      catch(err){
        console.log(err)
        //await Race.findByIdAndDelete(race._id);
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
  /**
   *   var user = await User.findById({"_id":req.body.user_id});
  user.races =[]
  await User.findByIdAndUpdate(user._id,user);
   * 
   */


  //Delete All races
  await Race.deleteMany({});
  res.json({'status': 'All races deleted'})

}
module.exports = raceCtrl;
