import React, {useState,useEffect,useRef} from 'react'

import {Grid} from '@material-ui/core'

import Map_ from '../Map/Map_'
import MaterialTable_ from '../MaterialTable/MaterialTable_'
import {prepareWaypoints} from '../../utils/prepareData'
import {deleteWaypoint,createWaypoint,updateWaypoint} from '../../services/waypoint.services'

import {columns} from'./columns'

function Waypoints ()
{
  
    const mapRef = useRef();

    const [map,setMap] = useState(null)
    const [data,setData]  = useState([])

    const onUpdateData = (newData)=>setData(newData);
   
    const fetchWaypoints = () =>
    {
        var waypoints=localStorage.getItem('waypoints')
        if (waypoints)
        {
            waypoints= JSON.parse(waypoints);
            setData(waypoints)
        }
        else
        {
            var stage = localStorage.getItem('stage')
            if(stage)
            {
                stage = JSON.parse(stage);
               
                setData(prepareWaypoints(stage.waypoints))
            }
        }

    }
    useEffect(()=>{
        if (data.length >0)
        {
            localStorage.setItem('waypoints',JSON.stringify(data))
        }
    },[data])

    useEffect(()=>{

        fetchWaypoints();
       
        setMap(mapRef.current.leafletElement)
       
    },[])
   
    return(
        <div>
            <Grid container  justify="center">

                < Grid item sm={5} >
                    <Map_ 
                        mapRef={mapRef}
                        zoom={10}
                        points ={data}
                    />
                </Grid>

                <Grid item sm={6}>

                    <MaterialTable_
                        columns={columns}
                        data={data}
                        deleteService={deleteWaypoint}
                        createService={createWaypoint}
                        updateService={updateWaypoint}
                        onUpdateData={onUpdateData}
                        map={map}
                    />
                </Grid>

            </Grid>
            <br></br>
 
            <br></br>
            <br></br>
            <br></br>
       </div>
    )
}

export default Waypoints;