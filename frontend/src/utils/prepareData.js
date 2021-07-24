export const prepareWaypoints = (wps) => {
    if (wps.length > 0)
    {
        return  wps.map((waypoint,i)=>({
            id:waypoint._id,
            index: i+1,
            type: waypoint.location.type,
            latitude: Math.round(waypoint.location.coordinates[0]*10000)/10000,
            longitude:Math.round(waypoint.location.coordinates[1]*10000)/10000,
            radius: waypoint.rule.ratius,
            penalization: waypoint.rule.penalization,
        }))        
    }
    return []
}