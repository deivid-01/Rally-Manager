import React, {useEffect, useState} from "react";

import Options from "./Options";
import Competitors from './Competitors'

import Collapse from '@material-ui/core/Collapse';

import Cards from './Cards'
import { ResultsTable } from "./ResultsTable/ResultsTable";

function Category(){
    const type='Stage'
    const next_URL = "/stage"
    
    const [categoryData, setCategoryData] = useState()
    const [stages,setStages] = useState([]);
    const [options,setOptions] = useState([
        {
            id : 1,
            name:'Stages',
            active: true
        },
        /*
        {
            id : 2,
            name:'Competitors',
            active: false
        },*/
        {
            id : 2,
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
            category = JSON.parse(category);
            setStages(category.stages.map(({_id,name})=>(
                {id : _id,
                title : name})                
                ))
            setCategoryData(category);
            setSelectedOption(options[0])
        }

        
    },[])

 
    
    return (
        <div>
            <br></br>
            <div><h1 className="text-center">{(categoryData)?categoryData.categorytype.name:"Category Name"}</h1> </div>
            <br></br>
            <div className="custom-align">

                <Options
                    options={options}
                    handleActiveOption={handleActiveOption}
                />
                </div>
                <br></br>

                <Collapse in ={selectedOption.id==1} >
                <Cards data={stages} type={type} next_URL={next_URL}/>
                </Collapse>
 
                <Collapse in ={selectedOption.id==2} >
                    <ResultsTable/> 
                </Collapse>
            <br></br>
            <br></br>
        </div>
    )
}

export default Category;