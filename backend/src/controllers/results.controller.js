const analysisCtrl = require('./analysis.controller');
const Stages = require('../models/stage');
const Races = require('../models/race');
const Waypoints = require('../models/waypoint');
const Competitors = require('../models/competitor');
const Trackpoints = require('../models/trackpoint');

const resultCtrl = {};

resultCtrl.getStageResult=async(/*req,res*/)=>{
    //req.params.id id de la etapa
    //req.body.race_id id de la carrera
    /*stageID = req.params.id;
    raceID = req.body.race_id;*/
    stageID = "6091a7af1d549a37b8db11d0";
    raceID = "609a095345748a3e4460e572";

    //res.json(resultado)
    var stage = await Stages.findById({"_id":stageID});
    var waypoints = stage.waypoints;
    var waypointList = [];
    //console.log(Waypoints.findById({"_id":}));
    /*for(var i=0; i <= waypoints.length;i++){
        waypointList.push(Waypoints.findById({"_id":waypoints[i]}));
    }*/
    var race = await Races.findById({"_id":raceID})
    var category = race.categories[2];
    var competidor = await Competitors.find({category:category})
    var idCompetidor = competidor[0]._id;
    var trackpoints = await Trackpoints.find({competitor:idCompetidor})
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