import React, {useState,useEffect} from "react";

import Materialtable,{MTableToolbar}from 'material-table'
import {IconButton} from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { getResults } from "../../services/results.services";
import { columns } from "./columns";

export const ResultsTable = () => {
 

  const [resultsLoaded,setResultsLoaded] = useState(false);
  const [showDetailedInfo,setShowDetailedInfo]= useState(true);
  const [data,setData]=useState([])

 
  const fetchResults = async (stage_id,category_id) => {
    try
    {
      const res = await getResults(stage_id,category_id)
      setData(res);
      setResultsLoaded(true);
    }
    catch(err)
    {
      console.log(err)
    }  

  }
  
  useEffect(()=>{
 
   // setShowDetailedInfo(true)
 
    var stage = localStorage.getItem('stage')
    var category = localStorage.getItem('category')
    if ( stage && category)
    {
      stage = JSON.parse(stage)
      category = JSON.parse(category)
  
      //results by stage and category
     // fetchResults(stage._id,category.categorytype._id);

    }
    
  },[])




  return (
      <div className="custom-align">
      <div className=" custom-container-80">
      <Materialtable
        title={"Results by category "}
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
        isLoading ={false}// {!resultsLoaded}
        options ={{
            actionsColumnIndex:-1,
            tableLayout: "fixed",
            maxBodyHeight: 600,
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
 
  )
}
    
