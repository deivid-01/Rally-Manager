import React , {useEffect,useRef,useState}from 'react'


import ElevationGraph from '../ElevationGraph'

import CompetitorResultTable from '../CompetitorResultTable/CompetitorResultTable'
import WaypointsMissedTable from '../WaypointsMissedTable/WaypointsMissedTable'
import {getTrackpoints} from '../../services/trackpoints.services'
import {prepareWaypoints} from '../../utils/prepareData'
import DetailedMap from '../DetailedMap'
import DetailedSpeedTable from '../DetailedSpeedTable/DetailedSpeedTable'
function DetailedResults({compInfo})
{

    const mapRef = useRef();
    const [map,setMap] = useState(null) 
    const [path,setPath] = useState([])
    const [elevation,setElevation] = useState([])
    const [missedWaypoints,setMissedWaypoints] = useState([])
    const [speedPoints,setSpeedPoints] = useState([])
    const [competitorInfo,setCompetitorInfo] = useState([    ])
 


    const fetchTrackpoints = async () =>{
    
        try
        {
            const data = await getTrackpoints(competitorInfo[0].id);
           
            var path_ = []
            var elevation_ = []
            data.forEach((trackpoint)=>{
                path_.push(trackpoint.location.coordinates)
                elevation_.push(trackpoint.elevation)
            })
           setPath(path_)
          
           setElevation(elevation_)
        }
        catch ( err)
        {
            console.log(err)
        }
    }


    useEffect(()=>{
        
     
   
      setCompetitorInfo([compInfo])
        console.log(compInfo.waypointsMissed)
      setMissedWaypoints(prepareWaypoints(compInfo.waypointsMissed))
      setSpeedPoints(compInfo.speedPoints)

       setMap(mapRef.current.leafletElement)
     

    },[])

  
    useEffect(()=>{
        if (competitorInfo.length > 0 )
        {
            fetchTrackpoints()
        }
    },[competitorInfo])



    return(
        <div>
            <div className="custom-align">

                <div className="custom-container-80">
                    <CompetitorResultTable  data= {competitorInfo}   />     
                </div>

            </div>

            <br></br>
            <br></br>

            <div className="custom-align">

                <DetailedMap 
                    mapRef = {mapRef}
                    zoom = {10}
                    waypoints = {missedWaypoints}
                    track = {path} 
                />
 
                <div className="custom-container">

                    <h1 align='center'>Penalization</h1>
                    <WaypointsMissedTable
                        data = {(missedWaypoints.length> 0)?missedWaypoints:[]} 
                        map = {map}
                    />

                    <DetailedSpeedTable
                    data = {(speedPoints.length> 0)?speedPoints:[]}
                    map = {map}
                    />
                    
                </div>
         
            </div>
            <br></br>
            <br></br>

            <div className="custom-align">
                    <ElevationGraph elev ={elevation}></ElevationGraph>
            </div>
 
            <br></br>
            <br></br>
        </div>
    )
}
export default DetailedResults