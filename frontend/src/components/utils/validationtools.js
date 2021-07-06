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
