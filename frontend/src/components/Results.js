import React from "react";
import {ResultsTable} from "./ResultsTable";

function Results(props){

    const stageID = "60a41cb13c14873c684d626f"
    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Results</h1> </div>
            <div>
                <ResultsTable stageID={stageID}/>
            </div>
        </div>
    )
}

export default Results;