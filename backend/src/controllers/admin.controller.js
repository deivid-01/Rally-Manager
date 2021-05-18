const Admin = require("../models/admin");

const adminCtrl = {}

adminCtrl.getOne= async ( req , res ) =>
{
  try
  {
    const admin = await Admin.findById(req.params.id).
    populate("races","name").exec((err,admin)=>{
        res.status(200).json(admin);
    });
    
  }
  catch(err)
  {
    res.status(400).json(err);
  }
}

adminCtrl.getAll= async ( req , res ) =>
{
  const admins = await Admin.find().
  populate("races","name").exec((err,admins)=>{
    res.json(admins);
  });
  
}
adminCtrl.createOne = async ( req , res ) =>
{ 
  var admin =  new Admin(req.body);
   await admin.save();
  res.json({
      'status': 'Admin saved'
  });
}
adminCtrl.updateOne = async ( req, res ) =>{

  try{
    await Admin.findByIdAndUpdate(req.params.id);
    res.status(200).json({"msg":"Admin Updated"});

  }
  catch(err)
  {
    res.status(400).json(err);
  }

}

adminCtrl.deleteOne = async ( req, res )=>{

  try
  {
    /**Delete Races...
     * 
     * 
     * 
     * 
     * ...
     */


    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({"msg":"Admin Deleted"});

  }  
  catch(err)
  {
    res.status(400).json(err);
  }
}
adminCtrl.deleteAll = async ( req, res )=>{

  /**Delete All races from all admins...
   * 
   * 
   * 
   * 
   *  */  
  
  
  await Admin.deleteMany({});
    res.status(200).json({"msg":"Admin Deleted"});


}


module.exports = adminCtrl;