import { gewinnLine, lagerwertLine, leerkostenLine} from './charts_config';
import React from 'react';
import {Line} from 'react-chartjs-2';

export default class Lagerwert extends React.Component {
    displayName: 'LineExample';
    state = {
}


    render() {
        return (
            <div>
                <h2><center> Dashboards </center></h2>
                <p></p>
                <div style={{background: 'ghostwhite', padding: '5px', marginBottom: '50px', borderRadius: '5px', border: '2px solid black'}}>
                    <h3>Lagerwert</h3>
                        <Line data={lagerwertLine} />

                </div>
                <p></p>
                <div  style={{background: 'ghostwhite', padding: '5px', marginBottom: '50px', borderRadius: '5px', border: '2px solid black'}}>
                <h3>Gewinn</h3>
                        <Line data={gewinnLine} />

                </div>
                 
                <p></p>
                <div style={{background: 'ghostwhite', padding: '5px', marginBottom: '50px', borderRadius: '5px', border: '2px solid black'}}>
                <h3>Leerzeitkosten</h3>
                        <Line data={leerkostenLine} />
                </div>
                 
            </div>
        );
    }
};





