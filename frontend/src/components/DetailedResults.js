import React , {useEffect,useState}from 'react'
import { Map, TileLayer,Polyline} from 'react-leaflet'
import Materialtable,{MTableToolbar,MTablePagination} from 'material-table'
import {TablePagination,Grid} from '@material-ui/core'
import ElevationGraph from './ElevationGraph'
import Markers from './Markers'
import axios from 'axios'
import FullscreenControl from 'react-leaflet-fullscreen';
import {Button,IconButton} from '@material-ui/core'
import ZoomInIcon from '@material-ui/icons/ZoomIn';

function DetailedResults({waypoints,compInfo})
{

    const [path,setPath] = useState([])
    const [elevation,setElevation] = useState([])
    const [missedWaypoints,setMissedWaypoints] = useState([])
    const [competitorInfo,setCompetitorInfo] = useState([    ])
    const [trackpoints,setTrackpoints] = useState([])
    const [waypoints_,setWaypoints] = useState([

    ])
    const [data,setData] =useState([
        {
            position: 1,
            category: 'Motos Darien',
            start_time:0,
            arrival_time:0,
            total_time:0,
            neutralization:0,
            penalization:0,
            total:0
        },
        {
            position: 1,
            category: 'Motos Darien',
            start_time:0,
            arrival_time:0,
            total_time:0,
            neutralization:0,
            penalization:0,
            total:0
        }
    ])
    const [columns, setColumns] =useState([
        {
            title:'Position',
            field:'position',
            type:'numeric',
            width: "15%",
            cellStyle:{
                backgroundColor: '#000',
                color: '#FFF',
                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                backgroundColor: '#000',
                color:'#FFF',
                textAlign:'center', 
            }
         
        },
        {
            title:'Category',
            field:'competitor_category',
            width: "15%",
            cellStyle:{
                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                textAlign:'center', 
            }
         
           
        },
        {
            title:'Start Time',
            field:'start_time',
            width: "10%",
            cellStyle:{
                backgroundColor: '#f2b200',
                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                backgroundColor: '#f2b200',
                textAlign:'center', 
                fontSize:'1'
            }
          
        },
        {
            title:'Arrival Time ',
            field:'arrival_time',
            width: "15%",
            cellStyle:{
                backgroundColor: '#f2b200',
                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                backgroundColor: '#f2b200',
                textAlign:'center', 
                fontSize:'1'
            }
          
        },
        {
            title:'¨Partial Time',
            field:'partial_time',
            width: "15%",
            cellStyle:{
                backgroundColor: '#f2b200',
                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                backgroundColor: '#f2b200',
                textAlign:'center', 
                fontSize:'1'
            }
          
        },
        {
            title:'Neutralization',
            field:'neutralization',
            width: "10%",
            cellStyle:{
                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                textAlign:'center', 
                fontSize:'1'
            }
         
        },
        {
            title:'Penalization',
            field:'penalization',
            width: "10%",
            cellStyle:{
                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                textAlign:'center', 
                fontSize:'1'
            }
         
        },
        {
            title:'TOTAL',
            field:'total',
            width: "10%",
            cellStyle:{
                backgroundColor: '#000',
                color: '#FFF',
                textAlign:'center', 
            },
            headerStyle: {
                backgroundColor: '#000',
                color:'#FFF',
                textAlign:'center', 
            }
         
        },
    ])

    const [columns2, setColumns2] =useState([
        {
            title:'Id',
            field:'index',
            editable:'never',
            width: "10%",
            cellStyle:{

                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                textAlign:'center', 
            }
         
        },
        {
            title:'Latitude',
            field:'latitude',
            width: "15%",
            cellStyle:{

                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                textAlign:'center', 
            }
         
        },
        {
            title:'Longitude',
            field:'longitude',
            width: "15%",
            cellStyle:{

                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                textAlign:'center', 
            }
         
        },
        {
            title:'Ratius',
            field:'ratius',
            width: "15%",
            cellStyle:{

                textAlign:'center', 
                fontSize:'1'
            },
            headerStyle: {
                textAlign:'center', 
            }
         
        },
        {
            title:'Penalization Time',
            field:'penalization',
            type : 'numeric',
            width: "10%",
            cellStyle:{
                backgroundColor: '#000',
                color: '#FFF',
                textAlign:'center', 
            },
            headerStyle: {
                backgroundColor: '#000',
                color:'#FFF',
                textAlign:'center', 
            }
         
        },
    ])

    const fetchTrackpoints = async () =>{
    
        try
        {
            const res = await axios.get('http://localhost:5000/api/trackpoints/'+competitorInfo[0].id)
           
            var path_ = []
            var elevation_ = []
            res.data.forEach((trackpoint)=>{
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
       return  missedWaypoints.map((waypoint,i) =>({
            index:i+1,
            id:waypoint._id,
            latitude:Math.round(waypoint.location.coordinates[0]*10000)/10000,
            longitude:Math.round(waypoint.location.coordinates[1]*10000)/10000,
            ratius:waypoint.rule.ratius,
            penalization:waypoint.rule.penalization,
          }))
    }

    useEffect(()=>{
        
     
      setWaypoints(waypoints);
      setCompetitorInfo([compInfo])
      setMissedWaypoints(compInfo.waypointsMissed)

    },[])

    useEffect(()=>{
        if (competitorInfo.length > 0 )
        {
            fetchTrackpoints()
        }
    },[competitorInfo])

    const setNameAsTitle = () => {
        return competitorInfo[0].competitor_name+' '+competitorInfo[0].competitor_lastname
    } 

    const HHMMSSToHours = (str)=>{
  
        var total = 0;
        var units = str.split(':')
        if( units.length == 3 )
        {
          units.forEach((unit,i)=>
          {
            total+=parseFloat(unit)/Math.pow(60,i);
          })
        }
        
        
        return total;
    }

   const hoursToHHMMSS = (hours) => {

        var HH = Math.floor(hours)
        var num = (hours-HH)*60
        var MM = Math.floor(num)
        var SS = Math.floor ((num-MM)*60)
      
      
        return String(HH)+":"+String(MM)+':'+String(SS)
      
      
      
      }

    const getTotalPenalizationMissedWaypoints = () =>{
        var sum = 0;
        missedWaypoints.forEach((waypoint)=>{
             sum += waypoint.rule.penalization/60
        })
        
        return hoursToHHMMSS(sum)
    }

    return(
        <div>
            <div className="custom-align">
            <div className="custom-container-80">
         <Materialtable
         columns = {columns}
         data = {competitorInfo}
         title = {( competitorInfo.length>0)?setNameAsTitle():'Competitor Name'}
         options = {{
             tableLayout:'fixed',
             search:false,
             paging:false,
             sorting:false
         }}
         >

         </Materialtable>
         </div>
         </div>
            <br></br>
            <br></br>

                   <div className="custom-align">
       <Map
       center = {
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
           <FullscreenControl position="topleft" />
             <Markers waypoints ={missedWaypoints}/>
            <Polyline pathOptions={{ color: 'lime' }} positions={path} />


       </Map>
       <div className="custom-container">
      <h1 align='center'>Penalization</h1>
       <Materialtable
        
         columns = {columns2}
         data = {(missedWaypoints.length> 0)?settleWaypoints():[]}
         title = 'Waypoints missed'
         options = {{
             tableLayout:'fixed',
             search:false,
             sorting:false,
             maxBodyHeight: data.length*100
         }}

         actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) =>{
                alert("guenas")
              } 
            }
          ]}

         components = {{
             Pagination:(props) => (<div>
                <Grid container >
                    <Grid item sm={6} align='center'>Total</Grid>
                    <Grid item sm={6} align='center'>{(missedWaypoints.length>0)?getTotalPenalizationMissedWaypoints():0}</Grid>
                </Grid>
             </div>),
             Action: props => (
                <IconButton
                  onClick={(event) => props.action.onClick(event, props.data)}
                  variant="contained"
                  style={{color: '#000'}}
                          
                  size="small"
                >
                 <ZoomInIcon fontSize="large" />
                  </IconButton>
            )
         }}

         >

         </Materialtable>
         <Materialtable
        
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