import React,{useEffect,useState} from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom'



export default function BreadCrumbs_() {

    const [raceName,setRaceName] = useState('');
    const [categoryName,setCategoryName] = useState('');
    const [stageName,setStageName] = useState('');

    function handleClick(page,event) {
        event.preventDefault();
       
       history.push(page)
    }
    
    const history = useHistory();


useEffect(()=>{


      
},[]);

useEffect(() => {
    return history.listen((location) => { 
       if (history.location.pathname=='/race')
       {
            var race = localStorage.getItem('race') 
            if (race)
            {
                setRaceName(JSON.parse(race).name)
            }
       }
       else    if (history.location.pathname=='/category')
       {
            var race = localStorage.getItem('race') 
            var category = localStorage.getItem('category')    
        
            if (race && category)
            {
                setRaceName(JSON.parse(race).name)
                setCategoryName(JSON.parse(category).categorytype.name)
            }
       }
       else    if (history.location.pathname=='/stage')
       {
            var race = localStorage.getItem('race') 
            var category = localStorage.getItem('category')   
            var stage = localStorage.getItem('stage')    
    
    
            if (race && category && stage)
            {
                setRaceName(JSON.parse(race).name)
                setCategoryName(JSON.parse(category).categorytype.name)
                setStageName(JSON.parse(stage).name)
            }
       }
    }) 
 },[history]) 
  return (
    <div>

                {
            history.location.pathname=='/race' && 
            <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'10px'}}>
                <Link color="inherit" href="/" onClick={handleClick.bind(this,"/races")}>
                    Races
                </Link>   
                <Link
                color="textPrimary"
                href="/components/breadcrumbs/"
                onClick={handleClick.bind(this,"/race")}
                aria-current="page"
                >
                    {raceName}
                </Link>
                </Breadcrumbs>
        }
        {
                   history.location.pathname=='/category' && 
                   <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'10px'}}>
                       <Link color="inherit" href="/" onClick={handleClick.bind(this,"/races")}>
                           Races
                       </Link>   
                       <Link
                       color="textPrimary"
                       href="/components/breadcrumbs/"
                       onClick={handleClick.bind(this,"/race")}
                       aria-current="page"
                       >
                           {raceName}
                       </Link>
                       <Link
                       color="textPrimary"
                       href="/components/breadcrumbs/"
                       onClick={handleClick.bind(this,"/category")}
                       aria-current="page"
                       >
                           {categoryName}
                       </Link>
                       </Breadcrumbs>
        }
               {
                   history.location.pathname=='/stage' && 
                   <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'10px'}}>
                       <Link color="inherit" href="/" onClick={handleClick.bind(this,"/races")}>
                           Races
                       </Link>   
                       <Link
                       color="textPrimary"
                       href="/components/breadcrumbs/"
                       onClick={handleClick.bind(this,"/race")}
                       aria-current="page"
                       >
                           {raceName}
                       </Link>
                       <Link
                       color="textPrimary"
                       href="/components/breadcrumbs/"
                       onClick={handleClick.bind(this,"/category")}
                       aria-current="page"
                       >
                           {categoryName}
                       </Link>
                       <Link
                       color="textPrimary"
                       href="/components/breadcrumbs/"
                       onClick={handleClick.bind(this,"/stage")}
                       aria-current="page"
                       >
                           {stageName}
                       </Link>
                       </Breadcrumbs>
        }


    </div>
  );
}
