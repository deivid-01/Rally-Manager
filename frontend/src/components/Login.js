import React, { Fragment , useEffect, useState }from 'react'
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import {useHistory} from 'react-router-dom'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



function Login(props){

   const next_URL = "/races"
    
    const [loginData,setLoginData] = useState({
        username:'',
        password:''
    })
    const [user,setUser] = useState();
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

    const loadNextPage = () =>{  
        if ( user != null)
        {
          console.log("Loading next page");
          history.push({
            pathname: next_URL,
            races: user.races
            //state: { detail: response.data }
          })
          
        }
     }

    useEffect(()=>{
      loadNextPage()
    },[user])

    const checkCredentials =async () => {
      try{
        const res = await axios.post(
                            'http://localhost:5000/api/admins/login',
                            loginData)
        setUser(res.data)
      }
      catch(err)
      {
        setOpenError(true)
      }
    }
    
    return (
      <div className="container mt-5">
          <Fragment>
              <h1>GPX Analyzer</h1>
              <form className="row" onSubmit={handlerSubmit}>
                  <div className="col-md-3">
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="form-control"
                        name="username"
                        onChange = {handleInputChange}
                    ></input>
                  </div>
                  <div className="col-md-3">
                    <input
                        type = "password"
                        placeholder="Enter password"
                        className="form-control"
                        name="password"
                        onChange = {handleInputChange}
                    ></input>
                  </div>
                  <div className="col-md-3">
                    <button
                        className="btn btn-primary"
                        type = "submit"
                    >Login</button>
                  </div>
              </form>

        </Fragment>

        <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Login fail
          </Alert>
        </Snackbar>

        </div>
    )
}


export default Login;