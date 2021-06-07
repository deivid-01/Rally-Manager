import { checkPropTypes } from "prop-types";
import React, { useState , useEffect} from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {useHistory} from 'react-router-dom'
import Cards from './Cards'
import Competitors from './Competitors'
import CreateStage from './CreateStage'
import Results from './Results'

function Categories(props){

    const [raceData,setRaceData] = useState()
    const [options,setOptions] = useState([
        {
            id : 1,
            name:'Categories',
            active: true
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
    const next_URL = "/stages"
    const url = "http://localhost:5000/api/categories"
    const type ="Category"

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
        console.log(index)
        var newOptions =[...options]
        newOptions.forEach((option)=>{
            option.active = false
        })

        newOptions[index].active =true
        setSelectedOption(newOptions[index])
        console.log(options)
        setOptions(newOptions)

    }


    useEffect(()=>{
        var race = window.localStorage.getItem('race')
        if ( race )
            setRaceData (JSON.parse(race))
            setSelectedOption(options[0])
          
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

            <br></br>
            {
                (selectedOption.id==1)?
                    <Cards datas = {props.location.data} type={type}url={url} next_URL={next_URL}></Cards>
                    :(selectedOption.id==2) ? 
                        <Competitors></Competitors>
                        :(selectedOption.id==3) ?
                        <CreateStage></CreateStage>
                        :<Results></Results>
            }
           {/*} */}
        </div>
    )
}

export default Categories;