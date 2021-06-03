import React from "react";
import {ResultsTable} from "./ResultsTable";

function Results(props){


    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Results</h1> </div>
            <div>
                <ResultsTable />
            </div>
        </div>
    )
}

export default Results;