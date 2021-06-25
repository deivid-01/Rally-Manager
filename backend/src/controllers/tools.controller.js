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

toolsCtrl.getPartialResultsFromFile = (file) => {
  var data = file.data.toString('utf8');
  var result = parse.parse(data,{header:true});
  

 



  result.data.forEach((partialResult)=>{
      partialResult.number = parseInt(partialResult.number);
      partialResult.start_time = toolsCtrl.HHMMSSToHours(partialResult.start_time);
      partialResult.arrival_time = toolsCtrl.HHMMSSToHours(partialResult.arrival_time);
      partialResult.neutralization = toolsCtrl.HHMMSSToHours(partialResult.neutralization);
      partialResult.discount = toolsCtrl.HHMMSSToHours(partialResult.discount);
  })

  
 
  return result.data;

}

toolsCtrl.getConvertedPartialResult = (result) =>{
    

  result.start_time = toolsCtrl.HHMMSSToHours(result.start_time);
  result.arrival_time = toolsCtrl.HHMMSSToHours(result.arrival_time);
  result.neutralization = toolsCtrl.HHMMSSToHours(result.neutralization);

  return result;
}

toolsCtrl.HHMMSSToHours = (str)=>{
  
  var total = 0;
  var units = str.split(':')
  if( units.length == 3 )
  {
    units.forEach((unit,i)=>
    {
      total+=parseFloat(unit)/Math.pow(60,i);
    })
  }
  
  
  return total;
}


toolsCtrl.getCompetitorsFromFile = (file) =>{
  var data = file.data.toString('utf8');// Convert to string 
  var result = parse.parse( data,{header:true}); //CSV to JSON
 
 


  return result.data;

}


 toolsCtrl.getTrackPointsFromFile = (file) =>
 {
    var data = file.data.toString('utf8');
    var gpx = new GPX();
    gpx.parse(data);

    var trackpoints = gpx.tracks[0].points
    var i ;
    for(i = 0; i < trackpoints.length; i++)
    {
      try{
        var trackpoint={
          location:{
            type:"",
            coordinates:[]
          }
        };
        trackpoint.location.coordinates[0] = trackpoints[i].lat;
        trackpoint.location.coordinates[1] = trackpoints[i].lon;
        trackpoint.elevation= trackpoints[i].ele;
        trackpoint.time = trackpoints[i].time.toString();   
        trackpoints[i] = trackpoint;
      }
      catch(err)
      {
        console.log(err);
      }
    }
    return trackpoints;
 }


 toolsCtrl.hoursToHHMMSS = (hours) => {

  var HH = Math.floor(hours)
  var num = (hours-HH)*60
  var MM = Math.floor(num)
  var SS = Math.floor ((num-MM)*60)

  return toolsCtrl.ajustUnitFormat(HH)+":"+
         toolsCtrl.ajustUnitFormat(MM)+":"+
         toolsCtrl.ajustUnitFormat(SS)


 }

 toolsCtrl.ajustUnitFormat = (unit)=>{
   return (unit<10)?"0"+String(unit):String(unit)
 }
 toolsCtrl.translateResults_Add = (results) => {

  var posResults=[
    
  ]

  results.forEach((result,i)=>{
    
    posResults.push( {
      id:result._id,
      competitor_fullname:result.competitor.name+" "+result.competitor.lastname,
      competitor_category:result.competitor.categorytype.name,
      start_time:toolsCtrl.hoursToHHMMSS(result.start_time),
      arrival_time: toolsCtrl.hoursToHHMMSS(result.arrival_time),
      neutralization:toolsCtrl.hoursToHHMMSS(result.neutralization),
      gpx_uploaded:result.gpx_uploaded
    })

  })
   
    return posResults
}
 toolsCtrl.translateResults = (results) => {

  var posResults=[
    
  ]

  results.forEach((result,i)=>{
    var item = {
      start_time:'',
      arrival_time:'',
      partial_time:'',
      neutralization:'',
      penalization:'',
      competitor_name:'',
      competitor_lastname:'',
      competitor_category:' ',
      total:'',
      waypointsMissed:[]
    }
    item.id = result._id
    item.start_time = raceCtrl.hoursToHHMMSS(result.start_time)
    item.arrival_time = raceCtrl.hoursToHHMMSS(result.arrival_time)
    item.partial_time = raceCtrl.hoursToHHMMSS(result.arrival_time-result.start_time)
    item.penalization ="+"+raceCtrl.hoursToHHMMSS(result.penalization)
    item.neutralization = raceCtrl.hoursToHHMMSS(result.neutralization)
    item.waypointsMissed = result.waypointsMissed
  
    item.competitor_name = result.competitor.name
    item.competitor_lastname = result.competitor.lastname
    item.competitor_category = result.competitor.categorytype.name
    item.total = raceCtrl.hoursToHHMMSS((result.arrival_time-result.start_time) + result.penalization - result.neutralization)
   
    posResults.push(item)
  })
   
    return posResults
}

toolsCtrl.reverseTranslation = (data) => {
 return {
   start_time: toolsCtrl.HHMMSSToHours(data.start_time),
   arrival_time: toolsCtrl.HHMMSSToHours(data.arrival_time),
   neutralization: toolsCtrl.HHMMSSToHours(data.neutralization),
 } 
}

module.exports = toolsCtrl;