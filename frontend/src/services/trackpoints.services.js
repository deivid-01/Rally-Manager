import axios from 'axios'

export const uploadTrackpoints = async(partialResult_id,file,onSetProgress) => {

  
  
    const formData = new FormData();

    formData.append('file',file);
    formData.append('partialresult',partialResult_id);
    try
    {
      const res = await axios.post('http://localhost:5000/api/trackpoints/file',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent =>{
          onSetProgress(progressEvent.loaded,progressEvent.total)
         
        }  
      });

  


    }
    catch(err)
    {
      
      
       console.log(err)
      
     
    }
 

  }

