import React, { Fragment , useEffect, useState }from 'react'

import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
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
        console.log("Loading next page");
        history.push(login_URL)
     }

    const handlerSubmit = async(e) => {
        e.preventDefault();
        createUser();
    }

    const createUser = async () =>{
       try
       {
          const res =  await axios.post('http://localhost:5000/api/admins',signupData)
          console.log(res.data)
          loadNextPage();

       }
       catch(err)
       {
        setOpenError(true)  
        console.log(err)
       }
    }

    return(
        <div className="container mt-5">

              <h1 className="text-center">Sign Up</h1>
              <form  className="col align-self-center" onSubmit={handlerSubmit}>
               <div class="form-group row col-4" >
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="form-control"
                        name="name"
                        onChange = {handleInputChange}
                    >
                    </input>
                </div>
                <div class="form-group row col-4" >
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="form-control"
                        name="username"
                        onChange = {handleInputChange}
                    >
                    </input>
                </div>  
                <div class="form-group row col-4" >
                    <input
                        type = "password"
                        placeholder="Enter password"
                        className="form-control"
                        name="password"
                        onChange = {handleInputChange}
                    >

                    </input>
                </div>
                    <div class="form-group row col-2 " >
                    <button
                        className="btn btn-primary"
                        type = "submit"
                    >Sin up
                    </button>
                    </div>
                    
            
              </form>

        <Snackbar open={openError} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Sign up Failed
          </Alert>
        </Snackbar>

        </div>
    )
}

export default Signup