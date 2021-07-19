import React from 'react'
import 'leaflet/dist/leaflet.css'
import { Map,TileLayer} from 'react-leaflet'
import FullscreenControl from 'react-leaflet-fullscreen';
import Markers from '../Markers'

import {setMapCenter} from '../../utils/maptools'

function Map_ ({mapRef,zoom,points}){
    return ( <Map
                ref = {mapRef}
                center = {(points.length>0)?setMapCenter(points[0],points[points.length-1]):
                    {
                    lat:'6.2441988',
                    lng:'-75.6177781'
                }}
                
                zoom={zoom}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                        <FullscreenControl position="topleft" />
                    <Markers points ={points}/>

            </Map>)
}

export default Map_