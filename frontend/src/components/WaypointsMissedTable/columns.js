export const columns = [
    {
        title:'Id',
        field:'index',
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
        title:'Latitude',
        field:'latitude',
        width: "15%",
        cellStyle:{

            textAlign:'center', 
            fontSize:'1'
        },
        headerStyle: {
            textAlign:'center', 
        }
     
    },
    {
        title:'Longitude',
        field:'longitude',
        width: "15%",
        cellStyle:{

            textAlign:'center', 
            fontSize:'1'
        },
        headerStyle: {
            textAlign:'center', 
        }
     
    },
    {
        title:'Radius (m)',
        field:'radius',
        width: "15%",
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
        width: "10%",
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