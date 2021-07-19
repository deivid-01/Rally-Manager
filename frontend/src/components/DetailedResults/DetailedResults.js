import React , {useEffect,useRef,useState}from 'react'

import { Map, TileLayer,Polyline } from 'react-leaflet'
import ElevationGraph from '../ElevationGraph'
import Markers from '../Markers'
import FullscreenControl from 'react-leaflet-fullscreen';
import CompetitorResultTable from '../CompetitorResultTable/CompetitorResultTable'
import WaypointsMissedTable from '../WaypointsMissedTable/WaypointsMissedTable'
import {getTrackpoints} from '../../services/trackpoints.services'
function DetailedResults({waypoints,compInfo})
{

    const mapRef = useRef();
    const [map,setMap] = useState(null) 
    const [path,setPath] = useState([])
    const [elevation,setElevation] = useState([])
    const [missedWaypoints,setMissedWaypoints] = useState([])
    const [competitorInfo,setCompetitorInfo] = useState([    ])
    const [trackpoints,setTrackpoints] = useState([])
    const [waypoints_,setWaypoints] = useState([

    ])
    const [data,setData] =useState([

    ])

    

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

    const settleWaypoints = ()=>{
       var dd =  missedWaypoints.map((waypoint,i) =>({
            index:i+1,
            id:waypoint._id,
            latitude:Math.round(waypoint.location.coordinates[0]*10000)/10000,
            longitude:Math.round(waypoint.location.coordinates[1]*10000)/10000,
            ratius:String(waypoint.rule.ratius)+"m",
            penalization:"+"+waypoint.rule.penalization,
          }))
        console.log(dd)
        return dd
    }

    useEffect(()=>{
        
     
      setWaypoints(waypoints);
      setCompetitorInfo([compInfo])
    
      setMissedWaypoints(prepareData(compInfo.waypointsMissed))

       setMap(mapRef.current.leafletElement)
     

    },[])

    const prepareData = (wps) => {
        if (wps.length > 0)
        {
            console.log(wps[0])
            var d=  wps.map((waypoint,i)=>({
                
                id:waypoint._id,
                index: i+1,
                type: waypoint.location.type,
                latitude: Math.round(waypoint.location.coordinates[0]*10000)/10000,
                longitude:Math.round(waypoint.location.coordinates[1]*10000)/10000,
                radius: waypoint.rule.ratius,
                penalization: waypoint.rule.penalization,
            }))
         
            return d
        }
         

        return [{
            id: '',
            type: '',
            latitude:0,
            longitude:0,
            radius: 0,
            penalization: 0
        }]
    }


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
            <CompetitorResultTable
                data= {competitorInfo}
            />
        
         </div>
         </div>
            <br></br>
            <br></br>

                   <div className="custom-align">
       <Map 
       
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
             <Markers points ={missedWaypoints}/>
            <Polyline pathOptions={{ color: 'lime' }} positions={path} />


       </Map>
       <div className="custom-container">
      <h1 align='center'>Penalization</h1>
      <WaypointsMissedTable
        data = {(missedWaypoints.length> 0)?missedWaypoints:[]} 
        map = {map}
        />
        {/*         <Materialtable
        
        columns = {columns2}
        data = {data}
        title = 'Speed'
        options = {{
            tableLayout:'fixed',
            search:false,
            sorting:false,
            maxBodyHeight: data.length*100
        }}

        components = {{
            Pagination:(props) => <div>
               <Grid container >
                   <Grid item sm={6} align='center'>Total</Grid>
                   <Grid item sm={6} align='center'>{(missedWaypoints.length>0)?0:0}</Grid>
               </Grid>
            </div>
        }}

        >

        </Materialtable>
        */}

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