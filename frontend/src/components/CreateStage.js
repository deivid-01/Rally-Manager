import React ,{ useEffect, useState}from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import {useHistory} from 'react-router-dom'
function CreateStage(props){

    const postURL = "http://localhost:5000/api/stages";
    const nextPage = "/waypointsupload";
    const [options, setOptions ] = useState([ ])
    const [ stageData, setStageData] = useState({
        name:'',
        categories:[]
      });

    const history   = useHistory();
    
    const loadNextPage = (stage_id) => {
        history.push({
            pathname : '/waypointsupload',
            stageInfo:{
                name: stageData.name,
                id:stage_id
            }
        })
    }
    
    const handleChange = index => event => {

        let newOptions = [...options]
        newOptions[index].active = event.target.checked;
        setOptions(newOptions)
      }
    
     
    const handleInputChange = (e) =>{
        setStageData({
          ...stageData,
          [e.target.name]:e.target.value
        })
      }


      useEffect(()=>{
        var raceData = window.localStorage.getItem('race');
        if (raceData)
        {
            raceData =  JSON.parse(raceData)
            loadOptions(raceData.categories)
        }
      
      }

    
      ,[])
      const handleContinue = () => {
          //Create Stage
          setActiveCategories()
      }

      const setActiveCategories = () => {
        
       setStageData({...stageData,
        categories: setCategoriesID()
       })
        }

      const setCategoriesID = () => {
        
        var ids_withkeys = (options.filter(opt => opt.active)).map(op =>({
            _id: op.id
        }))

        var ids = []

        ids_withkeys.forEach(id =>{
            ids.push(id._id)
        })
        return ids

      }
       

      const loadOptions = (options) => {

      setOptions( options.map(opt => ({
           id: opt._id,
           name : opt.categorytype.name,
           active:false
        })))
      }

      useEffect(()=>{
     

        if  ( stageData.categories.length > 0 )
        {
            createStage();
        }
      }, [stageData])

      const createStage =async () => {

        //Check stage creation
        try{
            var res = await axios.post(postURL,stageData)
            
            loadNextPage(res.data.id);
        }
        catch ( err)
        {
            console.log(err)
        }

      }


    return (
        <div>
            <br></br>
            <div className="custom-align">
            <input
                        onChange= {handleInputChange}
                        type="text"
                        placeholder="Enter stage name"
                        className="text-center  big-title no-border"
                        name="name"
                    ></input>
            </div>
            <br></br>
                <p>Select categories for this stage</p>
            <div className="custom-align">
           
            <FormGroup row>
                {
                options.map((opt,i) =>
                    <FormControlLabel
                    key = {opt.id}
                    control={
                    <Checkbox
                        checked={opt.active}
                        onChange={handleChange(i)}
                        name={opt.name}
                        color="primary"
                    />
                    }
                    label={opt.name}
                />
                )
               
}
               
    </FormGroup>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="custom-align" >
                <button
                onClick = {handleContinue}
                className="btn btn-secondary "
                >Continue</button>
            </div>
         
        </div>
    )
}

export default CreateStage;