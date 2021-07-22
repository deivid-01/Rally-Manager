import React ,{ useEffect, useState}from "react";
import Cards from './Cards'
import { getRaces } from "../services/race.services";

function Races(props){

  
    const [races,setRaces]= useState([])

    const type="Race"
    const next_URL = "/categories"
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

    useEffect(()=>{

        const loggedAdmin = window.localStorage.getItem('user')

        if ( !props.location.updateData)
        {       
            if(loggedAdmin)
            {
                var racesData =  JSON.parse(loggedAdmin).races 
                console.log(racesData)

                setRaces(racesData.map(({_id,name})=>({
                    id : _id,
                    title:name
                })))
            }     
        }
        else
        {
            var token = window.localStorage.getItem('token');
            fetchRaces( token );
        }
           
        
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
                add_URL = {add_URL}>
            </Cards>


        </div>
    )
}

export default Races;