import React, {useState,useEffect} from "react";
import axios from 'axios';


import Materialtable,{MTableToolbar}from 'material-table'
import Button from '@material-ui/core/Button'
import DetailedResults from './DetailedResults'

export const ResultsTable = ({stageID,reload}) => {
  
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
   
    setData(newData)
  }
  const [showDetailedInfo,setShowDetailedInfo]= useState(reload);
  const [columns,setColumns] = useState([
    {
      title: 'Id',
      field: 'id',
      width:'10%'
    },
    {
      title: 'Name',
      field: 'competitor_name',
      width:'10%'
    },
    {
      title: 'Lastname',
      field: 'competitor_lastname',
      width:'10%'
    },
    {
      title: 'Category',
      field: 'competitor_category',
      width:'10%'
    },
    {
      title: 'Start time',
      field: 'start_time',
      width:'10%'
    },
    {
      title: 'Arrival Time',
      field: 'arrival_time',
      width:'10%'
    },
    {
      title: 'Total time',
      field: 'total_time',
      width:'10%'
    },
    {
      title: 'Neutralization',
      field: 'neutralization',
      width:'10%'
    },
    {
      title: 'Penalization',
      field: 'penalization',
      width:'10%'
    },
    {
      title: 'Total',
      field: 'total',
      width:'10%'
    },
  ])
  const [data,setData]=useState([
    {
      id:'-1',
      competitor_name:'Name Comp',
      competitor_lastname:'Lastname Comp',
      competitor_category:'Category Comp',
      start_time:0,
      arrival_time:0,
      total_time:0,
      total:0,
      neutralization:0,
      penalization:0
    }
  ])

  const changeComponent =  rowData => e => {
  
  }
  function  sayHi(e,rowData)
  {
    setShowDetailedInfo((showDetailedInfo)?false:true);
  }
  
  useEffect(()=>{
    console.log("Loading")
    setShowDetailedInfo(true)
    //getResults();
  },[])


  return (
    <div>   
      {(showDetailedInfo==true)?
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
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              variant="contained"
              style={{textTransform: 'none'}}
                      className="text-light bg-dark"
              size="small"
            >
              Details
            </Button>
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
       </div>:
       <DetailedResults></DetailedResults>
      }
       </div>  
  )
}
    
