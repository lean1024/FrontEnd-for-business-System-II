
import React, { Component } from 'react';
import localStorage from 'local-storage';
import { Button, input, Dropdown } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { translate } from 'react-multi-lang'
import { Icon } from 'semantic-ui-react'


class Bestellungen extends Component {

	state = {
		erklärung: false,
		newArtikel: '',
		newOption: 'Normal',
		newMenge: '',
		discount_quantity: {
            21: 300, 22: 300, 23: 300, 24: 6100, 25: 3600, 27: 1800, 28: 4500, 32: 2700, 33: 900, 34: 22000,
            35: 3600, 36: 900, 37: 900, 38: 300, 39: 1800, 40: 900, 41: 900, 42: 1800, 43: 2700, 44: 900,
            45: 900, 46: 900, 47: 900, 48: 1800, 52: 600, 53: 22000, 57: 600, 58: 22000, 59: 1800
        },
        normal_range : {
            21: 1.8, 22: 1.7, 23: 1.2, 24: 3.2, 25: 0.9, 27: 0.9, 28: 1.7, 32: 2.1, 33: 1.9, 34: 1.6,
            35: 2.2, 36: 1.2, 37: 1.5, 38: 1.7, 39: 1.5, 40: 1.7, 41: 0.9, 42: 1.2, 43: 2.0, 44: 1.0,
            45: 1.7, 46: 0.9, 47: 1.1, 48: 1.0, 52: 1.6, 53: 1.6, 57: 1.7, 58: 1.6, 59: 0.7
        },

        deviation : {
            21: 0.4, 22: 0.4, 23: 0.2, 24: 0.3, 25: 0.2, 27: 0.2, 28: 0.4, 32: 0.5, 33: 0.5, 34: 0.3,
            35: 0.4, 36: 0.1, 37: 0.3, 38: 0.4, 39: 0.3, 40: 0.2, 41: 0.2, 42: 0.3, 43: 0.5, 44: 0.2,
            45: 0.3, 46: 0.3, 47: 0.1, 48: 0.2, 52: 0.4, 53: 0.2, 57: 0.3, 58: 0.5, 59: 0.2
        },

		bestellungen: {
			// artikel_bestellung0:'',		artikel_bestellung1:'',		artikel_bestellung2:'',		artikel_bestellung3:'',
			// artikel_bestellung4:'',		artikel_bestellung5:'',		artikel_bestellung6:'',		artikel_bestellung7:'',
			// artikel_bestellung8:'',		artikel_bestellung9:'',		artikel_bestellung10:'',		artikel_bestellung11:'',
			// artikel_bestellung12:'',		artikel_bestellung13:'',		artikel_bestellung14:'',		artikel_bestellung15:'',
			// artikel_bestellung16:'',		artikel_bestellung17:'',		artikel_bestellung18:'',		artikel_bestellung19:'',
			// artikel_bestellung20:'',		artikel_bestellung21:'',		artikel_bestellung22:'',		artikel_bestellung23:'',
			// artikel_bestellung24:'',		artikel_bestellung25:'',		artikel_bestellung26:'',		artikel_bestellung27:'',
			// artikel_bestellung28:'',		artikel_bestellung29:'',		artikel_bestellung30:'',		artikel_bestellung31:'',
			// artikel_bestellung32:'',		artikel_bestellung33:'',		artikel_bestellung34:'',		artikel_bestellung35:'',
			// artikel_bestellung36:'',		artikel_bestellung37:'',		artikel_bestellung38:'',		artikel_bestellung39:'',
			// artikel_bestellung40:'',		artikel_bestellung41:'',		artikel_bestellung42:'',		artikel_bestellung43:'',
			// artikel_bestellung44:'',		menge_bestellung0: '',		menge_bestellung1: '',		menge_bestellung2: '',
			// menge_bestellung3: '',		menge_bestellung4: '',		menge_bestellung5: '',		menge_bestellung6: '',
			// menge_bestellung7: '',		menge_bestellung8: '',		menge_bestellung9: '',		menge_bestellung10: '',
			// menge_bestellung11: '',		menge_bestellung12: '',		menge_bestellung13: '',		menge_bestellung14: '',
			// menge_bestellung15: '',		menge_bestellung16: '',		menge_bestellung17: '',		menge_bestellung18: '',
			// menge_bestellung19: '',		menge_bestellung20: '',		menge_bestellung21: '',		menge_bestellung22: '',
			// menge_bestellung23: '',		menge_bestellung24: '',		menge_bestellung25: '',		menge_bestellung26: '',
			// menge_bestellung27: '',		menge_bestellung28: '',		menge_bestellung29: '',		menge_bestellung30: '',
			// menge_bestellung31: '',		menge_bestellung32: '',		menge_bestellung33: '',		menge_bestellung34: '',
			// menge_bestellung35: '',		menge_bestellung36: '',		menge_bestellung37: '',		menge_bestellung38: '',
			// menge_bestellung39: '',		menge_bestellung40: '',		menge_bestellung41: '',		menge_bestellung42: '',
			// menge_bestellung43: '',		menge_bestellung44: '',
			// modus0: '',		modus1: '',		modus2: '',		modus3: '',		modus4: '',		modus5: '',		modus6: '',		modus7: '',
			// modus8: '',		modus9: '',		modus10: '',		modus11: '',		modus12: '',		modus13: '',		modus14: '',		modus15: '',
			// modus16: '',		modus17: '',		modus18: '',		modus19: '',		modus20: '',		modus21: '',		modus22: '',		modus23: '',
			// modus24: '',		modus25: '',		modus26: '',		modus27: '',		modus28: '',		modus29: '',		modus30: '',		modus31: '',
			// modus32: '',		modus33: '',		modus34: '',		modus35: '',		modus36: '',		modus37: '',		modus38: '',		modus39: '',
			// modus40: '',		modus41: '',		modus42: '',		modus43: '',		modus44: '',
		}
	}

	handleChange = (evt) => {
		let { bestellungen } = this.state;
		let Reihenfolge = localStorage.get('bestellungen_Reihenfolge')
		if (Reihenfolge && Reihenfolge.includes('undefined')) Reihenfolge = undefined

		let index = evt.target.dataset.id

		console.log('tete')
		// console.log(bestellungen);  
		console.log(Reihenfolge)
		// console.log(E);
		console.log(evt.target.name)
		console.log(evt.target.value)

		let E = evt.target.name.slice(0,2)
		console.log(E)

		if ( !Reihenfolge ) {
			if ( evt.target.name.includes('menge')) bestellungen[E][evt.target.name] = parseInt(evt.target.value);
			else ( bestellungen[E][evt.target.name] = evt.target.value )
		}
		else {

			if ( isNaN(parseInt(evt.target.value))) {Reihenfolge[index][E][evt.target.name] = '1'}
			if ( evt.target.name.includes('menge') && !isNaN(parseInt(evt.target.value))) Reihenfolge[index][E][evt.target.name] = parseInt(evt.target.value)
			else {
				Reihenfolge[index][E][evt.target.name] = evt.target.value;

				console.log('poker')
				console.log(Reihenfolge)

				console.log(index)
				console.log(E)
				console.log(evt.target.name)
				console.log(Reihenfolge)

		}
		}
		// if ( evt.target.value < 1 && evt.target.name.includes('menge') && (Reihenfolge[index][E][evt.target.name] = 1))

		this.setState({ bestellungen: bestellungen })
		localStorage.set('bestellungen', bestellungen);
		localStorage.set('bestellungen_Reihenfolge', Reihenfolge)

		if ( !Reihenfolge ) {
			Reihenfolge = [];
		Object.keys(bestellungen).map( number => {
			let tmp = {}
			tmp[number] = bestellungen[number]
			if (bestellungen[number] ) Reihenfolge.push(tmp)
		})
	}
		console.log('master')
		console.log(Reihenfolge)
		this.setState({Reihenfolge: Reihenfolge})
	}

	componentWillUnmount(){
		document.getElementById('Bestellungen').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')

  }

  logging = () => {
	  let erfasste_Lieferungen = localStorage.get('erfasste_Lieferungen')
	  let Reihenfolge = this.state.Reihenfolge;

	  console.log('erfasste Lieferungen', erfasste_Lieferungen);
	  console.log('Reihenfolge', Reihenfolge)
	  console.log(localStorage.get('bestellungen_Reihenfolge'))
  }

  anzeigenExpertModus = () => {
	  this.setState({ erklärung: !this.state.erklärung})
  }

	componentDidMount() {
		document.addEventListener('keydown', this.logging)
		document.getElementById('Bestellungen').childNodes[0].setAttribute('style', 'color:darkred;  ')
		window.scrollTo(0, 0)
		const bestellungen2 = localStorage.get('bestellungen');

		let Reihenfolge = localStorage.get('bestellungen_Reihenfolge')
		if (Reihenfolge && Reihenfolge.includes('undefined')) Reihenfolge = undefined
		this.setState({Reihenfolge});



		if (bestellungen2 !== null ) {
			// let bestellungenState = {}

			// // eindeutige states, für handleOnChange. Realisiert indem die Struktur des JSON zum stateNamen wird
			// Object.keys(bestellungen2).map( E => {
			// 	let zwischenJSON = { }
			// 	Object.keys(bestellungen2[E]).map( attributes => {
			// 			// Bonus: wenn ein Wert unter diesem key bereits existiert, addiere den Wert
			// 			// if ( bestellungenState[`${E}_${attributes}`] ) bestellungenState[`${E}_${attributes}`] += bestellungen2[E][attributes]


			// 			// bestellungenState[`${E}_${attributes}`] = bestellungen2[E][attributes]

			// 			console.log(attributes) // ankunft  // menge // bestellart
			// 			zwischenJSON[`${E}_${attributes}`] = bestellungen2[E][attributes]  // { ankunft: 34 , }
			// 		})
			// 		bestellungenState[E] = zwischenJSON;
			// })

						// // eindeutige states, für handleOnChange. Realisiert indem die Struktur des JSON zum stateNamen wird
						// Object.keys(bestellungen2).map( p => {
						// 	Object.keys(bestellungen2[p]).map( E => {
						// 		Object.keys(bestellungen2[p][E]).map( attributes => {
						// 			// Bonus: wenn ein Wert unter diesem key bereits existiert, addiere den Wert
						// 			if ( bestellungenState[`${E}_${attributes}`] ) {
						// 				console.log('')
						// 				console.log('')
						// 				console.log( bestellungenState[`${E}_${attributes}`])
						// 				console.log(bestellungenState[`${E}_${attributes}`])
						// 				console.log(`${p}_${E}_${attributes}`)
						// 			}
						// 			else bestellungenState[`${E}_${attributes}`] = bestellungen2[p][E][attributes]
						// 		})
						// 	})
						// })

			console.log('keke')
			// console.log(bestellungenState)
			this.setState({ bestellungen: bestellungen2})

			let erfasste_Lieferungen = localStorage.get('erfasste_Lieferungen')


			if ( !Reihenfolge) {
				Reihenfolge = [];
				Object.keys(erfasste_Lieferungen).map( outerKey => {
					Object.keys(erfasste_Lieferungen[outerKey]).map( (number, iteration) => {
						let ankunft = erfasste_Lieferungen[outerKey][number]['ankunft']
						let menge = erfasste_Lieferungen[outerKey][number]['menge']
						let bestellart = `${erfasste_Lieferungen[outerKey][number]['bestellart']}`
						let tmp = { [number]: { [`${number}_ankunft`]: ankunft,   [`${number}_menge`]: menge,   [`${number}_bestellart`]: bestellart } } // 33

						console.log(`K${number}`);
						console.log('ankunft',ankunft)
						console.log('menge', menge)
						console.log('bestellart',bestellart)
						console.log('tmp', tmp)
						let edited;
						// Reihenfolge.map( json => {
						// 	let matched;
						// 	Object.keys(json).map( keysT => {
						// 		// if (keysT == `${number}_`)
						// 		let numberT = keysT.slice(0,2)			// wenn die 33,  34 in der Reihenfolge vorkommt
						// 		if (numberT == number) {
						// 			matched = true;
						// 		}
						// 	})

						// 	edited = true;
						// })

						let check = this.checkIfExists(Reihenfolge, number,menge, bestellart )
						console.log('check passed', check)

						if ( !check ) Reihenfolge.push(tmp)
						// Object.keys(erfasste_Lieferungen[outerKey][number]).map ( keys => {
						// })
						console.log('iteration', iteration, 'Reihenfolge' , Reihenfolge)
						console.log('')
						console.log('')
						console.log('')
					})
				})
				this.setState({Reihenfolge: Reihenfolge})
				localStorage.set('bestellungen_Reihenfolge', Reihenfolge)
			}

			// if ( !Reihenfolge ) {
			// 	Reihenfolge = [];
			// 	Object.keys(bestellungen2).map( number => {
			// 		let tmp = {}
			// 		tmp[number] = bestellungen2[number]
			// 		if (bestellungen2[number] ) Reihenfolge.push(tmp)
			// 	})
			// }
			console.log('master')
			console.log(Reihenfolge)
			this.setState({Reihenfolge: Reihenfolge})

			localStorage.set('bestellungen_safe', bestellungen2);
		}

		//25.01 reset
		let reihenfolge_warehousestock_dict = localStorage.get('reihenfolge_warehousestock_dict')
        let reihenfolge_waiting_items = localStorage.get('reihenfolge_waiting_items')
        let reihenfolge_waiting_list = localStorage.get('reihenfolge_waiting_list')
        let reihenfolge_new_warehousestock = localStorage.get('reihenfolge_new_warehousestock')
        let reihenfolge_merge_periods = localStorage.get('reihenfolge_merge_periods')
        let reihenfolge_warehousestock_after_using_demand = localStorage.get('reihenfolge_warehousestock_after_using_demand')
		let reihenfolge_future_movement = localStorage.get('reihenfolge_future_movement')
		let reihenfolge_warehousestock_after_movement = localStorage.get('reihenfolge_warehousestock_after_movement')

		localStorage.set('o_bestellungen', bestellungen2)
		localStorage.set('o_bestellungen_Reihenfolge', Reihenfolge)
		localStorage.set('o_reihenfolge_warehousestock_dict',reihenfolge_warehousestock_dict)
		localStorage.set('o_reihenfolge_waiting_items', reihenfolge_waiting_items)
		localStorage.set('o_reihenfolge_waiting_list', reihenfolge_waiting_list)
		localStorage.set('o_reihenfolge_new_warehousestock', reihenfolge_new_warehousestock)
		localStorage.set('o_reihenfolge_merge_periods', reihenfolge_merge_periods)
		localStorage.set('o_reihenfolge_warehousestock_after_using_demand', reihenfolge_warehousestock_after_using_demand)
		localStorage.set('o_reihenfolge_future_movement', reihenfolge_future_movement)
		localStorage.set('o_reihenfolge_warehousestock_after_movement', reihenfolge_warehousestock_after_movement)


	}

	checkIfExists = (Reihenfolge, number, menge, bestellart) => {	// 33: 33_ankunft, 33_menge, 33_bestellart
		console.log('checkIfExsists')
		console.log('checkIfExsists')
		console.log('checkIfExsists')
		let check;
		bestellart = `${bestellart}`



		Reihenfolge.map( json => {					// ob number exitiert, bestellart = addiert und nicht hinzufügen
			let matched;							// hinzufpgen und nicht addieren
			let bestellartT;
			Object.keys(json).map( numberT => {
				Object.keys(json[numberT]).map( (keysT, index) => {			// 33_ankunft , 33_menge, 33_bestellart

					// console.log('und und und')
					// console.log(number)
					// console.log('json', json)
					// console.log(matched)
					console.log(index, keysT)
					if (keysT.includes('bestellart')) {
						bestellartT = json[numberT][keysT]
					}

				})
				// if (keysT == `${number}_`)
				if (numberT == number) {							// match
					// matched = true;
					check = true
					matched = true
					console.log(' MATCH FOUND: ', numberT)
				}

			})
			console.log('Reihenfolge bestellart:', bestellartT)
			console.log('Erfasste Lieferungen bestellart:' ,bestellart)
			if (matched && bestellart == bestellartT) {
				console.log('EDITING') 											// duplikat = addieren,
				console.log(json[number][`${number}_menge`])
				json[number][`${number}_menge`] = json[number][`${number}_menge`] + menge;
				check = true;																			// addiere nicht
			}
			if ( matched && bestellart != bestellartT) {
				console.log('MATCHED, BUT BESTELLART DIFFRENT')
				check = false;
			}

			// if (matched) json[`${number}_menge`] = json[`${number}_menge`] + menge;
			// edited = true;
		})
		// if (check.includes(true) ) return true;
		if (check === true) return true;
		if ( check === false ) return false;
	}

	handleReset = (e) => {
		e.preventDefault();

		let bestellungen = localStorage.get('o_bestellungen')
		let Reihenfolge = localStorage.get('o_bestellungen_Reihenfolge')
		let reihenfolge_warehousestock_dict = localStorage.get('o_reihenfolge_warehousestock_dict')
		let reihenfolge_waiting_items = localStorage.get('o_reihenfolge_waiting_items')
		let reihenfolge_waiting_list = localStorage.get('o_reihenfolge_waiting_list')
		let reihenfolge_new_warehousestock = localStorage.get('o_reihenfolge_new_warehousestock')
		let reihenfolge_merge_periods = localStorage.get('o_reihenfolge_merge_periods')
		let reihenfolge_warehousestock_after_using_demand = localStorage('o_reihenfolge_warehousestock_after_using_demand')
		let reihenfolge_future_movement = localStorage.get('o_reihenfolge_future_movement')
		let reihenfolge_warehousestock_after_movement = localStorage.get('o_reihenfolge_warehousestock_after_movement')

		localStorage.set('bestellungen', bestellungen)
		localStorage.set('bestellungen_Reihenfolge', Reihenfolge)
		localStorage.set('reihenfolge_warehousestock_dict',reihenfolge_warehousestock_dict)
		localStorage.set('reihenfolge_waiting_items', reihenfolge_waiting_items)
		localStorage.set('reihenfolge_waiting_list', reihenfolge_waiting_list)
		localStorage.set('reihenfolge_new_warehousestock', reihenfolge_new_warehousestock)
		localStorage.set('reihenfolge_merge_periods', reihenfolge_merge_periods)
		localStorage.set('reihenfolge_warehousestock_after_using_demand', reihenfolge_warehousestock_after_using_demand)
		localStorage.set('reihenfolge_future_movement', reihenfolge_future_movement)
		localStorage.set('reihenfolge_warehousestock_after_movement', reihenfolge_warehousestock_after_movement)

		this.setState({ bestellungen: bestellungen, Reihenfolge: Reihenfolge })
	}

	handleFocus = e => {
		e.target.style.outline = '3px solid rgb(250, 149, 129)'
	}

	handleBlur = e => {
		e.target.style.outline = ''
	}

	handleOnChangeNewArtikel = e => {
		this.setState({newArtikel: e.target.value})
		e.target.value = parseInt(e.target.value)
		console.log(e.target.value)
		let zahlen = [ 21, 22, 23 ,24 ,25 , 27 , 28 , 32 , 33, 34, 35 , 36 ,37 ,38 ,39 , 40 , 41 , 42 , 43 , 44 , 45 ,46, 47, 48, 52, 53 , 57, 58, 59]
		if (e.target.value.length > 1 && !zahlen.includes(parseInt(e.target.value))) {
			console.log('bell')
			console.log(!zahlen.includes(e.target.value))
			console.log(e.target.value)
			this.setState({newArtikel: ''})
			document.getElementById('newArtikel').style.outline = '2px solid red'
			let invalidMessage = document.createElement('p')
			invalidMessage.innerHTML = 'dieser Artikel existiert nicht'
			invalidMessage.style.position='absolute';
			invalidMessage.style.color = 'red';
			invalidMessage.style.whiteSpace ='nowrap'
			invalidMessage.style.top = '43px';
			invalidMessage.style.left = '78px';
			invalidMessage.style.fontSize= '14px';
			document.getElementById('createButton').parentElement.appendChild(invalidMessage)
			setTimeout(() => {
				document.getElementById('newArtikel').style.outline = 'none'
				document.getElementById('createButton').parentElement.removeChild(invalidMessage)
			}, 1000)
		}
	}

	handleOnChangeAmount = e => {
		this.setState({newMenge: e.target.value})
		e.target.value = parseInt(e.target.value)
	}

	handleOnChangeOption = e => {
		this.setState({newOption: e.target.value})
		e.target.value = e.target.value
	}

	onCreateNewItem = (e) => {
		let { newArtikel, newMenge, newOption, bestellungen, Reihenfolge } = this.state;
		if ( newArtikel.length < 2 ) {
			console.log('bell')
			console.log(e.target.value)
			document.getElementById('newArtikel').style.outline = '2px solid red'
			let invalidMessage = document.createElement('p')
			invalidMessage.innerHTML = 'dieser Artikel existiert nicht'
			invalidMessage.style.position='absolute';
			invalidMessage.style.color = 'red';
			invalidMessage.style.whiteSpace ='nowrap'
			invalidMessage.style.top = '43px';
			invalidMessage.style.left = '78px';
			invalidMessage.style.fontSize= '14px';
			document.getElementById('createButton').parentElement.appendChild(invalidMessage)
			setTimeout(() => {
				document.getElementById('newArtikel').style.outline = 'none'
				document.getElementById('createButton').parentElement.removeChild(invalidMessage)
			}, 1000)
			return;
		}
		if ( newArtikel && newMenge ) {

			let tmp = {}
			let a =
			tmp[newArtikel] = { [`${newArtikel}_menge`] : parseInt(newMenge), [`${newArtikel}_bestellart`]: newOption}
			console.log(tmp)
			Reihenfolge.push(tmp)
			console.log('nasty')
			console.log(Reihenfolge)
			this.setState({Reihenfolge: Reihenfolge})

			localStorage.set('bestellungen_Reihenfolge', Reihenfolge)
		}
	}

	deleteArticel = e => {
		console.log(e.target.id)
		let { Reihenfolge } = this.state;
		Reihenfolge.splice(e.target.id,1)
		console.log(Reihenfolge)
		this.setState({Reihenfolge:Reihenfolge})
		localStorage.set('bestellungen_Reihenfolge', Reihenfolge)
	}


    render() {
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

			const { bestellungen, Reihenfolge } = this.state;

			console.log('hibam')
			console.log(bestellungen)
			console.log(Reihenfolge)

			let reihenfolge_warehousestock_dict = localStorage.get('reihenfolge_warehousestock_dict')
					let reihenfolge_waiting_items = localStorage.get('reihenfolge_waiting_items')
					let reihenfolge_waiting_list = localStorage.get('reihenfolge_waiting_list')
					let reihenfolge_new_warehousestock = localStorage.get('reihenfolge_new_warehousestock')
					let reihenfolge_merge_periods = localStorage.get('reihenfolge_merge_periods')
					let reihenfolge_warehousestock_after_using_demand = localStorage.get('reihenfolge_warehousestock_after_using_demand')
			let reihenfolge_future_movement = localStorage.get('reihenfolge_future_movement')
			let reihenfolge_warehousestock_after_movement = localStorage.get('reihenfolge_warehousestock_after_movement')

			console.log('klatschen')
			console.log(reihenfolge_warehousestock_after_movement)
			console.log(reihenfolge_warehousestock_dict)
			console.log(reihenfolge_waiting_items)
			console.log(reihenfolge_waiting_list)
			console.log(reihenfolge_new_warehousestock)
			console.log(reihenfolge_merge_periods)
			console.log(reihenfolge_warehousestock_after_using_demand)
			console.log(reihenfolge_future_movement)
			const { normal_range, deviation, discount_quantity } = this.state;


			let zahlen = [ 21, 22, 23 ,24 ,25 , 27 , 28 , 32 , 33, 34, 35 , 36 ,37 ,38 ,39 , 40 , 41 , 42 , 43 , 44 , 45 ,46, 47, 48, 52, 53 , 57, 58, 59]

			let future_movement = {}

			Object.keys(reihenfolge_future_movement).map( number => {
				future_movement[number] = {}
				Object.keys(reihenfolge_future_movement[number]).map( entry => {
					// 0.7
					// 1.7

					// { ankfunt: 1.40 , menge: 2000 }
					// { 1: { },
					// 2: { },
					// }
					let ankunft = Math.floor(reihenfolge_future_movement[number][entry]['ankunft'])

					if ( future_movement[number] && future_movement[number][ankunft] ) {
						// let ankunft = Math.floor(reihenfolge_future_movement[number]['ankunft'])
						if ( ankunft === 0 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
						if ( ankunft === 1 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
						if ( ankunft === 2 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
						if ( ankunft === 3 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
					}

					if ( future_movement[number] && !future_movement[number][ankunft] ) {
						let tmp = {}
						tmp['ankunft'] = reihenfolge_future_movement[number][entry]['ankunft'];
						tmp['menge'] = reihenfolge_future_movement[number][entry]['menge']
						console.log('number',number)
						console.log('entry',entry)
						console.log(`reihenfolge_future_movement[number][entry]['menge']`, reihenfolge_future_movement[number][entry]['menge'])
						console.log('reihenfolge_future_movement_a',reihenfolge_future_movement)

						if ( ankunft === 0 ) future_movement[number][0] = tmp;
						if ( ankunft === 1 ) future_movement[number][1] = tmp;
						if ( ankunft === 2 ) future_movement[number][2] = tmp;
						if ( ankunft === 3 ) future_movement[number][3] = tmp;
					}

					if ( number == 43 ) {
						if ( future_movement[number] && future_movement[number][ankunft] ) {
							// let ankunft = Math.floor(reihenfolge_future_movement[number]['ankunft'])
							if ( ankunft === 0 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
							if ( ankunft === 1 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
							if ( ankunft === 2 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
							if ( ankunft === 3 ) future_movement[number]['menge'] = future_movement[number]['menge'] + 	reihenfolge_future_movement[number][entry]['menge']
						}
						console.log('future_movement_b',future_movement)
						let zzz = future_movement
						let aaa = future_movement[number]
						// let bbb =  future_movement[number][ankunft]
						if ( future_movement[number] && !future_movement[number][ankunft] ) {
							future_movement[number] = {}
							let tmp = {}
							tmp['ankunft'] = reihenfolge_future_movement[number][entry]['ankunft'];
							tmp['menge'] = reihenfolge_future_movement[number][entry]['menge']
							console.log('number',number)
							console.log('entry',entry)
							console.log(`reihenfolge_future_movement[number][entry]['menge']`, reihenfolge_future_movement[number][entry]['menge'])
							console.log('reihenfolge_future_movement_a',reihenfolge_future_movement)

							if ( ankunft === 0 ) future_movement[number][0] = tmp;
							if ( ankunft === 1 ) future_movement[number][1] = tmp;
							if ( ankunft === 2 ) future_movement[number][2] = tmp;
							if ( ankunft === 3 ) future_movement[number][3] = tmp;
						}
					}
				})

			})

			console.log('wein')
			console.log(future_movement)

			let colorstyle1 = {}

		return (
			<React.Fragment>
				<div style={{ padding: '30px', margin: '0px 115px 0 120px'  }} >
					<table style={{backgroundColor:'#c1c1bf',margin:'auto'}}>
						<div style={{ border: '3px solid#f0f0f0'}}>
						<tbody>
							<tr>
								<td style={{ padding:'5px 10px 10px 10px'}}>
									<table style={{margin:'auto'}}>
										<tbody>
											<tr>
											<td></td>
											<td>{this.props.t('orders.article')}</td>
											<td>{this.props.t('orders.amount')}</td>
											<td>{this.props.t('orders.mode')}</td>
											</tr>
										{ console.log('bier')}
										{ console.log(Reihenfolge)}
										{ Reihenfolge && Reihenfolge.length > 0 && Reihenfolge.map( (element,index)=>
										Object.keys(element).map( E =>
											<tr>
												{ console.log('element')}
												{console.log( element)}
												{ console.log('E', E)}
												{console.log(bezeichnerKaufteile)}
												{console.log(bezeichnerKaufteile[E])}
												<td> {bezeichnerKaufteile[E]}</td>
											<td><input style={{ margin: '0 5px 0 0 '}} tabIndex='-1' autoComplete='off' readOnly='true' size="4" name={E} value={E} maxLength="5" type="text" onChange={this.handleChange} /></td>
											<td><input onFocus={this.handleFocus} min='1000' onBlur={this.handleBlur} style={{ margin: '0 5px 0 0 '}} autoComplete='off' size="4" data-id={index} name={`${E}_menge`} value={Reihenfolge[index][E][`${E}_menge`]} maxLength="5" type="text" onChange={this.handleChange} /></td>
											<td>
												<select onFocus={this.handleFocus} onBlur={this.handleBlur} style={{height: '30px'}} name={`${E}_bestellart`} size="1" data-id={index} value={Reihenfolge[index][E][`${E}_bestellart`]} onChange={this.handleChange}>
													<option value="Normal">Normal</option>
													<option value="Eil">Eil</option>
													<option value="JIT">JIT</option>
													<option value="Billiganbieter">Billiganbieter</option>
													<option value="Sonderbestellung">Sonderbestellung</option>
												</select>
												</td>
												<td> <button id={index} onClick={this.deleteArticel}> {this.props.t('orders.buttondelete')} </button></td>
											</tr>
											)
										)}
									<tr >
										<div style={{position:'relative'}}>
										<br></br>
										<button id='createButton' onClick={this.onCreateNewItem}>{this.props.t('orders.buttoncreate')} </button>{this.props.t('orders.textnewitem')}
										</div>
									</tr>
									<tr>
										{/* { !bezeichnerKaufteile[this.state.newArtikel] && 
											<span> Enter a id</span>
										} */}
										<td> {bezeichnerKaufteile[this.state.newArtikel]}</td>
										<td><input id='newArtikel' onChange={this.handleOnChangeNewArtikel}style={{ margin: '0 5px 0 0 '}} tabIndex='' autoComplete='off' size="4"  value={this.state.newArtikel} maxLength="5" type="text"  /></td>
										<td><input onChange={this.handleOnChangeAmount} onFocus={this.handleFocus} id='new_artikel_amount' onBlur={this.handleBlur} style={{ margin: '0 5px 0 0 '}} autoComplete='off' size="4" name={''} value={this.state.newMenge} maxLength="5" type="text"  /></td>
										<td>
											<select onChange={this.handleOnChangeOption} onFocus={this.handleFocus} id='new_artikel_option' onBlur={this.handleBlur} style={{height: '30px'}} name={''} size="1" value={this.state.newOption} >
												<option value="Normal">Normal</option>
												<option value="Eil">Eil</option>
												<option value="JIT">JIT</option>
												<option value="Billiganbieter">Billiganbieter</option>
												<option value="Sonderbestellung">Sonderbestellung</option>
											</select>	
										</td>
									</tr>

									{/* <tr id='1234'>
										<td id='1234AAA'>
											<Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{ margin: '5px 0 0 0 ',
													background: 'rgb(250, 149, 129)',
													border: '2px solid ghostwhite',
													color: 'ghostwhite',
												}}>

											<Link style={{ color: 'ghostwhite' }}to='/Fertigungsaufträge'>
												{this.props.t('orders.buttonback')}
											</Link>

											</Button>
										</td>
										<td>
											<Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  onClick={this.handleReset} style={{
												background: 'rgb(250, 149, 129)',
												border: '2px solid ghostwhite',
												color: 'white',
												margin: '5px',
												position: 'relative',
												top: '2px',
												width: '57px'
											}}> 
											<Icon name='undo' />
											</Button>
										</td>
										<td style={{ position: 'relative'}}>
											<Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{  margin: '5px 0 0 0 ' ,
														background: 'rgb(250, 149, 129)',
														border: '2px solid ghostwhite',
														color: 'ghostwhite',
												}}>
												<Link style={{ color: 'ghostwhite' }}to='/Arbeitszeiten'>
													{this.props.t('orders.buttonforward')}
												</Link>
												</Button>
											</td>
											</tr> */}
										</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</div>
						</table>


						<div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
									<Button className='myButtons backgroundColor1 marginRight'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{ margin: '5px 0 0 0 ',
													background: 'rgb(250, 149, 129)',
													border: '2px solid ghostwhite',
													color: 'ghostwhite',
													marginRight: '10px'
												}}>

											<Link style={{ color: 'ghostwhite' }}to='/Fertigungsaufträge'>
												{this.props.t('orders.buttonback')}
											</Link>

										</Button>

										<Button className='myButtons backgroundColor1 marginRight'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  onClick={this.handleReset} style={{
												background: 'rgb(250, 149, 129)',
												border: '2px solid ghostwhite',
												color: 'white',
												margin: '5px',
												position: 'relative',
												top: '2px',
												width: '57px',
												marginRight: '10px'
											}}> 
											{/* {this.props.t('orders.buttonreset')}  */}
											<Icon name='undo' />
										</Button>

										<Button className='myButtons backgroundColor1 marginRight'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{  margin: '5px 0 0 0 ' ,
												background: 'rgb(250, 149, 129)',
												border: '2px solid ghostwhite',
												color: 'ghostwhite',
												marginRight: '10px'
												}}>
												<Link style={{ color: 'ghostwhite' }}to='/Arbeitszeiten'>
													{this.props.t('orders.buttonforward')}
												</Link>
												</Button>

									</div>
									<div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
										<Button className='myButtons backgroundColor1' 
											id='product1_button'
												style={{ marginLeft: '20px' ,
												background: 'rgb(250, 149, 129)',
												border: '2px solid ghostwhite',
												color: 'ghostwhite',
												margin: '20px',
												position: 'relative',

												}}
												onClick={this.anzeigenExpertModus}

													> Expert modus 
										</Button>

									</div>
					</div>
							{/* > {this.props.t('fertigungsauftraege.calcview')}</Button> */}
								{/* ugur */}
						{ !this.state.erklärung && (
                        <div style={{ height: '200px'}}> </div>

                    )}
							<button style={{ color:'white', position:'fixed'}}> Kaufteil Nr	Lieferfrist	Abweichung	Diskontmenge	Lagerbestand	Bruttobedarf	zukünftige Eingänge	Lagerbestand</button>
							{ this.state.erklärung && (
							<React.Fragment> 
							<table  style={{ whiteSpace: 'nowrap', margin: '20px 0 0 -255px'}}>
								<tr >
									<th style={{border: '2px solid white'}} rowSpan="3">{this.props.t('orders.kaufteilnr')}</th>
									<th style={{border: '2px solid white'}} rowSpan="3">{this.props.t('orders.lieferfrist')}</th>
									<th style={{border: '2px solid white'}} rowSpan="3">{this.props.t('orders.abweichung')}</th>
									<th style={{border: '2px solid white'}} rowSpan="3">{this.props.t('orders.diskontmenge')}</th>
									<th style={{border: '2px solid white'}} rowSpan="3">{this.props.t('orders.lagerbestand')}</th>
									<th style={{border: '2px solid white'}} colSpan="4">{this.props.t('orders.bruttobedarf')}</th>
									<th style={{border: '2px solid white'}} colSpan="9"> {this.props.t('orders.futurevalue')}</th>
									<th style={{border: '2px solid white'}} colSpan="4">{this.props.t('orders.stockvalue')}</th>
								</tr>
								<tr>
									<td style={{ border: '2px solid white'}} rowspan="2">n</td>
									<td style={{ border: '2px solid white'}} rowspan="2">n+1</td>
									<td style={{ border: '2px solid white'}} rowspan="2">n+2</td>
									<td style={{ border: '2px solid white'}} rowspan="2">n+3</td>
									<td style={{ border: '2px solid white'}} colspan="3">n</td>
									<td style={{ border: '2px solid white'}} colspan="2">n+1</td>
									<td style={{ border: '2px solid white'}} colspan="2">n+2</td>
									<td style={{ border: '2px solid white'}} colspan="2">n+3</td>
									<td style={{ border: '2px solid white'}} rowspan="2">n+1</td>
									<td style={{ border: '2px solid white'}} rowspan="2">n+2</td>
									<td style={{ border: '2px solid white'}} rowspan="2">n+3</td>
									<td style={{ border: '2px solid white'}} rowspan="2">n+4</td>
								</tr>
								<tr>
									<td style={{border: '2px solid white'}}>{this.props.t('orders.ankunft')}</td>
									<td style={{border: '2px solid white'}} colSpan="2">{this.props.t('orders.menge')}</td>
									<td style={{border: '2px solid white'}}>{this.props.t('orders.ankunft')}</td>
									<td style={{border: '2px solid white'}}>{this.props.t('orders.menge')}</td>
									<td style={{border: '2px solid white'}}>{this.props.t('orders.ankunft')}</td>
									<td style={{border: '2px solid white'}}>{this.props.t('orders.menge')}</td>
									<td style={{border: '2px solid white'}}>{this.props.t('orders.ankunft')}</td>
									<td style={{border: '2px solid white'}}>{this.props.t('orders.menge')}</td>
								</tr>
								{zahlen.map( number =>
									<tr>
									<td style={{ border: '2px solid white'}} > {number}</td>
									<td style={{ border: '2px solid white'}} > {normal_range[number]}</td>
									<td style={{ border: '2px solid white'}} > {deviation[number]}</td>
									<td style={{ border: '2px solid white'}} > {discount_quantity[number]}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_new_warehousestock[number])}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_merge_periods[1][number])}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_merge_periods[2][number])}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_merge_periods[3][number])}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_merge_periods[4][number])}</td>
									{ console.log('wodka')}
									{ console.log(reihenfolge_merge_periods)}
									<td style={{ border: '2px solid white'}} >
										{ future_movement && future_movement[number] && future_movement[number][0] && future_movement[number][0]['ankunft']}</td>
									<td colspan='2' style={{ border: '2px solid white'}} >
										{console.log('future__',future_movement)}
										{ future_movement && future_movement[number] && future_movement[number][0] && future_movement[number][0]['menge']}</td>
									<td style={{ border: '2px solid white'}} >
										{ future_movement && future_movement[number] && future_movement[number][1] && future_movement[number][1]['ankunft']}</td>
									<td style={{ border: '2px solid white'}} >
										{ future_movement && future_movement[number] && future_movement[number][1] && future_movement[number][1]['menge']}</td>
									<td style={{ border: '2px solid white'}} >
										{ future_movement && future_movement[number] && future_movement[number][2] && future_movement[number][2]['ankunft']}</td>
									<td style={{ border: '2px solid white'}} >
										{ future_movement && future_movement[number] && future_movement[number][2] && future_movement[number][2]['menge']}</td>
									<td style={{ border: '2px solid white'}} >
										{ future_movement && future_movement[number] && future_movement[number][3] && future_movement[number][3]['ankunft']}</td>
									<td style={{ border: '2px solid white'}} >
										{ future_movement && future_movement[number] && future_movement[number][3] && future_movement[number][3]['menge']}</td>
									<td style={{ border: '2px solid white', ...colorstyle1}} > {Math.ceil(reihenfolge_warehousestock_after_movement[1][number])}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_warehousestock_after_movement[2][number])}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_warehousestock_after_movement[3][number])}</td>
									<td style={{ border: '2px solid white'}} > {Math.ceil(reihenfolge_warehousestock_after_movement[4][number])}</td>
	 						 </tr>
							)}
					</table>
				</React.Fragment> 
				)}
			</React.Fragment>
		)}
}

export default translate(Bestellungen);
