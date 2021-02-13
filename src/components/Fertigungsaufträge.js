// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import localStorage from 'local-storage';
import { Button, input } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { translate } from 'react-multi-lang'

import Sales2 from './Sales2';


class Fertigungsaufträge extends Component {
	state = {
        displayProdukt1 : false,
        displayProdukt2 : false,
        displayProdukt3 : false,
        epsProdukt1Angewand: false,
        epsProdukt2Angewand: false,
        epsProdukt3Angewand: false,
        changeDetected: false,
        berrechnungEPSAnzeigen: false,
    }

    constructor(props) {
        super(props);
        this.child = React.createRef();
      }

    

	handleChange = (evt) => {
        this.setState({ changeDetected: true})
        let { fertigungsaufträge } = this.state;
        let fertigungsaufträgeX = localStorage.get('fertigungsaufträge1')

        let fertigungsaufträge1;
        if ( fertigungsaufträgeX ) fertigungsaufträge1 = fertigungsaufträgeX
        if ( !fertigungsaufträgeX) fertigungsaufträge1 = fertigungsaufträge

        var p1_verrechnung = {
            1:[26,51,16,17,50,4,10,49,7,13,18],
            51:[16,17,50,4,10,49,7,13,18],
            50:[4,10,49,7,13,18],
            49:[7,13,18],
            13:[],18:[],
            10:[],
            7:[],
            4:[],
            16:[],
            17:[],
            26:[],
        }

        var p2_verrechnung = {2:[26,56,16,17,55,5,11,54,8,14,19],
            26:[],56:[16,17,55,5,11,54,8,14,19],
        16:[],17:[],55:[5,11,54,8,14,19],
        5:[],11:[],54:[8,14,19],
        8:[],14:[],19:[]}
        var p3_verrechnung = {3:[26,31,16,17,30,6,12,29,9,15,20],
            26:[],31:[16,17,30,6,12,29,9,15,20],
            16:[],17:[],30:[6,12,29,9,15,20],
            6:[],12:[],29:[9,15,20],
            9:[],15:[],20:[]}


        let product_number = evt.target.name[0]
        let product_name = evt.target.name.slice(2,evt.target.name.length)
        let product_entry = evt.target.name.slice(7,evt.target.name.length)

        // ################################################################# wenn von p1 weniger produziert werden, dann von allen abhängigen auch nicht
        if (product_number == 1) {
            p1_verrechnung[product_entry].map( entry => {
                if (fertigungsaufträge1[1][entry]) {
                    let differenze = fertigungsaufträge1[1][product_entry][`menge${product_entry}`] - evt.target.value
                    console.log('entry', entry)
                    console.log(fertigungsaufträge1[1][entry][`menge${entry}`])
                    console.log(differenze)
                    fertigungsaufträge1[1][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[1][entry][`menge${entry}`] - differenze )
                    // if ( fertigungsaufträge1[1][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[1][entry][`menge${entry}`] = 0

                }
            })
        }

        if (product_number == 2) {
            p2_verrechnung[product_entry].map( entry => {
                if (fertigungsaufträge1[2][entry]) {
                    let differenze = fertigungsaufträge1[2][product_entry][`menge${product_entry}`] - evt.target.value
                    console.log('entry', entry)
                    console.log(fertigungsaufträge1[2][entry][`menge${entry}`])
                    console.log(differenze)
                    fertigungsaufträge1[2][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[2][entry][`menge${entry}`] - differenze )
                    // if ( fertigungsaufträge1[2][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[2][entry][`menge${entry}`] = 0

                }
            })
        }

        if (product_number == 3) {
            p3_verrechnung[product_entry].map( entry => {
                if (fertigungsaufträge1[3][entry]) {
                    let differenze = fertigungsaufträge1[3][product_entry][`menge${product_entry}`] - evt.target.value
                    console.log('entry', entry)
                    console.log(fertigungsaufträge1[3][entry][`menge${entry}`])
                    console.log(differenze)
                    fertigungsaufträge1[3][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[3][entry][`menge${entry}`] - differenze )
                    // if ( fertigungsaufträge1[3][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[3][entry][`menge${entry}`] = 0

                }
            })
        }


        //#####################################################################


        let dispo_dict = localStorage.get('super_dispo_dict')
        console.log(fertigungsaufträge1)

		// fertigungsaufträge[evt.target.name]= evt.target.value;
		// this.setState({ fertigungsaufträge: fertigungsaufträge })
        // localStorage.set('fertigungsaufträge', fertigungsaufträge);
        let target_ = evt.target;
        if ( isNaN ( evt.target.value)) {
            evt.target.style.outline = '3px solid red';
            setTimeout(() => {
                target_.style.outline = '2px solid rgb(250, 149, 129)'
            },300)
        }

        //1_menge1




        let fertigungsaufträge_normales_dispo_dict = localStorage.get('fertigungsaufträge')
        let better_engpass = localStorage.get('better_engpass')
        console.log('hello2')
        console.log(better_engpass)

        console.log('bbb_1',fertigungsaufträge_normales_dispo_dict)

            Object.keys(better_engpass[product_number]).map (innerNumber => {
                console.log('innerNumber', innerNumber)
                console.log('product_entry', product_entry)
                if (innerNumber == product_entry) {
                    better_engpass[product_number][innerNumber] = undefined;
                    localStorage.set('better_engpass',better_engpass)
                }
            })

        if ( !isNaN(evt.target.value) )
        {
            Object.keys(fertigungsaufträge1[product_number]).map( number => {
                // number sind 21, 22, 23 , 24, 25
                Object.keys(fertigungsaufträge1[product_number][number]).map( entry => {
                    if (product_name === entry ) {
                        fertigungsaufträge1[product_number][number][entry] = parseInt(evt.target.value);
                        fertigungsaufträge_normales_dispo_dict[number][entry] = parseInt(evt.target.value);

                        if ( product_name === 'menge26') {
                               let summe = fertigungsaufträge1[1][26]['menge26'] + fertigungsaufträge1[2][26]['menge26'] +fertigungsaufträge1[3][26]['menge26']

                               console.log(summe)
                               fertigungsaufträge_normales_dispo_dict[26]['menge26'] = summe

						}

                        if ( product_name === 'menge17') {
                               let summe = fertigungsaufträge1[1][17]['menge17'] + fertigungsaufträge1[2][17]['menge17'] +fertigungsaufträge1[3][17]['menge17']
                               fertigungsaufträge_normales_dispo_dict[17]['menge17'] = summe
						}

                        if ( product_name === 'menge16') {
                               let summe = fertigungsaufträge1[1][16]['menge16'] + fertigungsaufträge1[2][16]['menge16'] + fertigungsaufträge1[3][16]['menge16']
                               fertigungsaufträge_normales_dispo_dict[16]['menge16'] = summe
						}


                    }
                })


            })
            console.log('bbb_',fertigungsaufträge_normales_dispo_dict)

            // Änderungen an p1 sollen in allen Erzeugnissen wiedergespiegelt werden. Auch im normales_dispi_dict
            // fertigungsaufträge_normales_dispo_dict[number][entry]      fertigungsaufträge_normales_dispo_dict[number][entry]
            Object.keys(fertigungsaufträge1).map( product => {

                Object.keys(fertigungsaufträge1[product]).map( number => {
                    // number sind 21, 22, 23 , 24, 25
                    Object.keys(fertigungsaufträge1[product][number]).map( entry => {
                        if (product_name !== ('menge26' && 'menge17' && 'menge16') ) {
                            fertigungsaufträge_normales_dispo_dict[number][`menge${number}`] = parseInt( fertigungsaufträge1[product][number][entry])


                        if ( product_name === 'menge26') {
                            let summe = fertigungsaufträge1[1][26]['menge26'] + fertigungsaufträge1[2][26]['menge26'] +fertigungsaufträge1[3][26]['menge26']

                            console.log(summe)
                            fertigungsaufträge_normales_dispo_dict[26]['menge26'] = summe

						}

                        if ( product_name === 'menge17') {
                            let summe = fertigungsaufträge1[1][17]['menge17'] + fertigungsaufträge1[2][17]['menge17'] +fertigungsaufträge1[3][17]['menge17']
                            fertigungsaufträge_normales_dispo_dict[17]['menge17'] = summe
                            }

                            if ( product_name === 'menge16') {
                                let summe = fertigungsaufträge1[1][16]['menge16'] + fertigungsaufträge1[2][16]['menge16'] + fertigungsaufträge1[3][16]['menge16']
                                fertigungsaufträge_normales_dispo_dict[16]['menge16'] = summe
                            }


                        }
                    })


                })
            })

        console.log('goal', fertigungsaufträge_normales_dispo_dict)

        // 21.01
        this.setÜbersetzung(fertigungsaufträge1);

        this.setState({
            fertigungsaufträge: fertigungsaufträge1
        })
        localStorage.set('fertigungsaufträge1', fertigungsaufträge1);
        }
        localStorage.set('fertigungsaufträge', fertigungsaufträge_normales_dispo_dict)  // hier?

        let engpasssteuerung_dispo_dict = localStorage.get('sascha_engpasssteuerung')
        console.log('09.01')
        console.log('fertigungsaufträge_normales_dispo_dict')
        console.log(fertigungsaufträge_normales_dispo_dict)
        console.log('fertigungsaufträge1')
        console.log(fertigungsaufträge1)
        console.log('engpasssteuerung_dispo_dict')
        console.log(engpasssteuerung_dispo_dict)



    }



    handleFocus = e => {
		// e.target.style.outline = '3px solid rgb(250, 149, 129)'
	}

	handleBlur = e => {
        // e.target.style.outline = ''
        // this.forceUpdate()
        // this.setState({fertigungsaufträge1: this.state.fertigungsaufträge1})
    }

    remove_negatives_to_zero_from = (big_fertigungsaufträge_original_this_view) => {
        Object.keys(big_fertigungsaufträge_original_this_view).map( number => {
            if (big_fertigungsaufträge_original_this_view[number][`menge${number}`] < 0 ) {
                big_fertigungsaufträge_original_this_view[number][`menge${number}`] = 0
            }
        })
        return big_fertigungsaufträge_original_this_view
    }

    componentWillUnmount(){
		document.getElementById('Fertigungsaufträge').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')

        // 19.01
        let list_Reihenfolge = localStorage.get('list_Reihenfolge')     // Array of JSON in Reihenfolge
        let fertigungsaufträge = localStorage.get('fertigungsaufträge');
        let fertigungsaufträge1_original = localStorage.get('fertigungsaufträge_original_this_view')
        let big_fertigungsaufträge_original_this_view = localStorage.get('big_fertigungsaufträge_original_this_view')  // ZUSAMMENFASSENDED DICT
        console.log('big_fertigungsaufträge_original_this_view', big_fertigungsaufträge_original_this_view)

        big_fertigungsaufträge_original_this_view = this.remove_negatives_to_zero_from(big_fertigungsaufträge_original_this_view)
        console.log('big_fertigungsaufträge_original_this_view', big_fertigungsaufträge_original_this_view)

        if(list_Reihenfolge && list_Reihenfolge.includes('undefined')) {
            list_Reihenfolge = undefined
        }
        // list_Reihenfolge && alert(list_Reihenfolge)
        if (list_Reihenfolge) {
            // console.log('list_Reihenfolge',list_Reihenfolge)

            Object.keys(big_fertigungsaufträge_original_this_view).map( number => {
                // 1000     =  10000  - 9000
                console.log(number)
                if( number ==4 ) console.log(fertigungsaufträge)
                let differenze = big_fertigungsaufträge_original_this_view[number][`menge${number}`] - (
                    fertigungsaufträge[number][`menge${number}`])

                    console.log('hier_a')

                    console.log(  
                        big_fertigungsaufträge_original_this_view[number][`menge${number}`] 
                    )
                        
                        console.log(fertigungsaufträge[number][`menge${number}`])

                    
                    // loop entry, and their first key, to match number
                    list_Reihenfolge.map( entry => {
                        Object.keys(entry).map( key => {
                            if ( key == number && differenze !== 0 ) {
                                // alert(differenze)
                            // Fallunterscheidung: Wenn der key nur 1000 hat, aber 5000 davon abgezogen werden sollen
                            // Reduziere die Differenze 5000 um den Wert 1000
                            console.log(key, 'key = number ', number)
                            console.log(entry)
                            if ((entry[key][`menge${number}`] - differenze) < 0 ) {     // KLEINER 0    1000 - 5000
                                // alert('kleiner')
                                entry[key][`menge${number}`] = 0;   // Erik : sollen hier Minus werte erlaubt werden
                                differenze = differenze - entry[key][`menge${number}`];
                            }
                            // Fallunterscheidung: Wenn der Key jetzt 5000 ist und die Differenze -1000, dann kann diese abgezogen werden
                            // die Differenz wird = 0 gesetzt, damit nicht Mehrfachabzüge passieren
                            if ( (entry[key][`menge${number}`] - differenze) > 0 ) {       // GRÖßER 0   5000 - 1000
                                // alert('größer')
                                console.log(entry[key])
                                console.log('differenze', differenze)
                                entry[key][`menge${number}`] = entry[key][`menge${number}`] - differenze
                                console.log(entry[key])

                                differenze=0;
                            }

                        }
                    })
            })// Hiermit sollten alle Elemente der Reihenfolge erfolgreich angepasst worden sein
            localStorage.set('list_Reihenfolge', list_Reihenfolge)
        })
        }
  }

  testing = (ev) => {
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
        if (key == 84){

                  let  better_engpass = localStorage.get('better_engpass')
                  let eins =  {
                    1: 100,
                    4: 100,
                    7: 100,
                    10: 100,
                    13: 100,
                    16: 100,
                    17: 100,
                    18: 100,
                    26: 100,
                    49: 100,
                    50: 100,
                    51: 100,
                  }

                  let zwei = {
                      2:100,
                    5: 100 ,
                    8: 100 ,
                    11: 100 ,
                    14: 100 ,
                    16: 100 ,
                    17: 100 ,
                    19: 100 ,
                    26: 100 ,
                    54: 100 ,
                    55: 100 ,
                    56: 100 ,
                  }
                  let drei = {
                    3: 100,
                    6: 100,
                    9: 100,
                    12: 100,
                    15: 100,
                    16: 100,
                    17: 100,
                    20: 100,
                    26: 100,
                    29: 100,
                    30: 100,
                    31: 100,
                  }
                  better_engpass[1] = eins;
                  better_engpass[2] = zwei;
                  better_engpass[3] = drei;
                  localStorage.set('better_engpass', better_engpass)

                  let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
                  let eins_fertigung = {
                        1: {artikel1: 1, menge1: 102},
                        51: {artikel51: 51, menge51: 104},
                        50: {artikel50: 50, menge50: 106},
                        49: {artikel49: 49, menge49: 108},
                        4: {artikel4: 4, menge4: 100},
                        7: {artikel7: 7, menge7: 100},
                        10: {artikel10: 10, menge10: 100},
                        13: {artikel13: 13, menge13: 100},
                        16: {artikel16: 16, menge16: 100},
                        17: {artikel17: 17, menge17: 100},
                        18: {artikel18: 18, menge18: 100},
                        26: {artikel26: 26, menge26: 100},
                    }
                    let zwei_fertigung = {
                        2: {artikel2: 2, menge2: 102},
                        56: {artikel56: 56, menge56: 106},
                        55: {artikel55: 55, menge55: 108},
                        54: {artikel54: 54, menge54: 110},
                        5: {artikel5: 5, menge5: 100},
                        8: {artikel8: 8, menge8: 100},
                        11: {artikel11: 11, menge11: 100},
                        14: {artikel14: 14, menge14: 100},
                        16: {artikel16: 16, menge16: 100},
                        17: {artikel17: 17, menge17: 100},
                        19: {artikel19: 19, menge19: 100},
                        26: {artikel26: 26, menge26: 100},
                    }
                    let drei_fertigung = {
                        3: {artikel3: 3, menge3: 102},
                        31: {artikel31: 31, menge31: 104},
                        30: {artikel30: 30, menge30: 106},
                        29: {artikel29: 29, menge29: 108},
                        6: {artikel6: 6, menge6: 100},
                        9: {artikel9: 9, menge9: 100},
                        12: {artikel12: 12, menge12: 100},
                        15: {artikel15: 15, menge15: 100},
                        16: {artikel16: 16, menge16: 100},
                        17: {artikel17: 17, menge17: 100},
                        20: {artikel20: 20, menge20: 100},
                        26: {artikel26: 26, menge26: 100},
                    }
                fertigungsaufträge1[1] = eins_fertigung;
                fertigungsaufträge1[2] = zwei_fertigung;
                fertigungsaufträge1[3] = drei_fertigung;
                localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
                  this.setState({ fertigungsaufträge: this.state.fertigungsaufträge})
        }

    }

  }

  loggin = () => {

    // übertäter
    // fertigungsaufträge_normales_dispo_dict
      let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
      let ffx_engpass = localStorage.get('ffx_engpass')
      let finally_better_engpass_maybe = localStorage.get('finally_better_engpass_maybe')
      console.log(ffx_engpass)
      console.log(fertigungsaufträge1)
      console.log(finally_better_engpass_maybe)
      console.log('engpass' , localStorage.get('better_engpass'))
      let big_fertigungsaufträge_original_this_view = localStorage.get('big_fertigungsaufträge_original_this_view')
      big_fertigungsaufträge_original_this_view = this.remove_negatives_to_zero_from(big_fertigungsaufträge_original_this_view)
      console.log(big_fertigungsaufträge_original_this_view)
      let fertigungsaufträge = localStorage.get('fertigungsaufträge');

      console.log(fertigungsaufträge)

      let dispo_dict = localStorage.get('super_dispo_dict')
      let fertigungsaufträgeX = localStorage.get('fertigungsaufträge1')
      let list_Reihenfolge = localStorage.get('list_Reihenfolge')
      let fertigungsaufträge_normales_dispo_dict = localStorage.get('fertigungsaufträge')
    //   console.log('dispo_dict')
    //   console.log('fertigungsaufträge1', fertigungsaufträgeX)
    //   console.log(list_Reihenfolge)
    //   console.log(fertigungs)
  }

  anzeigenBerrechnungEPS = () => {
    this.setState({ berrechnungEPSAnzeigen : !this.state.berrechnungEPSAnzeigen})
}

	componentDidMount() {



        document.addEventListener('keydown', this.testing)
        document.addEventListener('keydown', this.loggin)
        let maxAufträge_better = localStorage.get('maxAufträge_better')
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        let maxValues = {1:{}, 2:{}, 3:{}}

        this.updateErzeugnise_from_Reihenfolge()

        document.getElementById('Fertigungsaufträge').childNodes[0].setAttribute('style', 'color:darkred;  ')


        let übersetzung = {}
        console.log('fertigungsaufträge1_x',fertigungsaufträge1)

        Object.keys(fertigungsaufträge1).map( outerProduct => {
            Object.keys(fertigungsaufträge1[outerProduct]).map( innerNumber => {
                let artikel = parseInt(fertigungsaufträge1[outerProduct][innerNumber][`artikel${innerNumber}`])
                let menge = parseInt(fertigungsaufträge1[outerProduct][innerNumber][`menge${innerNumber}`])
                console.log(menge)
                if (menge < 0 ) menge = 0

                if  (übersetzung[innerNumber] && (innerNumber == 26 ||innerNumber == 16 || innerNumber == 17 )) {
                    übersetzung[innerNumber][`menge${innerNumber}`] = parseInt(übersetzung[innerNumber][`menge${innerNumber}`] + menge)
                }
                if  (!übersetzung[innerNumber]) {
                    übersetzung[innerNumber] = {[`artikel${innerNumber}`]: artikel, [`menge${innerNumber}`] : menge}
                }
                // if (!übersetzung[innerNumber][`menge${innerNumber}`]) übersetzung[innerNumber][`menge${innerNumber}`] = {[`menge${innerNumber}`]:
            })
        })
        console.log('übersetzung' ,übersetzung)
        this.setState({übersetzung: übersetzung})
        localStorage.set('übersetzung', übersetzung)



        // remember original from this View, to get differenze if input has changed
        console.log('fertigungsaufträge1___',fertigungsaufträge1)
        localStorage.set('fertigungsaufträge_original_this_view', fertigungsaufträge1)

        let fertigungsaufträge_view = localStorage.get('fertigungsaufträge')
        localStorage.set('big_fertigungsaufträge_original_this_view', fertigungsaufträge_view)

        window.scrollTo(0, 0)
        const rememberedState = localStorage.get('fertigungsaufträge');

        let epsProdukt1Angewand_storage = localStorage.get('epsProdukt1Angewand_storage')
        let epsProdukt2Angewand_storage = localStorage.get('epsProdukt2Angewand_storage')
        let epsProdukt3Angewand_storage = localStorage.get('epsProdukt3Angewand_storage')

        epsProdukt1Angewand_storage ? this.setState({ epsProdukt1Angewand: true}) : this.setState({ epsProdukt1Angewand_storage: false})
        epsProdukt2Angewand_storage ? this.setState({ epsProdukt2Angewand: true}) : this.setState({ epsProdukt2Angewand_storage: false})
        epsProdukt3Angewand_storage ? this.setState({ epsProdukt3Angewand: true}) : this.setState({ epsProdukt3Angewand_storage: false})




        console.log('ääääääääääääääää')
        console.log(rememberedState);

        // my own
		if (rememberedState !== null ) {

            this.setState({ fertigungsaufträge: rememberedState})
            localStorage.set('fertigungsaufträge_safe',rememberedState)
		}

        const rememberStateSales2 = localStorage.get('sales2');
        // new state
		if( rememberStateSales2 !== null ) {

            console.log('sales2')
            console.log(rememberedState)
            this.setState({ fertigungsaufträge: rememberedState})
            localStorage.set('fertigungsaufträge_safe',rememberedState)
        }

        console.log('ööööööööööööööööööööö');

        // Sales2 componentDidMount to get the states
        const sales1 = localStorage.get('sales1');
        const sales2 = localStorage.get('sales2');
        console.log(sales2);

        if ( sales1 !== null ) {
            // Übernehme Vertriebswunsch als Lagerbestand für E, als erste Innitierung.
            const { n1_p1 , n1_p2, n1_p3 } = sales1;


            const firstStateSales2 = {
                LagerbestandP1:0,
                LagerbestandP2:0,
                LagerbestandP3:0,
                LagerbestandE1: n1_p1,
                LagerbestandE2: n1_p2,
                LagerbestandE3: n1_p3,
            }
            this.setState({ sales2: firstStateSales2})
            localStorage.set('sales2_safe', firstStateSales2)
        }

        // Übernehme als letzten Schritt, falls existiert den "remembered state" von sales2
		if (sales2 !== null ) {
            this.setState({ sales2: sales2})
            localStorage.set('sales2_safe', sales2)
        }

        // update Lagerbestand E, wenn Änderungen am Vertriebswunsch vorgenommen wurden. Weil ansonsten hardrememberd, der state sales2 mit den alten Werten verwendet wird
        if ( sales2 !== null && sales1 !== null ) {
            const { n1_p1 , n1_p2, n1_p3 } = sales1;

            sales2.LagerbestandE1 = n1_p1;
            sales2.LagerbestandE2 = n1_p2;
            sales2.LagerbestandE3 = n1_p3;

            this.setState({ sales2: sales2 })
            localStorage.set('sales2_safe', sales2)
        }

        console.log('NAH')
        console.log(rememberedState)
	}


	// ######################### Start, Fertigungsaufträge, Arbeitszeit
	// 3 KOMPONENTE

     /////////////////////////////////////////////////////////////////////////////////////////////

    //Produkte in Bearbeitung
    get_orders_in_work_by_amount(xml_data) {
        // falls ein parameter undefined ist wird kein berechnung vorgenommen
        if (typeof (xml_data) != 'string') {
            var orders_in_work = {};
            var xml_root = xml_data.getElementsByTagName('ordersinwork')[0];
            var orders;
            for (orders of xml_root.getElementsByTagName('workplace')) {
                var item = orders.getAttribute("item");
                if (Object.keys(orders_in_work).includes(item)) {
                    orders_in_work[item] = orders_in_work[item] + parseInt(orders.getAttribute('amount'));
                } else {
                    orders_in_work[item] = parseInt(orders.getAttribute('amount'));
                }
            }
        } else {
            orders_in_work = "not defined"
        }
        this.setState({ orders_in_work: orders_in_work })
        return orders_in_work
    }

    //Produkte aus Warteschlange
    get_waiting_list_at_workstation_by_amount(xml_data) {
        // falls ein parameter undefined ist wird kein berechnung vorgenommen
        if (typeof (xml_data) != 'string') {
            var waiting_list = {};
            var xml_root = xml_data.getElementsByTagName('waitinglistworkstations')[0];
            var list_item;
            for (list_item of xml_root.getElementsByTagName('waitinglist')) {
                var item = list_item.getAttribute("item");
                if (Object.keys(waiting_list).includes(item)) {
                    waiting_list[item] = waiting_list[item] + parseInt(list_item.getAttribute('amount'));
                } else {
                    waiting_list[item] = parseInt(list_item.getAttribute('amount'));
                }
            }
        } else {
            waiting_list = "not defined"
        }
        this.setState({ waiting_list: waiting_list })
        return waiting_list
    }

    //Produktdaten generieren
    generate_item_data(params, xml_data) {
        var parameter
        // falls ein parameter undefined ist wird kein berechnung vorgenommen
        for (parameter of [params, xml_data]) {
            if (typeof (parameter) != 'string') {
                var xml = xml_data;
                var product_dict = {};
                var product;
                for (product of Object.keys(params['usage'])) {
                    var item_dict = {};
                    var item;
                    for (item of Object.keys(params['usage'][product])) {
                        //Mehrfachverwendung deklarieren
                        var multiple_usage;
                        if (params['multiple_item_ids'].includes(parseInt(item))) {
                            multiple_usage = 'ja'
                        } else {
                            multiple_usage = 'nein'
                        }
                        //Weitere Verwendung deklarieren
                        var usage;
                        usage = params['usage'][product][item];
                        //Lagerbestände deklarieren
                        var warehousestock = parseInt(xml.getElementsByTagName("article")[item - 1].getAttribute("amount"));
                        //geplante Lagerbestände deklarieren
                        var planned_warehousestock;
                        if (Object.keys(params['planned_p_stock']).includes(item)) {
                            planned_warehousestock = params['planned_p_stock'][product];
                        } else {
                            planned_warehousestock = params['planned_e_stock'][product];
                        }
                        // Erstellen eines dicts für die Rückgabe
                        item_dict[item] = {
                            'lagerbestand': warehousestock,
                            'lagerbestand_geplant': planned_warehousestock,
                            'verwendung_in': usage,
                            'mehrfachverwendung': multiple_usage
                        }
                        //Vertriebswunsch deklarieren
                        if (Object.keys(params['sales_order']).includes(item)) {
                            item_dict[item]["vetriebswunsch"] = params['sales_order'][item];
                        }
                    }
                    product_dict[product] = item_dict;
                }
                var output = {};
                output['produktDaten'] = product_dict;
                //Aufträge in Bearbeitung deklarieren
                output['inBearbeitung'] = this.get_orders_in_work_by_amount(xml);
                //Aufträge in Warteschlange deklarieren
                output['inWarteschlange'] = this.get_waiting_list_at_workstation_by_amount(xml);
            } else {
                output = "not defined"
                return
            }
        }
        this.setState({ item_data: output })

        console.log(output)
        return output
    }

    get_sales_order(produktdaten, product, item, dispo_dict) {
        var sales_order
        if (produktdaten['produktDaten'][product][item]["verwendung_in"] != 0) {
            //deklaration der sales_order anhand der notwendigen Verwendung
            sales_order = dispo_dict[produktdaten['produktDaten'][product][item]["verwendung_in"]]["production_order"];
        } else {
            //deklaration der sales_order anhand des Vertriebswunsches
            sales_order = produktdaten['produktDaten'][product][item]["vetriebswunsch"];
        }
        return sales_order
    }

    get_waiting_items(produktdaten, product, item) {
        var waiting_items
        if (Object.keys(produktdaten['inWarteschlange']).includes(item.toString())) {
            if (produktdaten['produktDaten'][product][item]["mehrfachverwendung"] == 'ja') {
                waiting_items = produktdaten['inWarteschlange'][item] / 3
            }
            else {
                waiting_items = produktdaten['inWarteschlange'][item]
            }
        }
        else {
            waiting_items = 0;
        }
        return waiting_items;
    }

    get_producing_items(produktdaten, product, item) {
        var producing_items;
        if (Object.keys(produktdaten['inBearbeitung']).includes(item.toString())) {
            if (produktdaten['produktDaten'][product][item]["mehrfachverwendung"] == 'ja') {
                producing_items = produktdaten['inBearbeitung'][item] / 3
            }
            else {
                producing_items = produktdaten['inBearbeitung'][item]
            }
        }
        else {
            producing_items = 0;
        }
        return producing_items;
    }

    get_warehousestock(produktdaten, product, item) {
        var warehousestock
        if (produktdaten['produktDaten'][product][item]["mehrfachverwendung"] == 'ja') {
            warehousestock = produktdaten['produktDaten'][product][item]["lagerbestand"] / 3
        }
        else {
            warehousestock = produktdaten['produktDaten'][product][item]["lagerbestand"]
        }
        return warehousestock;
    }

    transfer_waiting_item(produktdaten, product, item, dispo_dict) {
        var tf_waiting_item
        if (produktdaten['produktDaten'][product][item]["verwendung_in"] != 0) {
            tf_waiting_item = dispo_dict[produktdaten['produktDaten'][product][item]["verwendung_in"]]["waiting_items"];
        } else {
            tf_waiting_item = 0;
        }
        return tf_waiting_item
    }

    //     //Black Box Magic
    dispo_function = (obergrenze) => {

        let params = localStorage.get('sales2_output');
        let sales2 = localStorage.get('sales2');
        const { LagerbestandE1, LagerbestandE2, LagerbestandE3, LagerbestandP1, LagerbestandP2, LagerbestandP3 } = this.sales2;
        var sales2_planned_p_stock = { 1: LagerbestandP1, 2: LagerbestandP2, 3: LagerbestandP3};
        var sales2_planned_e_stock = { 1: LagerbestandE1, 2: LagerbestandE2, 3: LagerbestandE3};
        params.planned_p_stock = sales2_planned_p_stock;
        params.planned_e_stock = sales2_planned_e_stock;

        const { xml } = this.state;

        console.log('banane')
        console.log(params);
        console.log(xml);

        var parameter
        for (parameter of [xml, params]) {
            if (typeof (parameter) == 'string') { return }
        }
        var produktdaten = this.generate_item_data(params, xml)
        var dispo_dict = {};
        var product;
        for (product of Object.keys(produktdaten['produktDaten'])) {
            var item;
            //für nicerdicer Ausgabe
            console.log("Vertriebswunsch + Übertrag + Lagerbestand(Ende) - Lagerbestand - Warteschlange - Bearbeitung = Produktionsmenge")
            for (item of params['usage_order'][product]) {

                //Abfrage der verbindlichen Aufträge
                var sales_order = this.get_sales_order(produktdaten, product, item, dispo_dict)

                //Abfrage des geplanten Lagerbestandes der Produkte/Erzeugnisse
                var planned_stock = produktdaten['produktDaten'][product][item]['lagerbestand_geplant'];

                var spec = [16,17,26]
                if(spec.includes(parseInt(product))&&planned_stock > 300){
                    planned_stock = 300
                }else if(planned_stock > 100) {
                    planned_stock = 100
                }

                //Abfrage der Aufträge aus der Warteschlange
                var waiting_items = this.get_waiting_items(produktdaten, product, item)

                //Abfrage der Aufträge in Bearbeitung
                var producing_items = this.get_producing_items(produktdaten, product, item);

                //Abfrage der aktuellen Lagerbestände
                var warehousestock = this.get_warehousestock(produktdaten, product, item)

                //Übertag aus Warteliste
                var tf_waiting_item = this.transfer_waiting_item(produktdaten, product, item, dispo_dict)

                var waiting_list = this.get_waitinglist_by_producing_items(this.state.xml)
                if (typeof (waiting_list) == 'undefined') {
                    var waiting_material = 0
                } else {
                    if (Object.keys(waiting_list).includes(product.toString())) {
                        var waiting_material = waiting_list[product]
                        console.log(product,waiting_material)
                    } else {
                        var waiting_material = 0
                    }
                }

                //production_orders = sales_orders + nf_waiting_items + planned_warehousestock - warehousestock - producing_items - waiting_items
                var production_order;
                //notwendige Berechnungen
                production_order = sales_order + tf_waiting_item + planned_stock - warehousestock - waiting_items - producing_items;

                if (Object.keys(dispo_dict).includes(item.toString())) {
                    dispo_dict[item] = {
                        "sales_order": dispo_dict[item]["sales_order"] + sales_order,
                        "tf_waiting_item": dispo_dict[item]["tf_waiting_item"] + tf_waiting_item,
                        "planned_stock": dispo_dict[item]["planned_stock"] + planned_stock,
                        "warehousestock": dispo_dict[item]["warehousestock"] + warehousestock,
                        "waiting_items": dispo_dict[item]["waiting_items"] + waiting_items,
                        "producing_items": dispo_dict[item]["producing_items"] + producing_items,
                        "production_order": dispo_dict[item]["production_order"] + production_order
                    }
                }
                else {
                    dispo_dict[item] = {
                        "sales_order": sales_order,
                        "tf_waiting_item": tf_waiting_item,
                        "planned_stock": planned_stock,
                        "warehousestock": warehousestock,
                        "waiting_items": waiting_items,
                        "producing_items": producing_items,
                        "production_order": production_order
                    }
                }
                console.log(sales_order, "+", tf_waiting_item, "+", planned_stock, "-", warehousestock, "-", waiting_items, "-", producing_items, "=", production_order)
            }
        }
        for (item of Object.keys(dispo_dict)) {
            dispo_dict[item]['production_order'] = Math.ceil(dispo_dict[item]['production_order'])
        }
        this.setState({ dispo: dispo_dict })
        console.log('keke')
        console.log(this.state);

        // #Fertigungsaufträge json { 1 : stock, 2: stock, 3: stock, ... 40: 432stk, }
        let fertigungsaufträge = {}
        Object.keys(dispo_dict).map(item => {
            fertigungsaufträge[item] =  dispo_dict[item].planned_stock;
        })
        console.log('kirsche')
        console.log(fertigungsaufträge);
        localStorage.set('fertigungsaufträge', fertigungsaufträge)

        this.working_hours_planning(dispo_dict, xml);
        return dispo_dict

    }

	// arbeitszeiten @updated
    working_hours_planning(dispo, xml) {
        if (typeof (dispo) == 'undefined' || typeof (this.state.xml) == 'string') { return }
        var total_capacity_plan = this.total_capacity_planning(dispo, xml)
        console.log(total_capacity_plan);
        var working_hours_dict = {}
        var workstation
        for (workstation of Object.keys(total_capacity_plan)) {
            var working_hours
            var schichten
            //1-Schichten Betrieb
            working_hours = parseInt((total_capacity_plan[workstation] - 2400) / 5)

            if (working_hours < 360 && working_hours > 240) { working_hours = 240 }

schichten = 1
            //2-Schichten Betrieb
            if ( working_hours > 240) {
                working_hours = parseInt((total_capacity_plan[workstation] - 2400 * 2) / 5)

                if (working_hours < 360 && working_hours > 240) { working_hours = 240 }

schichten = 2
                //3-Schichten Betrieb
                if ( working_hours > 240) {
                    working_hours = 0
                    var anmerkung = (total_capacity_plan[workstation] - 2400 * 3) / 5
                    schichten = 3
                }
            }
            if (working_hours < 0) {
                working_hours = 0;
            }
            working_hours_dict[workstation] = {
                "überstunden": working_hours,
                "anzahl_Schichten": schichten,
                "nicht_produziert": anmerkung
            }
        }
        this.setState({ capacity_programm: working_hours_dict })
        return working_hours_dict
    }

    total_capacity_planning(dispo, xml) {
        var capacity_plan = this.capacity_planning(dispo)
        var setup_plan = this.get_setup_time(dispo)
        var timeneed = this.get_timeneed_at_workstation(xml)
        var capacity_data = { "capacity_plan": capacity_plan, "setup_plan": setup_plan, "timeneed": timeneed }
        this.setState({ capacity_data: capacity_data })
        var total_capacity_dict = {}
        var workstation
        for (workstation of Object.keys(capacity_plan)) {
            total_capacity_dict[workstation] = capacity_plan[workstation] + setup_plan[workstation] + timeneed[workstation]
        }
        this.setState({ capacity_plan: total_capacity_dict })
        return total_capacity_dict
    }

      ///////////////////////////////////////////////////////////////////////////////////
      capacity_planning(dispo_dict) {
        var arbeitszeiten_dict = {
            1: { 29: 6, 49: 6, 54: 6 }, 2: { 30: 5, 50: 5, 55: 5 }, 3: { 31: 6, 51: 5, 56: 6 }, 4: { 1: 6, 2: 7, 3: 7 },
            6: { 16: 2, 18: 3, 19: 3, 20: 3 }, 7: { 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 18: 2, 19: 2, 20: 2, 26: 2 },
            8: { 10: 1, 11: 2, 12: 2, 13: 1, 14: 2, 15: 2, 18: 3, 19: 3, 20: 3 }, 9: { 10: 3, 11: 3, 12: 3, 13: 3, 14: 3, 15: 3, 18: 2, 19: 2, 20: 2 },
            10: { 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 }, 11: { 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3 }, 12: { 10: 3, 11: 3, 12: 3, 13: 3, 14: 3, 15: 3 },
            13: { 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2 }, 14: { 16: 3 }, 15: { 17: 3, 26: 3 }
        }

        var capacity_plan = this.get_time_by(dispo_dict, arbeitszeiten_dict,1)
        return capacity_plan
    }

    get_setup_time(dispo_dict) {
        var rüstzeiten_dict = {
            1: { 29: 20, 49: 20, 54: 20 }, 2: { 30: 20, 50: 30, 55: 30 }, 3: { 31: 20, 51: 20, 56: 20 }, 4: { 1: 30, 2: 20, 3: 30 },
            6: { 16: 15, 18: 15, 19: 15, 20: 15 }, 7: { 10: 20, 11: 20, 12: 20, 13: 20, 14: 20, 15: 20, 18: 20, 19: 20, 20: 20, 26: 30 },
            8: { 10: 15, 11: 15, 12: 15, 13: 15, 14: 15, 15: 15, 18: 20, 19: 25, 20: 20 }, 9: { 10: 15, 11: 15, 12: 15, 13: 15, 14: 15, 15: 15, 18: 15, 19: 20, 20: 15 },
            10: { 4: 20, 5: 20, 6: 20, 7: 20, 8: 20, 9: 20 }, 11: { 4: 10, 5: 10, 6: 20, 7: 20, 8: 20, 9: 20 }, 12: { 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0 },
            13: { 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0 }, 14: { 16: 0 }, 15: { 17: 15, 26: 15 }
        }

        var product
        for (product of Object.keys(dispo_dict)) {
            if (dispo_dict[product]['production_order'] > 0) {
                dispo_dict[product]['production_order'] = 1
            } else {
                dispo_dict[product]['production_order'] = 0
            }
        }

        var setup_time = this.get_time_by(dispo_dict, rüstzeiten_dict,0)
        return setup_time

    }

       get_waitinglist_by_producing_items(xml) {
        if (typeof (xml) != 'string') {
            var waitinglist_dict = {}
            var missingpart = xml.getElementsByTagName("waitingliststock")[0].getElementsByTagName("missingpart")
            var part
            for (part of missingpart) {
                var item
                for (item of part.getElementsByTagName("waitinglist")) {
                    var id = parseInt(item.getAttribute("item"))
                    var amount = parseInt(item.getAttribute("amount"))
                    if (Object.keys(waitinglist_dict).includes(id.toString())) {
                        waitinglist_dict[id] = waitinglist_dict[id] + amount
                    } else {
                        waitinglist_dict[id] = amount
                    }

                }
            }
            return (waitinglist_dict)
        } else { return }

    }

 get_time_by(dispo_dict, time_dict, unique) {
        var workstation
        var workstation_dict = {}
        for (workstation of Object.keys(time_dict)) {
            console.log(workstation);
            var product
            var workstation_product_time = []
            console.log("Arbeitsplatz: Produkt => Arbeitszeit * Anzahl = Arbeitszeit")
            for (product of Object.keys(time_dict[workstation])) {
                var production_time = time_dict[workstation][product]
                var production_order
                if (dispo_dict[product]['production_order'] < 0) {
                    production_order = 0;
                } else {
                    production_order = Math.ceil(dispo_dict[product]['production_order']);
                }
      if ( unique == 1 ) {
var waiting_list = this.get_waitinglist_by_producing_items(this.state.xml)
                if (typeof (waiting_list) == 'undefined') {
                    var waiting_material = 0
                } else {
                    if (Object.keys(waiting_list).includes(product.toString())) {
                        var waiting_material = waiting_list[product]
                        console.log(product,waiting_material)
                    } else {
                        var waiting_material = 0
                    }
                }
                production_order = production_order + waiting_material

}

                workstation_product_time.push(production_time * production_order)
                console.log(workstation, ":", product, "=>", production_time, "*", production_order, "=",
                    production_time * production_order)
                console.log(workstation_product_time)
            }
            var workstation_time = workstation_product_time.reduce((a, b) => a + b, 0)
            workstation_dict[workstation] = workstation_time;
        }
        return workstation_dict
    }

    get_timeneed_at_workstation(xml_data) {
        var workstation_time_dict = {};
        var xml_root = xml_data.getElementsByTagName('waitinglistworkstations')[0];
        var workstation;
        for (workstation of xml_root.getElementsByTagName('workplace')) {
            var workstation_id = workstation.getAttribute("id")
            var timeneed = parseInt(workstation.getAttribute("timeneed"));
            workstation_time_dict[workstation_id] = timeneed
        }
        return workstation_time_dict
    }

    total_capacity_planning(dispo, xml) {
        var capacity_plan = this.capacity_planning(dispo)
        var setup_plan = this.get_setup_time(dispo)
        var timeneed = this.get_timeneed_at_workstation(xml)
        var capacity_data = { "capacity_plan": capacity_plan, "setup_plan": setup_plan, "timeneed": timeneed }
        this.setState({ capacity_data: capacity_data })
        var total_capacity_dict = {}
        var workstation
        for (workstation of Object.keys(capacity_plan)) {
            total_capacity_dict[workstation] = capacity_plan[workstation] + setup_plan[workstation] + timeneed[workstation]
        }
        this.setState({ capacity_plan: total_capacity_dict })
        return total_capacity_dict
    }

    calculate_empty_work_time(warehousestock_n, demand, warehousestock_movement, production, dispo) {

        if (typeof (warehousestock_n) == "undefined") { return }
        if (typeof (warehousestock_movement) == "undefined") { return }
        if (typeof (demand) == "undefined") { return }

        var item
        var new_stock = {}
        var new_stock_item
        for (item of Object.keys(warehousestock_n)) {
            if (Object.keys(warehousestock_movement).includes(item)) {
                if (parseFloat(warehousestock_movement[item]['ankunft']) <= 0.6) {
                    new_stock_item = warehousestock_n[item] - demand[1][item] + parseInt(warehousestock_movement[item]['menge'])
                    console.log(item, warehousestock_n[item], demand[1][item], parseInt(warehousestock_movement[item]['menge']))
                } else {
                    new_stock_item = warehousestock_n[item] - demand[1][item]
                    console.log(item, warehousestock_n[item], demand[1][item])
                }
            } else {
                new_stock_item = warehousestock_n[item] - demand[1][item]
                console.log(item, warehousestock_n[item], demand[1][item])
            }
            if (new_stock_item < 0) {
                new_stock[item] = new_stock_item * (-1)
            }
        }
        console.log("neu", new_stock)

        var single_product_use = [21, 22, 23, 33, 34, 52, 53, 57, 58]

        for (item of Object.keys(new_stock)) {
            if (single_product_use.includes(parseInt(item))) {
                new_stock[item] = new_stock[item]
            } else {
                new_stock[item] = new_stock[item] / 3
            }
        }
        console.log("neuer", new_stock)

        var verwendung = {
            1: {
                21: 1, 22: 0, 23: 0, 24: 7, 25: 4, 27: 2, 28: 4, 32: 3, 33: 0, 34: 0, 35: 4, 36: 1, 37: 1, 38: 1,
                39: 2, 40: 1, 41: 1, 42: 2, 43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 2, 53: 72, 57: 0, 58: 0, 59: 2
            },
            2: {
                21: 0, 22: 1, 23: 0, 24: 7, 25: 4, 27: 2, 28: 5, 32: 3, 33: 0, 34: 0, 35: 4, 36: 1, 37: 1, 38: 1, 39: 2, 40: 1, 41: 1, 42: 2,
                43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 0, 53: 0, 57: 2, 58: 72, 59: 2
            },
            3: {
                21: 0, 22: 0, 23: 1, 24: 7, 25: 4, 27: 2, 28: 6, 32: 3, 33: 2, 34: 72, 35: 4, 36: 1, 37: 1, 38: 1, 39: 2, 40: 1, 41: 1, 42: 2,
                43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 0, 53: 0, 57: 0, 58: 0, 59: 2
            }
        }

        var verwendung_dict = {}
        var product
        for (product of Object.keys(verwendung)) {
            var product_dict = {}
            for (item of Object.keys(verwendung[product])) {
                if (Object.keys(new_stock).includes(item.toString())) {
                    if (verwendung[product][item] > 0)
                        product_dict[item] = Math.ceil(new_stock[item] / verwendung[product][item])
                }
            }
            verwendung_dict[product] = product_dict
        }
        console.log(verwendung_dict)

        var erzeugnisse = {
            1: {
                21: [1], 24: [1, 51, 16, 50, 49], 25: [50, 49], 27: [1, 51], 28: [16, 18], 32: [10, 13, 18],
                35: [4, 7], 36: [4], 37: [7], 38: [7], 39: [10, 13], 40: [16], 41: [16], 42: [16],
                43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 52: [4, 7], 53: [4, 7], 59: [18]
            },
            2: {
                22: [2], 24: [2, 56, 16, 55, 54], 25: [55, 54], 27: [2, 56], 28: [16, 19], 32: [11, 14, 19],
                35: [5, 8], 36: [5], 37: [8], 38: [8], 39: [11, 14], 40: [16], 41: [16], 42: [16],
                43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 59: [19], 57: [5, 8], 58: [5, 8]
            },
            3: {
                23: [3], 24: [3, 31, 16, 30, 29], 25: [30, 29], 27: [3, 31], 28: [16, 20], 32: [12, 15, 20],
                35: [6, 9], 36: [6], 37: [9], 38: [9], 39: [12, 15], 40: [16], 41: [16], 42: [16],
                43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 59: [20], 33: [6, 9], 34: [6, 9]
            }
        }

        var product_erzeugnisse = {}
        for (product of Object.keys(erzeugnisse)) {
            var erzeugniss
            var erzeugniss_dict = {}
            for (item of Object.keys(erzeugnisse[product])) {
                if (Object.keys(verwendung_dict[product]).includes(item.toString())) {
                    for (erzeugniss of erzeugnisse[product][item]) {
                        if (Object.keys(erzeugniss_dict).includes(erzeugniss.toString())) {
                            if (erzeugniss_dict[erzeugniss] < verwendung_dict[product][item]) {
                                erzeugniss_dict[erzeugniss] = verwendung_dict[product][item]
                            }

                        } else {
                            erzeugniss_dict[erzeugniss] = verwendung_dict[product][item]
                        }
                    }
                }
            }
            product_erzeugnisse[product] = erzeugniss_dict
        }
        console.log(product_erzeugnisse)

        //new
        //Max von  product_erzeugnisse[product] und von allen abziehen

        var max_dict = {1:0,2:0,3:0}

        for (product of Object.keys(product_erzeugnisse)) {
            for (item of Object.keys(product_erzeugnisse[product])) {
                if (max_dict[product]<product_erzeugnisse[product][item]) {
                    max_dict[product] = product_erzeugnisse[product][item]
                } else {
                }
            }
        }

        console.log("max",max_dict)

        console.log("alte production",production)


        for (product of Object.keys(product_erzeugnisse)) {
            for (item of Object.keys(product_erzeugnisse[product])) {
                if (production[item] - max_dict[product] < 0) {
                    production[item] = 0
                } else {
                    production[item] = production[item] - max_dict[product]
                }
            }
        }
        console.log("neue production",production)

        for (item of Object.keys(dispo)) {
            dispo[item]['production_order'] = production[item]
        }
        return dispo
    }

    get_timeneed_at_workstation(xml_data) {
        var workstation_time_dict = {};
        var xml_root = xml_data.getElementsByTagName('waitinglistworkstations')[0];
        var workstation;
        for (workstation of xml_root.getElementsByTagName('workplace')) {
            var workstation_id = workstation.getAttribute("id")
            var timeneed = parseInt(workstation.getAttribute("timeneed"));
            workstation_time_dict[workstation_id] = timeneed
        }
        return workstation_time_dict
    }

    // ##################### ende


    // #### importierte Dispo function aus sales2
     //     //Black Box Magic
     dispo_function = () => {

        let params = localStorage.get('sales2_output');
        const { LagerbestandE1, LagerbestandE2, LagerbestandE3, LagerbestandP1, LagerbestandP2, LagerbestandP3 } = this.state.sales2;
        var sales2_planned_p_stock = { 1: LagerbestandP1, 2: LagerbestandP2, 3: LagerbestandP3};
        var sales2_planned_e_stock = { 1: LagerbestandE1, 2: LagerbestandE2, 3: LagerbestandE3};
        params.planned_p_stock = sales2_planned_p_stock;
        params.planned_e_stock = sales2_planned_e_stock;

        const xml = localStorage.get('xml');
        // const { xml } = this.state;

        console.log('banane')
        console.log(params);
        console.log(xml);

        var parameter
        for (parameter of [xml, params]) {
            if (typeof (parameter) == 'string') { return }
        }
        var produktdaten = this.generate_item_data(params, xml)
        var dispo_dict = {};
        var product;
        for (product of Object.keys(produktdaten['produktDaten'])) {
            var item;
            //für nicerdicer Ausgabe
            console.log("Vertriebswunsch + Übertrag + Lagerbestand(Ende) - Lagerbestand - Warteschlange - Bearbeitung = Produktionsmenge")
            for (item of params['usage_order'][product]) {

                //Abfrage der verbindlichen Aufträge
                var sales_order = this.get_sales_order(produktdaten, product, item, dispo_dict)

                //Abfrage des geplanten Lagerbestandes der Produkte/Erzeugnisse
                var planned_stock = produktdaten['produktDaten'][product][item]['lagerbestand_geplant'];

                var spec = [16,17,26]
                if(spec.includes(parseInt(product))&&planned_stock > 300){
                    planned_stock = 300
                }else if(planned_stock > 100) {
                    planned_stock = 100
                }

                //Abfrage der Aufträge aus der Warteschlange
                var waiting_items = this.get_waiting_items(produktdaten, product, item)

                //Abfrage der Aufträge in Bearbeitung
                var producing_items = this.get_producing_items(produktdaten, product, item);

                //Abfrage der aktuellen Lagerbestände
                var warehousestock = this.get_warehousestock(produktdaten, product, item)

                //Übertag aus Warteliste
                var tf_waiting_item = this.transfer_waiting_item(produktdaten, product, item, dispo_dict)

                var waiting_list = this.get_waitinglist_by_producing_items(this.state.xml)
                if (typeof (waiting_list) == 'undefined') {
                    var waiting_material = 0
                } else {
                    if (Object.keys(waiting_list).includes(product.toString())) {
                        var waiting_material = waiting_list[product]
                        console.log(product,waiting_material)
                    } else {
                        var waiting_material = 0
                    }
                }

                //production_orders = sales_orders + nf_waiting_items + planned_warehousestock - warehousestock - producing_items - waiting_items
                var production_order;
                //notwendige Berechnungen
                production_order = sales_order + tf_waiting_item + planned_stock - warehousestock - waiting_items - producing_items;

                if (Object.keys(dispo_dict).includes(item.toString())) {
                    dispo_dict[item] = {
                        "sales_order": dispo_dict[item]["sales_order"] + sales_order,
                        "tf_waiting_item": dispo_dict[item]["tf_waiting_item"] + tf_waiting_item,
                        "planned_stock": dispo_dict[item]["planned_stock"] + planned_stock,
                        "warehousestock": dispo_dict[item]["warehousestock"] + warehousestock,
                        "waiting_items": dispo_dict[item]["waiting_items"] + waiting_items,
                        "producing_items": dispo_dict[item]["producing_items"] + producing_items,
                        "production_order": dispo_dict[item]["production_order"] + production_order
                    }
                }
                else {
                    dispo_dict[item] = {
                        "sales_order": sales_order,
                        "tf_waiting_item": tf_waiting_item,
                        "planned_stock": planned_stock,
                        "warehousestock": warehousestock,
                        "waiting_items": waiting_items,
                        "producing_items": producing_items,
                        "production_order": production_order
                    }
                }
                console.log(sales_order, "+", tf_waiting_item, "+", planned_stock, "-", warehousestock, "-", waiting_items, "-", producing_items, "=", production_order)
            }
        }
        for (item of Object.keys(dispo_dict)) {
            dispo_dict[item]['production_order'] = Math.ceil(dispo_dict[item]['production_order'])
        }
        this.setState({ dispo: dispo_dict })
        localStorage.set('dispo_dict', dispo_dict)
        console.log('keke')
        console.log(this.state);

        // #Fertigungsaufträge json { 1 : stock, 2: stock, 3: stock, ... 40: 432stk, }
        let fertigungsaufträge = {}
        Object.keys(dispo_dict).map(item => {
            fertigungsaufträge[item] =  dispo_dict[item].planned_stock;
        })
        console.log('kirsche')
        console.log(fertigungsaufträge);

        let theRealState = {}
        Object.keys(fertigungsaufträge).map( number => {
            theRealState[number] = {};

            theRealState[number][`artikel${number}`] = parseInt(number);
            theRealState[number][`menge${number}`] = parseInt(fertigungsaufträge[number]);
        })
        alert('dispo_fun_fertigungsaufträge')
        localStorage.set('fertigungsaufträge', theRealState)   // hier?

        var working_hours = this.working_hours_planning(dispo_dict, xml);


        //////////////////////////////////////////////
        //5. Bedarfsplanung
        //
        let dispo = dispo_dict;
        var production = this.extract_production(dispo)

        console.log('Bedarfsplannung');
        var production_order = this.get_needed_purchase_items_by(xml, params, 'production_order', dispo_dict)
        console.log("Kaufteile aus Produktionsmenge", production_order)
        var waiting_items = this.get_needed_purchase_items_by(xml, params, 'waiting_items', dispo_dict)
        console.log("Kaufteile aus Warteschlange", waiting_items)
        var waiting_list = this.get_waitinglist_by_purchase_items(xml);
        console.log("Kaufteile aus Warteliste", waiting_list)
        var warehousestock = this.get_warehousestock_by_purchase_items(xml);
        console.log("Lagerbestand", warehousestock)
        //Lagerbestand abzüglich Warteschlange und Warteliste
        var new_warehousestock = this.calculate_new_warehousestock(warehousestock, waiting_items, waiting_list)
        console.log("Lagerbestand(neu)", new_warehousestock)
        //Bedarf für Periode n,n+1,n+2,n+3
        var merge_periods = this.merge_periods(production_order, params['prognose']);
        console.log("Bedarf(gesamt)", merge_periods)
        var warehousestock_after_using_demand = this.calculate_warehousestock_after_using_demand(new_warehousestock, merge_periods)
        console.log("Lagermenge(nach Verbrauch)", warehousestock_after_using_demand)
        //vorhandene Menge (%)
        var available_amount = this.calculate_available_amount(warehousestock_after_using_demand, merge_periods)
        console.log("vorhandene Menge", available_amount)
        //Lieferzeiten bestimmen
        var ranges = this.declare_warehoue_range()
        console.log("Lagerweite", ranges)
        //zukünftige Lieferungen bestimmen
        var future_movement = this.calculate_future_movement(xml, ranges)
        console.log("Lagerzugang", future_movement)
        //5.Engpassteuerung
        var new_dispo = this.calculate_empty_work_time(new_warehousestock, merge_periods, future_movement, production, dispo)
        console.log("1_",new_dispo)
        console.log("2_Kapazitätsprogramm", working_hours)
        //Lagerbestand nach erhaltenen Bestellungen
        var warehousestock_after_movement = this.add_stock_movement(warehousestock_after_using_demand, future_movement)
        console.log("3_Lagermenge(nach Lieferung)", warehousestock_after_movement)
        //vorhandene Menge (%)
        var available_amount = this.calculate_available_amount(warehousestock_after_movement, merge_periods)
        console.log("4_vorhandene Menge", available_amount)
        //lieferungen bestimmen
            var erfasste_Lieferungen = this.calculate_orders(ranges, available_amount, warehousestock_after_movement, warehousestock_after_using_demand, merge_periods)
        console.log(erfasste_Lieferungen)


        //xml output
        var bestellungen_dict = {}
        var e
        for (e of Object.keys(erfasste_Lieferungen)) {
            var item
            for (item of Object.keys(erfasste_Lieferungen[e])) {
                if (Object.keys(bestellungen_dict).includes(item)) {
                    if (bestellungen_dict[item]['bestellart'] == erfasste_Lieferungen[e][item]['bestellart']) {
                        bestellungen_dict[item]['menge'] = bestellungen_dict[item]['menge'] + erfasste_Lieferungen[e][item]['menge']
                    } else {
                        bestellungen_dict[item] = {
                            'ankunft': erfasste_Lieferungen[e][item]['ankunft'],
                            'menge': erfasste_Lieferungen[e][item]['menge'],
                            'bestellart': erfasste_Lieferungen[e][item]['bestellart'],
                        }
                    }
                }
                else {
                    bestellungen_dict[item] = {
                        'ankunft': erfasste_Lieferungen[e][item]['ankunft'],
                        'menge': erfasste_Lieferungen[e][item]['menge'],
                        'bestellart': erfasste_Lieferungen[e][item]['bestellart'],
                    }
                }
            }
        }
        erfasste_Lieferungen = bestellungen_dict
        console.log('create_xml')
        console.log(erfasste_Lieferungen)
        console.log(production)
        console.log(working_hours)
        console.log(params)
        var input = this.create_xml(params, erfasste_Lieferungen, production, working_hours)

        console.log('bestellungen')
        console.log(erfasste_Lieferungen)

        let bestellungen2= erfasste_Lieferungen;
        // #### bestellungen json , umwandeln
        let bestellungenState = {}

        // eindeutige states, für handleOnChange. Realisiert indem die Struktur des JSON zum stateNamen wird
        Object.keys(bestellungen2).map( E => {
            let zwischenJSON = { }
            Object.keys(bestellungen2[E]).map( attributes => {
                    // Bonus: wenn ein Wert unter diesem key bereits existiert, addiere den Wert
                    // if ( bestellungenState[`${E}_${attributes}`] ) bestellungenState[`${E}_${attributes}`] += bestellungen2[E][attributes]


                    // bestellungenState[`${E}_${attributes}`] = bestellungen2[E][attributes]

                    console.log(attributes) // ankunft  // menge // bestellart
                    zwischenJSON[`${E}_${attributes}`] = bestellungen2[E][attributes]  // { ankunft: 34 , }
                })
                bestellungenState[E] = zwischenJSON;
        })

        localStorage.set('bestellungen', bestellungenState)

        return dispo_dict
    }

    reSizeTableOnBerrechnungAnzeigen = () => {
        let variable = document.getElementById('bigTableDiv').style.right
        variable.length == 0 
            ? document.getElementById('bigTableDiv').style.right = '320px'
            : document.getElementById('bigTableDiv').style.right = ''
    }

    anzeigenBerrechnungProdukt1 = () => {
        this.reSizeTableOnBerrechnungAnzeigen();
        this.setState({ displayProdukt1: !this.state.displayProdukt1})
    }
    anzeigenBerrechnungProdukt2 = () => {
        this.reSizeTableOnBerrechnungAnzeigen();
        this.setState({ displayProdukt2: !this.state.displayProdukt2}
    )}
    anzeigenBerrechnungProdukt3 = () => {
        this.reSizeTableOnBerrechnungAnzeigen();
        this.setState({ displayProdukt3: !this.state.displayProdukt3}
    )}

    epsProdukt1 = () => {
        if (!this.state.epsProdukt1Angewand ) this.stücklistenAuflösungReduktion(1);


        // let fertigungsaufträge1_original = localStorage.get('fertigungsaufträge1_original');
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        // let better_engpass = localStorage.get('better_engpass')
        // console.log(fertigungsaufträge1);
        // console.log(better_engpass)
        // Object.keys(fertigungsaufträge1[1]).map( number => {
            // if( better_engpass[1][number]){
                // fertigungsaufträge1[1][number][`menge${number}`] = fertigungsaufträge1_original[1][number][`menge${number}`] - better_engpass[1][number]
                // localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
                // this.setState({ fertigungsaufträge: this.state.fertigungsaufträge, epsProdukt1Angewand: true})
                // localStorage.set('epsProdukt1Angewand_storage', true)
            // }
        // })
        this.setÜbersetzung(fertigungsaufträge1)
        this.setState({ fertigungsaufträge: this.state.fertigungsaufträge, epsProdukt1Angewand: true})
        localStorage.set('epsProdukt1Angewand_storage', true)
    }

    epsProdukt2 = () => {
        if (!this.state.epsProdukt2Angewand)this.stücklistenAuflösungReduktion(2);

        // let fertigungsaufträge1_original = localStorage.get('fertigungsaufträge1_original');
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        // let better_engpass = localStorage.get('better_engpass')
        // console.log(fertigungsaufträge1);
        // console.log(better_engpass)
        // Object.keys(fertigungsaufträge1[2]).map( number => {
        //     if( better_engpass[2][number]){
        //         fertigungsaufträge1[2][number][`menge${number}`] = fertigungsaufträge1_original[2][number][`menge${number}`] - better_engpass[2][number]
        //         localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
        //         this.setState({ fertigungsaufträge: this.state.fertigungsaufträge, epsProdukt2Angewand: true})
        //         localStorage.set('epsProdukt2Angewand_storage', true)
        //     }
        // })
        this.setÜbersetzung(fertigungsaufträge1)
        this.setState({ fertigungsaufträge: this.state.fertigungsaufträge, epsProdukt2Angewand: true})
        localStorage.set('epsProdukt2Angewand_storage', true)

    }

    epsProdukt3 = () => {
        if (!this.state.epsProdukt3Angewand)this.stücklistenAuflösungReduktion(3);

        // let fertigungsaufträge1_original = localStorage.get('fertigungsaufträge1_original');
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        // let ffx_engpass = localStorage.get('ffx_engpass')
        // let better_engpass = localStorage.get('better_engpass')
        // console.log('ffx_x')
        // console.log(fertigungsaufträge1);
        // console.log(better_engpass)
        // Object.keys(fertigungsaufträge1[3]).map( number => {
        //     let a = ffx_engpass[3][number]
        //     let b = fertigungsaufträge1[3][number][`menge${number}`]
        //     if( a-b < 0){
        //         fertigungsaufträge1[3][number][`menge${number}`] = a
        //         localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
        //         this.setState({ fertigungsaufträge: this.state.fertigungsaufträge})
                // this.setState({ fertigungsaufträge: this.state.fertigungsaufträge, epsProdukt3Angewand: true})
                // localStorage.set('epsProdukt3Angewand_storage', true)
        //     }
        // })
        this.setState({ fertigungsaufträge: this.state.fertigungsaufträge, epsProdukt3Angewand: true})
        localStorage.set('epsProdukt3Angewand_storage', true)
        this.setÜbersetzung(fertigungsaufträge1)
        // 24.01 copied state setting



    }

    stücklistenAuflösungReduktion = (variante, evt) => {
        let maxValue = this.getMaxValueOf_better_engpass(variante)
        this.reduceAllValuesOf_fertigungsaufträge1_by(variante, maxValue)
    }

    reduceAllValuesOf_fertigungsaufträge1_by = (variante, maxValue) => {
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        Object.keys(fertigungsaufträge1[variante]).map( number => {
            fertigungsaufträge1[variante][number][`menge${number}`] = fertigungsaufträge1[variante][number][`menge${number}`] - maxValue
        })

        localStorage.set('fertigungsaufträge1', fertigungsaufträge1)
        this.setState({fertigungsaufträge1: fertigungsaufträge1})
    }

    getMaxValueOf_better_engpass = (variante) => {
        let better_engpass = localStorage.get('better_engpass')

        let max_Value = 0
        Object.keys(better_engpass[variante]).map(number => {
            let value = better_engpass[variante][number]
            if (value > max_Value) max_Value = value
        })
        return max_Value
    }

    stücklistenAuflösungReduktion2 = (variante, evt) => {
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        let better_engpass = localStorage.get('better_engpass')
        let ffx_engpass = localStorage.get('ffx_engpass')

        var p1_verrechnung = {
            1:[26,51,16,17,50,4,10,49,7,13,18],
            51:[16,17,50,4,10,49,7,13,18],
            50:[4,10,49,7,13,18],
            49:[7,13,18],
            13:[],18:[],
            10:[],
            7:[],
            4:[],
            16:[],
            17:[],
            26:[],
        }

        var p2_verrechnung = {2:[26,56,16,17,55,5,11,54,8,14,19],
            56:[16,17,55,5,11,54,8,14,19],
            55:[5,11,54,8,14,19],
            54:[8,14,19],
            26:[],
            16:[],17:[],
            5:[],11:[],
            8:[],14:[],19:[]}
        var p3_verrechnung = {3:[26,31,16,17,30,6,12,29,9,15,20],
            31:[16,17,30,6,12,29,9,15,20],
            30:[6,12,29,9,15,20],
            29:[9,15,20],
            26:[],
            16:[],
            17:[],
            6:[],
            12:[],
            9:[],15:[],20:[]}



        const Reihenfolge1 = [ 1, 51 , 50 , 49,  26 , 16 , 17 , 50 , 4 , 10 , , 7 , 13 , 18 ]
        const Reihenfolge2 = [ 2, 56, 55, 54 ,26  , 16 , 17 , 5 , 11 , 8 , 14, 19 ]
        const Reihenfolge3 = [ 3, 31, 30, 29 , 26 , 16 , 17  , 6 , 12  , 9 , 15 , 20 ]


        if (variante == 1 ) {
            console.log('')
            console.log('')
            console.log('')
            console.log('Produkt 1 EPS Berrechnung')
            Reihenfolge1.map( number => {
                number = parseInt(number)
                console.log('')
                console.log('')
                console.log('')
                console.log('Kaufteil: ', number)
                console.log('TREFFER')
                console.log(better_engpass[1][number])
                let treffer
                if ( better_engpass[1][number] ) {
                    // alert('better_engpass[1][number]')
                    treffer = true;
                }

                let product_number = variante
                let product_entry = number
                let a = better_engpass[1][number]
                let b = fertigungsaufträge1[1][number][`menge${number}`] //ff10
                let differenze = a

                if (treffer) {
                    console.log('product_number', product_number)
                    console.log('a', a)
                    console.log('b', a)
                    console.log('differenze', differenze)
                }
                if( better_engpass[1][number]){ //
                    if (product_number == 1 && treffer)  {





                        p1_verrechnung[product_entry].map( entry => {
                            if (fertigungsaufträge1[1][entry]) {
                                fertigungsaufträge1[1][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[1][entry][`menge${entry}`] - differenze )
                                // if ( fertigungsaufträge1[1][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[1][entry][`menge${entry}`] = 0
                            }
                        })
                        fertigungsaufträge1[1][number][`menge${number}`] = fertigungsaufträge1[1][number][`menge${number}`] - differenze
                    }
                }
            })
            // fertigungsaufträge1[1][1][`menge1`] = better_engpass[1][1]
        }


        if (variante == 2 ) {
            Reihenfolge2.map( number => {
                let product_number = variante
                // let product_name = evt.target.name.slice(2,evt.target.name.length)
                let product_entry = number
                let a = better_engpass[2][number]
                let b = fertigungsaufträge1[2][number][`menge${number}`]
                let differenze = fertigungsaufträge1[2][product_entry][`menge${product_entry}`] - better_engpass[2][number]
                if( a-b < 0){ //

                    if (product_number == 2 && better_engpass[2][number]) {
                        p2_verrechnung[product_entry].map( entry => {
                            if (fertigungsaufträge1[2][entry]) {
                                console.log('entry', entry)
                                console.log(fertigungsaufträge1[2][entry][`menge${entry}`])
                                console.log(differenze)
                                fertigungsaufträge1[2][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[2][entry][`menge${entry}`] - differenze )
                                // if ( fertigungsaufträge1[2][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[2][entry][`menge${entry}`] = 0
                                // fertigungsaufträge1[2][number][`menge${number}`] = better_engpass[2][number]

                            }
                        })
                        fertigungsaufträge1[2][number][`menge${number}`] = fertigungsaufträge1[2][number][`menge${number}`] - differenze

                    }
                }
            })
        }

        if (variante == 3 ) {
            Reihenfolge3.map( number => {
                let a = better_engpass[3][number]
                let b = fertigungsaufträge1[3][number][`menge${number}`]
                if( a-b < 0){ //


                    // reduziere alle Einträge
                    let product_number = variante
                    // let product_name = evt.target.name.slice(2,evt.target.name.length)
                    let product_entry = number

                    // ################################################################# wenn von p1 weniger produziert werden, dann von allen abhängigen auch nicht


                    let differenze = fertigungsaufträge1[3][product_entry][`menge${product_entry}`] - better_engpass[3][number]
                    if (product_number == 3 && better_engpass[3][number]) {
                        p3_verrechnung[product_entry].map( entry => {
                            if (fertigungsaufträge1[3][entry]) {
                                console.log('entry', entry)
                                console.log(fertigungsaufträge1[3][entry][`menge${entry}`])
                                console.log(differenze)
                                fertigungsaufträge1[3][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[3][entry][`menge${entry}`] - differenze )
                                // if ( fertigungsaufträge1[3][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[3][entry][`menge${entry}`] = 0
                                // fertigungsaufträge1[3][number][`menge${number}`] = better_engpass[3][number]

                            }
                        })
                        fertigungsaufträge1[3][number][`menge${number}`] = fertigungsaufträge1[3][number][`menge${number}`] - differenze

                    }
                }
            })
        }


        localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
        this.setState({ fertigungsaufträge: this.state.fertigungsaufträge})

    }

    handleReset1 = (e) => {
		e.preventDefault();
        const fertigungsaufträge_safe = localStorage.get('fertigungsaufträge1_original');
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        fertigungsaufträge1[1] = fertigungsaufträge_safe[1]
        console.log(fertigungsaufträge_safe)
        localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
        this.setState({epsProdukt1Angewand: false})
        localStorage.set('epsProdukt1Angewand_storage',false)

        // um differenzen bei reset zu erfassen für Reihenfolgen
        let first_big_fertigungsaufträge_original_this_view = localStorage.get('first_big_fertigungsaufträge_original_this_view') // das erste fertigungsaufträge
        localStorage.set('fertigungsaufträge', first_big_fertigungsaufträge_original_this_view)  // DA!

        this.setÜbersetzung(fertigungsaufträge1)


        let safe_better_engpass = localStorage.get('safe_better_engpass')
        let better_engpass = localStorage.get('better_engpass')

        better_engpass[1] = safe_better_engpass[1]
        localStorage.set('better_engpass', better_engpass)
    }
    handleReset2 = (e) => {
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
		e.preventDefault();
        const fertigungsaufträge_safe = localStorage.get('fertigungsaufträge1_original');
        fertigungsaufträge1[2] = fertigungsaufträge_safe[2]
        console.log(fertigungsaufträge_safe)
        localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
        this.setState({epsProdukt2Angewand: false})
        localStorage.set('epsProdukt2Angewand_storage',false)

        let first_big_fertigungsaufträge_original_this_view = localStorage.get('first_big_fertigungsaufträge_original_this_view') // das erste fertigungsaufträge
        localStorage.set('fertigungsaufträge', first_big_fertigungsaufträge_original_this_view)  // DA!
        this.setÜbersetzung(fertigungsaufträge1)

        let safe_better_engpass = localStorage.get('safe_better_engpass')
        let better_engpass = localStorage.get('better_engpass')

        better_engpass[2] = safe_better_engpass[2]
        localStorage.set('better_engpass', better_engpass)

    }
    handleReset3 = (e) => {
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        e.preventDefault();

        const fertigungsaufträge_safe = localStorage.get('fertigungsaufträge1_original');
        fertigungsaufträge1[3] = fertigungsaufträge_safe[3]
        console.log(fertigungsaufträge_safe)
        localStorage.set('fertigungsaufträge1',fertigungsaufträge1)
        this.setState({epsProdukt3Angewand: false})
        localStorage.set('epsProdukt3Angewand_storage',false)

        let first_big_fertigungsaufträge_original_this_view = localStorage.get('first_big_fertigungsaufträge_original_this_view') // das erste fertigungsaufträge
        localStorage.set('fertigungsaufträge', first_big_fertigungsaufträge_original_this_view)  // DA!
        this.setÜbersetzung(fertigungsaufträge1)

        let safe_better_engpass = localStorage.get('safe_better_engpass')
        let better_engpass = localStorage.get('better_engpass')

        better_engpass[3] = safe_better_engpass[3]
        localStorage.set('better_engpass', better_engpass)

    }

    setÜbersetzung = (fertigungsaufträge1) => {
        let übersetzung = {}
        Object.keys(fertigungsaufträge1).map( outerProduct => {
            Object.keys(fertigungsaufträge1[outerProduct]).map( innerNumber => {
                let artikel = parseInt(fertigungsaufträge1[outerProduct][innerNumber][`artikel${innerNumber}`])
                let menge = parseInt(fertigungsaufträge1[outerProduct][innerNumber][`menge${innerNumber}`])
                console.log(menge)
                if (menge < 0 ) menge = 0

                if  (übersetzung[innerNumber] && (innerNumber == 26 ||innerNumber == 16 || innerNumber == 17 )) {
                    übersetzung[innerNumber][`menge${innerNumber}`] = parseInt(übersetzung[innerNumber][`menge${innerNumber}`] + menge)
                }
                if  (!übersetzung[innerNumber]) {
                    übersetzung[innerNumber] = {[`artikel${innerNumber}`]: artikel, [`menge${innerNumber}`] : menge}
                }
                // if (!übersetzung[innerNumber][`menge${innerNumber}`]) übersetzung[innerNumber][`menge${innerNumber}`] = {[`menge${innerNumber}`]:
            })
        })
        console.log('übersetzung_x' ,übersetzung)
        this.setState({übersetzung: übersetzung, changeDetected: true})

    }

    updateErzeugnise_from_Reihenfolge = () => {
        let { fertigungsaufträge } = this.state;
        let fertigungsaufträgeX = localStorage.get('fertigungsaufträge1')

        let fertigungsaufträge1;
        if ( fertigungsaufträgeX ) fertigungsaufträge1 = fertigungsaufträgeX
        if ( !fertigungsaufträgeX) fertigungsaufträge1 = fertigungsaufträge

        var p1_verrechnung = {
            1:[26,51,16,17,50,4,10,49,7,13,18],
            51:[16,17,50,4,10,49,7,13,18],
            50:[4,10,49,7,13,18],
            49:[7,13,18],
            13:[],18:[],
            10:[],
            7:[],
            4:[],
            16:[],
            17:[],
            26:[],
        }

        var p2_verrechnung = {2:[26,56,16,17,55,5,11,54,8,14,19],
            26:[],56:[16,17,55,5,11,54,8,14,19],
        16:[],17:[],55:[5,11,54,8,14,19],
        5:[],11:[],54:[8,14,19],
        8:[],14:[],19:[]}
        var p3_verrechnung = {3:[26,31,16,17,30,6,12,29,9,15,20],
            26:[],31:[16,17,30,6,12,29,9,15,20],
            16:[],17:[],30:[6,12,29,9,15,20],
            6:[],12:[],29:[9,15,20],
            9:[],15:[],20:[]}


        let Änderungen = localStorage.get('Änderungen')

        if (Änderungen != 2 ) {
            //alert(Änderungen)
            Änderungen.map( json => {
                Object.keys(json).map( aString => {


                //alert(aString)

                let product_number = aString[0]
                let product_name = aString.slice(2,aString.length)
                let product_entry = aString.slice(7,aString.length)
                let menge = json[aString]
                //alert(menge)

                // ################################################################# wenn von p1 weniger produziert werden, dann von allen abhängigen auch nicht
                if (product_number == 1) {
                    p1_verrechnung[product_entry].map( entry => {
                        if (fertigungsaufträge1[1][entry]) {
                            let differenze = menge
                            console.log('entry', entry)
                            console.log(fertigungsaufträge1[1][entry][`menge${entry}`])
                            console.log(differenze)
                            fertigungsaufträge1[1][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[1][entry][`menge${entry}`] + differenze )
                            // if ( fertigungsaufträge1[1][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[1][entry][`menge${entry}`] = 0

                        }
                    })
                }

                if (product_number == 2) {
                    p2_verrechnung[product_entry].map( entry => {
                        if (fertigungsaufträge1[2][entry]) {
                            let differenze =  menge
                            console.log('entry', entry)
                            console.log(fertigungsaufträge1[2][entry][`menge${entry}`])
                            console.log(differenze)
                            fertigungsaufträge1[2][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[2][entry][`menge${entry}`] + differenze )
                            // if ( fertigungsaufträge1[2][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[2][entry][`menge${entry}`] = 0

                        }
                    })
                }

                if (product_number == 3) {
                    p3_verrechnung[product_entry].map( entry => {
                        if (fertigungsaufträge1[3][entry]) {
                            let differenze = menge
                            console.log('entry', entry)
                            console.log(fertigungsaufträge1[3][entry][`menge${entry}`])
                            console.log(differenze)
                            fertigungsaufträge1[3][entry][`menge${entry}`] = parseInt(fertigungsaufträge1[3][entry][`menge${entry}`] + differenze )
                            // if ( fertigungsaufträge1[3][entry][`menge${entry}`] < 0 ) fertigungsaufträge1[3][entry][`menge${entry}`] = 0

                        }
                    })
                }
                })
            })
        }

        this.setState({fertigungsaufträge1: fertigungsaufträge1})
        localStorage.set('fertigungsaufträge1',fertigungsaufträge1)

        localStorage.set('Änderungen', 2)
    }

    colorIt = () => {
        document.getElementById('colorIt').style.color = 'green'
    }

    ananasDispoDict_berrechnung_ausführen = () => {
        console.log(this.refs)
        console.log(this.refs)
        console.log(this.refs.child)
        this.refs.child.alertMe();
    }

    triggerChildAlert = () => {
        console.log(this.child.current)
        console.log(this.child.current.alertMe)
        console.log(this.child.current.alertMe())
        this.child.current.alertMe();
    }

    // clickChild = () => {
    //     this.dispo_function(true, true, this.state.übersetzung)
    // }

    wrapperDispo = () => {
        alert('DU NUTTE')
        this.clickChild()
        this.setState({ bambolezed: true})
    }

    render() {
        let get_production_order = localStorage.get('get_production_order')

        var verwendung_p1_v2 = {
            1: { 21: 1, 24: 1, 27: 1 }, 26: { 44: 2, 47: 1, 48: 2 }, 51: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1, 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 50: { 24: 2, 25: 2 },
            4: { 35: 2, 36: 1, 52: 1, 53: 36 }, 10: { 32: 1, 39: 1 }, 49: { 24: 2, 25: 2 },
            7: { 35: 2, 37: 1, 38: 1, 52: 1, 53: 36 },
            13: { 32: 1, 39: 1 }, 18: { 28: 3, 32: 1, 59: 2 }
        }

        var verwendung_p2_v2 = {
            2: { 22: 1, 24: 1, 27: 1 }, 26: { 44: 2 , 47: 1 , 48: 2  }, 56: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1 , 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 55: { 24: 2, 25: 2 },
            5: { 35: 2, 36: 1, 57: 1, 58: 36 }, 11: { 32: 1, 39: 1 }, 54: { 24: 2, 25: 2 }, 8: { 35: 2, 37: 1, 38: 1, 57: 1, 58: 36 },
            14: { 32: 1, 39: 1 }, 19: { 28: 4, 32: 1, 59: 2 }
        }

        var verwendung_p3_v2 = {
            3: { 23: 1, 24: 1, 27: 1 }, 26: { 44: 2 , 47: 1 , 48: 2  }, 31: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1 , 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 30: { 24: 2, 25: 2 },
            6: { 35: 2, 36: 1, 33: 1, 34: 36 }, 12: { 32: 1, 39: 1 }, 29: { 24: 2, 25: 2 }, 9: { 35: 2, 37: 1, 38: 1, 33: 1, 34: 36 },
            15: { 32: 1, 39: 1 }, 20: { 28: 5, 32: 1, 59: 2 }
        }
        // localStorage.clear()

        let eps_p1_bedarfProProdukt = localStorage.get('eps_p1_bedarfProProdukt')
        let eps_p2_bedarfProProdukt = localStorage.get('eps_p2_bedarfProProdukt')
        let eps_p3_bedarfProProdukt = localStorage.get('eps_p3_bedarfProProdukt')
        let eps_gesamtbedarf = localStorage.get('eps_gesamtbedarf')
        let eps_PRObedarf = localStorage.get('eps_%Bedarf')


        let ffx_engpass = localStorage.get('ffx_engpass')

        var bezeichnerErz = {
            1:`${this.props.t('manufacturesnames.1')}`,
            2:`${this.props.t('manufacturesnames.2')}`,
            3:`${this.props.t('manufacturesnames.3')}`,
            4:`${this.props.t('manufacturesnames.4')}`,
            5:`${this.props.t('manufacturesnames.5')}`,
            6:`${this.props.t('manufacturesnames.6')}`,
            7:`${this.props.t('manufacturesnames.7')}`,
            8:`${this.props.t('manufacturesnames.8')}`,
            9:`${this.props.t('manufacturesnames.9')}`,
            10:`${this.props.t('manufacturesnames.10')}`,
            11:`${this.props.t('manufacturesnames.11')}`,
            12:`${this.props.t('manufacturesnames.12')}`,
            13:`${this.props.t('manufacturesnames.13')}`,
            14:`${this.props.t('manufacturesnames.14')}`,
            15:`${this.props.t('manufacturesnames.15')}`,
            16:`${this.props.t('manufacturesnames.16')}`,
            17:`${this.props.t('manufacturesnames.17')}`,
            18:`${this.props.t('manufacturesnames.18')}`,
            19:`${this.props.t('manufacturesnames.19')}`,
            20:`${this.props.t('manufacturesnames.20')}`,
            26:`${this.props.t('manufacturesnames.26')}`,
            29:`${this.props.t('manufacturesnames.29')}`,
            30:`${this.props.t('manufacturesnames.30')}`,
            31:`${this.props.t('manufacturesnames.31')}`,
            49:`${this.props.t('manufacturesnames.49')}`,
            50:`${this.props.t('manufacturesnames.50')}`,
            51:`${this.props.t('manufacturesnames.51')}`,
            54:`${this.props.t('manufacturesnames.54')}`,
            55:`${this.props.t('manufacturesnames.55')}`,
            56:`${this.props.t('manufacturesnames.56')}`,
        }

        var bezeichnerKaufteile = {
            21:`${this.props.t('partnames.21')}`,
            22:`${this.props.t('partnames.22')}`,
            23:`${this.props.t('partnames.23')}`,
            24:`${this.props.t('partnames.24')}`,
            25:`${this.props.t('partnames.25')}`,
            27:`${this.props.t('partnames.27')}`,
            28:`${this.props.t('partnames.28')}`,
            32:`${this.props.t('partnames.32')}`,
            33:`${this.props.t('partnames.33')}`,
            34:`${this.props.t('partnames.34')}`,
            35:`${this.props.t('partnames.35')}`,
            36:`${this.props.t('partnames.36')}`,
            37:`${this.props.t('partnames.37')}`,
            38:`${this.props.t('partnames.38')}`,
            39:`${this.props.t('partnames.39')}`,
            40:`${this.props.t('partnames.40')}`,
            41:`${this.props.t('partnames.41')}`,
            42:`${this.props.t('partnames.42')}`,
            43:`${this.props.t('partnames.43')}`,
            44:`${this.props.t('partnames.44')}`,
            45:`${this.props.t('partnames.45')}`,
            46:`${this.props.t('partnames.46')}`,
            47:`${this.props.t('partnames.47')}`,
            48:`${this.props.t('partnames.48')}`,
            52:`${this.props.t('partnames.52')}`,
            53:`${this.props.t('partnames.53')}`,
            57:`${this.props.t('partnames.57')}`,
            58:`${this.props.t('partnames.58')}`,
            59:`${this.props.t('partnames.59')}`,
        }

        let absolute_better_engpass = localStorage.get('absolute_better_engpass')
        console.log('absolute_better_engpass', absolute_better_engpass)


        let { fertigungsaufträge, epsProdukt1Angewand, epsProdukt2Angewand, epsProdukt3Angewand } = this.state;
        let dispo_dict = localStorage.get('super_dispo_dict')
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')


        console.log('c_')
        console.log(fertigungsaufträge1)

        const Reihenfolge1 = [ 1, 26 , 51 , 16 , 17 , 50 , 4 , 10 , 49, 7 , 13 , 18 ]
        const Reihenfolge2 = [ 2, 26 , 56 , 16 , 17 , 55 , 5 , 11 , 54, 8 , 14, 19 ]
        const Reihenfolge3 = [ 3, 26, 31 , 16 , 17 , 30 , 6 , 12 , 29 , 9 , 15 , 20 ]

    const { displayProdukt1 ,    displayProdukt2 ,    displayProdukt3, changeDetected} = this.state;
    let engpasssteuerung_dispo_dict = localStorage.get('sascha_engpasssteuerung')
    console.log('bier')
    console.log(engpasssteuerung_dispo_dict)

    let better_engpass = localStorage.get('better_engpass')
    console.log('better')
    console.log(better_engpass)

    let menge = localStorage.get('menge')
    let produktion = localStorage.get('produktion')
    let eventuelleZugänge = localStorage.get('eventuelleZugänge')
    let minus = localStorage.get('minus')
    let minus_after_trippeling = localStorage.get('minus_after_trippeling')

    let single_product_use = [21,22,23,33,34,52,53,57,58]


    var verwendung = {
        1: {
            21: 1, 22: 0, 23: 0, 24: 7, 25: 4, 27: 2, 28: 4, 32: 3, 33: 0, 34: 0, 35: 4, 36: 1, 37: 1, 38: 1,
            39: 2, 40: 1, 41: 1, 42: 2, 43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 2, 53: 72, 57: 0, 58: 0, 59: 2
        },
        2: {
            21: 0, 22: 1, 23: 0, 24: 7, 25: 4, 27: 2, 28: 5, 32: 3, 33: 0, 34: 0, 35: 4, 36: 1, 37: 1, 38: 1, 39: 2, 40: 1, 41: 1, 42: 2,
            43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 0, 53: 0, 57: 2, 58: 72, 59: 2
        },
        3: {
            21: 0, 22: 0, 23: 1, 24: 7, 25: 4, 27: 2, 28: 6, 32: 3, 33: 2, 34: 72, 35: 4, 36: 1, 37: 1, 38: 1, 39: 2, 40: 1, 41: 1, 42: 2,
            43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 0, 53: 0, 57: 0, 58: 0, 59: 2
        }
    }

    var erzeugnisse = {
        1: {
            21: [1], 24: [1, 51, 16, 50, 49], 25: [50, 49], 27: [1, 51], 28: [16, 18], 32: [10, 13, 18],
            35: [4, 7], 36: [4], 37: [7], 38: [7], 39: [10, 13], 40: [16], 41: [16], 42: [16],
            43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 52: [4, 7], 53: [4, 7], 59: [18]
        },
        2: {
            22: [2], 24: [2, 56, 16, 55, 54], 25: [55, 54], 27: [2, 56], 28: [16, 19], 32: [11, 14, 19],
            35: [5, 8], 36: [5], 37: [8], 38: [8], 39: [11, 14], 40: [16], 41: [16], 42: [16],
            43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 59: [19], 57: [5, 8], 58: [5, 8]
        },
        3: {
            23: [3], 24: [3, 31, 16, 30, 29], 25: [30, 29], 27: [3, 31], 28: [16, 20], 32: [12, 15, 20],
            35: [6, 9], 36: [6], 37: [9], 38: [9], 39: [12, 15], 40: [16], 41: [16], 42: [16],
            43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 59: [20], 33: [6, 9], 34: [6, 9]
        }
    }

    let maxminusP1 = 0
    let maxMinusp2 = 0
    let maxMinusp3 = 0

    let minusP1 = []
    let minusP2 = []
    let minusP3 = []

    Object.keys(minus).map( number => {
        // innerhalb verwendung sein , entweder p1 p2 p3
        Object.keys(verwendung).map( outernumber => {
            verwendung[outernumber][number] > 0  && outernumber == 1 && minusP1.push(number) // [22,34,54] alles was zu p1 gehört
            verwendung[outernumber][number] > 0  && outernumber == 2 && minusP2.push(number)
            verwendung[outernumber][number] > 0  && outernumber == 3 && minusP3.push(number)
        })
    })

    var p1_iteration = { 18:[49,50,51,1],13:[49,50,51,1],7:[49,50,51,1],
        49:[50,51,1],10:[50,51,1],4:[50,51,1],
        50:[51,1],17:[51,1],16:[51,1],
        51:[1], 26:[1]}
    var p2_iteration = { 19:[54,55,56,2],14:[54,55,56,2],8:[54,55,56,2],
        54:[55,56,2],11:[55,56,2],5:[55,56,2],
        55:[56,2],17:[56,2],16:[56,2],
        56:[2], 26:[2]}
    var p3_iteration = { 20:[29,30,31,3],15:[29,30,31,3],9:[29,30,31,3],
        29:[30,31,3],12:[30,31,3],6:[30,31,3],
        30:[31,3],17:[31,3],16:[31,3],
        31:[3], 26:[3]}

        let missingErzeugnisseP1 = [];
        let missingErzeugnisseP2 = [];
        let missingErzeugnisseP3 = [];

        let missingErzeugnisseP1_Menge = []
        let missingErzeugnisseP2_Menge = []
        let missingErzeugnisseP3_Menge = []

        let better_engpass_color = localStorage.get('better_engpass_color')

        console.log('nee')
        console.log(minusP3)

        minusP1 && minusP1.map(number => {
            erzeugnisse[1][number] && erzeugnisse[1][number].map( entry => {
                if (!missingErzeugnisseP1.includes(entry)) {
                    missingErzeugnisseP1.push(entry)    // 17  wird  [ 1, 53 ]
                }
            })
        })

        minusP2 && minusP2.map(number => {
            erzeugnisse[2][number] && erzeugnisse[2][number].map( entry => {
                if (!missingErzeugnisseP2.includes(entry)) {
                    missingErzeugnisseP2.push(entry)    // 17  wird  [ 1, 53 ]

                }
            })
        })
        minusP3 && minusP3.map(number => {
            erzeugnisse[3][number] && erzeugnisse[3][number].map( entry => {
                if (!missingErzeugnisseP3.includes(entry)) {
                    missingErzeugnisseP3.push(entry)    // 17  wird  [ 1, 53 ]

                }
            })
        })
        console.log(missingErzeugnisseP1)
        console.log(missingErzeugnisseP2)
        console.log(missingErzeugnisseP3)

        // minusP1 && minusP1.map(number => {
        //     erzeugnisse[1][number].map( e_number => {
        //         Math.ceil(minus_after_trippeling[number]) / verwendung[3][number]
        //     })
        // })



        // missingErzeugnisseP1.map( entry => {
        //     p1_iteration[entry].map( (treffer) => console.log(treffer))
        // })
        let product3 = Array.from(document.getElementsByName('product3'))
        product3.map( erzeugnis => {

        })

        let redOutline


        return (
            <React.Fragment>
                {/* <div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'}}> */}
                <div style={{ padding: '30px', margin: '0px 115px 0 120px'  }}>
                <table style={{backgroundColor:'#c1c1bf',margin:'auto' }}>
                <div className='backgroundColor2' id='bigTableDiv' style={{ border: '3px solid#f0f0f0', padding: '0px 30px 35px 30px', position:'relative'}}>
                    <tbody>
                    <tr style={{visibility: 'hidden'}}> hello</tr>
                    <tr style={{visibility: 'hidden'}}> hello</tr>
                        <tr style={{ textAlign: 'center' , padding: '25px', position: 'relative', margin: '20px'}}>
                            {this.props.t('fertigungsauftraege.productnumber1')}
                            <Button className='myButtons backgroundColor1' 
                                id='product1_button'
                                style={{ marginLeft: '20px' ,position: '', right: '35%',
                                    background: 'rgb(250, 149, 129)',
                                    border: '2px solid ghostwhite',
                                    color: 'ghostwhite',
                                    marginLeft: '20px',
                                }}
                                onClick={this.anzeigenBerrechnungProdukt1}
                            > {this.props.t('fertigungsauftraege.calcview')}</Button>
                            <Button className='myButtons backgroundColor1' 
                                id=''
                                style={{ marginLeft: '20px' ,position: '', right: '35%',
                                    background: 'rgb(250, 149, 129)',
                                    border: '2px solid ghostwhite',
                                    color: 'ghostwhite',
                                    marginLeft: '20px',
                                }}
                                onClick={this.epsProdukt1}
                            > 
                                {this.props.t('fertigungsauftraege.useeps')}
                            </Button>
                            <Button className='myButtons backgroundColor1'    
                                onFocus={ this.handleFocus} 
                                onBlur={this.handleBlur}  
                                onClick={this.handleReset1} 
                                style={{
                                    background: 'rgb(250, 149, 129)',
                                    border: '2px solid ghostwhite',
                                    color: 'ghostwhite',
                                    margin: '20px',
                                    right: '56px'}}> 
                                {this.props.t('fertigungsauftraege.resetbutton')}
                            </Button>
                        </tr>
                        <tr>
                            <td style={{padding:'25px'}}>
                                <table style={{margin:'auto'}}>
                                    <tbody>
                                        <tr>
                                            <td> </td>
                                            <td>{this.props.t('fertigungsauftraege.article')}</td>
                                            { displayProdukt1 && <React.Fragment>
                                                <th className="tg-0pky"
                                                    style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.salesrequest')}</th>
                                                <th className="tg-0lax"
                                                    style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.transferqueue')}</th>
                                                <th className="tg-0lax"
                                                    style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.planningstockvalue')}</th>
                                                <th className="tg-0lax"
                                                    style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.availablestockvalue')}</th>
                                                <th className="tg-0lax"
                                                    style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.queue')}</th>
                                                <th className="tg-0lax"
                                                    style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.workingorder')}</th>
                                                <th class="tg-0lax" style={{ padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.nichteps')}</th>
                                                </React.Fragment>
                                            }
                                            <td style={{ padding: '0 0 0 15px'}}>
                                                <div  style={{ padding: '0 0 0 15px'}}>{this.props.t('fertigungsauftraege.amount')} </div>
                                            </td>
                                        </tr>
                                        { this.state.fertigungsaufträge &&   Reihenfolge1.map( (number) =>
                                            <tr>
                                                    <td> {bezeichnerErz[number]}</td>
                                                    <td>
                                                        <input style={{ margin: '0 5px 0 0 '}} onChange={this.handleChange} tabindex='-1'
                                                        key={'a'+ number } type="number" autoComplete='off' size="4" name={number} value={number} maxLength="5" type="text" />
                                                    </td>
                                                    { displayProdukt1 && <React.Fragment>
                                                    <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> { dispo_dict[1][number].sales_order}</td>
                                                    <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> +{ dispo_dict[1][number].tf_waiting_item}</td>
                                                    <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> +{ dispo_dict[1][number].planned_stock}</td>
                                                    <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[1][number].warehousestock }</td>
                                                    <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[1][number].waiting_items} </td>
                                                    <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[1][number].producing_items} </td>
                                                    <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ better_engpass[1][number]} </td>
                                                    </React.Fragment>
                                                }
                                                <td style={{ padding: '0 0 0 26px'}}>
                                                    {/* { console.log(`E${number}`)}
                                                    {console.log(fertigungsaufträge1[1][number][`menge${number}`], '- ', - ffx_engpass[1][number])} */}
                                                    { better_engpass[1][number] && !epsProdukt1Angewand && (
                                                        <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                        key={'b'+ number } style={{ outline: '3px solid red' }} type="number" autoComplete='off' size="4" name={`1_menge${number}`} value={fertigungsaufträge1[1][number][`menge${number}`] } maxLength="5" type="number" />
                                                    )}
                                                    {  better_engpass[1][number] && epsProdukt1Angewand && (
                                                        <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                        key={'b'+ number } type="number" autoComplete='off' size="4" name={`1_menge${number}`} value={fertigungsaufträge1[1][number][`menge${number}`] } maxLength="5" type="number" />
                                                    )}
                                                    {  !better_engpass[1][number]  && (
                                                        <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                        key={'b'+ number } type="number" autoComplete='off' size="4" name={`1_menge${number}`} value={fertigungsaufträge1[1][number][`menge${number}`] } maxLength="5" type="number" />
                                                    )}
                                                </td>
                                                    <div>
                                                </div>
                                            </tr>
                                        )}
									</tbody></table>
								</td>
							</tr>
                            <tr style={{visibility: 'hidden'}}> hello</tr>
                            <tr style={{visibility: 'hidden'}}> hello</tr>
                            <tr style={{ textAlign: 'center' , padding: '25px'}}> {this.props.t('fertigungsauftraege.productnumber2')}
                                <Button className='myButtons backgroundColor1' 
                                id='product2_button'
                                        style={{ marginLeft: '20px' ,position: '', right: '35%',
                                        background: 'rgb(250, 149, 129)',
                                        border: '2px solid ghostwhite',
                                        color: 'ghostwhite',
                                        marginLeft: '20px',
                                        }}


                                        onClick={this.anzeigenBerrechnungProdukt2}
                                    > {this.props.t('fertigungsauftraege.calcview')}</Button>
                                    <Button className='myButtons backgroundColor1' 
                                     id=''
                                        style={{ marginLeft: '20px' ,position: '', right: '35%',
                                        background: 'rgb(250, 149, 129)',
                                        border: '2px solid ghostwhite',
                                        color: 'ghostwhite',
                                        marginLeft: '20px',
                                        }}
                                        onClick={this.epsProdukt2}
                                    > {this.props.t('fertigungsauftraege.useeps')}</Button>
                                        <Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  onClick={this.handleReset2} style={{
                                            background: 'rgb(250, 149, 129)',
                                            border: '2px solid ghostwhite',
                                            color: 'ghostwhite',
                                            margin: '20px',
                                            right: '56px'}}> {this.props.t('fertigungsauftraege.resetbutton')}</Button>
                                        </tr>
                                    <tr style={{visibility: 'hidden'}}>hello </tr>
                                    <tr  style={{padding:'25px'}}>
                                        <table style={{margin:'auto'}}>
                                            <tbody><tr>
                                                <td></td>
                                                <td>{this.props.t('fertigungsauftraege.article')}</td>
                                                { displayProdukt2 && <React.Fragment>
                                                    <th className="tg-0pky"
                                                        style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.salesrequest')}</th>
                                                    <th className="tg-0lax"
                                                        style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.transferqueue')}</th>
                                                    <th className="tg-0lax"
                                                        style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.planningstockvalue')}</th>
                                                    <th className="tg-0lax"
                                                        style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.availablestockvalue')}</th>
                                                    <th className="tg-0lax"
                                                        style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.queue')}</th>
                                                    <th className="tg-0lax"
                                                        style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.workingorder')}</th>
                                                <th class="tg-0lax" style={{ padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.nichteps')}</th>
                                                {/* <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ better_engpass[1][number]} </td> */}
                                                </React.Fragment>
                                                }
                                                <td style={{ padding: '0 0 0 15px'}}>
                                             <div  style={{ padding: '0 0 0 15px'}}>{this.props.t('fertigungsauftraege.amount')} </div>
                                             </td>
                                            </tr>
                                        { this.state.fertigungsaufträge &&   Reihenfolge2.map( (number) =>
                                            <tr>
                                                <td> {bezeichnerErz[number]}</td>
                                                <td>
                                                    <input style={{ margin: '0 5px 0 0 '}} onChange={this.handleChange} tabindex='-1'
                                                    key={'a'+ number } type="number" autoComplete='off' size="4" name={number} value={number} maxLength="5" type="text" />
                                                </td>
                                                { displayProdukt2 && <React.Fragment>
                                                <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> { dispo_dict[2][number].sales_order}</td>
                                                <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> +{ dispo_dict[2][number].tf_waiting_item}</td>
                                                <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> +{ dispo_dict[2][number].planned_stock}</td>
                                                <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[2][number].warehousestock }</td>
                                                <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[2][number].waiting_items} </td>
                                                <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[2][number].producing_items} </td>
                                                {/* <th class="tg-0lax" style={{ padding: '0 0 0 20px'}}>nicht produzierbar (E.p.s)</th> */}
                                                <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ better_engpass[2][number]} </td>

                                                </React.Fragment> }
                                                <td style={{ padding: '0 0 0 26px'}}>
                                            { better_engpass[2][number] && !epsProdukt2Angewand && (
                                                 <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                 key={'b'+ number } style={{ outline: '3px solid red' }} type="number" autoComplete='off' size="4" name={`2_menge${number}`} value={fertigungsaufträge1[2][number][`menge${number}`] } maxLength="5" type="number" />
                                            )}
                                            { better_engpass[2][number] && epsProdukt2Angewand && (
                                                <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                key={'b'+ number } type="number" autoComplete='off' size="4" name={`2_menge${number}`} value={fertigungsaufträge1[2][number][`menge${number}`] } maxLength="5" type="number" />
                                            )}
                                            { !better_engpass[2][number]  && (
                                            <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                            key={'b'+ number } type="number" autoComplete='off' size="4" name={`2_menge${number}`} value={fertigungsaufträge1[2][number][`menge${number}`] } maxLength="5" type="number" />
                                            )}
                                            </td>
                                         
                                            </tr>
                                        )}
                                </tbody></table>
                            </tr>

                            <tr style={{visibility: 'hidden'}}> hello</tr>
                            <tr style={{visibility: 'hidden'}}> hello</tr>
                            <tr style={{ textAlign: 'center' , padding: '25px'}}> {this.props.t('fertigungsauftraege.productnumber3')}
                                <Button className='myButtons backgroundColor1' 
                                    id='product3_button'
                                    style={{ marginLeft: '20px' ,position: '', right: '35%',
                                    background: 'rgb(250, 149, 129)',
                                    border: '2px solid ghostwhite',
                                    color: 'ghostwhite',
                                    marginLeft: '20px',
                                    }}
                                        onClick={this.anzeigenBerrechnungProdukt3}
                                    > {this.props.t('fertigungsauftraege.calcview')}</Button>
                                <Button className='myButtons backgroundColor1' 
                                    id=''
                                    style={{ marginLeft: '20px' ,position: '', right: '35%',
                                        background: 'rgb(250, 149, 129)',
                                        border: '2px solid ghostwhite',
                                        color: 'ghostwhite',
                                        marginLeft: '20px',
                                    }}
                                    onClick={this.epsProdukt3}
                                > {this.props.t('fertigungsauftraege.useeps')}</Button>
                                <Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  onClick={this.handleReset3} style={{
                                    background: 'rgb(250, 149, 129)',
                                    border: '2px solid ghostwhite',
                                    color: 'ghostwhite',
                                    margin: '20px',
                                    right: '56px'}}> {this.props.t('fertigungsauftraege.resetbutton')}</Button>
                            </tr>
                            <tr style={{visibility: 'hidden'}}>hello </tr>
                            <tr style={{padding:'25px'}}>
                            <table style={{margin:'auto'}}>
                                <tbody>
                                    <tr>
                                    <td></td>
                                    <td>{this.props.t('fertigungsauftraege.article')}</td>
                                        { displayProdukt3 && <React.Fragment>
                                            <th className="tg-0pky"
                                                style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.salesrequest')}</th>
                                            <th className="tg-0lax"
                                                style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.transferqueue')}</th>
                                            <th className="tg-0lax"
                                                style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.planningstockvalue')}</th>
                                            <th className="tg-0lax"
                                                style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.availablestockvalue')}</th>
                                            <th className="tg-0lax"
                                                style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.queue')}</th>
                                            <th className="tg-0lax"
                                                style={{padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.workingorder')}</th>
                                    <th class="tg-0lax" style={{ padding: '0 0 0 20px'}}>{this.props.t('fertigungsauftraege.nichteps')}</th>
                                        {/* <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ better_engpass[1][number]} </td> */}
                                    </React.Fragment>
                                    }
                                    <td style={{ padding: '0 0 0 15px'}}>
                                        <div  style={{ padding: '0 0 0 15px'}}>{this.props.t('fertigungsauftraege.amount')} </div>
                                        </td>
                                        {/* <td style={{ whiteSpace: 'none', marginLeft: '15px'}} > {this.props.t('fertigungsauftraege.maxamount')} </td> */}
                                    </tr>
                                        { this.state.fertigungsaufträge &&   Reihenfolge3.map( (number) =>
                                            <tr>
                                                <td> {bezeichnerErz[number]}</td>
                                            <td>
                                                 <input style={{ margin: '0 5px 0 0 '}} onChange={this.handleChange} tabindex='-1'
                                                 key={'a'+ number } type="number" autoComplete='off' size="4" name={number} value={number} maxLength="5" type=" " />
                                            </td>
                                            {/* <td>
                                                <i>

                                                </i>
                                            </td> */}
                                            { displayProdukt3 && <React.Fragment>
                                            <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> { dispo_dict[3][number].sales_order}</td>
                                            <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> +{ dispo_dict[3][number].tf_waiting_item}</td>
                                            <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> +{ dispo_dict[3][number].planned_stock}</td>
                                            <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[3][number].warehousestock }</td>
                                            <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[3][number].waiting_items} </td>
                                            <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ dispo_dict[3][number].producing_items} </td>
                                            {/* <th class="tg-0lax" style={{ padding: '0 0 0 20px'}}>nicht produzierbar (E.p.s)</th> */}
                                            <td style={{ textAlign: 'center', whiteSpace:'nowrap' }}> -{ better_engpass[3][number]} </td>
                                            </React.Fragment> }
                                            <td style={{ padding: '0 0 0 26px'}}>
                                            { console.log('color_x', better_engpass_color)}
                                            {  better_engpass[3][number] && !epsProdukt3Angewand && (
                                                <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                key={'b'+ number } style={{ outline: '3px solid red' }} type="number" autoComplete='off' size="4" name={`3_menge${number}`} value={fertigungsaufträge1[3][number][`menge${number}`] } maxLength="5" type="number" />
                                            )}
                                            { better_engpass[3][number] && epsProdukt3Angewand && (
                                                <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                key={'b'+ number } type="number" autoComplete='off' size="4" name={`3_menge${number}`} value={fertigungsaufträge1[3][number][`menge${number}`] } maxLength="5" type="number" />
                                            )}
                                            { !better_engpass[3][number] && (
                                                <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                                key={'b'+ number } type="number" autoComplete='off' size="4" name={`3_menge${number}`} value={fertigungsaufträge1[3][number][`menge${number}`] } maxLength="5" type="number" />
                                            )}
                                            </td>
                                            {/* <td style={{ marginLeft: '15px'}}>
                                                {ffx_engpass[3][number]}
                                            </td> */}
                                        </tr>
                                    )}
									</tbody></table>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{
                                                margin:' 0px 0px 5px 4px',
                                                position: 'relative',
                                                top: '-2px',
                                                background: 'rgb(250, 149, 129)',
                                                border: '2px solid ghostwhite',
                                                color: 'ghostwhite',
                                            }}>
                                                <Link style={{ color: 'ghostwhite' }}to='/Sales2'>
                                                    {this.props.t('fertigungsauftraege.backbutton')}
                                                </Link>

                                                </Button>
                                        </td>
                                        <td style={{ position: 'relative'}}>
                                            <Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{ position: 'absolute' , top: '3px' , right: '7px', margin: '0 0 0 0 ',
                                                background: 'rgb(250, 149, 129)',
                                                border: '2px solid ghostwhite',
                                                color: 'ghostwhite',
                                        }}>
                                        <Link style={{ color: 'ghostwhite' }}to='/Bestellungen'>
                                            {this.props.t('fertigungsauftraege.forwardbutton')}
                                        </Link>

                                        </Button>
                                        </td>
                                 </tr>
                                </tbody>
                            </div>
                        </table>
                    </div>  
                    <div style={{ display:' none'}}>
                        <Sales2 setClick={click => this.clickChild = click} ref={this.child} alwaysCalledFromSales2={true} calledFromSales2={changeDetected} HIDEblackcalledFromSales2={true} style={{display:'none'}} übersetzung={this.state.übersetzung} />
                    </div>
                    <Button className='myButtons backgroundColor1' 
                        id='product1_button'
                        style={{ marginLeft: '20px' ,position: '', right: '35%',
                        background: 'rgb(250, 149, 129)',
                        border: '2px solid ghostwhite',
                        color: 'ghostwhite',
                        margin: '20px',
                        position: 'relative',
                        right: '-350px'
                    }}
                        onClick={this.anzeigenBerrechnungEPS}
                        > Erklärung EPS </Button>
                    { !this.state.berrechnungEPSAnzeigen && (
                        <div style={{ height: '200px'}}> </div>
                    )}
                    { this.state.berrechnungEPSAnzeigen && (
                    <div>
                    <div style={{ border: '1px solid black', background: 'ghostwhite', margin: '15px 0 15px 0' ,padding: '15px'}}>
                        <h2> {this.props.t('fertigungsauftraege.title1')}</h2>
                        <p> {this.props.t('fertigungsauftraege.summary1')}
                            {this.props.t('fertigungsauftraege.summary2')} </p>
                        <p> {this.props.t('fertigungsauftraege.summary3')}
                            {this.props.t('fertigungsauftraege.summary4')} </p>
                        </div>
                        <div style={{ border: '1px solid black', background: 'ghostwhite', margin: '15px 0 15px 0' ,padding: '15px'}}>
                            <h2> {this.props.t('fertigungsauftraege.title2')}</h2>
                        <div style={{ border: '1px solid black', padding: '10px'}}>
                        <h2> {this.props.t('fertigungsauftraege.productnumber1')} </h2>
                        {Reihenfolge1.map( integer =>
                        <div>
                        { better_engpass[1][integer] && (
                            <div style={{ border: '1px solid black', padding: '10px', margin: '10px'}}>
                            <p style={{ padding: '10px', color: 'red'}}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{this.props.t('fertigungsauftraege.erzeugnis')} { integer} </p>
                                {/* numbers */}
                                <p> {this.props.t('fertigungsauftraege.calc')}  &nbsp; &nbsp; &nbsp;  {this.props.t('fertigungsauftraege.fehlkaufteil')} * {this.props.t('fertigungsauftraege.formelerzeugnisse')} </p>
                                    {Object.keys(verwendung_p1_v2[integer]).map( kaufteil =>
                                    <div name={`E_${integer}`}>
                                        { eps_PRObedarf[1][kaufteil] && (
                                            <div name={`k_${kaufteil}`}>
                                            <p> K: {kaufteil}: &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;     {eps_PRObedarf[1][kaufteil]} * ( {get_production_order[1][integer].production_order} / {eps_p1_bedarfProProdukt[kaufteil]}) =
                                             { Math.floor(eps_PRObedarf[1][kaufteil] * get_production_order[1][integer].production_order / eps_p1_bedarfProProdukt[kaufteil]) }
                                               </p>
                                            </div>
                                        )}
                                        </div>
                                    )
                                }
                                { document.getElementsByName('E_1')[0] && (document.getElementsByName('E_1')[0].style.border =' 4px solid red')}
                            </div>
                            )}
                            </div>
                        )}
                        <h2> {this.props.t('fertigungsauftraege.productnumber2')} </h2>
                        {Reihenfolge2.map( integer =>
                        <div>
                        { better_engpass[2][integer] && (
                            <div style={{ border: '1px solid black', padding: '10px', margin: '10px'}}>
                            <p style={{ padding: '10px', color: 'red'}}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{this.props.t('fertigungsauftraege.erzeugnis')} { integer} </p>
                            {/* ugur */}
                                {/* numbers */}
                                <p> {this.props.t('fertigungsauftraege.calc')}  &nbsp; &nbsp; &nbsp;  {this.props.t('fertigungsauftraege.fehlkaufteil')} * {this.props.t('fertigungsauftraege.formelerzeugnisse')} </p>
                                    {Object.keys(verwendung_p2_v2[integer]).map( kaufteil =>
                                    <div>
                                        { eps_PRObedarf[2][kaufteil] && (
                                            <div>
                                            <p> K: {kaufteil}: &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;     {eps_PRObedarf[2][kaufteil]} * ( {get_production_order[2][integer].production_order} / {eps_p2_bedarfProProdukt[kaufteil]} ) =
                                             { Math.floor(eps_PRObedarf[2][kaufteil] * get_production_order[2][integer].production_order / eps_p2_bedarfProProdukt[kaufteil]) }   </p>
                                            </div>
                                        )}
                                        </div>
                                    )
                                }
                            </div>
                            )}
                            </div>
                        )}

                        <h2> {this.props.t('fertigungsauftraege.productnumber3')} </h2>
                        {Reihenfolge3.map( integer =>
                        <div>
                        { better_engpass[3][integer] && (
                            <div style={{ border: '1px solid black', padding: '10px', margin: '10px'}}>
                            <p style={{ padding: '10px', color: 'red'}}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{this.props.t('fertigungsauftraege.erzeugnis')} { integer} </p>
                            {/* ugur */}
                                {/* numbers */}

                                <p> {this.props.t('fertigungsauftraege.calc')}  &nbsp; &nbsp; &nbsp;  {this.props.t('fertigungsauftraege.fehlkaufteil')} * {this.props.t('fertigungsauftraege.formelerzeugnisse')} </p>
                                    {Object.keys(verwendung_p3_v2[integer]).map( kaufteil =>
                                    <div>
                                        { eps_PRObedarf[3][kaufteil] && (
                                            <div>
                                            <p> K: {kaufteil}: &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;     {eps_PRObedarf[3][kaufteil]} * ( {get_production_order[3][integer].production_order} / {eps_p3_bedarfProProdukt[kaufteil]}) =
                                             { Math.floor(eps_PRObedarf[3][kaufteil] * get_production_order[3][integer].production_order / eps_p3_bedarfProProdukt[kaufteil]) }   </p>
                                            </div>
                                        )}
                                        </div>
                                    )
                                }
                            </div>
                            )}
                            </div>
                        )}
                        </div>
                        </div>
                        <div style={{ border: '1px solid black', background: 'ghostwhite', margin: '15px 0 15px 0' ,padding: '15px'}}>
                            <h2> {this.props.t('fertigungsauftraege.title2')}</h2>
                            {Object.keys(menge).map( number =>
                                <React.Fragment>
                                    <div style={{ border: '1px solid black', padding: '10px'}}>
                                    <p> {this.props.t('fertigungsauftraege.kaufteil')} {number}: </p>
                                    { console.log('eventuelleZugänge', eventuelleZugänge)}
                                    <div style={{ display: 'none'}}>
                                        { !eps_p1_bedarfProProdukt[number] && (eps_p1_bedarfProProdukt[number] = 0)}
                                        { !eps_p2_bedarfProProdukt[number] && (eps_p2_bedarfProProdukt[number] = 0)}
                                        { !eps_p3_bedarfProProdukt[number] && (eps_p3_bedarfProProdukt[number] = 0)}
                                        { !eps_PRObedarf[1][number] && (eps_PRObedarf[1][number] = 0)}
                                        { !eps_PRObedarf[2][number] && (eps_PRObedarf[2][number] = 0)}
                                        { !eps_PRObedarf[3][number] && (eps_PRObedarf[3][number] = 0)}
                                    </div>
                                    <p style={{ display: 'none'}}> {!eventuelleZugänge[number] && (eventuelleZugänge[number] = 0)}</p>
                                    <p> {`${menge[number]} ${this.props.t('fertigungsauftraege.lagerbestand')} - ${produktion[number]} ${this.props.t('fertigungsauftraege.verbrauch')} + ${eventuelleZugänge[number]} ${this.props.t('fertigungsauftraege.zugang')} = ${minus[number]} ${this.props.t('fertigungsauftraege.fehlkauf1')}` }</p>
                                    <p> {this.props.t('fertigungsauftraege.example')}     &nbsp;        {`${this.props.t('fertigungsauftraege.formelgesamt')} K${number} ${this.props.t('fertigungsauftraege.proprodukt')}`} </p>
                                    <p> {`P1:`}      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;         {`${minus[number]} * (${eps_p1_bedarfProProdukt[number]} / ${eps_gesamtbedarf[number]} ) = ${eps_PRObedarf[1][number]}`} </p>
                                    <p> {`P2:`}     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;         {` ${minus[number]} * (${eps_p2_bedarfProProdukt[number]} / ${eps_gesamtbedarf[number]} ) = ${eps_PRObedarf[2][number]}`} </p>
                                    <p> {`P3:`}     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;          {`${minus[number]} * (${eps_p3_bedarfProProdukt[number]} / ${eps_gesamtbedarf[number]} ) = ${eps_PRObedarf[3][number]}`} </p>
                                    </div>
                                    <br></br>
                                </React.Fragment>
                            )}
                        </div>
                    <div style={{ border: '1px solid black', background: 'ghostwhite', margin: '15px 0 15px 0' ,padding: '15px'}}>
                        <h2> {this.props.t('fertigungsauftraege.title3')} </h2>
                            <p> {this.props.t('fertigungsauftraege.title3text1')}</p>
                            <p> {this.props.t('fertigungsauftraege.title3text2')}</p>
                        </div>
                            <p stlye={{ display: 'none'}}> { }</p>
                        <div style={{ border: '1px solid black', background: 'ghostwhite', margin: '15px 0 15px 0' ,padding: '15px'}}>
                            <h2> {this.props.t('fertigungsauftraege.title4')}</h2>
                            <p>{this.props.t('fertigungsauftraege.title4text1')}</p>
                            <p> {this.props.t('fertigungsauftraege.title4text2')} </p>
                        <h3> {this.props.t('fertigungsauftraege.title5')} </h3>
                        {minusP1.map(number =>
                            <React.Fragment>
                            <div style={{ border: '1px solid black' , padding: '10px'}}>
                            <p> {this.props.t('fertigungsauftraege.kaufteil')} {number} </p>
                            <p> {Math.ceil(minus_after_trippeling[number])} ({this.props.t('fertigungsauftraege.fehlkaufteil')}) / {verwendung[3][number]} {this.props.t('fertigungsauftraege.faktorverwendung')} = {Math.ceil(minus_after_trippeling[number] / verwendung[1][number])} {this.props.t('fertigungsauftraege.fehlauftraege')} {erzeugnisse[1][number]})</p>
                            </div>
                            <br></br>
                            </React.Fragment>
                        )}
                        <h3> {this.props.t('fertigungsauftraege.title7')} </h3>
                        {minusP2.map(number =>
                            <React.Fragment>
                            <div style={{ border: '1px solid black' , padding: '10px'}}>

                            <p> {this.props.t('fertigungsauftraege.kaufteil')} {number} </p>
                            <p> {Math.ceil(minus_after_trippeling[number])} ({this.props.t('fertigungsauftraege.fehlkaufteil')}) / {verwendung[2][number]} {this.props.t('fertigungsauftraege.faktorverwendung')} = {Math.ceil(minus_after_trippeling[number] / verwendung[2][number])} {this.props.t('fertigungsauftraege.fehlauftraege')} {erzeugnisse[2][number]})</p>
                            </div>
                            <br></br>
                            </React.Fragment>
                        )}
                        <h3> {this.props.t('fertigungsauftraege.title8')} </h3>
                        {minusP3.map(number =>
                            <React.Fragment>
                            <div style={{ border: '1px solid black' , padding: '10px'}}>

                            <p> {this.props.t('fertigungsauftraege.kaufteil')} {number} </p>
                            {erzeugnisse[3][number].map( e_number =>
                            <p> {Math.ceil(minus_after_trippeling[number])} ({this.props.t('fertigungsauftraege.fehlkaufteil')}) / {verwendung[3][number]} {this.props.t('fertigungsauftraege.faktorverwendung')} = {Math.ceil(minus_after_trippeling[number] / verwendung[3][number])} {this.props.t('fertigungsauftraege.fehlauftraege')} {e_number})</p>
                                )}
                            </div>
                            <br></br>
                            </React.Fragment>
                        )}
                        </div>

                        <div style={{ border: '1px solid black', background: 'ghostwhite', margin: '15px 0 15px 0' ,padding: '15px'}}>
                            <h3> {this.props.t('fertigungsauftraege.title8')} </h3>
                            <p> {this.props.t('fertigungsauftraege.title8text1')}</p>
                            <p> {this.props.t('fertigungsauftraege.title8text2')}</p>

                        <br></br>
                        <h3> {this.props.t('fertigungsauftraege.title9')} </h3>
                        {missingErzeugnisseP1.map(number =>
                            <React.Fragment>
                            <div style={{ border: '1px solid black' , padding: '10px'}} name='product1'>

                            <p> {this.props.t('fertigungsauftraege.title9text1')} {number} ( {this.props.t('fertigungsauftraege.fehlstueck')} {better_engpass[1][number]}</p>
                            {p1_iteration[number] && p1_iteration[number].map( e_number =>
                            <p name='helloWorld'>  {e_number} (1:1) = {better_engpass[2][number]}</p>
                                )}
                            </div>
                            <br></br>
                            </React.Fragment>
                        )}

                        <h3> {this.props.t('fertigungsauftraege.title10')} </h3>
                        {missingErzeugnisseP2.map(number =>
                            <React.Fragment>
                            <div style={{ border: '1px solid black' , padding: '10px'}} name='product2'>

                            <p> {this.props.t('fertigungsauftraege.title10text1')} {number} ( {this.props.t('fertigungsauftraege.fehlstueck')} {better_engpass[2][number]}</p>
                            {p2_iteration[number] && p2_iteration[number].map( e_number =>
                            <p>  {e_number} (1:1) = {better_engpass[2][number]}</p>
                                )}
                            </div>
                            <br></br>
                            </React.Fragment>
                        )}

                        <h3> {this.props.t('fertigungsauftraege.title11')} </h3>
                        {missingErzeugnisseP3.map(number =>
                            <React.Fragment>
                            <div style={{ border: '1px solid black' , padding: '10px'}} name='product3'>

                            <p> {this.props.t('fertigungsauftraege.title11text1')} {number} ( {this.props.t('fertigungsauftraege.fehlstueck')} {better_engpass[3][number]} </p>
                            {p3_iteration[number] && p3_iteration[number].map( e_number =>
                            <p>  {e_number} (1:1) = {better_engpass[3][number]} </p>
                                )}
                            </div>
                            <br></br>
                            </React.Fragment>
                        )}
                        </div>
                    </div>
                    )}
                    </React.Fragment>
        )
    }
}

export default translate(Fertigungsaufträge);
