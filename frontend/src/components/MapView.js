import React, {useState,useEffect} from 'react'
import 'leaflet/dist/leaflet.css'
import {Grid} from '@material-ui/core'
import { Map, TileLayer} from 'react-leaflet'
import Materialtable,{MTableToolbar} from 'material-table'
import Markers from './Markers'
import FullscreenControl from 'react-leaflet-fullscreen';

function MapView ()
{
    const [waypoints,setWaypoints]  = useState([])
    const [data,setData]  = useState([])
    const [columns, setColumns] =useState([
        {
            title:'Id',
            field:'id',
            editable:'never',
            width: "10%"
         
        },
        {
            title:'Type',
            field:'type',
            width: "20%"
         
           
        },
        {
            title:'Latitude',
            field:'latitude',
            type : 'numeric',
            width: "20%"
          
        },
        {
            title:'Longitude',
            field:'longitude',
            type : 'numeric',
            width: "15%"
          
        },
        {
            title:'Radius',
            field:'radius',
            type : 'numeric',
            width: "15%"
          
        },
        {
            title:'Penalization',
            field:'penalization',
            type : 'numeric',
            width: "20%"
         
        },
    ])

    useEffect(()=>{
        
        var stage = localStorage.getItem('stage')
        if(stage)
        {
            stage = JSON.parse(stage);
            setWaypoints(stage.waypoints)
            setData(prepareData(stage.waypoints))
        }

    },[])

    const setCenter = () => {
    
        return {
            lat:(waypoints[0].location.coordinates[0]+waypoints[waypoints.length-1].location.coordinates[0])/2,
            lng:(waypoints[0].location.coordinates[1]+waypoints[waypoints.length-1].location.coordinates[1])/2
        }
    }

    const prepareData = (wps) => {
        if (wps.length > 0)
        {
            var d=  wps.map((waypoint,i)=>({
                id: i+1,
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



    return(
        <div>

        <Grid container
         justify="center"
      >
           < Grid item sm={5} >
       <Map
       center = {(waypoints.length>0)?setCenter():
        {
           lat:'6.2441988',
           lng:'-75.6177781'
       }}
       fuul
       zoom={10}
       >
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           />
            <FullscreenControl position="topleft" />
           <Markers waypoints ={waypoints}/>

       </Map>
            </Grid>
            <Grid item sm={5}>
            <Materialtable
        
        components={{
                Toolbar: props => (
                    <div  
                    variant='dense'
                    style={{ backgroundColor: '#fcba03' }}>
                        <MTableToolbar 
                        
                        {...props} />
                    </div>
                )
            }}   
        columns={columns}
        data = {data}
        options ={{
            actionsColumnIndex:-1,
            tableLayout: "fixed",
            maxBodyHeight: 450,
            showTitle:false,
            search:false,
            paging:false,
            filtering:true,
            exportButton:true,
            
                headerStyle: {
                    background: '#fcba03',
                    color: '#000',
                    textAlign:'center',
                    fontSize:'1'
                },
                cellStyle: {
                    textAlign:'center', 
                    fontSize:'1'}}}
        editable={{
            onRowAdd: newData=>
            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    setData([...data,newData]);

                    resolve();
                },1000)
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    resolve();
                    }, 1000)
          })
        }}

        
        
       >

       </Materialtable>
            </Grid>
       </Grid>
       <br></br>
       <div className="custom-container">
       
      
       </div>
       <br></br>
       <br></br>
       <br></br>
       </div>
    )
}

export default MapView;