const parse = require('papaparse');
let GPX = require('gpxparser');
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
 toolsCtrl.garbageOutCSVFile = (file) => {

    var data = file.data.toString('utf8');// Convert to string 
  
    data = data.split("\n");
    data.splice(0,5);  //Deleting frist 5 rows          
  
    var result = parse.parse( data.join("\n") ); //CSV to JSON
  
    result.data=result.data.filter(elem=> elem[3].length>0); //Filter columns with empty values;

    return result.data;
 }

 toolsCtrl.gargabeOutGPXFile = (file) =>
 {
    var data = file.data.toString('utf8');
    var gpx = new GPX();
    gpx.parse(data);
    return gpx.tracks[0].points;
 }

module.exports = toolsCtrl;