
import axios from 'axios';

const BASE_URL= 'http://localhost:5000/api/partialresults/'


 export const deletePartialResult = async (partialResult_id) => {

      try
      {
        await  axios.delete(BASE_URL+partialResult_id);
       

      }
      catch(err)
      {
        console.log(err);
      }

    }



export const updatePartialResult = async (partialResult) => {

 
    try
    {
      await axios.put(BASE_URL+partialResult.id,
                                  partialResult);
      console.log('Partial results updated');

    }
    catch(err)
    {
 
        console.log(err);
     
    }
    
  }
