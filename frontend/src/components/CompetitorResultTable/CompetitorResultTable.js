import React from 'react'
import {columns} from './columns.js' 
import Materialtable from 'material-table'
function CompetitorResultTable({data})
{
    
    const setNameAsTitle = () => {
        return data[0].competitor_name+' '+data[0].competitor_lastname
    } 

    return (
        <Materialtable
        columns = {columns}
        data = {data}
        title = {( data.length>0)?setNameAsTitle():'Competitor Name'}
        options = {{
         
            tableLayout:'fixed',
            search:false,
            paging:false,
            sorting:false
        }}
        />
        )
}

export default CompetitorResultTable;