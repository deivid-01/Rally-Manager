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
    var degrees= parseFloat(point[0])
    point =  point[1].split(",");
    var minutes = parseFloat(point[0])
    var cardinalDirection = (typeAD) ?  ((point [1].localeCompare("N") == 0 ) ? 1: -1) :  (point [1].localeCompare("E") == 0 ) ? 1: -1;

    return cardinalDirection * (degrees + minutes / 60 ) ;
}

module.exports = toolsCtrl;