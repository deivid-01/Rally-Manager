import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import Races from './components/Races';
import Race from './components/Race';
import Category from './components/Category';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateRace from './components/CreateRace';
import Stage from './components/Stage';
import NavBar from './components/NavBar/NavBar';
import BreadCrumbs_ from './components/BreadCrumbs_';

function App(){
    
    
    return (
      <div>
        
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/races" render={ (props) =>
          <div>
            <br></br>
            <BreadCrumbs_ {...props} />
          <Races { ...props } /> 
          </div>} />
        <Route path="/race" render={ (props) => 
                 <div>
                 <br></br>
                 <BreadCrumbs_ {...props} />
                <Race { ...props } /> 
          </div>} />
        <Route path="/category" render={ (props) => 
                 <div>
                 <br></br>
               <BreadCrumbs_ {...props} />
        <Category { ...props } />
        </div> 
        } />
        <Route path="/login" render={ (props) => <Login { ...props } /> } />
        <Route path="/signup" render={ (props) => <Signup { ...props } /> } />
        <Route path="/createrace" render={ (props) => <CreateRace /> }/> 
        <Route path="/stage" render={ (props) =>
                  <div>
                  <br></br>
                  <BreadCrumbs_ {...props} />
               <Stage  {...props}/>
          </div> }/> 
        {/* Redirect unhandled routes */}
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
    )
}

export default App;