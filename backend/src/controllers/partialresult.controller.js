const PartialResult = require("../models/partialresult");
const Competitor = require("../models/competitor");
const Stage = require("../models/stage");
const toolsCtrl = require("./tools.controller");

partialResultCtrl = {}

partialResultCtrl.getAll = async ( req, res) =>{
    await PartialResult.find().
    populate("competitor","name").
    populate("stage","name").exec((err,partialResults)=>{
        res.status(200).json(partialResults);
    });

}

partialResultCtrl.createOne = async ( req, res ) => {

    var partialResult = toolsCtrl.getConvertedPartialResult(req.body);
    
    partialResult = new PartialResult(partialResult);
    await partialResult.save().then(async(partialResult)=>
    {
       var stage = await Stage.findById(partialResult.stage);
       stage.partialresults.push(partialResult._id);
       await stage.save()

       res.status(200).json({"msg":"partial result created"});
    });

}

partialResultCtrl.createMany = async (req,res) =>{

    
    if (req.files === null) {
        return res.status(400).json({msg:'No file uploaded'});
      }
     
    
      if (!req.files.file.name.endsWith('.csv'))
      {
        return res.status(400).json({msg:'File type must be .CSV'});
      }

    var partialResults = toolsCtrl.getPartialResultsFromFile(req.files.file);

    for ( partialResult of partialResults)
    {
        var competitor =  await Competitor.findOne({number:partialResult.number})
        partialResult.competitor = competitor._id;
    }
 

    await PartialResult.insertMany(partialResults);
    res.status(200).json({"msg":"Partial results created"});

}

partialResultCtrl.deleteAll = async ( req,res) =>{

    await PartialResult.deleteMany({});
    res.status(200).json({"msg":"All Partial results has been deleted"});
}


module.exports = partialResultCtrl;