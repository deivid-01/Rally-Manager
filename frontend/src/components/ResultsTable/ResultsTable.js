import React, {useState,useEffect} from "react";

import Materialtable,{MTableToolbar}from 'material-table'
import {IconButton} from '@material-ui/core'
import DetailedResults from '../DetailedResults'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { getResults } from "../../services/results.services";
import { columns } from "../ResultsTable/columns";

export const ResultsTable = ({waypoints}) => {
 
  console.log("Hi fro Results table");
  const [resultsLoaded,setResultsLoaded] = useState(false);
  const [selectedResult,setSelectedResult] = useState(null);
  const [showDetailedInfo,setShowDetailedInfo]= useState(true);
  const [data,setData]=useState([])

 
  function  onSelectedRowHandler(e,rowData)
  {
    setShowDetailedInfo((showDetailedInfo)?false:true);
    setSelectedResult (rowData)
  }

  const fetchResults = async (stage_id,category_id) => {
    try
    {
      const res = await getResults(stage_id,category_id)
      setData(res);
    }
    catch(err)
    {
      console.log(err)
    }  

  }
  
  useEffect(()=>{
 
    setShowDetailedInfo(true)
 
    var stage = localStorage.getItem('stage')
    var category = localStorage.getItem('category')
    if ( stage && category)
    {
      stage = JSON.parse(stage)
      category = JSON.parse(category)
  
      fetchResults(stage._id,category.categorytype._id);

    }
    
  },[])

  useEffect(()=>{
    

    if (data &&  data.length > 0 )
    {
      setResultsLoaded(true);
    }

  },[data])


  return (
    <div>   
      {(showDetailedInfo)?
      <div className="custom-align">
      <div className=" custom-container-80">
      <Materialtable
          components={{
            Toolbar: props => (
              <div  
              style={{ backgroundColor: '#fcba03' }}>
                  <MTableToolbar 
                  
                  {...props} />
              </div>
          ),
          Action: props => (
            <IconButton
              onClick={(event) => props.action.onClick(event, props.data)}
              variant="contained"
              style={{color: '#000'}}
                      
              size="small"
            >
             <FindInPageIcon fontSize="large" />
              </IconButton>
        )

        }  
    }
        columns={columns}
        data = {data}
        actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) =>{
              onSelectedRowHandler(event,rowData)
            } 
          }
        ]}
        isLoading = {!resultsLoaded}
        options ={{
            actionsColumnIndex:-1,
            tableLayout: "fixed",
            maxBodyHeight: 600,
            showTitle:false,
            search:false,
            paging:false,
            filtering:true,
            exportButton:true,
            headerStyle: {
              background: '#fcba03',
              color: '#000',
              textAlign:'center',
              fontSize:'1'
          },
                cellStyle: {
                    textAlign:'center', 
                    fontSize:'1'}}}
        
        
       >
       </Materialtable>
       </div>
       <br></br>
       <br></br>
       </div>
     :
       <DetailedResults waypoints={waypoints} compInfo={selectedResult}></DetailedResults>
      }
       </div>  
  )
}
    
