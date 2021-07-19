import React from 'react'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import Materialtable,{MTableToolbar} from 'material-table'
import {updateMapCenter} from '../../utils/maptools'

function MaterialTable_({columns,data,deleteService,createService,updateService,
                        onUpdateData,map})
{
    return (
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
                editable={{
                    onRowAdd: newData=>
                    new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            //Create in database
                            createService(newData);
                            onUpdateData([...data,newData]);

                            resolve();
                        },1000)
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        updateService(map,newData)
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        onUpdateData([...dataUpdate]);
        
                        resolve();
                    }, 1000)
                    }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {

                            deleteService(oldData);

                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            onUpdateData([...dataDelete]);

                            resolve();
                            }, 1000)
                })
                }}
                actions={[
                    {
                    icon: ZoomInIcon,
                    tooltip: 'Show in map',
                    onClick: (event, rowData) => updateMapCenter(map,rowData)
                    }
                ]}
            />
    )
}

export default MaterialTable_