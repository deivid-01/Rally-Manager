import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import Collapse from '@material-ui/core/Collapse';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));



export default function IconBreadcrumbs({actualPage}) {
    const history = useHistory();

    function handleClick(event) {
        event.preventDefault();
        history.push('/categories')

        
      }

  const classes = useStyles();

  const pages = ['Race','Stage','Category']

  return (
    <Breadcrumbs aria-label="breadcrumb">
  
       {
       (!actualPage.localeCompare("Race"))?
       <Typography color="textPrimary" className={classes.link}>
       <GrainIcon className={classes.icon} />
          {actualPage}
        </Typography>
        :
        <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
        <HomeIcon className={classes.icon} />
        {actualPage}
        </Link>
        }
        {
       (!actualPage.localeCompare("Race"))?
       <h1></h1>
        :
        <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
        <HomeIcon className={classes.icon} />
        Categories
        </Link>
        }
        {
              (!actualPage.localeCompare("Race"))?
              <h1></h1>
              :
              <Link onClick={handleClick}  href="/"  color="inherit" className={classes.link}>
              <GrainIcon className={classes.icon} />
                 Stages
            </Link>
        }


    </Breadcrumbs>
  );
}
