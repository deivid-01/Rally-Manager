import React  from 'react'
import {Line} from 'react-chartjs-2'

function ElevationGraph({elev})
{

    const config =  {
        labels:elev,  
       datasets: [
        {
          label: 'Elevation',
          data: elev,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    
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
                      maxTicksLimit: 2
                        }
                  }
               
            }
        }} />
        </div>
    
    )
}


export default ElevationGraph