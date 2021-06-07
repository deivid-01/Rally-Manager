import React ,{ useEffect, useState}from "react";
import axios from 'axios';
import Card from './Card'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import '../../src/styles.css'
import {useHistory} from 'react-router-dom'

const styles = {

    largeIcon: {
      width: 100,
      height: 100,
    },
  
  };
  

function Cards({next_type,updateData,type,url,next_URL,add_URL}){
 
   
    const [data, setData] = useState([]);
    const history   = useHistory();


    useEffect(()=>{
        if (! type.localeCompare("Race"))
        {

            const loggedAdmin = window.localStorage.getItem('user')

            if ( !updateData)
            {
                var racesData = []
                if(loggedAdmin)
                {
                    racesData =  JSON.parse(loggedAdmin).races 
                }
                
                setData(racesData.map(rd=>({
                            id : rd._id,
                            title:rd.name
                        })))
                     
            }
            else
            {
                var token = window.localStorage.getItem('token');
                fetchRaces( token );
            }
           
                
        } 
        else  if (! type.localeCompare("Category"))
        {
            const raceCache = window.localStorage.getItem('race')
            var categoriesData = []
            if(raceCache)
            {
                categoriesData =  JSON.parse(raceCache).categories 
            }
            var dataF = []
            categoriesData.forEach((cd)=>{
                var item = {}
                item.id = cd._id
                item.title = cd.categorytype.name
                dataF.push(item)                
            })
            
            setData(dataF)
        }
        else if (! type.localeCompare("Stage"))
        {
            const raceCache = window.localStorage.getItem('category')
            var stagesData = []
            if(raceCache)
            {
                stagesData =  JSON.parse(raceCache).stages 
            }
            var dataF = []
            stagesData.forEach((stg)=>{
                var item = {}
                item.id = stg._id
                item.title = stg.name
                dataF.push(item)                
            })
           
            setData(dataF)
        }
        
    },[])

    const fetchRaces =async (token) =>{

        try
        {
            const config = {
                headers:{
                 Authorization: `Bearer ${token}`
                }
              }
            var res = await  axios.get(url,config)
            setData(res.data.map(race=>({
                id : race._id,
                title:race.name
            })))
        }
        catch(err)
        {
            console.log(err)
        }

    }

    const loadAddPage = () =>{

        history.push(add_URL)
    }

    const handleAdd = () =>{
        loadAddPage()
    }



    
    return (
        <div className="container">
            
      
            <div className="row">
                {
                        
                        (data.length>  0 )?
                        data.map(card =>(
                        <div className="col-md-4" key={card.id}>      
                            <Card 
                            next_type = {next_type}
                            type={type} 
                            title={card.title} 
                            url={url}
                            id ={card.id}
                            next_URL={next_URL}></Card>
                            </div>
                       
                    ))
                    :
                    <h1></h1>

                } 
           {(!type.localeCompare("Race")) ?
                <div className="col-md-4 text-center custom-align">      
                <IconButton 
                onClick = {handleAdd}
                aria-label="delete" className="svg_icons" >
                <AddBoxIcon fontSize="large" />
                </IconButton>
                </div>   :
                <p></p>    
                }             
            </div>
            

        </div>
    )
}

Cards.propTypes = {
    next_URL: PropTypes.string,
    url: PropTypes.string
}


export default Cards;