import React, {useState} from 'react'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import {useHistory} from 'react-router-dom'
import {IconButton,Tooltip} from '@material-ui/core';
import AlertDialog from './AlertDialog';
import PopUpAlert from './PopUpAlert';


function Card({
    type,
    title,
    id,
    next_URL,
    deleteCardHandler,
    fetchCardData

}){
    

    
    const [openDialog,setOpenDialog] = useState(false);
    const [cardDeleted,setCardDeleted] = useState(false);
    const history = useHistory();

    const onEndAlertCardDeleted = ()=>{
        setCardDeleted(false);
    }
    const handleCloseDialog = async (deleteItem)=>{
        setOpenDialog(false);

        if (deleteItem != true) return 
        
        try
        {
            await deleteCardHandler(id);
            setCardDeleted(true)   
        }
        catch(err)
        {
            console.log(false);
        }
        
        
        

    }

    const handleClick = async ( ) => {
     
        
        const token = window.localStorage.getItem('token')
        try
        {
            var data = await fetchCardData(id)
            //Save in localstorage
            saveInLocalStorage(data);
               
            loadNextPage()
        }
        catch(err)
        {
            console.log(err);
        }
        
        
    }

    const saveInLocalStorage = (data)=>{

        var key =  type.toLowerCase();
        var value = JSON.stringify(data);
        window.localStorage.setItem(  key, value )
    }

    const onDeleteHandler = ()=>{
        
        setOpenDialog(true);
    
    }

    const loadNextPage = () =>{

        history.push(next_URL)
    }



    return (
        <div className='card text-center border border-dark'>
           <div className="card-body text-dark"> 
           
            <h4 className="overflow">{title}</h4>

            <IconButton 
                onClick = {handleClick}>
                <Tooltip title={`Watch ${type}`}>
                    <FindInPageIcon   style={{color:'black'}} />
                </Tooltip>
            </IconButton>

            <IconButton 
                onClick = {onDeleteHandler}>
                <Tooltip title={`Delete ${type}`}>
                    <DeleteIcon  style={{color:'rgba(255,0,0,0.8)'}} />
                </Tooltip>
            </IconButton>

           </div>
           <AlertDialog
            dialogHandler={handleCloseDialog}

            open={openDialog}
            type={type}
           />
            <PopUpAlert
            open={cardDeleted}
            severity="success"
            msg={`${type.toUpperCase()} Deleted`}
            displayProgress={false}
            onAlertClose={onEndAlertCardDeleted}
            autoHide={true}


            />


        </div>
    )
}
//Param verification
Card.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string
}

export default Card;