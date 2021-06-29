import React, {useState,useEffect,useRef} from 'react'
import 'leaflet/dist/leaflet.css'
import {Grid} from '@material-ui/core'
import { Map, TileLayer} from 'react-leaflet'
import Materialtable,{MTableToolbar} from 'material-table'
import Markers from './Markers'
import FullscreenControl from 'react-leaflet-fullscreen';
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import axios from 'axios'
function MapView ()
{
    const baseURL = 'http://localhost:5000/api/waypoints/'
    const mapRef = useRef();
    const [map,setMap] = useState(null)
    const [data,setData]  = useState([])
    const [partialType,setPartialType] = useState('WPM')
    const [columns, setColumns] =useState([
        {
            title:'Id',
            field:'index',
            editable:'never',
            width: "5%"
         
        },
        {
            title:'Type',
            field:'type',
            width: "10%",
            lookup: { 'WPM': 'WPM', 'FZ': 'FZ','DZ': 'DZ','START': 'START','FINISH': 'FINISH' } ,
            sorting:false
            
           
        },
        {
            title:'Latitude',
            field:'latitude',
            type : 'numeric',
            width: "20%",
            sorting:false
        },
    
        {
            title:'Longitude',
            field:'longitude',
            type : 'numeric',
            width: "15%",
            sorting:false

          
        },
        {
            title:'Radius (m)',
            field:'radius',
            type : 'numeric',
            width: "15%",
            validate: rowData => (!(rowData.radius>=0 && rowData.radius<=1000))?{isValid: false, helperText: 'Number must greater than zero'}:true,
          
        },
        {
            title:'Penalization',
            field:'penalization',
            width: "20%",
            validate: rowData => (!validateTime(rowData.penalization))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,
            sorting:true
            
        },
    ])

    const changeComponent =  rowData => e => {
        rowData=null;
        console.log(e.target.value)
    }
    
    const onTypeChange = (event) =>{

        console.log(event.target.value)
        setPartialType(event.target.value)
    }
    const updateMapCenter = (rowData) => {

        map.flyTo([rowData.latitude,rowData.longitude], 16);
        /***
         * este espacio a la nena no le gusta, le gusta mas el otro pero bueno
         * habia una vez un barquito chiquitico que no podia naveegar
         * ahora que me estas prestando atencion, te quiero decir que te amo mucho
         * nenito emoso de mi corazon, eres mien monito y churosito con eso ojitos color miel
         * 
         */
    }
    const validateTime = (t) => {
    

        try
        {
          var units = t.split(':')
          if(units.length !=3)
            return false;
          var i;
            for( i = 0;i<units.length;i++)
          {
         
            if (units[i].length!=2)
              return false
  
            if (! /^\d+$/.test(parseInt(units[i])))
            {
                console.log("Well done")
                return false
            }
            
          }
  
          return true
        }
        catch(err)
        {
          return false;
        }
  
       
      }

    useEffect(()=>{
        
        var stage = localStorage.getItem('stage')
        if(stage)
        {
            stage = JSON.parse(stage);
           
            setData(prepareData(stage.waypoints))
            setMap(mapRef.current.leafletElement)
        }


    },[])

    const setCenter = () => {
    
        return {
            lat:(data[0].latitude+data[data.length-1].latitude)/2,
            lng:(data[0].longitude+data[data.length-1].longitude)/2
        }
    }

    const prepareWaypoint = (wpt) => {
        return {

            location: {
                type: wpt.type,
                coordinates:  [wpt.latitude, wpt.longitude]
                        },
            
            rule:{
                penalization: wpt.penalization,
                ratius: wpt.radius 
                 }    

            }
    }

    
    const deleteWaypoint = async (wpt)=>{
        try
        {
            const res = await  axios.delete(baseURL+wpt.id);
            //Show success message
            console.log("Waypoint deleted");
        }
        catch(err)
        {
            console.log(err);
        }
     } 

    const updateWaypoint = async (wpt)=>{
        try
        {
            const res = await  axios.put(baseURL+wpt.id,prepareWaypoint(wpt));
            //Show success message
            console.log("Waypoint updated");
        }
        catch(err)
        {
            console.log(err);
        }
     } 

    const createWaypoint = async (wpt)=>{
       try
       {
           const res = await  axios.post(baseURL+wpt.id,prepareWaypoint(wpt));
           //Show success message
           console.log("Waypoint created");
       }
       catch(err)
       {
           console.log(err);
       }
    }

    const prepareData = (wps) => {
        if (wps.length > 0)
        {
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



    return(
        <div>

        <Grid container
         justify="center"
      >
           < Grid item sm={5} >
       <Map
       ref = {mapRef}
       center = {(data.length>0)?setCenter():
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
           <Markers points ={data}/>

       </Map>
            </Grid>
            <Grid item sm={6}>
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
                    //Create in database
                    createWaypoint(newData);
                    setData([...data,newData]);

                    resolve();
                },1000)
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                updateWaypoint(newData)
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

                    deleteWaypoint(oldData);

                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    resolve();
                    }, 1000)
          })
        }}
        actions={[
            {
              icon: ZoomInIcon,
              tooltip: 'Show in map',
              onClick: (event, rowData) => updateMapCenter(rowData)
            }
          ]}
       />

      
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