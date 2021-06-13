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
  




function ElevationGraph()
{




    return (
        <div className="custom-container-80">
        <Line data={data} height={300} options={{
            maintainAspectRatio:false
        }} />
        </div>
    
    )
}


export default ElevationGraph