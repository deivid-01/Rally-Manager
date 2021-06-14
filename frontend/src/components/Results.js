import React,{useState,useEffect} from "react";
import {ResultsTable} from "./ResultsTable";

function Results({waypoints}){
   
 

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