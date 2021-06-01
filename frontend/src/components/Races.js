import React ,{ useEffect, useState}from "react";
import Cards from './Cards'
import IconBreadcrumbs from './NavBar'
function Races(props){

    const [races,setRaces]= useState([])

    const type="Race"
    const next_URL = "/categories"
    
    const url = "http://localhost:5000/api/races"



    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Races</h1> </div>
            <IconBreadcrumbs actualPage = {type}> </IconBreadcrumbs>
            <br></br>
            <Cards type={type} url={url} next_URL={next_URL}></Cards>
        </div>
    )
}

export default Races;