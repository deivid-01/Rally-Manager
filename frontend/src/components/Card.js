import React from 'react'
import PropTypes from 'prop-types'
function Card({type,title,url}){
    
    
    return (
        <div className='card text-center'>
           <div className="card-body"> 
           
            <h4 className="overflow">{title}</h4>
           
            <a href={url} className="btn btn-outline-secondary rounded-0">
                Watch {type}
            </a>
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