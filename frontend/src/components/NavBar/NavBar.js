import React from 'react';
import {AppBar,Toolbar,Typography,Button, IconButton} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import './NavBar.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function NavBar() {

  const history = useHistory();
  
  const home_path="/races"
  const login_path="/login"


  const onChangesTab = (page,e)=>{
 
    history.push(page)
  }

  return (
  
      <AppBar 
      style={{
        background:'rgba(0,0,0,0.85)',
        flexGrow: 1
      }}
      position="static">
        <Toolbar>
          <div className="col">
            <Button onClick={onChangesTab.bind(this,home_path)} color="inherit" >
            <Typography variant="h6" >
                Race Manager
              </Typography>
              </Button>
          </div>
          <div >
              <IconButton onClick={onChangesTab.bind(this,login_path)} color="inherit">
              <ExitToAppIcon >
                Logout
              </ExitToAppIcon>
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
  
  );
}

export default NavBar;