import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import Arbeitszeiten from './Arbeitszeiten';
import Bestellungen from './Bestellungen';
import Disposition from './Disposition';
import Fertigungsaufträge from './Fertigungsaufträge'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class Routes extends Component {

    // propTypes a.k.a welcher Typ

    // lifecycle methods
    
    // Funktionen
        // update = () => {...}
        // sendFormular = () => {...}

 

    render() {

    return ( 
        <div>
            <BrowserRouter>
            <Switch> 
                <Route exact path='/Disposition' component={Disposition}/>
                <Route exact path='/Bestellungen' component={Bestellungen}/>
                <Route exact path='/Arbeitszeiten' component={Arbeitszeiten}/>
                <Route exact path='/Fertigungsaufträge' component={Fertigungsaufträge} />
            </Switch>
            </BrowserRouter>
        </div>
    )}
}

export default Routes;