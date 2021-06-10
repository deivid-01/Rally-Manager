import React, {useState,useEffect} from 'react'
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer,Circle} from 'react-leaflet'

import Markers from './Markers'
function MapView ()
{
    const [waypoints,setWaypoints]  = useState([])
  

    const fetchWaypoints = () => {

        
    }

    useEffect(()=>{
        
        var stage = localStorage.getItem('stage')
        if(stage)
        {
            stage = JSON.parse(stage);
            setWaypoints(stage.waypoints)
           
        }

    },[])

    const setCenter = () => {
    
        return {
            lat:(waypoints[0].location.coordinates[0]+waypoints[waypoints.length-1].location.coordinates[0])/2,
            lng:(waypoints[0].location.coordinates[1]+waypoints[waypoints.length-1].location.coordinates[1])/2
        }
    }


    return(
       <Map
       center = {(waypoints.length>0)?setCenter():
        {
           lat:'6.2441988',
           lng:'-75.6177781'
       }}
       
       zoom={10}
       >
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           />
           <Markers waypoints ={waypoints}/>

       </Map>
    )
}

export default MapView;