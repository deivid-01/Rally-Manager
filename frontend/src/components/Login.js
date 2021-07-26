import React, {useEffect, useState }from 'react'
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



function Login(props){


   const home_URL = "/races"
   const signup_URL = "/signup"
    
    const [loginData,setLoginData] = useState({
        username:'',
        password:''
    })
    const [openError, setOpenError] = useState(false);
    const history   = useHistory();

    const handleInputChange = (e) =>{
        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        })
    }

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenError(false);
    };
    
    
    const handlerSubmit = async(e) => {
        e.preventDefault();
        await checkCredentials();
    }

    const handlerSignUp = async(e) => {
     
      history.push(signup_URL)
  }

    const loadNextPage = () =>{  
          history.push(home_URL) 
        
     }

    useEffect(()=>{
      window.localStorage.clear()
    },[])

    const checkCredentials =async () => {
      try{
        const res = await axios.post(
                            'http://localhost:5000/api/admins/login',
                            loginData)
        
        window.localStorage.setItem(
          'user', JSON.stringify(res.data.admin)
        )
        window.localStorage.setItem(
          'token', res.data.token
        )
        loadNextPage()

      }
      catch(err)
      {
        setOpenError(true)
      }
    }
    
    return (
      <div >
        <br></br>
        <br></br>
        <br></br>
        
     
        <div className="custom-align">
        <h1>Race Manager</h1>
        </div>
   
          <div className="container mt-8   custom-align">
              <form onSubmit={handlerSubmit}>
                  
            

                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-end"
                  >

                  <Grid  item container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <TextField id="input-with-icon-grid" 
                      label="Username" 
                      onChange = {handleInputChange}
                      name="username"
                      />
                    </Grid>
                                    
                  </Grid>
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  onChange = {handleInputChange}
                  autoComplete="current-password"
                  />

                </Grid>
                <br></br>
                  <div className="row">
                  <Button variant="contained"
                  style={{textTransform: 'none'}}
                  color="primary"
                  type="submit"
                  className="text-dark bg-warning"
                  >
                      Log in
                    </Button>
     
                    
                  </div>
              </form>

         </div>

         <div className="container mt-5  custom-align" >
                        <Button 
                        style={{textTransform: 'none'}}
                        variant="contained"
                        onClick = {handlerSignUp}
                        color="secondary"
                        type="submit"
                        className="text-light bg-dark"
                  >
                      Sign up
                    </Button>
                  
                </div>

        <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Login fail
          </Alert>
        </Snackbar>
        
        </div>
    )
}


export default Login;