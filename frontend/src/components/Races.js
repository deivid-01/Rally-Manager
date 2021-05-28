import React from "react";


import Cards from './Cards'

function Races(props){


    const type="Race"
    const next_URL = "/categories"
    
    const url = "http://localhost:5000/api/races"
    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Races</h1> </div>
            <br></br>
            <Cards datas={props.location.data}type={type} url={url} next_URL={next_URL}></Cards>
        </div>
    )
}

export default Races;