import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import {getStage} from '../services/stage.services'
import {getRace} from '../services/race.services'
import {getCategory} from '../services/categories.services'

function Card({type,title,id,next_URL}){
    

    

    const [itemData,setItemData] = useState();
    const history = useHistory();

    const handleClick = async ( ) => {
     
        
        const token = window.localStorage.getItem('token')
        var data;
    
        if ( type.toLowerCase()=='stage')
        {
            data = await getStage(id);
        }
        else if ( type.toLowerCase()=='category')
        {
            data = await getCategory(id);
        }
        else if ( type.toLowerCase()=='race')
        {
            
            data = await getRace(id);
        }
        
        //Save in localstorage
        var key =  type.toLowerCase();
        var value = JSON.stringify(data);
        window.localStorage.setItem(  key, value )
           
        loadNextPage()
        
    }

    const loadNextPage = () =>{

        history.push(next_URL)
    }



    useEffect(()=>{
       setItemData({
           id:id,
           name:title
       })
    },[])



    return (
        <div className='card text-center bg-warning'>
           <div className="card-body text-dark"> 
           
            <h4 className="overflow">{title}</h4>
            <Button onClick={handleClick}
                className="text-light bg-dark"
                variant="contained" 
                >
                Watch {type}
            </Button>
           </div>


        </div>
    )
}
//Param verification
Card.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string
}

export default Card;