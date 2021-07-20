import UploadWayPoints from './components/UploadWaypoints'
import UploadGPX from './components/UploadGPX'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import Races from './components/Races';
import Categories from './components/Categories';
import Stages from './components/Stages';
import Login from './components/Login';
import Signup from './components/Signup';
import Results from './components/Results';
import CreateRace from './components/CreateRace';
import CreateStage from './components/CreateStage';
import Waypoints from './components/Waypoints/Waypoints'
import Stage from './components/Stage';


function App(){
    
    
    return (
    <BrowserRouter>
      
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/races" render={ (props) => <Races { ...props } /> } />
        <Route path="/categories" render={ (props) => <Categories { ...props } /> } />
        <Route path="/stages" render={ (props) => <Stages { ...props } /> } />
        <Route path="/login" render={ (props) => <Login { ...props } /> } />
        <Route path="/signup" render={ (props) => <Signup { ...props } /> } />
        <Route path="/gpxupload" render={ (props) => <UploadGPX /> }/> 
        <Route path="/results" render={ (props) => <Results /> }/> 
        <Route path="/createrace" render={ (props) => <CreateRace /> }/> 
        <Route path="/map" render={ (props) => <Waypoints /> }/> 
        <Route path="/stage" render={ (props) => <Stage /> }/> 
        {/* Redirect unhandled routes */}
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
    )
}

export default App;