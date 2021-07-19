import React from 'react'

import Markers from './Markers'
import FullscreenControl from 'react-leaflet-fullscreen';
import { Map, TileLayer,Polyline } from 'react-leaflet'

function DetailedMap ({mapRef,waypoints,track}) {
    return (       <Map 
       
        center = {  [
         '6.2441988',
         '-75.6177781'
        ]}
        ref = {mapRef}
        zoom={10}
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