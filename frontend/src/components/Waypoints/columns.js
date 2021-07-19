import {validateHHMMSSFormat} from '../../utils/timetools'

export const columns =[
    {
        title:'Id',
        field:'index',
        editable:'never',
        width: "5%"
     
    },
    {
        title:'Type',
        field:'type',
        width: "10%",
        lookup: { 'WPM': 'WPM', 'FZ': 'FZ','DZ': 'DZ','START': 'START','FINISH': 'FINISH' } ,
        sorting:false
        
       
    },
    {
        title:'Latitude',
        field:'latitude',
        type : 'numeric',
        width: "20%",
        sorting:false
    },

    {
        title:'Longitude',
        field:'longitude',
        type : 'numeric',
        width: "15%",
        sorting:false

      
    },
    {
        title:'Radius (m)',
        field:'radius',
        type : 'numeric',
        width: "15%",
        validate: rowData => (!(rowData.radius>=0 && rowData.radius<=1000))?{isValid: false, helperText: 'Number must greater than zero'}:true,
      
    },
    {
        title:'Penalization',
        field:'penalization',
        width: "20%",
        validate: rowData => (!validateHHMMSSFormat(rowData.penalization))?{isValid: false, helperText: 'Format must be hh:mm:ss'}:true,
        sorting:true
        
    },
]