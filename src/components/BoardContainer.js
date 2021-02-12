import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Arbeitszeiten from './Arbeitszeiten';
import Bestellungen from './Bestellungen';
import Disposition from './Disposition';

class BoardContainer  extends Component {

    // propTypes a.k.a welcher Typ

    // lifecycle methods
    
    // Funktionen
        // update = () => {...}
        // sendFormular = () => {...}

    render() {

    // props ( statische Variablen ) und state ( dynamische Variablen ) müssen innerhalb von render zugewiesen werden. 
        // const {
        //   groupId,
        //   listType,
        //   items,
        //   readOnly,
        //   selectedItems,
        //   toggleSelection,
        //   showCheckboxes,
        //   itemComponent,
        // } = this.props;

    return (
        <div>
            <Disposition/>
            <Bestellungen/>
            <Arbeitszeiten/>
        </div>
    )}
}

export default BoardContainer;