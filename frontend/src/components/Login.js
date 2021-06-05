import React, { Fragment , useEffect, useState }from 'react'
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
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
      console.log("loading sign up page...")
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
        <h1>GPX Analyzer</h1>
        </div>
            
          <div className="container mt-8   custom-align">
              <form onSubmit={handlerSubmit}>
                  <div className="row" >
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="form-control"
                        name="username"
                        onChange = {handleInputChange}
                    ></input>
                  </div>
                  <div className="row" >
                    <input
                        type = "password"
                        placeholder="Enter password"
                        className="form-control"
                        name="password"
                        onChange = {handleInputChange}
                    ></input>
                  </div>
                  <div className="row">
                    <button
                        className="btn btn-primary"
                        type = "submit"
                    >Login</button>
                    
                  </div>
              </form>

         </div>

         <div className="container mt-5  custom-align" >
                  <button onClick = {handlerSignUp}
                      className="btn btn-secondary"
                      type = "submit"
                  >Sign up</button>
                  
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