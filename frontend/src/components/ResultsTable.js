import React, {useState,useEffect} from "react";
import {useTable} from 'react-table';
import axios from 'axios';

import './table.css'


export const ResultsTable = ({stageID}) => {

  const getResults = async ()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/stages/'+stageID)
      configureData(res.data.partialresults)
    } catch (error) {
      console.log(error)
    }
  }

  const configureData =(partialresults)=>{
    var newData = []
    partialresults.forEach(element => {
      var item = {}
      item.id = element._id
      item.start_time = element.start_time
      item.arrival_time = element.arrival_time
      item.neutralization = element.neutralization
      item.penalization = element.penalization
      newData.push(item)
    });
    console.log(newData)
    setData(newData)
  }

  const [columns,setColumns] = useState([
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Start time',
      accessor: 'start_time'
    },
    {
      Header: 'Arrival Time',
      accessor: 'arrival_time'
    },
    {
      Header: 'Neutralization',
      accessor: 'neutralization'
    },
    {
      Header: 'Penalization',
      accessor: 'penalization'
    },
  ])
  const [data,setData]=useState([{
    id: 1,
    first_name: "Dena",
    last_name: "Keeble",
    category: "Cruze",
    time: "3:43:45.000",
    penalization: "1:12:43.000",
    waypoint_Missed: 1
  }])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })
  
  useEffect(()=>{
    getResults();
  },[])

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
    
