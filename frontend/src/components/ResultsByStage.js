import React from "react";
import {ResultsTableByStage} from "./ResultsTableByStage/ResultsTableByStage";

function ResultsByStage({resultsBy}){
   

        //Results by stage->one stage one category
        //Results by category -> all stages one category
        //Results by race -> all stages all categories


    return (

        <div>
            <br></br>
            <div>
                <ResultsTableByStage resultsBy={resultsBy} ></ResultsTableByStage>
            </div>
            <br></br>
            <br></br>
        </div>
    )
}

export default ResultsByStage;