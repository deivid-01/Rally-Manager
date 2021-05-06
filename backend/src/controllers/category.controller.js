const Category = require('../models/category.js');
const Race = require('../models/race.js');
const categoryCtrl = {};

categoryCtrl.getAll= async ( req , res ) =>
{
  const categories = await Category.find();
  res.json(categories);
}
categoryCtrl.createOne = async ( req , res ) =>
{
    console.log("olas");
 try
 {
    var category =  new Category(req.body);
    await category.save( async (err)=>{
     if ( err ) return err;
       try
       {
        var race =  await  Race.findById({"_id":req.body.race_id } );
       
        race.categories.push(category._id);
        await Race.findByIdAndUpdate(race._id,race);   
        res.json({
            'status': 'Category saved'
        });
       } 
       catch(err){
        
        await Category.findByIdAndDelete(category._id);
        return res.status(400).json({msg : " race_id don't founded",solution:"check race_id in body request"});
     
      }
       
     }
 
    );

 }
 catch(err)
  {
    return res.json(err);
  }
 
}

categoryCtrl.deleteOne = async ( req,res) => {

  //Delete from Race
  var race = await Race.findById({"_id":req.body.race_id});
  race.categories = race.categories.filter((category_id)=> (String(category_id)).localeCompare(req.params.id));
  await Race.findByIdAndUpdate(race._id,race);

  //Delete  Category
  await Category.findByIdAndDelete(req.params.id);
   res.json({'status': 'Category  Deleted'})
}

categoryCtrl.deleteAll = async ( req, res ) => {
  //Delete from Race
  var race = await Race.findById({"_id":req.body.race_id});
  race.categories =[]
  await Race.findByIdAndUpdate(race._id,race);

  //Delete All categories
  await Category.deleteMany({});
  res.json({'status': 'All categories deleted'})

}
module.exports = categoryCtrl;
