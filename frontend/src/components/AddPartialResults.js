import React, {useEffect,useState} from 'react'
import axios from 'axios';
import Materialtable,{MTableToolbar} from 'material-table'
import {Button,IconButton,Typography,Tooltip, TextField,Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import BackupIcon from '@material-ui/icons/Backup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
}));
function AddPartialResults()
{
  const classes = useStyles();

    const partialResults_URL= 'http://localhost:5000/api/partialresults/stage/'
    const [ filename, setFilename] = useState('');
    const [ progress, setProgress] = useState(0);
    const [openError, setOpenError] = useState(false);
    const [errorMsg, SetErrorMsg] = useState('Error');
    const [successMsg, SetSuccessMsg] = useState('Trackpoints uploaded');
  
    
    

    const [data,setData]  = useState([
   
    ])

    const validateTime = (t) => {
    

      try
      {
        var units = t.split(':')
        if(units.length !=3)
          return false;
        var i;
          for( i = 0;i<units.length;i++)
        {
       
          if (units[i].length!=2)
            return false

          if (! /^\d+$/.test(parseInt(units[i])))
          {
              console.log("Well done")
              return false
          }
          
        }

        return true
      }
      catch(err)
      {
        return false;
      }

     
    }

    const [columns, setColumns] =useState([
        {
            title:'Full Name',
            field:'competitor_fullname',
            editable:'never',
            width: "10%"
         
        },
        {
            title:'Category',
            field:'competitor_category',
            width: "20%",
            editable:'never',
            
         
           
        },
        {
            title:'Start Time',
            field:'start_time',
        
            width: "20%",
            filtering:false,
            validate: rowData => (!validateTime(rowData.start_time))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,

        }
          
        ,
        {
            title:'Arrival Time',
            field:'arrival_time',
       
            width: "15%",
            filtering:false,
            validate: rowData => (!validateTime(rowData.arrival_time))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,
          
        },
        {
            title:'Neutralization',
            field:'neutralization',
            filtering:false,
            width: "15%",
            validate: rowData => (!validateTime(rowData.neutralization))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,
      
          
        },
        {
            title:'GPX',
            field:'upload_gpx',
            cellStyle:{
                textAlign:'center', 
                fontSize:'1'
            },
            filtering:false,
            render: (rowData) =>
            rowData && (
            <div >
                {(rowData.gpx_uploaded)?
                <div >
                            <Tooltip title="Gpx uploaded">
                            <CheckCircleIcon fontSize="large" style={{fill: "#00ba35"}}></CheckCircleIcon>
                            </Tooltip>
                       
                           </div>
                          :
                          <div>
                              <Tooltip title="No gpx uploaded">
                              <ErrorIcon  fontSize="large" style={{fill: "red"}}></ErrorIcon>
                              </Tooltip>
                          
                          
                          </div>
                }
  
           
            </div>),
            editComponent: (rowData) =>
            rowData && (
              <div>
                {
                  (progress==0)?
                
                <div >
                      <input
                      className={classes.input}
                      accept=".gpx"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(e)=>onFileUploadHandler(rowData.rowData.id,e)}
                        /> 
                        <label htmlFor="contained-button-file">
                
                                    <Tooltip title="Upload GPX">
                                <IconButton component="span">
                          < BackupIcon  fontSize="large"   style={{fill: "black"}}></BackupIcon>
                          </IconButton>
                          </Tooltip>
                        
                        </label>
          
            </div>
            :
            <div>
            <Box position="relative" display="inline-flex">
            < CircularProgress  variant="determinate" value={progress} />
              
          </Box>
          </div>
            }
              </div>
               
    )
        },

    ])


    const uploadTrackpoints = async(partialResult_id,file) => {

        setFilename(file.name);
      
        const formData = new FormData();
    
        formData.append('file',file);
        formData.append('partialresult',partialResult_id);
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
          console.log("Trackpoint Uploaded")
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

    const fetchPartialResults = async(stage_id) => {

      console.log(partialResults_URL+stage_id)
      try
      {
        const  res =await  axios.get(partialResults_URL+stage_id,)
        setData(res.data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    

    const onFileUploadHandler =async (partialResult_id,e) =>{
 
      
        if ( e.target.files.length  >0) 
        {      
            uploadTrackpoints(partialResult_id,e.target.files[0]);
          e.target.value = null;
        }
      }

      useEffect(()=>{

        var stage = localStorage.getItem('stage')
        if ( stage)
          stage = JSON.parse(stage)
          console.log(stage)
          fetchPartialResults(stage._id);
      },[])

    return ( <div >
       <div className="custom-align">
      <div className=" custom-container-80">
        <Materialtable
        
        components={{
                Toolbar: props => (
                    <div  
                    variant='dense'
                    style={{ backgroundColor: '#fcba03' }}>
                        <MTableToolbar 
                        
                        {...props} />
                    </div>
                )
            }}   
        columns={columns}
        data = {data}
        options ={{
            actionsColumnIndex:-1,
            tableLayout: "fixed",
            maxBodyHeight: 450,
            showTitle:false,
            search:false,
            paging:false,
            filtering:true,
            
                headerStyle: {
                    background: '#fcba03',
                    color: '#000',
                    textAlign:'center',
                    fontSize:'1'
                },
                cellStyle: {
                    textAlign:'center', 
                    fontSize:'1'}}}
        editable={{
            onRowAdd: newData=>
            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    setData([...data,newData]);

                    resolve();
                },1000)
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    resolve();
                    }, 1000)
          })
        }}

        
        
       >

       </Materialtable>
       </div>  
       </div>  
    </div>)
}

export default AddPartialResults;