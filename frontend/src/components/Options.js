import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function Options({options,handleActiveOption}){
    return(  <ButtonGroup  variant="text" aria-label="text primary button group">
    {
        options.map(option =>(
            
        <Button key={option.id}
            className={(option.active)?
                            [(!option.name.localeCompare('Results'))?
                                "bg-red text-light"
                                :
                                "bg-dark text-light"]
                            :""}
            variant = {(option.active)?'contained':'text'}
            color = {(option.name.localeCompare('Results'))?"default":'secondary'}
            onClick = {handleActiveOption(option.id-1)}
        >{option.name}
        </Button>
            
        ))
    }
    


</ButtonGroup>)
}
export default Options;