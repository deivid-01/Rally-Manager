import React ,{ useState}from "react";
import '../App.css';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CancelIcon from "@material-ui/icons/Cancel";
import LinearProgressWithLabel from './LinearProgressWithLabel';

function UploadGPX() {

  const [highlighted,setHighlighted] = React.useState();
  const [ filename, setFilename] = useState('');
  const [ progress, setProgress] = useState(0);
  const [openError, setOpenError] = useState(false);
  const [errorMsg, SetErrorMsg] = useState('Error');
  const [successMsg, SetSuccessMsg] = useState('Trackpoints uploaded');


  const uploadTrackpoints = async(files) => {

    setFilename(files[0].name);

    const formData = new FormData();

    formData.append('file',files[0]);

    try
    {
      const res = await axios.post('http://localhost:5000/api/trackpoints/file',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent =>{
          setProgress(parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total)))
        }  
      });

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
  const onDropHandler = (e) => {
    e.preventDefault();
    setHighlighted(false);
    uploadTrackpoints(e.dataTransfer.files);
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
      uploadTrackpoints(e.target.files);
      e.target.value = null;
    }

  } 


  return (
    <div>
      <br></br>
      <h1 className="text-center text-4xl">GPX Analyser </h1>   
      <br></br>
      <div className="center2">  Upload GPX file: </div>     
      <br></br>
      <div
        className={`center messD p-24  border-2 ${ highlighted ?  'border-green-400 bg-green-100': 'border-gray-400'}` }
        onDragEnter = { updateHighlighted.bind(this,true)} onDragOver = {overWriteDefault } onDrop = { onDropHandler }
      >  
        <Collapse in={progress==0}> 
          <form>
            <div>
              <input id="file-upload" type="file" onChange={onChange}/>
              <label htmlFor="file-upload" className="custom-file-upload">Select File</label>       
            </div>      
          </form>     
          <p>or drop .GPX here</p>
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
 
  );
}

export default UploadGPX;
