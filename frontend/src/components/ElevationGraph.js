import React, {useEffect,useState} from 'react'
import {Line} from 'react-chartjs-2'

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Elevation',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  




function ElevationGraph({elev})
{

    const [elevations,setElevations] = useState([])

    const config =  {
        labels:elevations,  
       datasets: [
        {
          label: 'Elevation',
          data: elevations,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    
    useEffect(()=>{
      if(elev)
      {
        setElevations(elev)
      }
    },[])

    return (
        <div className="custom-container-80">
        <Line data={config} height={300} 
            options={{
              maintainAspectRatio:false,
              scales: {
                y: {
                    min: 500.5,
                    max: 2500
                },
                x:{
                  ticks: {
                    autoSkip: true,
                      maxTicksLimit: 3
                        }
                  }
               
            }
        }} />
        </div>
    
    )
}


export default ElevationGraph