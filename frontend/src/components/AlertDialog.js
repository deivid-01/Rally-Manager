import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({dialogHandler,open,type}) {
 


  const handleClose = (agree,event) => {
    
    
    if ( agree == true ) //Delete item
    {    
       dialogHandler(true);
        return;
    }


    dialogHandler(false);

    
    
    //Close handler

  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure of delete this stage?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All results and {type} data will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose.bind(this,true)} color="secondary">
            Agree
          </Button>
          <Button onClick={handleClose.bind(this,false)} color="primary" autoFocus>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
  );
}
