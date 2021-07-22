import React ,{ useEffect, useState}from "react";


import Collapse from '@material-ui/core/Collapse';
import Waypoints from './Waypoints/Waypoints'
import ResultsByStage from './ResultsByStage'
import AddPartialResults from './AddPartialResults/AddPartialResults'

import Options from "./Options";
function Stage(props){

    const [categoryName,setCategoryName] = useState('');
    const [prevIndex,setPrevIndex] = useState(-1)
    const [stageData, setStageData] = useState()
    const [options,setOptions] = useState([
        {
            id : 1,
            name:'Waypoints',
            active: false
        },
        {
            id : 2,
            name:'Add partial results',
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


        if(prevIndex==index)
        {
            localStorage.removeItem('option_')
            localStorage.setItem('option_',index)
            window.location.reload()
        }

        newOptions[index].active =true
        setSelectedOption(newOptions[index])
        
        setOptions(newOptions)
        setPrevIndex(index)

    }

    const updateOptions = () => {
        var newOptions =[...options]
        var option= localStorage.getItem('option_');
       
        localStorage.removeItem('option_');

        newOptions[(option)?option:0].active = true;
        setOptions(newOptions);
    }
    useEffect(()=>{

        var stage = window.localStorage.getItem('stage')
        var category = window.localStorage.getItem('category')
        if (stage && category)
        {
            stage =JSON.parse(stage) 
            category =JSON.parse(category) 
            setStageData(stage);
            setCategoryName(category.categorytype.name);
       
            console.log(stage);
            var option= localStorage.getItem('option_');
           
            setSelectedOption((option)?options[option]:options[0])
            updateOptions()
        }
    },[])


    return (
        <div>
            <br></br>
            <div><h1 className="text-center">{(stageData)?stageData.name:"Stage Name"}</h1>
            <h5 className="text-center">{(categoryName)?categoryName:"Category Name"}</h5> </div>
          
            <br></br>

            <div className="custom-align">
                <Options
                    options={options}
                    handleActiveOption={handleActiveOption}
                />
            </div>
                <br></br>
            <Collapse in ={selectedOption.id==1} >
                    <div className='custom-align'>
                        <Waypoints/>
                    </div>
            </Collapse>
            <Collapse in ={selectedOption.id==2} >
                    <AddPartialResults/>
            </Collapse>
            <Collapse in ={selectedOption.id==3} >
                    <ResultsByStage resultsBy={'stage'}/>
            </Collapse>

   

                   
        </div>
    )
}

export default Stage;