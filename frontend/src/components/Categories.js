import { checkPropTypes } from "prop-types";
import React from "react";


import Cards from './Cards'

function Categories(props){

    const type='Category'
    const next_URL = "/stages"
    
    const url = "http://localhost:5000/api/categories"
    return (
        <div>
            <br></br>
            <div><h1 className="text-center">Categories</h1> </div>
            <br></br>
            <Cards datas = {props.location.data} type={type}url={url} next_URL={next_URL}></Cards>
        </div>
    )
}

export default Categories;