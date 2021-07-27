import React, {useEffect, useState} from "react";

import Options from "./Options";
import Competitors from './Competitors'
import {getStage,deleteStage} from '../services/stage.services'
import {getCategory} from '../services/categories.services'

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

    const handleDeleteStage =async (id) => {
        //Deleting stage
        
        try
        {
            await deleteStage(id);
            //Fetch data again
            var category = window.localStorage.getItem('category')
            if (category)
            {
                category = JSON.parse(category);
                fetchCategory(category._id)
            }

        }
        catch(err)
        {
            console.log(err)
        }
    }

    const handleFetchStage =async (id) =>{
       
        var data = await getStage(id);
        return data

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

    const fetchCategory =async (category_id) =>{

        try
        {
            var data = await getCategory(category_id)
           
            setStages(data.stages.map(({_id,name})=>(
                {id : _id,
                title : name})                
                ))
            setCategoryData(data);
        }
        catch(err)
        {
            console.log(err)
        }
    }



    
    useEffect(()=>{

        var category = window.localStorage.getItem('category')
        if (category)
        {
            category = JSON.parse(category);
            fetchCategory(category._id)
            setSelectedOption(options[0])
        }

        
    },[])

 
    
    return (
        <div>
            <br></br>
            <div><h1 className="text-center">{(categoryData)?categoryData.categorytype.name:" "}</h1> </div>
            <br></br>
            <div className="custom-align">

                <Options
                    options={options}
                    handleActiveOption={handleActiveOption}
                />
                </div>
                <br></br>

                <Collapse in ={selectedOption.id==1} >
                <Cards 
                data={stages}
                 type={type}
                  next_URL={next_URL}
                  deleteCardHandler={handleDeleteStage}
                  fetchCardData = {handleFetchStage}
                  />
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