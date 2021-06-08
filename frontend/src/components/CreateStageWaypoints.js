import React ,{ useEffect, useState}from "react";
import Button from '@material-ui/core/Button';
import CreateStage from './CreateStage'
import UploadWaypoints from './UploadWaypoints'
function CreateStageWaypoints(props){

    const [showStage,setShowStage] = useState(true)
    const [showWaypoints,setShowWaypoints] = useState(false)
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
    const [indexConfigEnabled,setindexConfigEnabled]= useState(0)
    
    const handleContinue = () => {
        if (indexConfigEnabled==0)
        {
            setShowStage(false)
            setShowWaypoints(true)
            setindexConfigEnabled(1)
        }
        else
        {
            setShowStage(true)
            setShowWaypoints(false)
            setindexConfigEnabled(0)
        }
       

       
    }

    return (
        <div>
             <div >
            {
                (showStage) ? <CreateStage></CreateStage>
             : (showWaypoints) ? <UploadWaypoints></UploadWaypoints>
                : <h1>Stage created</h1>
            }
            </div>
        <br></br>
    

        </div>
    )
}

export default CreateStageWaypoints;