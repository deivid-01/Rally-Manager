export  const HHMMSSToHours = (str)=>{
  
    
    
    try
    {
      var units = str.split(':')
      var total = 0;
      if( units.length == 3 )
      {
        units.forEach((unit,i)=>
        {
          total+=parseFloat(unit)/Math.pow(60,i);
        })
      }
      
      
      return total;
    }
    catch(err)
    {
      return 0;
    }
    
}

export const ajustUnitFormat = (unit)=>{
    return (unit<10)?"0"+String(unit):String(unit)
   } 

export const hoursToHHMMSS = (hours) => {

        var HH = Math.floor(hours)
        var num = (hours-HH)*60
        var MM = Math.floor(num)
        var SS = Math.floor ((num-MM)*60)
      
      
        return ajustUnitFormat(HH)+":"+
               ajustUnitFormat(MM)+":"+
               ajustUnitFormat(SS)

      
      
      }

export const validateHHMMSSFormat = (t) => {
  try
  {
    var units = t.split(':')
    if(units.length !=3)
      return false;
    var i;
      for( i = 0;i<units.length;i++)
    {
    
      if (units[i].length!=2)
        return false

      if (! /^\d+$/.test(parseInt(units[i])))
      {
          return false
      }
      
    }

    return true
  }
  catch(err)
  {
    return false;
  }

  
}
    