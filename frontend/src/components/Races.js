import React ,{ useEffect, useState}from "react";
import Cards from './Cards'

function Races(props){

  
    const [races,setRaces]= useState([])

    const type="Race"
    const next_type="Categories"
    const next_URL = "/categories"
    const add_URL = "/createrace"
    
    
    const url = "http://localhost:5000/api/races"



    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Races</h1> </div>
      
            <br></br>
            <Cards  
                next_type = {next_type}
                updateData={(props.location.updateData)? true: true} 
                type={type} url={url} 
                next_URL={next_URL} 
                add_URL = {add_URL}>
            </Cards>


        </div>
    )
}

export default Races;