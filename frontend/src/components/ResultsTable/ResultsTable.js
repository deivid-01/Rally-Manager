import React, {useState,useEffect} from "react";
import { columns } from "./columns";
import Materialtable,{MTableToolbar}from 'material-table'
import {IconButton} from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { getResultsByCategory } from "../../services/results.services";


export const ResultsTable = () => {
 
  

  const [data,setData]=useState([])
  const [columns2,setColumns2]=useState([])
 
 
  const fetchResults = async (category_id) => {
    try
    {
      const res = await getResultsByCategory(category_id)

      setData(fixResults(res));
  
    }
    catch(err)
    {
      console.log(err)
    }  

  }

  const fixResults = (results)=>{
    var fixedData = []

    results.forEach((item)=>{
      
      item.stagesTime.forEach((stageTime,i)=>{

        var key = `stage_${i+1}`
        item[key]=stageTime

      })

      delete item.stagesTime;
      fixedData.push(item);

    })
    
    return fixedData;

  }

  const setStageTotalColumns = (num_stages)=>{
    var stageColumns=[]
    
    
    for (let i = 0; i < num_stages; i++) {
    
      var newcol = {...columns[3]}; 
      newcol.title=`Stage ${i+1}`
      newcol.field=`stage_${i+1}`
      stageColumns.push(newcol)
      
    }
    
    var columnStart = columns.slice(0,columns.length-1);
    var columnMedium = stageColumns;
    var columnEnd=  columns.slice(columns.length-1,columns.length)

    setColumns2(columnStart.concat(columnMedium).concat(columnEnd));
  }
  
  useEffect(()=>{
 
  

    var category = localStorage.getItem('category')
    if (  category)
    {
      category = JSON.parse(category)
        
      setStageTotalColumns(category.stages.length);
      fetchResults(category._id);



    }
  

    
  
 
   // columns.splice(0,0,newcol);
   // console.log(columns)
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
        columns={columns2}
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
    
