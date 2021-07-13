import React,{useState,useEffect} from "react";
import {ResultsTable} from "./ResultsTable/ResultsTable";

function Results(){
   
    const [waypoints,setWaypoints] = useState([])

    useEffect(()=>{

        var stage = window.localStorage.getItem('stage')
        if (stage)
        {
            stage =JSON.parse(stage) 
       
            setWaypoints(stage.waypoints)

          
        }
    },[])
    return (

        <div>
            <br></br>
            <div>
                <ResultsTable waypoints={waypoints} ></ResultsTable>
            </div>
            <br></br>
            <br></br>
        </div>
    )
}

export default Results;