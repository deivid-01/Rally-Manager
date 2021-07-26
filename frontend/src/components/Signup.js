import React, {useState }from 'react'

import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {useHistory} from 'react-router-dom'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  



function Signup (props){

    const login_URL = '/login' 

    const [signupData,setSignupData] = useState({
        name: '',
        username:'',
        password:''
    })
    const [openError, setOpenError] = useState(false);
    const history   = useHistory();


    const handleInputChange = (e) =>{
        setSignupData({
            ...signupData,
            [e.target.name]:e.target.value
        })
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenError(false)
    }

    const loadNextPage = () =>{  
       
        history.push(login_URL)
     }

    const handlerSubmit = async(e) => {
        e.preventDefault();
        createUser();
    }

    const createUser = async () =>{
       try
       {
          await axios.post('http://localhost:5000/api/admins',signupData)
        
          loadNextPage();

       }
       catch(err)
       {
        setOpenError(true)  
        console.log(err)
       }
    }

    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
              <h1 className="text-center">Race Manager</h1>
        <div className="container mt-5 custom-align">

            
              <form  className="align-self-center" onSubmit={handlerSubmit}>
                <Grid container direction="column"
                    justify="center"
                    alignItems="center"
                    >
                    <Grid item>
                        <TextField
                            label="Name"
                            name="name"
                            onChange = {handleInputChange}
                            />
                            </Grid>
                        
            <Grid item >
                <TextField
                  label="Username"
                  name="username"
                  onChange = {handleInputChange}
                  />
                  </Grid>
                  <Grid item>
                <TextField
                  id="standard-password-input"
                  label="Password"
                  name="password"
                  onChange = {handleInputChange}
                  autoComplete="current-password"
                  />
                  </Grid>
                  <br></br>
                <Button variant="contained"
                  style={{textTransform: 'none'}}
                  color="primary"
                  type="submit"
                  className="text-dark bg-warning"
                  >
                      Sign up
                    </Button>    
                  
                    </Grid>      
              </form>
        

        <Snackbar open={openError} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Sign up Failed
          </Alert>
        </Snackbar>

        </div>
        </div>
    )
}

export default Signup