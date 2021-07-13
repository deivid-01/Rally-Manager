import React, {useEffect,useState} from 'react'

import {IconButton,Tooltip } from '@material-ui/core'
import BackupIcon from '@material-ui/icons/Backup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error';
import {validateHHMMSSFormat} from '../utils/validationtools'
import {uploadTrackpoints} from '../../services/trackpoints.services'

import PartialResultsTable from '../PartialResultsTable';
import PopUpAlert from '../PopUpAlert';
import {getPartialResultsFromStageByCategory} from '../../services/stage.services'

function AddPartialResults()
{
 
    const [fetchingData,SetFetchingData]= useState(true)

    const [uploadGPXSuccess,setUploadGPXSuccess] = useState(false);
    const [startUpload,setStartUpload] = useState(false);
    const [itemUpdated,setItemUpdated] = useState(false);
    const [itemDeleted,setItemDeleted] = useState(false);
    
    const [gpxUploaded,setGPXUpload] = useState(false);

    const [data,setData]  = useState([])
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
  
  ])
    
    
    const onSetData = (newData)=> setData(newData)
     

    const onSetGPXUpload = ()=>   setGPXUpload(true)
    const onSetItemUpdated = ()=>   setItemUpdated(true)
    const onSetItemDeleted = ()=> setItemDeleted(true)
      
    
    const onFileUploadHandler =async (partialResult_id,e) =>{
     
      if ( e.target.files.length  >0) 
      {      
        try
        {
          setStartUpload(true)  
          await uploadTrackpoints(partialResult_id,e.target.files[0]);
          setGPXUpload(true)
          setUploadGPXSuccess(true)
          setStartUpload(false)

        }
        catch(err)
        {
          console.log(err)
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

    

    return ( <div >
       <div className="custom-align">
     

      <div className=" custom-container-80">
        <PartialResultsTable
            fetchingData = {fetchingData}
            columns = {columns}
            data={data}
            onSetData = {onSetData}
            gpxUploaded = {gpxUploaded}
            onSetGPXUpload={onSetGPXUpload}
            onSetItemUpdated={onSetItemUpdated}
            onSetItemDeleted={onSetItemDeleted}
        />
       </div>  
       </div>
        <PopUpAlert
          open={startUpload}
          onClose={handleClose2}
          severity="info"
          msg="Uploading competitor trackpoints..."
        />
        <PopUpAlert
          open={uploadGPXSuccess}
          onClose={handleClose}
          severity="success"
          msg="GPX Uploaded"
        />
        <PopUpAlert
          open={itemUpdated}
          onClose={handleClose3}
          severity="success"
          msg="Data Updated"
        />
          <PopUpAlert
          open={itemDeleted}
          onClose={handleClose4}
          severity="success"
          msg="Partial Result Deleted"
        />
    </div>)
}

export default AddPartialResults;