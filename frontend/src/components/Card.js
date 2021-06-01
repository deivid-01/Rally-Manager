import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
function Card({type,title,url,id,next_URL}){
    

    

    const [itemData,setItemData] = useState();
    const history = useHistory();

    const handleClick = async ( ) => {
     
        
        const token = window.localStorage.getItem('token')
        

        console.log(url)
        var res = await axios.get(url+"/"+id)
        var resData = res.data

        window.localStorage.setItem(
            type.toLowerCase(), JSON.stringify(resData)
            )

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
        <div className='card text-center'>
           <div className="card-body"> 
           
            <h4 className="overflow">{title}</h4>
            <button onClick={handleClick}
             className="btn btn-primary" >
                Watch {type}
            </button>
    
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