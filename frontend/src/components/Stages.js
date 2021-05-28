import React from "react";


import Cards from './Cards'

function Stages(props){

    const type='Stage'
    const next_URL = "/options"
    
    const url = "http://localhost:5000/api/stages"
    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Stages</h1> </div>
            <br></br>
            <Cards datas={props.location.data}type={type}url={url} next_URL={next_URL}></Cards>
        </div>
    )
}

export default Stages;