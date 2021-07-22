import { checkPropTypes } from "prop-types";
import React, { useState , useEffect} from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {useHistory} from 'react-router-dom'
import Cards from './Cards'
import Competitors from './Competitors'
import ResultsByStage from './ResultsByStage'
import CreateStage from "./CreateStage";

function Race(props){
   
    const next_URL = "/category"
    const type ="Category"

    const [raceData,setRaceData] = useState()
    const [categories,setCategories] = useState();
    const [options,setOptions] = useState([
        {
            id : 1,
            name:'Categories',
            active: false
        },
        {
            id : 2,
            name:'Competitors',
            active: false
        },
        {
            id : 3,
            name:'Create Stage',
            active: false
        },
        {
            id : 4,
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


    const history = useHistory();

    const loadNextPage = () => {
        history.push('/createstage')
    }
    const handleClick = () =>{
        
        loadNextPage();

    }

    const handleLoadResults =  () =>{
        console.log("Loading results")
    }

    const handleActiveOption = index => e => {
        
        var newOptions =[...options]
        newOptions.forEach((option)=>{
            option.active = false
        })

        newOptions[index].active =true
        setSelectedOption(newOptions[index])
        
        setOptions(newOptions)

    }

    const updateOptions = () => {
        var newOptions =[...options]
        var option= localStorage.getItem('option');
        localStorage.removeItem('option');

        newOptions[(option)?option:0].active = true;
        setOptions(newOptions);
    }

    useEffect(()=>{
        var race = window.localStorage.getItem('race')
       
        if ( race )
        {
            race = JSON.parse(race);
            setRaceData (race);
            setCategories(race.categories.map(cd=>({
                id : cd._id,
                title : cd.categorytype.name
                              
            })))

            var option= localStorage.getItem('option');
            
            setSelectedOption( (option)?options[option]:options[0])
            updateOptions()
        
        }
            

          
    },[])

    return (
        <div>
            <br></br>
            <div><h1 className="text-center">
                {(raceData)? raceData.name :"Race name"}
                </h1> 
            </div>
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
            

            <br></br>
            {  
             selectedOption.id==1 &&  <Cards data = {categories} type={type} next_URL={next_URL}></Cards>
            }
            {  
             selectedOption.id==2 &&  <Competitors></Competitors>
            }
            {  
             selectedOption.id==3 && <CreateStage></CreateStage>
            }
            {  
             selectedOption.id==4 && <ResultsByStage></ResultsByStage>
            }
               
        </div>
    )
}

export default Race;