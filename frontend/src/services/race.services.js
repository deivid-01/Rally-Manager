import axios from 'axios';
const BASE_URL= 'http://localhost:5000/api/races';

export const getRaces = async(token)=>{
  try
  {
      const config = {
          headers:{
           Authorization: `Bearer ${token}`
          }
        }

      var res = await  axios.get(BASE_URL,config)
      return res.data;
  }
  catch(err)
  {
      console.log(err)
  }
}


export const getRace= async(race_id)=>{
  
  try
  {
    const  res =await  axios.get(`${BASE_URL}/${race_id}`)
    return   res.data
    
  }
  catch(err)
  {
    console.log(err)
  }

}

export const deleteRace= async(race_id)=>{
  
  try
  {
    const  res =await  axios.delete(`${BASE_URL}/${race_id}`)
    return   res.data
    
  }
  catch(err)
  {
    console.log(err)
  }

}