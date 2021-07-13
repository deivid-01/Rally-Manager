import React from 'react'
import {Snackbar } from '@material-ui/core'

import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from '../Alert';

function PopUpAlert(
    {
        open,
        onClose,
        severity,
        msg,
    }
)
{
    return (
    <Snackbar open={open}   onClose={onClose}>
        <Alert onClose={onClose} severity={severity}>
         {msg}
          <LinearProgress variant="indeterminate"/>
        </Alert>
    </Snackbar>
      )
}

export default  PopUpAlert;