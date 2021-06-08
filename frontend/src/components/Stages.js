import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Competitors from './Competitors'
import Results from './Results'

import Cards from './Cards'

function Stages(props){

    const type='Stage'
    const next_URL = "/options"
    
    const url = "http://localhost:5000/api/stages"
    const [categoryData, setCategoryData] = useState()
    const [options,setOptions] = useState([
        {
            id : 1,
            name:'Stages',
            active: true
        },
        {
            id : 2,
            name:'Competitors',
            active: false
        },
        {
            id : 3,
            name:'Results',
            active: false
        },
        
    ])

    const [selectedOption, setSelectedOption] = useState(
        {
            id : -1,
            name:'',
            active: false
        }
    )

    const handleActiveOption = index => e => {
        
        var newOptions =[...options]
        newOptions.forEach((option)=>{
            option.active = false
        })

        newOptions[index].active =true
        setSelectedOption(newOptions[index])
        
        setOptions(newOptions)

    }



    
    useEffect(()=>{

        var category = window.localStorage.getItem('category')
        if (category)
        {
            setCategoryData(JSON.parse(category));
            setSelectedOption(options[0])
        }
    },[])
    
    return (
        <div>
            <br></br>
            <div><h1 className="text-center">{(categoryData)?categoryData.categorytype.name:"Category Name"}</h1> </div>
            <br></br>
            <div className="custom-align">

                <ButtonGroup  variant="text" aria-label="text primary button group">
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
                    


                </ButtonGroup>
                </div>
                <br></br>
                {
                    (selectedOption.id==1)?
                    <Cards datas={props.location.data}type={type}url={url} next_URL={next_URL}></Cards>
                        :(selectedOption.id==2) ? 
                            <Competitors></Competitors>
                            :<Results></Results>
                }

           
        </div>
    )
}

export default Stages;