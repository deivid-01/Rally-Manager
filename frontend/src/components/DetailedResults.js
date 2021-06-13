import React , {useEffect,useState}from 'react'
import { Map, TileLayer} from 'react-leaflet'
import Materialtable,{MTableToolbar,MTablePagination} from 'material-table'
import {TablePagination,Grid} from '@material-ui/core'
import ElevationGraph from './ElevationGraph'
function DetailedResults()
{
    const [waypoints,setWaypoints] = useState([

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
            type:'Numeric',
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
            field:'category',
            width: "15%",
            cellStyle:{
                textAlign:'center', 
                fontSize:'1'
            },
         
           
        },
        {
            title:'Start Time',
            field:'start_time',
            type : 'numeric',
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
            type : 'numeric',
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
            title:'Total Time',
            field:'total_time',
            type : 'numeric',
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
            type : 'numeric',
            width: "20%",
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

    const [columns2, setColumns2] =useState([
        {
            title:'Number',
            field:'position',
            type:'Numeric',
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
            field:'total',
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

    return(
        <div>
            <div className="custom-align">
            <div className="custom-container-80">
         <Materialtable
         columns = {columns}
         data = {data}
         title = 'Competitor Name #4'
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
          {/** <Markers waypoints ={waypoints}/>*/} 

       </Map>
       <div className="custom-container">
      <h1 align='center'>Penalization</h1>
       <Materialtable
        
         columns = {columns2}
         data = {data}
         title = 'Waypoints missed'
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
                    <Grid item sm={6} align='center'>7</Grid>
                </Grid>
             </div>
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
                   <Grid item sm={6} align='center'>7</Grid>
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
                <ElevationGraph></ElevationGraph>
                </div>
 
        <br></br>
       <br></br>
        </div>
    )
}

export default DetailedResults