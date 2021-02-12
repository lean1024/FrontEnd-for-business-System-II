import React from 'react';
import store from 'store';

const lagerwert1 = store.get('periode1 Lagerwert');
const lagerwert2 = store.get('periode2 Lagerwert');
const lagerwert3 = store.get('periode3 Lagerwert');
const lagerwert4 = store.get('periode4 Lagerwert');
const lagerwert5 = store.get('periode5 Lagerwert');
const lagerwert6 = store.get('periode6 Lagerwert');
const lagerwert7 = store.get('periode7 Lagerwert');

const gewinn1 = store.get('periode1 Gewinn');
const gewinn2 = store.get('periode2 Gewinn');
const gewinn3 = store.get('periode3 Gewinn');
const gewinn4 = store.get('periode4 Gewinn');
const gewinn5 = store.get('periode5 Gewinn');
const gewinn6 = store.get('periode6 Gewinn');
const gewinn7 = store.get('periode7 Gewinn');

const leerzeitkosten1 = store.get('periode1 Leerzeitkosten');
const leerzeitkosten2 = store.get('periode2 Leerzeitkosten');
const leerzeitkosten3 = store.get('periode3 Leerzeitkosten');
const leerzeitkosten4 = store.get('periode4 Leerzeitkosten');
const leerzeitkosten5 = store.get('periode5 Leerzeitkosten');
const leerzeitkosten6 = store.get('periode6 Leerzeitkosten');
const leerzeitkosten7 = store.get('periode7 Leerzeitkosten');


export const lagerwertLine = {
    labels: ['Periode 1', 'Periode 2', 'Periode 3', 'Periode 4', 'Periode 5', 'Periode 6', 'Periode 7'],
    datasets: [
        {
            label: 'Lagerwert',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1, //Stellen bei den Werten
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [
                lagerwert1,
                lagerwert2,
                lagerwert3,
                lagerwert4,
                lagerwert5,
                lagerwert6,
                lagerwert7
            ]
        },
    ]
}

export const gewinnLine = {
    labels: ['Periode 1', 'Periode 2', 'Periode 3', 'Periode 4', 'Periode 5', 'Periode 6', 'Periode 7'],
    datasets: [
        {
            label: 'Gewinn',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(102,255,178,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1, //Stellen bei den Werten
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [
                gewinn1,
                gewinn2,
                gewinn3,
                gewinn4,
                gewinn5,
                gewinn6,
                gewinn7
            ]
        },
    ]
}

export const leerkostenLine = {
    labels: ['Periode 1', 'Periode 2', 'Periode 3', 'Periode 4', 'Periode 5', 'Periode 6', 'Periode 7'],
    datasets: [
        {
            label: 'Leerkosten',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgb(192,8,0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(0,0,0)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1, //Stellen bei den Werten
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [
                leerzeitkosten1,
                leerzeitkosten2,
                leerzeitkosten3,
                leerzeitkosten4,
                leerzeitkosten5,
                leerzeitkosten6,
                leerzeitkosten7
            ]
        },
    ]
}


