import React,{useState,useEffect}from 'react'
import axios from 'axios'
import {Marker,Circle,Popup} from 'react-leaflet'
import {IconLocation,IconLocation2,IconLocation3,IconFlagFinish,IconFlagStart} from './IconLocation'
import UploadWayPoints from './UploadWaypoints';
import { Typography } from '@material-ui/core';
const  Markers = ({points}) =>
{
  const markers = points.map(point => (
    <div key = {point.id}>
    <Marker
        
        position={[point.latitude,point.longitude]}
        icon={(point.type=='WPM')?IconLocation
        :(point.type=='FZ' || point.type=='DZ')?IconLocation2:
        (point.type=='FINISH')?IconFlagFinish:
        (point.type=='START')?IconFlagStart:
        IconLocation3}
    >
      <Popup>
      <Typography variant="subtitle2" gutterBottom>
      Id: {point.id}
      </Typography>
      <Typography variant="body2" gutterBottom>
      Type: {point.type}
      </Typography>
     
        </Popup>
    </Marker>
    
    <Circle
      center={[point.latitude,point.longitude]}
      radius={point.radius}
      color={(point.type=='WPM')?'blue':
      (point.type=='FZ' || point.type=='DZ')?'red':
      'black'}
    ></Circle>
    </div>
  ))

  return (
    markers
  );
 
    

   

};

export default  Markers;