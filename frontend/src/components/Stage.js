import React ,{ useEffect, useState}from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MapView from './MapView'
import Results from './Results'

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
            setStageData(JSON.parse(stage));
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
                    <div className='custom-align'>
                    <MapView></MapView>
                    </div>
                        :(selectedOption.id==2) ? 
                            <Results></Results>
                            :<Results ></Results>
                }

        </div>
    )
}

export default Stage;