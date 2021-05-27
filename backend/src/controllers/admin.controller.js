const Admin = require("../models/admin");

const adminCtrl = {}

adminCtrl.login = async ( req , res)  => {
  try
  {
    var admin = await Admin.findOne({
                        username:req.body.username,
                        password:req.body.password}).
                        populate('races','name')
    if ( admin != null)
      return res.status(200).json(admin)
    return res.status(400).json({"msg":"User don't found"})
    
  }
  catch(err)
  {
    res.status(400).json(err)
  }
}


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
    res.status(200).json({"msg":"All Admins Deleted"});


}


module.exports = adminCtrl;