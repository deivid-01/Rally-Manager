import axios from 'axios';
const BASE_URL= 'http://localhost:5000/api/categories';


export const getCategory= async(category_id)=>{
  
  
  try
  {
    const  res =await  axios.get(`${BASE_URL}/${category_id}`)
    return   res.data
    
  }
  catch(err)
  {
    console.log(err)
  }

}