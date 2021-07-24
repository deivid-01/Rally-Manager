import React from 'react'

import Markers from './Markers'
import FullscreenControl from 'react-leaflet-fullscreen';
import { Map, TileLayer,Polyline } from 'react-leaflet'
import {setMapCenter} from '../utils/maptools'

function DetailedMap ({mapRef,waypoints,track,zoom}) {
   
    return (       <Map 
       
        center = {(waypoints.length>0)?setMapCenter(waypoints[0],waypoints[waypoints.length-1]):
            {
            lat:'6.2441988',
            lng:'-75.6177781'
        }}
        ref = {mapRef}
        zoom={zoom}
        >
            <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FullscreenControl position="topleft" />
              <Markers points ={waypoints}/>
             <Polyline pathOptions={{ color: 'lime' }} positions={track} />
 
 
        </Map>)
}

export default DetailedMap;