import React ,{ useState}from "react";
import './App.css';
import {useForm} from "react-hook-form";
import {parse} from 'papaparse';
import axios from 'axios';
function App() {
  const [highlighted,setHighlighted] = React.useState();

  const [ file, setFile] = useState('');
  const [ filename, setFilename] = useState('');
  const [ message, setMessage] = useState('');



  const onSubmit = (data) => {
    console.log(data);
  }


  const onChange =async e =>{
 
   
    if ( e.target.files.length  >0) 
    {      
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);


      Array.from(e.target.files)
      .forEach(async (file) => {
            
        const text = await file.text();

        var linesText = text.split("\n");
        linesText.splice(0,5);            
     
        const result = parse( linesText.join("\n") );

        //cols = ["waypoint","latitude","longitude","type","distance","speedtype"];
        setFile(file);
        setFilename(file.name);

        result.data=result.data.filter(elem=> elem[3].length>0);
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

            if( i === ( result.data.length-1))
            {
              console.log("It's done");
            }
            

            
          }catch(err){
            
              console.log(err.response);
            
          }

        });




          

 
      })
    }

  } 


  return (
    <div>
      <br></br>
      <h1 className="text-center text-4xl">GPX Analyser</h1>
      <br></br>
      <div
        className={`messD p-6 my-2 mx-auto max-w-md border-2 ${ highlighted ?  'border-green-600 bg-green-100': 'border-gray-600'}` }

        onDragEnter = { () =>{
           setHighlighted(true);
        }}
        onDragOver = {(e)=>{
          e.preventDefault();
         }}
        onDrop = {(e)=>{ 
          e.preventDefault();
          setHighlighted(false);
          
    
        
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
   
           
          })
        }}
      >  
    <form>
      <div>
      <input id="file-upload" type="file" onChange={onChange}/>
      <label htmlFor="file-upload" className="custom-file-upload">
      Select File
      </label>
      <p>{filename}</p>

      </div>
      
    </form>
      <br></br>
      <p>or drop .CSVs here</p>
      </div>
     
    </div>
  );
}

export default App;
