import React ,{ useEffect, useState}from "react";

import Waypoints from './Waypoints/Waypoints'
import Results from './Results'
import AddPartialResults from './AddPartialResults/AddPartialResults'
import Options from "./Options";
function Stage(props){

   
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
        if (stage)
        {
            stage =JSON.parse(stage) 
            setStageData(stage);
       

            var option= localStorage.getItem('option_');
           
            setSelectedOption((option)?options[option]:options[0])
            updateOptions()
        }
    },[])


    return (
        <div>
            <br></br>
            <div><h1 className="text-center">{(stageData)?stageData.name:"Stage Name"}</h1> </div>
            <br></br>

            <div className="custom-align">
                <Options
                    options={options}
                    handleActiveOption={handleActiveOption}
                />
            </div>
                <br></br>
                {
                selectedOption.id==1 &&  <div className='custom-align'>
                <Waypoints/>
                </div>
                }
                {
                    selectedOption.id==2 &&  <AddPartialResults/>
                }
                {
                    selectedOption.id==3 &&  <Results />
                }
                   
        </div>
    )
}

export default Stage;