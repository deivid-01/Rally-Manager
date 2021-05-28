import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
function Card({type,title,url,next_URL}){
    

    

    const [itemData,setItemData] = useState();
    const history = useHistory();

    const fetchItem = async ( ) => {
     
        var res = await axios.get(url)
        var resData = res.data
        
        if (!type.localeCompare("Race"))
        {
            var dataO = []
            resData.categories.forEach((itemD)=>{
                var subItemData = {}
                subItemData._id = itemD._id;
                subItemData.name = itemD.categorytype.name
    
                dataO.push(subItemData)
            })
        }
        else if (!type.localeCompare("Category"))
        {
            var dataO = []
            res.data.stages.forEach((item)=>{
                var subItem = {}
                subItem._id = item._id
                subItem.name = item.name
                dataO.push ( subItem )
            })

        }
   
        setItemData(dataO)
        
    }


    useEffect(()=>{
        if(itemData != null)
        {
  
       
            history.push({
                pathname: next_URL,
                data: itemData 
            })
            
        }
    }, [itemData])



    return (
        <div className='card text-center'>
           <div className="card-body"> 
           
            <h4 className="overflow">{title}</h4>
            <button onClick={fetchItem}
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