// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Arbeitszeiten from './Arbeitszeiten';
import Bestellungen from './Bestellungen';
import Fertigungsaufträge from './Fertigungsaufträge';
import localStorage from 'local-storage';

import Routes from "./Routes";
import Disposition from './Disposition';

class Container extends Component {
  
  state = {
        // Fertigungsaufträge
        fertigungsaufträge: {
        article0: '',        article1: '',        article2: '',        article3: '',
        article4: '',        article5: '',        article6: '',        article7: '',
        article8: '',        article9: '',        article10: '',        article11: '',
        article12: '',        article13: '',        article14: '',        article15: '',
        article16: '',        article17: '',        article18: '',        article19: '',
        article20: '',        article21: '',        article22: '',        article23: '',
        article24: '',        article25: '',        article26: '',        article27: '',
        article28: '',        article29: '',        article30: '',        article31: '',
        article32: '',        article33: '',        article34: '',        article35: '',
        article36: '',        article37: '',        article38: '',        article39: '',
        article40: '',        article41: '',        article42: '',        article43: '',
        article44: '',        article45: '',        article46: '',        article47: '',
        article48: '',        article49: '',        article50: '',        article51: '',
        article52: '',        article53: '',        article54: '',        article55: '',
        article56: '',        article57: '',        article58: '',        article59: '',

        quantity0: '',        quantity1: '',        quantity2: '',        quantity3: '',
        quantity4: '',        quantity5: '',        quantity6: '',        quantity7: '',
        quantity8: '',        quantity9: '',        quantity10: '',        quantity11: '',
        quantity12: '',        quantity13: '',        quantity14: '',        quantity15: '',
        quantity16: '',        quantity17: '',        quantity18: '',        quantity19: '',
        quantity20: '',        quantity21: '',        quantity22: '',        quantity23: '',
        quantity24: '',        quantity25: '',        quantity26: '',        quantity27: '',
        quantity28: '',        quantity29: '',        quantity30: '',        quantity31: '',
        quantity32: '',        quantity33: '',        quantity34: '',        quantity35: '',
        quantity36: '',        quantity37: '',        quantity38: '',        quantity39: '',
        quantity40: '',        quantity41: '',        quantity42: '',        quantity43: '',
        quantity44: '',        quantity45: '',        quantity46: '',        quantity47: '',
        quantity48: '',        quantity49: '',        quantity50: '',        quantity51: '',
        quantity52: '',        quantity53: '',        quantity54: '',        quantity55: '',
        quantity56: '',        quantity57: '',        quantity58: '',        quantity59: ''
        },
    
        // Bestellungen
        bestellungen: {
        artikel_bestellung0:'',		artikel_bestellung1:'',		artikel_bestellung2:'',		artikel_bestellung3:'',
		artikel_bestellung4:'',		artikel_bestellung5:'',		artikel_bestellung6:'',		artikel_bestellung7:'',
		artikel_bestellung8:'',		artikel_bestellung9:'',		artikel_bestellung10:'',		artikel_bestellung11:'',
		artikel_bestellung12:'',		artikel_bestellung13:'',		artikel_bestellung14:'',		artikel_bestellung15:'',
		artikel_bestellung16:'',		artikel_bestellung17:'',		artikel_bestellung18:'',		artikel_bestellung19:'',
		artikel_bestellung20:'',		artikel_bestellung21:'',		artikel_bestellung22:'',		artikel_bestellung23:'',
		artikel_bestellung24:'',		artikel_bestellung25:'',		artikel_bestellung26:'',		artikel_bestellung27:'',
		artikel_bestellung28:'',		artikel_bestellung29:'',		artikel_bestellung30:'',		artikel_bestellung31:'',
		artikel_bestellung32:'',		artikel_bestellung33:'',		artikel_bestellung34:'',		artikel_bestellung35:'',
		artikel_bestellung36:'',		artikel_bestellung37:'',		artikel_bestellung38:'',		artikel_bestellung39:'',
		artikel_bestellung40:'',		artikel_bestellung41:'',		artikel_bestellung42:'',		artikel_bestellung43:'',
		artikel_bestellung44:'',		menge_bestellung0: '',		menge_bestellung1: '',		menge_bestellung2: '',
		menge_bestellung3: '',		menge_bestellung4: '',		menge_bestellung5: '',		menge_bestellung6: '',
		menge_bestellung7: '',		menge_bestellung8: '',		menge_bestellung9: '',		menge_bestellung10: '',
		menge_bestellung11: '',		menge_bestellung12: '',		menge_bestellung13: '',		menge_bestellung14: '',
		menge_bestellung15: '',		menge_bestellung16: '',		menge_bestellung17: '',		menge_bestellung18: '',
		menge_bestellung19: '',		menge_bestellung20: '',		menge_bestellung21: '',		menge_bestellung22: '',
		menge_bestellung23: '',		menge_bestellung24: '',		menge_bestellung25: '',		menge_bestellung26: '',
		menge_bestellung27: '',		menge_bestellung28: '',		menge_bestellung29: '',		menge_bestellung30: '',
		menge_bestellung31: '',		menge_bestellung32: '',		menge_bestellung33: '',		menge_bestellung34: '',
		menge_bestellung35: '',		menge_bestellung36: '',		menge_bestellung37: '',		menge_bestellung38: '',
		menge_bestellung39: '',		menge_bestellung40: '',		menge_bestellung41: '',		menge_bestellung42: '',
		menge_bestellung43: '',		menge_bestellung44: '',
		modus0: '',		modus1: '',		modus2: '',		modus3: '',		modus4: '',		modus5: '',		modus6: '',		modus7: '',
		modus8: '',		modus9: '',		modus10: '',		modus11: '',		modus12: '',		modus13: '',		modus14: '',		modus15: '',
		modus16: '',		modus17: '',		modus18: '',		modus19: '',		modus20: '',		modus21: '',		modus22: '',		modus23: '',
		modus24: '',		modus25: '',		modus26: '',		modus27: '',		modus28: '',		modus29: '',		modus30: '',		modus31: '',
		modus32: '',		modus33: '',		modus34: '',		modus35: '',		modus36: '',		modus37: '',		modus38: '',		modus39: '',
        modus40: '',		modus41: '',		modus42: '',		modus43: '',		modus44: ''
        },
        
        // Arbeitszeiten
        arbeitszeiten: { 
        shift0: '1', 	shift1: '1',
        shift2: '1',	shift3: '1',
        shift5: '1',	shift6: '1',
        shift7: '1',	shift8: '1',
        shift9: '1',	shift10: '1',
        shift11: '1',	shift12: '1',
        shift13: '1',	shift14: '1',

        overtime0: '',	overtime1: '',
        overtime2: '',	overtime3: '',
        overtime5: '',	overtime6: '',
        overtime7: '',	overtime8: '',
        overtime9: '',	overtime10: '',
        overtime11: '',	overtime12: '',
        overtime13: '',	overtime14: 'banana'
		},
		
		// Disposition
		disposition: { 
		VertriebswunschP1: '',
		VertriebswunschP2: '',
		VertriebswunschP3: '',
		PrognoseP1: '',
		PrognoseP2: '',
		PrognoseP3: '',
		LagerbestandP1: '',
		LagerbestandP2: '',
		LagerbestandP3: '',
		LagerbestandE1: '',
		LagerbestandE2: '',
		LagerbestandE3: ''
		}  

	}
	
	handleChange = (evt, type) => {
		if (type === 'bestellungen') { 
			let { bestellungen } = this.state; 
			bestellungen[evt.target.name] = evt.target.value;
			this.setState({ bestellungen: bestellungen });
			localStorage.set(evt.target.name, evt.target.value);
		}
		if (type === 'fertigungsaufträge') {
			let { fertigungsaufträge } = this.state;
			fertigungsaufträge[evt.target.name] = evt.target.value
			this.setState({ fertigungsaufträge: fertigungsaufträge });
			localStorage.set(evt.target.name, evt.target.value);

		}
		if (type === 'arbeitszeiten') {
			let { arbeitszeiten } = this.state;
			arbeitszeiten[evt.target.name] = evt.target.value
			this.setState({ arbeitszeiten: arbeitszeiten});
			localStorage.set(evt.target.name, evt.target.value);
		}
		if (type === 'disposition') {
			let { arbeitszeiten } = this.state;
			arbeitszeiten[evt.target.name] = evt.target.value
			this.setState({ arbeitszeiten: arbeitszeiten});
			localStorage.set(evt.target.name, evt.target.value);
		}
	  }
	
    render() {
        // const { 
        // // Arbeitszeiten 
        // article0,         article1,        article2,        article3,        article4,        article5,        article6,        article7,
        // article8,        article9,        article10,        article11,        article12,        article13,        article14,        article15,
        // article16,        article17,        article18,        article19,        article20,        article21,        article22,        article23,
        // article24,        article25,        article26,        article27,        article28,        article29,        article30,        article31,
        // article32,        article33,        article34,        article35,        article36,        article37,        article38,        article39,
        // article40,        article41,        article42,        article43,        article44,        article45,        article46,        article47,
        // article48,        article49,        article50,        article51,        article52,        article53,        article54,        article55,
        // article56,        article57,        article58,        article59,

        // quantity0,        quantity1,        quantity2,        quantity3,        quantity4,        quantity5,        quantity6,        quantity7,
        // quantity8,        quantity9,        quantity10,        quantity11,        quantity12,        quantity13,        quantity14,        quantity15,
        // quantity16,        quantity17,        quantity18,        quantity19,        quantity20,        quantity21,        quantity22,        quantity23,
        // quantity24,        quantity25,        quantity26,        quantity27,        quantity28,        quantity29,        quantity30,        quantity31,
        // quantity32,        quantity33,        quantity34,        quantity35,        quantity36,        quantity37,        quantity38,        quantity39,
        // quantity40,        quantity41,        quantity42,        quantity43,        quantity44,        quantity45,        quantity46,        quantity47,
        // quantity48,        quantity49,        quantity50,        quantity51,        quantity52,        quantity53,        quantity54,        quantity55,
        // quantity56,        quantity57,        quantity58,        quantity59,    

        // // Bestellungen
        // artikel_bestellung0,		artikel_bestellung1,
		// artikel_bestellung2,		artikel_bestellung3,
		// artikel_bestellung4,		artikel_bestellung5,
		// artikel_bestellung6,		artikel_bestellung7,
		// artikel_bestellung8,		artikel_bestellung9,
		// artikel_bestellung10,		artikel_bestellung11,
		// artikel_bestellung12,		artikel_bestellung13,
		// artikel_bestellung14,		artikel_bestellung15,
		// artikel_bestellung16,		artikel_bestellung17,
		// artikel_bestellung18,		artikel_bestellung19,
		// artikel_bestellung20,		artikel_bestellung21,
		// artikel_bestellung22,		artikel_bestellung23,
		// artikel_bestellung24,		artikel_bestellung25,
		// artikel_bestellung26,		artikel_bestellung27,
		// artikel_bestellung28,		artikel_bestellung29,
		// artikel_bestellung30,		artikel_bestellung31,
		// artikel_bestellung32,		artikel_bestellung33,
		// artikel_bestellung34,		artikel_bestellung35,
		// artikel_bestellung36,		artikel_bestellung37,
		// artikel_bestellung38,		artikel_bestellung39,
		// artikel_bestellung40,		artikel_bestellung41,
		// artikel_bestellung42,		artikel_bestellung43,
		// artikel_bestellung44,		
		
		// menge_bestellung0,		menge_bestellung1,
		// menge_bestellung2,		menge_bestellung3,
		// menge_bestellung4,		menge_bestellung5,
		// menge_bestellung6,		menge_bestellung7,
		// menge_bestellung8,		menge_bestellung9,
		// menge_bestellung10,		menge_bestellung11,
		// menge_bestellung12,		menge_bestellung13,
		// menge_bestellung14,		menge_bestellung15,
		// menge_bestellung16,		menge_bestellung17,
		// menge_bestellung18,		menge_bestellung19,
		// menge_bestellung20,		menge_bestellung21,
		// menge_bestellung22,		menge_bestellung23,
		// menge_bestellung24,		menge_bestellung25,
		// menge_bestellung26,		menge_bestellung27,
		// menge_bestellung28,		menge_bestellung29,
		// menge_bestellung30,		menge_bestellung31,
		// menge_bestellung32,		menge_bestellung33,
		// menge_bestellung34,		menge_bestellung35,
		// menge_bestellung36,		menge_bestellung37,
		// menge_bestellung38,		menge_bestellung39,
		// menge_bestellung40,		menge_bestellung41,
		// menge_bestellung42,		menge_bestellung43,
		// menge_bestellung44,

		// modus0,		modus1,
		// modus2,		modus3,
		// modus4,		modus5,
		// modus6,		modus7,
		// modus8,		modus9,
		// modus10,		modus11,
		// modus12,		modus13,
		// modus14,		modus15,
		// modus16,		modus17,
		// modus18,		modus19,
		// modus20,		modus21,
		// modus22,		modus23,
		// modus24,		modus25,
		// modus26,		modus27,
		// modus28,		modus29,
		// modus30,		modus31,
		// modus32,		modus33,
		// modus34,		modus35,
		// modus36,		modus37,
		// modus38,		modus39,
		// modus40,		modus41,
		// modus42,		modus43,
        // modus44,	
        
        // // Arbeitszeiten
        // shift0,
		// shift1,
		// shift2,
		// shift3,
		// shift5,
		// shift6,
		// shift7,
		// shift8,
		// shift9,
		// shift10,
		// shift11,
		// shift12,
		// shift13,
		// shift14,

		// overtime0,
		// overtime1,
		// overtime2,
		// overtime3,
		// overtime5,
		// overtime6,
		// overtime7,
		// overtime8,
		// overtime9,
		// overtime10,
		// overtime11,
		// overtime12,
		// overtime13,
		// overtime14,
        // } = this.state;

		const { bestellungen, fertigungsaufträge, arbeitszeiten } = this.state;
        
        return (
            <div>
				<button onClick={ () => { console.log(this.state.bestellungen)}}> HELLO STATE </button>
				<Routes  
					bestellungen={bestellungen}
					arbeitszeiten={arbeitszeiten}
					fertigungsaufträge={fertigungsaufträge}
				/>
				{ 
					<Bestellungen 
					bestellungen={bestellungen}
					handleChangeInContainer={this.handleChange}
				/>
				}
				{
					<Fertigungsaufträge 
						fertigungsaufträge={fertigungsaufträge}
						handleChangeInContainer={this.handleChange}
					/> 
				}
				{
					<Arbeitszeiten 
						arbeitszeiten={arbeitszeiten}
						handleChangeInContainer={this.handleChange}
					/>
				}
            </div>
        )
    }
}

export default Container;