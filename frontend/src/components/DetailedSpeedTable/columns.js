export const columns = [
    {
        title:'Id',
        field:'id',
        editable:'never',
        width: "10%",
        cellStyle:{

            textAlign:'center', 
            fontSize:'1'
        },
        headerStyle: {
            textAlign:'center', 
        }
     
    },
    {
        title:'Average Speed',
        field:'averageSpeed',
        width: "40%",
        cellStyle:{

            textAlign:'center', 
            fontSize:'1'
        },
        headerStyle: {
            textAlign:'center', 
        }
     
    },
   
    {
        title:'Penalization Time',
        field:'penalization',
        width: "40%",
        cellStyle:{
            backgroundColor: '#000',
            color: '#FFF',
            textAlign:'center', 
        },
        headerStyle: {
            backgroundColor: '#000',
            color:'#FFF',
            textAlign:'center', 
        }
     
    },
]