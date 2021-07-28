import React ,{ useEffect, useState}from "react";
import Cards from './Cards'
import { getRaces,getRace,deleteRace } from "../services/race.services";

function Races(props){

  
    const [races,setRaces]= useState([])

    const type="Race"
    const next_URL = "/race"
    const add_URL = "/createrace"
    

    const fetchRaces =async (token) =>{
        try
        {  
            var data = await  getRaces(token)
            setRaces(data.map(race=>({
                id : race._id,
                title:race.name
            })))
        }
        catch(err)
        {
            console.log(err)
        }

    }

    const handleDeleteRace =async (id) => {
        
        try
        {
            await deleteRace(id);
            var token = window.localStorage.getItem('token');
            
            if(token)
                fetchRaces( token );
        }
        catch(err)
        {
            console.log(err)
        }
    }


    const handleFetchRace =async (id) =>{
        try
        {
            var data = await getRace(id);
            return data
        }
        catch(err)
        {
            console.log(err);
        }

    }



    

    useEffect(()=>{
        
        var token = window.localStorage.getItem('token');
        fetchRaces( token );
        
           
        
    },[])


    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Races</h1> </div>
      
            <br></br>
            <Cards
                data = {races}   
                type={type} 
                next_URL={next_URL} 
                add_URL = {add_URL}
                fetchCardData = {handleFetchRace}
                deleteCardHandler={handleDeleteRace}
            />  
        


        </div>
    )
}

export default Races;