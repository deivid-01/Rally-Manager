const User = require("../models/user");

const userCtrl = {}


userCtrl.getAll= async ( req , res ) =>
{
  const users = await User.find();
  res.json(users);
}
userCtrl.createOne = async ( req , res ) =>
{ 
  var user =  new User(req.body);
   await user.save();
  res.json({
      'status': 'User saved'
  });
}

module.exports = userCtrl;