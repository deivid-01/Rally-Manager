import React from "react";
import {ResultsTable} from "./ResultsTable";

function Results(props){
   
    const stageID = "60a41cb13c14873c684d626f"
    return (

        <div>
            <br></br>
            <div>
                <ResultsTable stageID={stageID} reload={props.reload}/>
            </div>
        </div>
    )
}

export default Results;