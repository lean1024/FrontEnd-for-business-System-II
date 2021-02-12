import { gewinnLine } from './charts_config';
import React from 'react';
import {Line} from 'react-chartjs-2';

export default class Gewinn extends React.Component {
    displayName: "LineExample";
    state = {
    }


    render() {
        return (
            <div>
                <h2>Gewinn Daten</h2>
                <Line data={gewinnLine} />
            </div>
        );
    }
};