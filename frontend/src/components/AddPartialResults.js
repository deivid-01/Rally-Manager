import React, {useEffect,useState} from 'react'
import Materialtable,{MTableToolbar} from 'material-table'
import {Button,IconButton} from '@material-ui/core'
import BackupIcon from '@material-ui/icons/Backup';
function AddPartialResults()
{
    const [data,setData]  = useState([
        {
            full_name:'Juan Ortiz',
            category:'Motos Darien 300',
            start_time:0,
            arrival_time:0,
            neutralization:0

        }
    ])
    const [columns, setColumns] =useState([
        {
            title:'Full Name',
            field:'full_name',
            editable:'never',
            width: "10%"
         
        },
        {
            title:'Category',
            field:'category',
            width: "20%",
            editable:'never'
         
           
        },
        {
            title:'Start Time',
            field:'start_time',
            type : 'numeric',
            width: "20%"
          
        },
        {
            title:'Arrival Time',
            field:'arrival_time',
            type : 'numeric',
            width: "15%"
          
        },
        {
            title:'Neutralization',
            field:'neutralization',
            type : 'numeric',
            width: "15%"
          
        },
        {
            title:'GPX',
            field:'upload_gpx',
            editable:'never',
                    render: (rowData) =>
            rowData && (
                <Button variant="contained" color="secondary" component="span">
                Upload GPX
              </Button>
    )
        }
    ])

    return ( <div>
        <Materialtable
        
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
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
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
    </div>)
}

export default AddPartialResults;