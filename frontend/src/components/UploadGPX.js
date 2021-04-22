import React ,{ useState}from "react";
import '../App.css';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CancelIcon from "@material-ui/icons/Cancel";
import LinearProgressWithLabel from './LinearProgressWithLabel';
import GPX from 'gpx-parser-builder';

function UploadGPX() {
  
  const [highlighted,setHighlighted] = React.useState();
  const [ file, setFile] = useState('');
  const [ filename, setFilename] = useState('');
  const [ progress, setProgress] = useState(0);
  const [ startLoad, setStartLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);


  const uploadGPX = (files) => {
    setFile(files[0]);
    setFilename(files[0].name);

    Array.from(files)
    .forEach(async (file) => {
          
      const gpxtext = await file.text();

      const gpx = GPX.parse(gpxtext);
      const waypoints= gpx.wpt;

      setFile(file);
      setFilename(file.name);
      setStartLoad(true);

    
      var distanceName = 'openrally:distance';
      waypoints.forEach(async function(elem,i) {
        
        var waypoint ={}
        waypoint.latitude= elem.$.lat; // Latitude
        waypoint.longitude =  elem.$.lon // Latitude
        waypoint.elevation =  elem.ele // Latitude
        waypoint.name =  elem.name // Latitude
        waypoint.distance =  elem.extensions[distanceName];
        
        console.log(waypoint);      
        
        try{
          const res = await axios.post('http://localhost:5000/api/gpx',waypoint);

        
          setProgress(i/(waypoints.length-1)*100);
          if( i === ( waypoints.length-1))
          {
            setOpen(true);
            //setMessage('File Uploaded');
          }
          

          
        }catch(err){
          
            //setMessage("ERRROR");
          
        }
        

      });




        


    })

  }
  const onDropHandler = (e) => {
    e.preventDefault();
    setHighlighted(false);
    uploadGPX(e.dataTransfer.files);


  }
  const  updateHighlighted = ()=>{
    setHighlighted(true);
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
      setOpen(false);
      setFilename("");
      setProgress(0);
      setStartLoad(false);
    }
  }
  const onChange =async e =>{
 
   
    if ( e.target.files.length  >0) 
    {      
     
      if( !e.target.files[0].name.endsWith(".gpx"))
      {
        setOpenError(true);
        return;
      }
      uploadGPX(e.target.files);
      
    }

  } 


  return (
    <div>
      <br></br>
      <h1 className="text-center text-4xl">GPX Analyser </h1>   
   <br></br>

      
      <div className="center2">
          Upload GPX file:
      </div>
      <br></br>
      <div
        className={`center messD p-24  border-2 ${ highlighted ?  'border-green-400 bg-green-100': 'border-gray-400'}` }
        onDragEnter = { updateHighlighted}
        onDragOver = {overWriteDefault }
        onDrop = { onDropHandler }
      >  
    <Collapse in={!startLoad}> 
    <form>
      <div>
      <input id="file-upload" type="file" onChange={onChange}/>
      <label htmlFor="file-upload" className="custom-file-upload">
      Select File
      </label>
      </div>      
    </form>     
      <p>or drop .GPX here</p>
      <br></br>


      </Collapse>
      
      <Collapse in={openError}>
      <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={
                onShowAlert.bind(this,"hideError")              
              }
            >
              <CancelIcon fontSize="inherit" />
              
            </IconButton>
          }
        >
        File type must be .GPX"
        </Alert>
        </Collapse>

      <Collapse in={startLoad}>
      <p>{filename}</p>
      <br></br>
      <LinearProgressWithLabel value={progress} />
      </Collapse>
      <Collapse in ={open}> 
      <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={  onShowAlert.bind(this," ") }         
           
            >
              <CancelIcon fontSize="inherit" />
              
            </IconButton>
          }
        >
        Waypoints Uploaded
        </Alert>
        </Collapse>

      </div>
    
    </div>
 
  );
}

export default UploadGPX;
