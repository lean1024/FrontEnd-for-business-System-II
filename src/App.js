import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { translate, setLanguage, getLanguage } from 'react-multi-lang'

// Komponenten
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import KingBereich from "./components/saschas-bereich";
import XmlImport from "./components/xml-import.component";
import DispoEigenfertigung from "./components/dispo-eigenfertigung";
import Kapazitaetsplanung from "./components/kapaplanung";
import Bedarfsplanung from "./components/bedarfsplanung";
import Arbeitszeiten from './components/Arbeitszeiten';
import Bestellungen from './components/Bestellungen';
import Disposition from './components/Disposition';
import Fertigungsaufträge from './components/Fertigungsaufträge'
import Reihenfolge from './components/Reihenfolge'

import Sales1 from './components/Sales1';
import Sales2 from './components/Sales2';
import Lagerwert from "./components/charts/charts.component";
import Help from "./components/help/help.component";

import localStorage from 'local-storage';

import createXML from './components/createXML'

// helllo
class App extends Component {
    state = { 'name': 2};

    changeLang (lang) {
        setLanguage(lang)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.resetViaHotkey)
    }

    resetViaHotkey = (ev) => {
        var key;
        var isShift;
        if (window.event) {
          key = window.event.keyCode;
          isShift = !!window.event.shiftKey; // typecast to boolean
        } else {
          key = ev.which;
          isShift = !!ev.shiftKey;
        }
        if ( isShift ) {
                if (ev.key == 'r' || ev.key =='R'){
                    alert('HITTED')
                    localStorage.clear()
                    // location.reload();
                    document.getElementById('Fertigungsaufträge').style.display = 'none';
                    document.getElementById('Arbeitszeiten').style.display = 'none';
                    document.getElementById('Bestellungen').style.display = 'none';
                    document.getElementById('Reihenfolge').style.display = 'none';
                    document.getElementById('download').style.display = 'none';
                    document.getElementById('help').style.display = 'none';
                    window.location.href = 'http://localhost:3000/sales1'
            }
        }
    }


    render() {
        const navbarItemStyle = { padding: '0 5px 0 5px' };

        let arbeitszeiten = localStorage.get('arbeitszeiten');

        let displayNoneStyle = {};
        if (!arbeitszeiten) {
            displayNoneStyle['display'] = 'none'
            // displayNoneStyle['backgroundColor'] = 'red'
        }


        //notwendige Eingaben deklarieren
        return (
            <div>
                <Router >
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light " style={{
                            // marginTop: '15px',
                            border: '1px solidwhite',
                            background: '#fa9581',
                            color: 'ghostwhite',
                            positon: 'relative',
                            left: '-180px',
                            width: '1550px'
                        }}>
                            <div className="collpase navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li id='Sales1'>
                                        <Link style={{ color: 'ghostwhite' }} className="nav-link" to='/Sales1' >
                                            {this.props.t('navbar.prognosen')}
                                        </Link>
                                    </li>
                                    <li id='Sales2'>
                                        <Link style={{ color: 'ghostwhite' }} className="nav-link" to='/Sales2' >
                                            {this.props.t('navbar.lagerbestand')}
                                        </Link>
                                    </li>
                                    <li id='Fertigungsaufträge'  style={{ ...navbarItemStyle, ...displayNoneStyle }}>
                                        <Link style={{ color: 'ghostwhite' }} className="nav-link" to='/Fertigungsaufträge' >
                                            {this.props.t('navbar.fertigungsauftraege')}
                                        </Link>
                                    </li>

                                    <li id='Bestellungen'  style={{ ...navbarItemStyle, ...displayNoneStyle}}>
                                        <Link style={{ color: 'ghostwhite' }} className="nav-link" to='/Bestellungen' >
                                            {this.props.t('navbar.bestellungen')}
                                        </Link>
                                    </li>

                                    <li id='Arbeitszeiten' style={{ ...navbarItemStyle, ...displayNoneStyle }}>
                                        <Link style={{ color: 'ghostwhite' }} className="nav-link" to='/Arbeitszeiten' >
                                            {this.props.t('navbar.arbeitszeiten')}
                                        </Link>
                                    </li>

                                     <li id='Reihenfolge' style={{ ...navbarItemStyle, ...displayNoneStyle }}>
                                        <Link style={{ color: 'ghostwhite' }} className="nav-link" to='/Reihenfolge' >
                                            {this.props.t('navbar.reihenfolge')}
                                        </Link>
                                    </li>

                                    <li id='download' style={{ ...navbarItemStyle, ...displayNoneStyle }}>

                                        <Link onClick={this.create_xml} style={{ color: 'ghostwhite' }} className="nav-link" to='/download'>
                                            {this.props.t('navbar.output')}
                                        </Link>
                                    </li>

                                    <li id='help' style={{ ...navbarItemStyle, ...displayNoneStyle }}>

                                        <Link onClick={this.create_xml} style={{ color: 'ghostwhite' }} className="nav-link" to='/help'>
                                            {this.props.t('navbar.help')}
                                        </Link>
                                    </li>

                                    <li  style={{ ...navbarItemStyle, ...displayNoneStyle , paddingTop:'6px'}}>
                                        {/* <div><b>{getLanguage()}</b></div> */}
                                        {/* <br/> */}
                                        <span style={{marginRight:'5px'}}>{this.props.t('navbar.sprachen')}</span>
                                        <button style={{marginRight:'5px', background: 'white', color: 'lightslategrey'}} onClick={() => this.changeLang('de')}>DE</button>
                                        <button style={{background: 'white', color: 'lightslategrey'}} onClick={() => this.changeLang('en')}>EN</button>
                                    </li>

                                </ul>
                            </div>
                        </nav>

                        <br/>
                        <Route path="/Lagerwert" exact component={Lagerwert} />
                        <Route path="/edit/:id" component={EditTodo} />
                        <Route path="/create" component={CreateTodo} />
                        <Route path="/king" component={KingBereich} />
                        <Route path="/dispo_eigenfertigung" component={DispoEigenfertigung} />
                        <Route path="/kapaplanung" component={Kapazitaetsplanung} />
                        <Route path="/bedarfsplanung" component={Bedarfsplanung} />
                        <Route path="/xmlimport" component={XmlImport} />
                        <Route path='/Disposition' component={Disposition}/>
                        <Route path='/Bestellungen' component={Bestellungen}/>
                        <Route path='/Arbeitszeiten' component={Arbeitszeiten}/>
                        <Route path='/Fertigungsaufträge' component={Fertigungsaufträge} />
                        <Route path='/Sales1' component={Sales1} />
                        <Route path='/Sales2' component={Sales2} />
                        <Route exact path='/download' component={createXML} />
                        <Route path='/Reihenfolge' component={Reihenfolge} />
                        <Route path='/help' component={Help} />
                    </div>
                </Router>
                <createXML style={{background: 'white', height: '400px', width: '400px' }}/>
            </div>
        );
    }
}


export default translate(App);
