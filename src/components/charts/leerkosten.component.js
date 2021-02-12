import { leerkostenLine } from './charts_config';
import React from 'react';
import {Line} from 'react-chartjs-2';

export default class Leerkosten extends React.Component {
    displayName: 'LineExample';
    state = {
    }


    render() {
        return (
            <div>
                <h2>Leerkosten</h2>
                <Line data={leerkostenLine} />
            </div>
        );
    }
};