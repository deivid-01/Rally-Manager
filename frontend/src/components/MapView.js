import React, {useState,useEffect} from 'react'
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer} from 'react-leaflet'

import Markers from './Markers'
function MapView ()
{
    return(
       <Map
       center = {{
           lat:'6.2441988',
           lng:'-75.6177781'
       }}
       zoom={13}
       >
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           />
           <Markers/>
       </Map>
    )
}

export default MapView;