import React, {useEffect,useState} from 'react'

import Materialtable,{MTableToolbar} from 'material-table'
import {IconButton,Tooltip,Snackbar } from '@material-ui/core'
import BackupIcon from '@material-ui/icons/Backup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error';
import {validateHHMMSSFormat} from '../utils/validationtools'
//import {uploadTrackpoints} from '../../services/trackpoints.services'
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from '../Alert';
import axios from 'axios'


import {deletePartialResult,fetchPartialResults,updatePartialResult} from '../../services/partialresults.services'
import {getPartialResultsFromStageByCategory} from '../../services/stage.services'

function AddPartialResults()
{
 
    const [fetchingData,SetFetchingData]= useState(true)
    const [progress,setProgress] = useState(0)
    const [uploadGPXSuccess,setUploadGPXSuccess] = useState(false);
    const [startUpload,setStartUpload] = useState(false);
    const [itemUpdated,setItemUpdated] = useState(false);
    const [itemDeleted,setItemDeleted] = useState(false);

    const [gpxUploaded,setGPXUpload] = useState(false);
   
    const columns =[
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
          filtering:false,
          
       
         
      },
      {
          title:'Start Time',
          field:'start_time',
      
          width: "20%",
          filtering:false,
          validate: rowData => (!validateHHMMSSFormat(rowData.start_time))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,
  
      } ,
      {
          title:'Arrival Time',
          field:'arrival_time',
     
          width: "15%",
          filtering:false,
          validate: rowData => (!validateHHMMSSFormat(rowData.arrival_time))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,
        
      },
      {
          title:'Neutralization',
          field:'neutralization',
          filtering:false,
          width: "15%",
          validate: rowData => (!validateHHMMSSFormat(rowData.neutralization))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,
    
        
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
              <div >
                    <input
                    style={{display:'none'}}
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
             
  )
  }
  
  ]
    

    const [data,setData]  = useState([])

    const onSetProgress = (loaded,total)=>
    {
      setProgress(parseInt(Math.round((loaded*100)/total)))
    }
    const uploadTrackpoints = async(partialResult_id,file,onSetProgress) => {

  
  
      const formData = new FormData();
  
      formData.append('file',file);
      formData.append('partialresult',partialResult_id);
      try
      {
        setStartUpload(true)  

        const res = await axios.post('http://localhost:5000/api/trackpoints/file',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent =>{
            onSetProgress(progressEvent.loaded,progressEvent.total)
           
          }  
        });
  
        setGPXUpload(true)
        setUploadGPXSuccess(true)
        setStartUpload(false)
  
  
      }
      catch(err)
      {
        
        
         console.log(err)
        
       
      }
   
  
    }
    const onFileUploadHandler =async (partialResult_id,e) =>{
     
      if ( e.target.files.length  >0) 
      {      
        try
        {
          await uploadTrackpoints(partialResult_id,e.target.files[0],onSetProgress);
     
        }
        catch(err)
        {
          console.log(err);
        }
    
        e.target.value = null;
      }
    }

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setUploadGPXSuccess(false);
    

    };

    const handleClose2 = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setStartUpload(false);
    }
  
    const handleClose3 = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setItemUpdated(false);
    }

    const handleClose4 = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setItemDeleted(false);
    }

    const translateResults_Add = (results) => {

        var posResults=[]
          
        
      
        results.forEach((result,i)=>{
          
          posResults.push( {
            id:result._id,
            competitor_fullname:result.competitor.name+" "+result.competitor.lastname,
            competitor_category:result.competitor.categorytype.name,
            start_time:result.start_time,
            arrival_time: result.arrival_time,
            neutralization:result.neutralization,
            gpx_uploaded:result.gpx_uploaded
          })
      
        })
         
          return posResults
     }

    
    
  

      useEffect(()=>{

        var stage = localStorage.getItem('stage')
        var category = localStorage.getItem('category')
      
        if ( stage && category)
        {
          stage = JSON.parse(stage)
          category = JSON.parse(category)
         
     

            fetchPartialResults(stage._id,category.categorytype._id);

          
        }
         
      },[])

    const fetchPartialResults = async  (stage_id,categorytype_id)=>{
      try
      {
        const results = await getPartialResultsFromStageByCategory(stage_id,categorytype_id);
        setData( translateResults_Add(results))
   
        SetFetchingData(false)
      }
      catch(err)
      {
        console.log(err);
      }

    }

    return ( <div >
       <div className="custom-align">
     

      <div className=" custom-container-80">
        <Materialtable
        isLoading={fetchingData}
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
                
                console.log(gpxUploaded)

                if (gpxUploaded)
                    {
                      newData.gpx_uploaded = true
                      setGPXUpload(false)
                    }

                //Update data in database
                updatePartialResult(newData);
                //Show message
                setItemUpdated(true);
                //Update local data
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    //Delete from database
                    

                    setTimeout(async () => {
                      try
                      {
                        await deletePartialResult(oldData.id)
                        setItemDeleted(true);
                      }
                      catch(err)
                      {
                        console.log(err)
                      }
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
   
         <Snackbar open={startUpload}   onClose={handleClose2}>
          <Alert onClose={handleClose2} severity="info">
            Uploading competitor trackpoints...
            <LinearProgress variant="indeterminate"/>
          </Alert>
        </Snackbar>
          <Snackbar open={uploadGPXSuccess} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              GPX Uploaded
            </Alert>
        </Snackbar>

        <Snackbar open={itemUpdated} autoHideDuration={2000} onClose={handleClose3}>
            <Alert onClose={handleClose3} severity="success">
              Data Updated
            </Alert>
        </Snackbar>
        <Snackbar open={itemDeleted} autoHideDuration={2000} onClose={handleClose4}>
            <Alert onClose={handleClose4} severity="success">
              Result Deleted
             
            </Alert>
       
        </Snackbar>
    </div>)
}

export default AddPartialResults;