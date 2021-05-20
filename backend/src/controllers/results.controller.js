const analysisCtrl = require('./analysis.controller');
var mongo = require('mongodb');
const Stages = require('../models/stage');
const Races = require('../models/race');
const Waypoints = require('../models/waypoint');
const Competitors = require('../models/competitor');
const Trackpoints = require('../models/trackpoint');
const Categories = require('../models/category');
var mongoose = require('mongoose');

const resultCtrl = {};

resultCtrl.getStageResult=async(/*req,res*/)=>{
    //req.params.id id de la etapa
    //req.body.race_id id de la carrera
    /*stageID = req.params.id;
    raceID = req.body.race_id;*/
    stageID = "60a41cb13c14873c684d626f";
    raceID = "60a41b8a3c14873c684d626d";
    const {
        ObjectId
      } = require('mongodb');
    //res.json(resultado    )
    var stage = await Stages.findById({"_id":stageID});
    var waypointStage = stage.waypoints;
    var waypointList =await Waypoints.find({'_id':waypointStage});
    var race = await Races.findById({"_id":raceID})
    var categorias = race.categories[0];
    var categoriasName = await Categories.find({"_id":categorias}); 
    var competidor = await Competitors.find({category:categoriasName[0].name});    
    var idCompetidor = competidor[2]._id;    
    var trackpoints = await Trackpoints.find({competitor:idCompetidor});
    analysisCtrl.checkWaypoints(waypointList,trackpoints);

    /**
     * 1. Hacer query pa obtener la etapa
     * 2. Acceder a la lista de wp de la etapa
     * 3. Hacer query para obtener wp
     * 
     * 1. Obtener la carrera 
     * 2. Obtener los id de los competidores de la carrera
     * 3. Con esos id hacer query a la tabla trackpoint
     * 4. Hacer filtro para obtener los trackpoints por competidor
     * 5. Hacer analisis de los trackpoints.
     * 
     * Guardar resultados
     * 1. Acceder a la carrera a los id de los competidores
     * 2. Con esos id hacer query para obtener los competidores en la tabla competitor
     * 3. Acceder a la propiedad resultados (lista) anadir los resultados de la etapa 1 en la posicion 1
     * Y asi
     * 4. Enviar respuesta con los resultados
     * 
     *      */    
};

resultCtrl.getRaceResult=async(req,res)=>{
    //req.params.id id de la carrera
    
};

module.exports = resultCtrl;