import React from 'react'
import {IconButton,Tooltip,Snackbar } from '@material-ui/core'
import BackupIcon from '@material-ui/icons/Backup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error';
import {validateHHMMSSFormat} from '../utils/validationtools'
import {onFileUploadHandler} from '../../services/trackpoints.services'

export const columns =[
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
                  styles={{displat:'none'}}
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