import React, {useState,useEffect} from "react";
import axios from 'axios';


import Materialtable,{MTableToolbar}from 'material-table'
import {Button,IconButton} from '@material-ui/core'
import DetailedResults from './DetailedResults'
import DeleteIcon from '@material-ui/icons/Delete';
import FindInPageIcon from '@material-ui/icons/FindInPage';

export const ResultsTable = ({waypoints}) => {
 

  const [resultsLoaded,setResultsLoaded] = useState(false);
  const [selectedResult,setSelectedResult] = useState(null);
  const [showDetailedInfo,setShowDetailedInfo]= useState(true);
  const [columns,setColumns] = useState([
    {
      title: 'Position',
      field: 'position',
      width:'10%',
      type: 'numeric',
      cellStyle:{
        backgroundColor: '#fc9003',
   
        textAlign:'center', 
        fontSize:'1'
    },
    headerStyle: {
        backgroundColor: '#fc9003',
 
        textAlign:'center', 
    }
    },
    {
      title: 'Name',
      field: 'competitor_name',
      width:'10%',
      cellStyle:{

        textAlign:'center', 
        fontSize:'1'
    },
    headerStyle: {
        backgroundColor: '#fcba03',
        
        textAlign:'center', 
    }
    },
    {
      title: 'Lastname',
      field: 'competitor_lastname',
      width:'10%',
      cellStyle:{
   
        textAlign:'center', 
        fontSize:'1'
    },
    headerStyle: {
        backgroundColor: '#fcba03',
        
        textAlign:'center', 
    }
    },
    {
      title: 'Category',
      field: 'competitor_category',
      width:'15%',
      cellStyle:{
  
        textAlign:'center', 
        fontSize:'1'
    },
    headerStyle: {
        backgroundColor: '#fcba03',
        
        textAlign:'center', 
    }
    },
    {
      title: 'Partial Time',
      field: 'partial_time',
      width:'15%',
      cellStyle:{
      
        textAlign:'center', 
        fontSize:'1'
    },
    headerStyle: {
        backgroundColor: '#fcba03',
        
        textAlign:'center', 
    }
      
    },
    {
      title: 'Penalization',
      field: 'penalization',
      width:'20%',
      cellStyle:{
    
        textAlign:'center', 
        fontSize:'1'
    },
    headerStyle: {
   
        
        textAlign:'center', 
    }
    },
    {
      title: 'Total Time',
      field: 'total',
      width:'20%',
      cellStyle:{
  
        textAlign:'center', 
        fontSize:'1'
    },
    headerStyle: {
   
        textAlign:'center', 
    }
    },
  ])
  const [data,setData]=useState([

  ])


  const configureData =(partialresults)=>{
    var newData = []
    partialresults.forEach((element,i) => {
      var item = {}
      item.id = element._id
      item.competitor_category = element.competitor.categorytype.name
      item.competitor_name = element.competitor.name
      item.competitor_lastname = element.competitor.lastname
      item.position = (element.position)?element.position:(i+1)
      item.start_time = element.start_time
      item.arrival_time = element.arrival_time
      item.neutralization = element.neutralization
      item.penalization = element.penalization
      newData.push(item)
    });
   
    setData(newData)
  }
  const changeComponent =  rowData => e => {
  
  }
  function  sayHi(e,rowData)
  {
    setShowDetailedInfo((showDetailedInfo)?false:true);
    setSelectedResult (rowData)
  }

  const fetchResults = async (stage_id) => {
    const res = await axios.get('http://localhost:5000/api/results/stage/'+stage_id)

    setData(res.data);

    

  }
  
  useEffect(()=>{
 
    setShowDetailedInfo(true)
 
    var stage = localStorage.getItem('stage')
    if ( stage )
    {
      stage = JSON.parse(stage)
      //configureData(stage.partialresults);
      fetchResults(stage._id);

    }
    


  },[])

  useEffect(()=>{

    if ( data.length > 0 )
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
              sayHi(event,rowData)
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
    
