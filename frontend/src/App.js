import React ,{ useState}from "react";
import './App.css';
import {parse} from 'papaparse';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CancelIcon from "@material-ui/icons/Cancel";
import LinearProgressWithLabel from './components/LinearProgressWithLabel';

function App() {
  const [highlighted,setHighlighted] = React.useState();

  const [ file, setFile] = useState('');
  const [ filename, setFilename] = useState('');
  const [ progress, setProgress] = useState(0);
  const [ startLoad, setStartLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);


  const uploadWayPoints = (files) => {
    setFile(files[0]);
    setFilename(files[0].name);

    Array.from(files)
    .forEach(async (file) => {
          
      const text = await file.text();

      var linesText = text.split("\n");
      linesText.splice(0,5);            
   
      const result = parse( linesText.join("\n") );

      setFile(file);
      setFilename(file.name);

      result.data=result.data.filter(elem=> elem[3].length>0);

      setStartLoad(true);
      result.data.forEach(async function(elem,i) {
 
        var waypoint={};
        waypoint.waypoint = elem[0];
        waypoint.latitude = elem[1];
        waypoint.longitude = elem[2];
        waypoint.type= elem[3];
        waypoint.distance = elem[4];
        waypoint.speed= elem[6];         
        try{
          const res = await axios.post('http://localhost:5000/api/waypoints',waypoint);

          console.log(progress);
          setProgress(i/(result.data.length-1)*100);
          if( i === ( result.data.length-1))
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
    uploadWayPoints(e.dataTransfer.files);

  /*
    Array.from(e.dataTransfer.files)
   // .filter((file) => file.name.endsWith(".d"))
   // .filter((file) => file.name.endsWith === ".csv")
    
    .forEach(async (file) => {
      
      const text = await file.text();

      var linesText = text.split("\n");
      linesText.splice(0,4);            
   
      const result = parse( linesText.join("\n") , {header : true } );

      setFile(file);
      setFilename(file.name);


      console.log(result.data); //Waypoints
      *
     
    })*/
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
      console.log(e.target.files[0].name)
      if( !e.target.files[0].name.endsWith(".csv"))
      {
        setOpenError(true);
        return;
      }
      uploadWayPoints(e.target.files);
      
    }

  } 


  return (
    <div>
      <br></br>
      <h1 className="text-center text-4xl">GPX Analyser </h1>   
   <br></br>

      
      <div className="center2">
          Upload waypoints:
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
      <p>or drop .CSVs here</p>
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
        File type must be .csv"
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

export default App;
