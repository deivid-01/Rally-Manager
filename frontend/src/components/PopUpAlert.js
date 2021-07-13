import React from 'react'
import {Snackbar } from '@material-ui/core'

import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from './Alert';

function PopUpAlert(
    {
        open,
        severity,
        msg,
        displayProgress,
        onAlertClose,
        autoHide,
    }
)
{

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        onAlertClose();
    }


    return (
    <Snackbar open={open}  
    autoHideDuration={(autoHide)?2000:null}  
    onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
         {msg}
         {(displayProgress &&  <LinearProgress variant="indeterminate"/>)
          
         }
        </Alert>
    </Snackbar>
      )
}

export default  PopUpAlert;