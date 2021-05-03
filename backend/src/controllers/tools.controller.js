const parse = require('papaparse');
let GPX = require('gpxparser');
const waypoint = require('../models/waypoint');
const toolsCtrl = {};
/**
 * Convert Degrees Decimal  Minutes (DDM) to Decimal Degrees (DD).
 *
 * @param {String} point The value of angular Distance.
 * @param {number} typeAD   The type of angular distance | 1 : latitude , 2 ; longitude
 * @return {number} Number value of angular distance.
 */
 toolsCtrl.DDM2DD = (point,typeAD) =>{

    point = point.split("°");   
    var degrees= parseFloat(point[0]) // Get degrees
    point =  point[1].split(",");
    var minutes = parseFloat(point[0]) // Get minutes
    //Get sign of cardinalDirection
    var cardinalDirection = (typeAD) ?  ((point [1].localeCompare("N") == 0 ) ? 1: -1) :  (point [1].localeCompare("E") == 0 ) ? 1: -1;

        //Convertion to decimal degrees
    return cardinalDirection * (degrees + minutes / 60 ) ;
}

/**
 * Applies data pre-processing to .csv file.
 *
 * @param {File} file  The .csv file.
 * @return {number} JSON with Waypoints.
 */
 toolsCtrl.getWaypointsFromFile = (file) => {

   var data = file.data.toString('utf8');// Convert to string 
   var result = parse.parse( data,{header:true}); //CSV to JSON
   //result.data.forEach(waypoint=>delete waypoint.wpnumber) // Delete wpNumber column
   result.data=result.data.filter(waypoint=> waypoint.type.length>0); //Filter type column with empty values;
   waypointsPRE = result.data
   var i;
   for(  i = 0;  i < waypointsPRE.length;i++) 
    { 
      var waypoint={
        location:{
          type:"",
          coordinates:[]
        },
        rule:{
          penalization:0,
          ratius:0
        }
      };
      waypoint.location.type= waypointsPRE[i].type;
      waypoint.location.coordinates[0] =toolsCtrl.DDM2DD( waypointsPRE[i].latitude, typeAD = 1);
      waypoint.location.coordinates[1]  =toolsCtrl.DDM2DD( waypointsPRE[i].longitude,typeAD = 2);
      waypoint.distance = parseFloat (waypointsPRE[i].distance);
      waypoint.speed= waypointsPRE[i].speed;
      waypoint.rule.penalization= parseFloat(waypointsPRE[i].penalization);
      waypoint.rule.ratius =  parseFloat(waypointsPRE[i].ratius);
      waypointsPRE[i] = waypoint;
    
    }
   
   return waypointsPRE;
 }
toolsCtrl.getCompetitorsFromFile = (file) =>{
  var data = file.data.toString('utf8');// Convert to string 
  var result = parse.parse( data,{header:true}); //CSV to JSON
  var i;


  for( i = 0; i<result.data.length;i++ )
  {
    var competitorP = {};
    competitorP._id = 0;
    competitorP = result.data[i];
    competitorP._id = parseInt(result.data[i].number);
    result.data[i] = competitorP;


  }


  return result.data;

}
toolsCtrl.getPartialResultsFromFile = ( file )=>{
  var data = file.data.toString('utf8');// Convert to string 
  var result = parse.parse( data,{header:true}); //CSV to JSON
  console.log(result.data[0]);
}


 toolsCtrl.gargabeOutGPXFile = (file) =>
 {
    var data = file.data.toString('utf8');
    var gpx = new GPX();
    gpx.parse(data);
    return gpx.tracks[0].points;
 }

module.exports = toolsCtrl;