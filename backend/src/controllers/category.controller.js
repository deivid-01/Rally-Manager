const Category = require('../models/category.js');
const CategoryType = require('../models/categorytype.js');
const Race = require('../models/race.js');
const categoryCtrl = {};

categoryCtrl.getAll= async ( req , res ) =>
{
  await Category.find().
  populate("race","name").
  populate("categoryType","name").
  populate("competitors","name").exec((err,categories)=>
  {
    res.json(categories);
  })
 
}
categoryCtrl.createOne = async ( req , res ) =>
{
    
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

categoryCtrl.createMany = async ( req , res ) => {

    //Create Category Types
    await CategoryType.insertMany(req.body.types,async(err,categorytypes)=>{
 
      var cont = 1;
      categories_ids = []
      await Promise.all(categorytypes.map(async(categoryType)=>{
        var categoryData = {}
        categoryData.categoryType=categoryType._id;
        var category = new Category(categoryData);
        await category.save(async(err)=>{
          categories_ids.push (category._id);
       
          if (cont >= categorytypes.length)
          {       
            res.status(200).json({"msg":"Category types created","Ids":categories_ids});
            return;

          }
          cont +=1;
        })
      
        
        
      }))

      
    });
    
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
