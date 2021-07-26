import React ,{ useEffect, useState}from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UploadWaypoints from './UploadWaypoints'
import Button from '@material-ui/core/Button';
import axios from "axios";

function CreateStage(props){
    
    const postURL = "http://localhost:5000/api/stages";
  
    const [options, setOptions ] = useState([ ])
    const [ stageData, setStageData] = useState({
        name:'',
        categories:[]
      });

    const [showStage,setShowStage] = useState(true)
    const [btnconfig,setBtnconfig] = useState([
        {
            text : 'Continue',
            style: 'text-dark bg-warning'
        },
        {
            text : 'Cancel',
            style: 'text-light bg-danger'
        },
    ])
    const [stageInfo,setStageInfo] = useState(null)
    
    const [indexConfigEnabled,setindexConfigEnabled]= useState(0)

   
    
    const loadNextPage = (stage_id) => {
      
              setStageInfo({
                  name: stageData.name,
                  id:stage_id
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

    const fetchingData = () => {
      var raceData = window.localStorage.getItem('race');
      if (raceData)
      {
          raceData =  JSON.parse(raceData)
          loadOptions(raceData.categories)
      }
    }

      useEffect(()=>{
        fetchingData()
      
      }

    
      ,[])

      useEffect(()=>{
        if (stageInfo)
        {
          setShowStage(false)
      
          setindexConfigEnabled(1)
        }
       

      },[stageInfo])
      const handleContinue = () => {
        if (indexConfigEnabled==1)
        {
           
           //deleteStage() 
           setStageData({ name:'',
           categories:[]
            })
          setStageInfo(null)
          setOptions([])
          setShowStage(true)
        
          setindexConfigEnabled(0)
          fetchingData()
        }
        else //Cancel
        {
          setActiveCategories()
        }

         
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
          {
            (showStage)?
          
                <div>
                  <br></br>
                  <div className="custom-align">
                    <input
                                onChange= {handleInputChange}
                                type="text"
                                placeholder="Enter stage  name"
                                style={{outline:0}}
                                className="text-center  big-title border-0 border-bottom"
                                name="name"
                            ></input>
                
                  </div>
                  <br></br>
                  <div className="custom-align">
                  <p>Select categories for this stage</p>
                  </div>
                      <br></br>
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
                                color="default"
                            />
                            }
                            label={opt.name}
                        />
                        )
                      
                        }
                      
                    </FormGroup>
                  </div>


                  <br></br>
                  </div>
                  :
                  <UploadWaypoints stageInfo={stageInfo} ></UploadWaypoints>
            }
            <br></br>
            <div className="custom-align">
            <Button  
            variant="contained"
                  style={{textTransform: 'none'}}
                  onClick = {handleContinue}
                  color="primary"
                  type="submit"
                  className={btnconfig[indexConfigEnabled].style}
                  >
                     {btnconfig[indexConfigEnabled].text}
                    </Button> 
                    </div>
        </div>
    )
}

export default CreateStage;