import React from 'react'

import Materialtable,{MTableToolbar} from 'material-table'

import {deletePartialResult,updatePartialResult} from '../services/partialresults.services'


function PartialResultsTable(
{
    fetchingData,
    columns,
    data,
    onSetData,
    gpxUploaded,
    onSetGPXUpload,
    onSetItemUpdated,
    onSetItemDeleted
}

)
{
    return (<Materialtable
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
         
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                
            

                if (gpxUploaded)
                    {
                      newData.gpx_uploaded = true
                      onSetGPXUpload(false);

                    }

                //Update data in database
                updatePartialResult(newData);
                //Show message
                onSetItemUpdated();
                //Update local data
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                onSetData([...dataUpdate]);
  
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
                        onSetItemDeleted(true);
                      }
                      catch(err)
                      {
                        console.log(err)
                      }
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    onSetData([...dataDelete]);

                    resolve();
                    }, 1000)
          })
        }}

        
        
       >

       </Materialtable>)
}

export default PartialResultsTable;