import React from "react";
import Card from './Card'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import '../../src/styles.css'
import {useHistory} from 'react-router-dom'

function Cards({
    data,
    type,
    next_URL,
    add_URL,
    deleteCardHandler,
    fetchCardData}){
 

    const history   = useHistory();

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
                        data.length>  0 && 
                        data.map(card =>(
                        <div className="col-md-4" key={card.id}>      
                            <Card 
                            type={type} 
                            title={card.title} 
                            id ={card.id}
                            next_URL={next_URL}
                            deleteCardHandler={deleteCardHandler}
                            fetchCardData ={fetchCardData}
                            />
                            </div>
                       
                    ))
                  

                } 
                {(type.toLowerCase()=='race') &&
                        <div className="col-md-4 text-center custom-align">      
                        <IconButton 
                        onClick = {handleAdd}
                        aria-label="delete" className="svg_icons" >
                        <AddBoxIcon fontSize="large" />
                        </IconButton>
                        </div>    
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