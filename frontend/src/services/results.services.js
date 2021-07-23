import axios from "axios";


const BASE_URL ='http://localhost:5000/api/results';


export const getResults = async (stage_id,category_id) => {
    try
    {
     
        const res = await axios.get(`${BASE_URL}/stage/${stage_id}/${category_id}`)
        
        return res.data;
    }
    catch(err)
    {
        console.log(err);
    }

  }

  export const getResultsByCategory = async (category_id) => {
    try
    {
        const res = await axios.get(`${BASE_URL}/category/${category_id}`)   
        return res.data;
    }
    catch(err)
    {
        console.log(err);
    }
  }


