import React ,{ useEffect, useState}from "react";
import axios from 'axios';
import Card from './Card'
import PropTypes from 'prop-types'

function Cards({datas,type,url,next_URL}){
    console.log(datas)
    const [data, setData] = useState([{id:900,title:'Title'}]);
    const getData = ()=>{
     
         axios.get(url).then(res =>{
            const resData = res.data;
            // console.log(racesData)
            var cardss = []
            resData.forEach((item,i)=>{
                var card=  {}
                card.id= i;
                console.log(url);
          
                if (! type.localeCompare("Category"))
                {
                    card.title = item.categorytype.name
                }
                else if ( !type.localeCompare("Race") )
                {
                    
                    card.title=item.name;
                }
                else if ( !type.localeCompare("Stage") )
                {        
                    card.title=item.name;
                }
              
                cardss.push(card)
                  
             })
             setData(cardss);   
    }) 
  
          
}
    const setFetchData = ()=>{

        var cardss = []
        datas.forEach((item)=>{
            var card =  {}
            card.id = item._id
            card.title = item.name
            cardss.push(card)
        })  
        setData(cardss)

    }

    useEffect(()=>{
        if (datas== null)
            getData();
        else
        {
            setFetchData(datas)
        }
    },[])
 

    
    return (
        <div className="container">
            <div className="row">
                {
                        data.map(card =>(
                        <div className="col-md-4" key={card.id}>      
                            <Card type={type} title={card.title} url={next_URL}></Card>
                            </div>
                    ))

                }                      
            </div>
        </div>
    )
}

Cards.propTypes = {
    next_URL: PropTypes.string,
    url: PropTypes.string
}


export default Cards;