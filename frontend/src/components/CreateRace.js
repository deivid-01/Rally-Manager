import React ,{ useEffect, useState}from "react";
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CancelIcon from "@material-ui/icons/Cancel";
import LinearProgressWithLabel from './LinearProgressWithLabel';
import {useHistory} from 'react-router-dom'
function CreateRace(props){

    const postURL = "http://localhost:5000/api/races";
    const nextPage = "/races";
    const [highlighted,setHighlighted] = useState(false);
    const [ filename, setFilename] = useState('');
    const [ raceData, setRaceData] = useState({
      name:'',
      competitors:[]
    });
    const [ progress, setProgress] = useState(0);
    const [openError, setOpenError] = useState(false);
    const [errorMsg, SetErrorMsg] = useState('Error');
    const [successMsg, SetSuccessMsg] = useState('Trackpoints uploaded');
    const history   = useHistory();

  
    const loadNextPage = () =>{
      history.push({
        pathname: nextPage,
        updateData: true
      })
    }

    const createRace = async (token) =>{
      try
      {
        const config = {
          headers:{
           Authorization: `Bearer ${token}`
          }
        }
        
        await axios.post(postURL,raceData,config)

        loadNextPage();

      }
      catch(err)
      {
          console.log(err)
      }

    }

    const uploadCompetitors = async(files) => {

        setFilename(files[0].name);
    
        const formData = new FormData();
        
        formData.append('file',files[0]);
    
        try
        {
          const res = await axios.post('http://localhost:5000/api/competitors/file',formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent =>{
              setProgress(parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total)))
            }  
          });

          setRaceData({
            ...raceData,
            competitors: res.data.ids
          })
          SetSuccessMsg(res.data.msg);
    
        }
        catch(err)
        {
          if ( err.response.status == 500)
          {
            console.log("Problem with the server");
          }
          else
          {
            SetErrorMsg(err.response.data.msg);
            setProgress(0);
            setOpenError(true);
          }
        }
     
    
      }

      const handleInputChange = (e) =>{
        setRaceData({
          ...raceData,
          [e.target.name]:e.target.value
        })
      }
      const onDropHandler = (e) => {
        e.preventDefault();
        setHighlighted(false);
      
       uploadCompetitors(e.dataTransfer.files);
        e.dataTransfer.value = null;
    
      }
      const  updateHighlighted = (state)=>{
        setHighlighted(state);
      }
      const overWriteDefault = (e) =>{
        e.preventDefault();
      }
    
      const onShowAlert = (action) =>{
        if ( action == "hideError")
        {
          setOpenError(false);
        }
        else
        {
          setFilename("");
          setProgress(0);
        }
      }
      const onChange =async e =>{
     
       
        if ( e.target.files.length  >0) 
        {     
          uploadCompetitors(e.target.files);
          e.target.value = null;
        }
    
      } 

      const onCeateRaceHandler = () => {
        
    var token = window.localStorage.getItem("token")

        createRace(token);
        
      }


    return (
        <div>
            <br></br>
            <div className="custom-align">
              
            <input
           
                        onChange= {handleInputChange}
                        style={{outline:0}}
                        type="text"
                        placeholder="Enter race name"
                        className="text-center  big-title  border-0 border-bottom"
                        name="name"
                    ></input>
            </div>
            <br></br>
            <div>
            <div className="center2">  Upload competitors file </div>     
      <br></br>
      <div
        className={`center messD p-24  border-2 ${ highlighted ?  'border-green-400 bg-green-100': 'border-gray-400'}` }
        onDragEnter = { updateHighlighted.bind(this,true)} onDragOver = {overWriteDefault } onDrop = { onDropHandler }
      >  
        <Collapse in={progress==0}> 
          <form>
            <div>
              <input 
               accept=".csv"
               style={{display:'none'}}
              id="file-upload" type="file" onChange={onChange}/>
              <label htmlFor="file-upload" className="custom-file-upload">Select File</label>       
            </div>      
          </form>     
          <p>or drop .CSV here</p>
          <br></br>
        </Collapse>
      
        <Collapse in={openError}>
          <Alert
              severity="error"
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={ onShowAlert.bind(this,"hideError") }    >               
                  <CancelIcon fontSize="inherit" />                  
                </IconButton>
              }
            >
            {errorMsg}
          </Alert>
        </Collapse>

        <Collapse in={progress!=0}>

          <p>{filename}</p>
          <br></br>
          <LinearProgressWithLabel value={progress} />

        </Collapse>

        <Collapse in ={progress==100}> 
          <Alert
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={  onShowAlert.bind(this," ") } >    
                  <CancelIcon fontSize="inherit" />                 
                </IconButton>
              }
            >
            {successMsg}
          </Alert>
        </Collapse>
      </div>
      </div>
    <br></br>
    <Collapse in ={progress==100}>
    <div className="custom-align">
        <button 
            onClick = {onCeateRaceHandler}
            className="btn btn-primary"
            type = "submit"
        >Create Race
        </button>        
    </div>
    </Collapse>
     

        </div>
    )
}

export default CreateRace