export const uploadTrackpoints = async(partialResult_id,file) => {

    setFilename(file.name);
  
    const formData = new FormData();

    formData.append('file',file);
    formData.append('partialresult',partialResult_id);
    try
    {
      setStartUpload(true)
  

      const res = await axios.post('http://localhost:5000/api/trackpoints/file',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent =>{
          setProgress(parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total)))
         
        }  
      });
      setGPXUpload(true);
      setUploadGPXSuccess(true)
      setStartUpload(false);
  


    }
    catch(err)
    {
      
      
       console.log(err)
      
     
    }
 

  }

 export  const onFileUploadHandler =async (partialResult_id,e) =>{
     

      
    if ( e.target.files.length  >0) 
    {      
        uploadTrackpoints(partialResult_id,e.target.files[0]);
      e.target.value = null;
    }
  }