import React,{useState,useEffect}from 'react'
import axios from 'axios'
import {Marker,Circle,Popup} from 'react-leaflet'
import {IconLocation,IconLocation2,IconLocation3,IconFlagFinish,IconFlagStart} from './IconLocation'
import UploadWayPoints from './UploadWaypoints';

const  Markers = ({waypoints}) =>
{
  const markers = waypoints.map(waypoint => (
    <div key = {waypoint._id}>
    <Marker
        
        position={waypoint.location.coordinates}
        icon={(waypoint.location.type=='WPM')?IconLocation
        :(waypoint.location.type=='FZ' || waypoint.location.type=='DZ')?IconLocation2:
        (waypoint.speed=='META')?IconFlagFinish:
        (waypoint.speed=='START')?IconFlagStart:
        IconLocation3}
    >
      <Popup>{waypoint.location.type}</Popup>
    </Marker>
    
    <Circle
      center={waypoint.location.coordinates}
      radius={waypoint.rule.ratius}
      color={(waypoint.location.type=='WPM')?'blue':
      (waypoint.location.type=='FZ' || waypoint.location.type=='DZ')?'red':
      'black'}
    ></Circle>
    </div>
  ))

  return (
    markers
  );
 
    

   

};

export default  Markers;