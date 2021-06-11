import React, {useState,useEffect} from "react";
import axios from 'axios';


import Materialtable,{MTableToolbar}from 'material-table'


export const ResultsTable = ({stageID}) => {

  const getResults = async ()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/stages/'+stageID)
      configureData(res.data.partialresults)
    } catch (error) {
      console.log(error)
    }
  }

  const configureData =(partialresults)=>{
    var newData = []
    partialresults.forEach(element => {
      var item = {}
      item.id = element._id
      item.start_time = element.start_time
      item.arrival_time = element.arrival_time
      item.neutralization = element.neutralization
      item.penalization = element.penalization
      newData.push(item)
    });
    console.log(newData)
    setData(newData)
  }

  const [columns,setColumns] = useState([
    {
      title: 'Id',
      field: 'id',
    },
    {
      title: 'Name',
      field: 'competitor_name',
    },
    {
      title: 'Lastname',
      field: 'competitor_lastname',
    },
    {
      title: 'Category',
      field: 'competitor_category',
    },
    {
      title: 'Start time',
      field: 'start_time'
    },
    {
      title: 'Arrival Time',
      field: 'arrival_time'
    },
    {
      title: 'Total time',
      field: 'total_time',
    },
    {
      title: 'Neutralization',
      field: 'neutralization'
    },
    {
      title: 'Penalization',
      field: 'penalization'
    },
    {
      title: 'Total',
      field: 'total'
    },
  ])
  const [data,setData]=useState([])
  
  useEffect(()=>{
    getResults();
  },[])

  return (
    <div>   
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
          )
      }}
        columns={columns}
        data = {data}
        
        options ={{
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
       </div>
       </div>  
  )
}
    
