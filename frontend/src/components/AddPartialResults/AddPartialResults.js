import React, {useEffect,useState} from 'react'

import Materialtable,{MTableToolbar} from 'material-table'
import {Snackbar } from '@material-ui/core'

import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from '../Alert';
import {columns} from'./columns'

import {deletePartialResult,fetchPartialResults,updatePartialResult} from '../../services/partialresults.services'
import {getPartialResultsFromStageByCategory} from '../../services/stage.services'

function AddPartialResults()
{
 
    const [fetchingData,SetFetchingData]= useState(true)
   
    const [uploadGPXSuccess,setUploadGPXSuccess] = useState(false);
    const [startUpload,setStartUpload] = useState(false);
    const [itemUpdated,setItemUpdated] = useState(false);
    const [itemDeleted,setItemDeleted] = useState(false);
    const [ filename, setFilename] = useState('');
    const [ progress, setProgress] = useState(0);
    const [openError, setOpenError] = useState(false);
    const [errorMsg, SetErrorMsg] = useState('Error');
    const [successMsg, SetSuccessMsg] = useState('Trackpoints uploaded');

    const [gpxUploaded,setGPXUpload] = useState(false);
   
    
    

    const [data,setData]  = useState([])

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

        var posResults=[
          
        ]
      
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