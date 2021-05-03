var Polycircle = require('./Polycircle.js');
const WayPoints = require('../models/waypoint');
const Trackpoint = require('../models/trackpoint.js');
const trackpoint = require('../models/trackpoint.js');

const analysisCtrl = {};

analysisCtrl.createCircle = (lat,long,rad)=>{
    /**
     * Crea y retorna un array con las coordenadas de los puntos correspondientes a los circulos (lat y long)
     */
    circle = Polycircle.vertices(latitude=lat, longitude=long, radius=rad, number_of_vertices=100);
    return circle;
};

analysisCtrl.verifyPoint = (lat,long,pointsCircle,center)=>{
    /**
     * Este metodo verifica si un punto dado está dentro de un circulo de waypoint
     */
    for(var i = 0; i<= pointsCircle.length-1;i++){
        distanceWithPoints = analysisCtrl.checkDistance(lat,long,center[0],center[1]);
        distanceWithCircle = analysisCtrl.checkDistance(pointsCircle[i][0],pointsCircle[i][1],center[0],center[1]);
        if(distanceWithPoints<distanceWithCircle){
            return true;
        }
    }
    return false;
};

analysisCtrl.checkWaypoints=async()=>{
    try{
        waypoints = await WayPoints.find();
        trackpoints = await Trackpoint.find();  
   
        //console.log(Trackpoint.find({"_id":"latitude","longitude":1}));
        //var num = await Trackpoint.findById({'_id':11});
        //console.log(num.latitude);
        for(var i=0; i<= waypoints.length-1;i++){
            latitudeWayPoint = waypoints[i]['latitude'];
            longitudeWayPoint = waypoints[i]['longitude'];
            typeWaypoint = waypoints[i]['type'];
            idWaypoint = waypoints[i]['_id'];
            

            startTime =0;
            finishTime =0;
            dzLatitude=0;
            dzLongitude=0;
            fzLatitude = 0;
            fzLongitude=0;
            passedByDZ=false;

            if(typeWaypoint=='WPM'){             
                listCircle = analysisCtrl.createCircle(latitudeWayPoint,longitudeWayPoint,100);   
                if(analysisCtrl.checkWPM(listCircle,trackpoints,[latitudeWayPoint,longitudeWayPoint])){
                    console.log("Paso por el waypoint "+idWaypoint);
                }else{
                    console.log("No paso por el waypoint "+idWaypoint);
                }

            }else if(typeWaypoint=='DZ'){
                listCircle = analysisCtrl.createCircle(latitudeWayPoint,longitudeWayPoint,12);
                dzCheckerId = analysisCtrl.checkDZFZ(listCircle,trackpoints,[latitudeWayPoint,longitudeWayPoint])
                if(dzCheckerId!=0){
                    startTime =0;
                    dzLatitude=0;
                    dzLongitude=0;
                    passedByDZ = true;
                    console.log('Paso por DZ '+idWaypoint);
                }else{
                    console.log('No paso por DZ '+idWaypoint);
                    passedByDZ=false;
                }
            }else if(typeWaypoint=='FZ'){
                listCircle = analysisCtrl.createCircle(latitudeWayPoint,longitudeWayPoint,12);
                finishTime=analysisCtrl.checkDZFZ(listCircle,trackpoints,[latitudeWayPoint,longitudeWayPoint]);
                if(dzCheckerId!=0 /*&& passedByDZ*/){
                    console.log('Paso por FZ '+idWaypoint);
                    finishTime =0;
                    fzLatitude = 0;
                    fzLongitude=0;
                }else{
                    console.log('No paso por FZ '+idWaypoint);
                }
                
            }
        }
    }catch(error){
        console.error(error);
    };
    
};

analysisCtrl.checkWPM=(listCircle,trackpoints,center)=>{
    for(var i=0;i<=trackpoints.length-1;i++){
        lat = trackpoints[i]['latitude'];
        long = trackpoints[i]['longitude'];
        verifyWaypoint=analysisCtrl.verifyPoint(lat,long,listCircle,center);
        if(verifyWaypoint){
            return true;

        }
    }
    return false;
};

analysisCtrl.checkDZFZ=(listCircle,trackpoints,center)=>{
    for(var i=0;i<=trackpoints.length-1;i++){
        lat = trackpoints[i]['latitude'];
        long = trackpoints[i]['longitude'];
        verifyWaypoint=analysisCtrl.verifyPoint(lat,long,listCircle,center);
        if(verifyWaypoint){
            return trackpoints[i]['_id'];
        }
    }
    return 0;
};

analysisCtrl.checkDistance=(lat1,long1,lat2,long2)=>{
        const R = 6371e3; 
        const phi1 = lat1 * Math.PI/180; 
        const phi2 = lat2 * Math.PI/180;
        const phiDiference = (lat2-lat1) * Math.PI/180;
        const lambdaDiference = (long2-long1) * Math.PI/180;

        const a = Math.sin(phiDiference/2) * Math.sin(phiDiference/2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(lambdaDiference/2) * Math.sin(lambdaDiference/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R*c*1000; // in kilometres
        
        return d;
}


module.exports = analysisCtrl;