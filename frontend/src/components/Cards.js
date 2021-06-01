import React ,{ useEffect, useState}from "react";
import axios from 'axios';
import Card from './Card'
import PropTypes from 'prop-types'

function Cards({type,url,next_URL}){
 

    const [data, setData] = useState([]);

    useEffect(()=>{
        if (! type.localeCompare("Race"))
        {
            const loggedAdmin = window.localStorage.getItem('user')
            var racesData = []
            if(loggedAdmin)
            {
                racesData =  JSON.parse(loggedAdmin).races 
            }
            racesData.forEach((rd)=>{
                setData([... data,
                    {
                        id : rd._id,
                        title:rd.name
                    }])
                
              
               })
                
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
            console.log(categoriesData)
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
            console.log(stagesData)
            setData(dataF)
        }
        
    },[])




 

    
    return (
        <div className="container">
            <div className="row">
                {
                        
                        (data.length>  0 )?
                        data.map(card =>(
                        <div className="col-md-4" key={card.id}>      
                            <Card type={type} title={card.title} url={url} id ={card.id} next_URL={next_URL}></Card>
                            </div>
                       
                    ))
                    :
                    <h1></h1>

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