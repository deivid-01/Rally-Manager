import React ,{ useState}from "react";
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CancelIcon from "@material-ui/icons/Cancel";
import LinearProgressWithLabel from './LinearProgressWithLabel';
import {useHistory} from 'react-router-dom'
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

function UploadWayPoints({stageInfo}) {

  const [highlighted,setHighlighted] = React.useState();
  const [ filename, setFilename] = useState('');
  const [ progress, setProgress] = useState(0);
  const [openError, setOpenError] = useState(false);
  const [timeNextPage, SetTimeNextPage] = useState(null);
  const [timeLeft, SetTimeLeft] = useState(0);
  const [interTimeLeft, SetInterTimeLeft] = useState(null);
  const [errorMsg, SetErrorMsg] = useState('Error');
  const [successMsg, SetSuccessMsg] = useState('Success');
  const history   = useHistory();

 
 

  const loadNextPage = () =>{  
   SetTimeNextPage( setTimeout(() =>{
      clearInterval(interTimeLeft) 
      localStorage.setItem('option',2)
      window.location.reload(); 
       history.replace()
       },3000))

  }

  const stopNextPage = async() =>
  {
    
    clearTimeout(timeNextPage);
    clearInterval(interTimeLeft)  ;
    SetTimeLeft(0);
    deleteWayPoints();
  }

  const deleteWayPoints = async() => {
    try
    {
      const res = await axios.delete('http://localhost:5000/api/waypoints');
      console.log(res.data);
    }

    catch(err){
      console.log(err);
    }
  }

  const uploadWayPoints = async(file) => {

    setFilename(file.name);

    const formData = new FormData();

    formData.append('file',file)   
    formData.append('stage',stageInfo.id)   
    try{
      
      const res = await axios.post('http://localhost:5000/api/waypoints/file',
                                  formData,
                                  { headers: { 'Content-Type': 'multipart/form-data'},                                 
                                  onUploadProgress: progressEvent =>
                                  { setProgress(parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total)))}
                                  });
      SetSuccessMsg(res.data.msg);
      loadNextPage();
      SetInterTimeLeft( setInterval(() => {    
                        SetTimeLeft((prevProgress) => { return (prevProgress >= 100 ? 100 : prevProgress + 1.1)}); },
                         30))
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

    if ( e.dataTransfer.files.length  >0) 
    {      
      uploadWayPoints(e.dataTransfer.files[0]);
      e.dataTransfer.value = null;

  }
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
      stopNextPage();   
    }
  }


  const onChange =async e =>{
 
    if ( e.target.files.length  >0) 
    {      
      uploadWayPoints(e.target.files[0]);
      e.target.value = null;
    }
  }
  
  return (
    <div>
   
      <h1 className="text-center text-4xl">{(stageInfo)?stageInfo.name:"Stage name"} </h1>   
      <br></br>   
      <div className="center2"> Upload waypoints: </div>
      <br></br>        
      <div
        className={`center messD p-24  border-2 ${ highlighted ?  'border-green-400 bg-green-100': 'border-gray-400'}` }
        onDragEnter = { updateHighlighted.bind(this,true)}  onDragOver = {overWriteDefault } onDrop = { onDropHandler } onDragLeave = { updateHighlighted.bind(this,false)}  >

        <Collapse in={progress==0}> 
          <form>
            <div>
              <input id="file-upload" 
              type="file"
              accept=".csv"
              style={{display:'none'}}
               onChange={onChange}/>
              <label htmlFor="file-upload" className="custom-file-upload"> Select File</label>       
            </div>      
          </form>     
          <p>or drop .CSVs here</p>
          <br></br>
        </Collapse>
      
        <Collapse in={openError}>
          <Alert
              severity="error"
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={onShowAlert.bind(this,"hideError") } >
                  <CancelIcon fontSize="inherit" />
                </IconButton> }
          >           
            {errorMsg}
          </Alert>

        </Collapse>

        <Collapse in={progress!=0}>

          <p>{filename}</p>
          <br></br>
          <LinearProgressWithLabel value={progress} />

        </Collapse>

        <Collapse in ={progress==100} > 

          <Alert          
              action={     
                <Box position="relative" display="inline-flex">
                    < CircularProgress  variant="determinate" value={timeLeft} />
                      <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">                        
                        <IconButton aria-label="close" color="inherit" size="small" onClick={ onShowAlert.bind(this," ") } >                             
                          <CancelIcon fontSize="inherit" />    
                        </IconButton>
                      </Box>
                </Box>
              }
            >
           {successMsg}
          </Alert>
        </Collapse>

      </div>
    
    </div>
  )
}

export default UploadWayPoints;
