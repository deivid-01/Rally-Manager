import UploadWayPoints from './components/UploadWaypoints'
import UploadGPX from './components/UploadGPX'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';

function App(){
    
    
    return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/main" />
        <Route path="/main" render={ (props) => <UploadWayPoints { ...props } /> } />
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