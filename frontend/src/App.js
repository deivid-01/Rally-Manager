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

function App(){
    
    
    return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/main" />
        <Route path="/main" render={ (props) => <UploadWayPoints { ...props } /> } />
        <Route path="/races" render={ (props) => <Races { ...props } /> } />
        <Route path="/categories" render={ (props) => <Categories { ...props } /> } />
        <Route path="/stages" render={ (props) => <Stages { ...props } /> } />
        <Route path="/login" render={ (props) => <Login { ...props } /> } />
        <Route path="/gpxupload" render={ (props) => <UploadGPX /> }/> 
        {/* Redirect unhandled routes */}
        <Route>
          <Redirect to="/main" />
        </Route>
      </Switch>
    </BrowserRouter>
    )
}

export default App;