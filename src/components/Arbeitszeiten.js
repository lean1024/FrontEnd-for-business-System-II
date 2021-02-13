// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import localStorage from 'local-storage';
import { Button, input } from 'semantic-ui-react';
//import { Link } from "react-router-dom";
import { translate } from "react-multi-lang";
import { Link, Events, ScrollElement, Element } from "react-scroll";

class Arbeitszeiten extends Component {

	state = { arbeitszeiten: {}, arbeitszeiten_warteschlange: {}, arbeitszeiten_zustand:[] , zeiger_zustand:0, erklärung: false}

	handleReset = (e) => {
		e.preventDefault();

		let a =localStorage.get('original_arbeitszeiten_arbeitszeiten')
		let b = localStorage.get('original_arbeitszeiten_rüstzeit');
		let c =localStorage.get('original_arbeitszeiten_warteschlange');
		let d =localStorage.get('orginal_arbeitszeiten')

		localStorage.set('arbeitszeiten_arbeitszeiten',a )
		localStorage.set('arbeitszeiten_rüstzeit',b)
		localStorage.set('arbeitszeiten_warteschlange',c)
		localStorage.set('arbeitszeiten', d)

		this.setState({ arbeitszeiten: d })
	}
	handleChange = (evt) => {
	let { arbeitszeiten } = this.state;
	console.log(arbeitszeiten)
	let max_value = 240;
	if (isNaN(evt.target.value)) {
		evt.target.style.outline = '3px solid red';
		var target = evt.target
		setTimeout(() => target.style.outline = '2px solid rgb(250, 149, 129)', 300)
	}
	// only change value, if input is number
	if (!isNaN(evt.target.value)) {
		Object.keys(arbeitszeiten).map( (arbeitsstelle, index) => {
			Object.keys(arbeitszeiten[arbeitsstelle]).map( key => {
				if ( evt.target.name === key) {
					arbeitszeiten[arbeitsstelle][key] = parseInt(evt.target.value);
					if ( !evt.target.value ) arbeitszeiten[arbeitsstelle][key] = '';
					if ( evt.target.value > max_value ) arbeitszeiten[arbeitsstelle][key] = 240;
					if (key.includes('überstunden')) {
						arbeitszeiten[arbeitsstelle][`überstunden_gesamt${arbeitsstelle}`] = parseInt(evt.target.value) * 5
						if ( isNaN(parseInt( evt.target.value) * 5 )) {
							arbeitszeiten[arbeitsstelle][`überstunden_gesamt${arbeitsstelle}`] = 0
						}
					}
					if (key.includes('anzahl_Schichten')) {
						arbeitszeiten[arbeitsstelle][`zeitbedarf_schichten${arbeitsstelle}`] = parseInt(evt.target.value) * 2400
						if ( isNaN(parseInt( evt.target.value) * 5 )) {
							arbeitszeiten[arbeitsstelle][`zeitbedarf_schichten${arbeitsstelle}`] = 0
						}

					}
					// # wenn Schichten 3 sind
					if (evt.target.name.includes('überstunden')) {
						let workstation = evt.target.name.slice(11, evt.target.name.length)
						if (arbeitszeiten[workstation][`anzahl_Schichten${workstation}`] === 3) {
							alert('keine Überstunden bei 3 Schichten möglich.')
							evt.target.style.outline = '3px solid red';
							arbeitszeiten[arbeitsstelle][key] = 0;
							var target = evt.target
							setTimeout(() => target.style.outline = '2px solid rgb(250, 149, 129)', 300)
						}
					}
					if (evt.target.name.includes('anzahl_Schichten')) {
						let workstation = evt.target.name.slice(16, evt.target.name.length)
						if (arbeitszeiten[workstation][`anzahl_Schichten${workstation}`] === 3) {
							arbeitszeiten[workstation][`überstunden${workstation}`] =0;
							arbeitszeiten[workstation][`überstunden_gesamt${workstation}`] =0;
						}
					}
					}
				})
			})
		}
		let arbeitsstelle = evt.target.getAttribute('index')
		let SaschasNumber = arbeitszeiten[arbeitsstelle][`zeitbedarf${arbeitsstelle}`] - arbeitszeiten[arbeitsstelle][`zeitbedarf_schichten${arbeitsstelle}`] - arbeitszeiten[arbeitsstelle][`überstunden_gesamt${arbeitsstelle}`]
		if (SaschasNumber > 0 ) {
			arbeitszeiten[arbeitsstelle][`nicht_produziert_too_much${arbeitsstelle}`] = SaschasNumber * -1
		}
		else {
			arbeitszeiten[arbeitsstelle][`nicht_produziert_too_much${arbeitsstelle}`] = 0
		}

		this.setState({ arbeitszeiten: arbeitszeiten})
		localStorage.set('arbeitszeiten', arbeitszeiten);

	}

	handleFocus = e => {
		e.target.style.outline = '3px solid rgb(250, 149, 129)'
	}

	// Ugurs Bereich
	// e = event
	handleBlur = e => {
		e.target.style.outline = ''
		let arbeitszeiten_zustand = this.state.arbeitszeiten_zustand   // [ {} ]
		let arbeitszeiten = this.state.arbeitszeiten;
		let arraynumber = this.state.arbeitszeiten_zustand.length - 1;

		arbeitszeiten_zustand.push(arbeitszeiten)
		this.setState({arbeitszeiten_zustand: arbeitszeiten_zustand}) // Array mit aktuellen Werten
		console.log('Arbeitszeiten Zustand1: ', arbeitszeiten_zustand);
		this.setState({zeiger_zustand: arraynumber});
	}

	onSubmitBack(){
		let arraylast = this.state.arbeitszeiten_zustand.length - 1;
		if (arraylast === 0){
			return;
		}
		let arrayzustand_aktuell = arraylast;
		let arraynumber = arrayzustand_aktuell - 1;
		let arbeitszeiten_zustandneu = this.state.arbeitszeiten_zustand[arraynumber];
		this.setState({arbeitszeiten: arbeitszeiten_zustandneu});
	}

	onSubmitForward(){
		// let arraylast = this.state.arbeitszeiten_zustand.length - 1;
		if (this.state.zeiger_zustand === this.state.arbeitszeiten_zustand.length){
			return;
		}
		let arrayzustand_aktuell = this.state.zeiger_zustand;
		let arraynumber = arrayzustand_aktuell + 1;
		this.setState({arrayzustand_aktuell: arraynumber});
		let arbeitszeiten_zustandneu = this.state.arbeitszeiten_zustand[arraynumber];
		this.setState({arbeitszeiten: arbeitszeiten_zustandneu});
	}


	componentWillUnmount(){
		document.getElementById('Arbeitszeiten').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')
  }

  anzeigenExpertModus = () => {
	  this.setState({ erklärung: !this.state.erklärung})
  }

	componentDidMount() {
		//reset 25.01
		let arbeitszeiten_arbeitszeiten = localStorage.get('arbeitszeiten_arbeitszeiten')
		let arbeitszeiten_rüstzeit = localStorage.get('arbeitszeiten_rüstzeit')
		let arbeitszeiten_warteschlange = localStorage.get('arbeitszeiten_warteschlange')
		const rememberedState = localStorage.get('arbeitszeiten');

		localStorage.set('original_arbeitszeiten_arbeitszeiten',arbeitszeiten_arbeitszeiten)
		localStorage.set('original_arbeitszeiten_rüstzeit', arbeitszeiten_rüstzeit);
		localStorage.set('original_arbeitszeiten_warteschlange',arbeitszeiten_warteschlange);
		localStorage.set('orginal_arbeitszeiten', rememberedState)

		let arbeitszeiten = rememberedState;

		let arbeitszeiten_zustand = this.state.arbeitszeiten_zustand;    //  [  ]           [{}]
		console.log('Arbeitszustand leeres Array', arbeitszeiten_zustand);

		// Füllt den Array [0] mit den aktuellen Einträgen.
		arbeitszeiten_zustand.push(arbeitszeiten);
		this.setState({arbeitszeiten_zustand: arbeitszeiten_zustand})

		this.setState({arbeitszeiten_warteschlange: arbeitszeiten_warteschlange});

		document.getElementById('Arbeitszeiten').childNodes[0].setAttribute('style', 'color:black;  ')

		window.scrollTo(0, 0)
		console.log('wuwu')
		console.log(rememberedState);
		if (rememberedState !== null ) {
			this.setState({ arbeitszeiten: rememberedState})
			localStorage.set('arbeitszeiten_safe', rememberedState)
		}

		setTimeout( () => {
			if( document.getElementsByName('überstunden5')[0] && document.getElementsByName('anzahl_Schichten5')[0]) {

				document.getElementsByName('überstunden5')[0].style.backgroundColor = 'darkgrey';
				document.getElementsByName('überstunden5')[0].setAttribute('readOnly','true')
				document.getElementsByName('überstunden5')[0].setAttribute('tabIndex','-1')
				document.getElementsByName('anzahl_Schichten5')[0].style.backgroundColor = 'darkgrey';

				document.getElementsByName('anzahl_Schichten5')[0].setAttribute('readOnly','true')
				document.getElementsByName('anzahl_Schichten5')[0].setAttribute('tabIndex','-1')
			}
		},50)

	}


    render() {


		// Speichern des Objekts in Arbeitszeiten
		// Nimmt die Daten aus dem gleichnamigen Objekt
		let { arbeitszeiten } = this.state;
		let arbeitszeiten_zustand = this.state.arbeitszeiten_zustand

		console.log('Arbeitszeiten Zustand', arbeitszeiten_zustand);
		console.log('keke')
		console.log(arbeitszeiten)

		let arbeitszeiten_arbeitszeiten = localStorage.get('arbeitszeiten_arbeitszeiten')
		let arbeitszeiten_rüstzeit = localStorage.get('arbeitszeiten_rüstzeit')
		let arbeitszeiten_warteschlange = localStorage.get('arbeitszeiten_warteschlange')

		console.log('arbeitszeiten_arbeitszeiten')
		console.log(arbeitszeiten_arbeitszeiten)
		console.log('arbeitszeiten_rüstzeit')
		console.log(arbeitszeiten_rüstzeit)

		console.log('arbeitszeiten_warteschlange')
		console.log(arbeitszeiten_warteschlange)

		let dictonary_entrys = {}
		Object.keys(arbeitszeiten_arbeitszeiten).map( arbeitsplatzt => {
				let allEntrys = []
    Object.keys(arbeitszeiten_arbeitszeiten[arbeitsplatzt]).map ( entry => {
       allEntrys.push(entry)
		})		
    dictonary_entrys[`${arbeitsplatzt}`] = allEntrys
		})
		let dictonary_warteschlange = {}
		Object.keys(arbeitszeiten_warteschlange).map( arbeitsplatzt => {
			let allEntrys = []
			Object.keys(arbeitszeiten_warteschlange[arbeitsplatzt]).map ( entry => {
			allEntrys.push(entry)
		})
		dictonary_warteschlange[`${arbeitsplatzt}`] = allEntrys		
		})

		console.log('dictonary_entrys')
    console.log(dictonary_entrys)

		console.log('dictonary_warteschlange')
    console.log(dictonary_warteschlange)

		console.log('arbeitszeiten_', arbeitszeiten)
		return (
			<div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' }}>
				<table style={{backgroundColor:'#c1c1bf',margin:'auto' }}>
				<div style={{ border: '3px solid#f0f0f0'}}>
					<tbody>
					<tr>
						<td style={{padding:'10px 0px 0px 15px'}}>
							<table style={{backgroundColor:'#c1c1bf',margin:'auto'}}>
								<tbody><tr>
									<td>&nbsp;</td>
									<td>{this.props.t('workingtimes.shiftwork')}</td>
									<td>{this.props.t('workingtimes.workovertime')}</td>
									<td> {this.props.t('workingtimes.missingcapacity')} </td>
								</tr>
								{ Object.keys(arbeitszeiten).map(( arbeitsstelle, index ) =>
									<tr>
										<td>
											{ index +1 }
											{ console.log( 'aaa' + arbeitszeiten[arbeitsstelle])}
											{ console.log( arbeitsstelle)}
										</td>
										<td>
											<input
												onFocus={this.handleFocus}
												onBlur={this.handleBlur}
												style={{
												'-webkit-writing-mode': 'horizontal-tb !important',
												'text-rendering': 'auto',
												'color': 'initial',
												'letter-spacing': 'normal',
												'word-spacing': 'normal',
												'text-transform': 'none',
												'text-indent': '0px',
												'text-shadow': 'none',
												'display': 'inline-block',
												'-webkit-appearance': 'textfield',
												'background-color': '#eeebdc',
												'-webkit-rtl-ordering': 'logical',
												'cursor': 'text',
												'margin': '0em',
												'font': '400 13.3333px Arial',
												'padding': '5px 1px 5px 1px',
												'border-width': '2px',
												'border-style': 'inset',
												'border-color': 'initial',
												'border-image': 'initial',

												'text-align': 'center' }} index={index+1} autoComplete='off' size="4" name={`anzahl_Schichten${index+1}`} value={arbeitszeiten[arbeitsstelle][`anzahl_Schichten${index+1}`]} maxLength="1" type="text" onChange={this.handleChange} />
										</td>
										<td>
											<input
											onFocus={this.handleFocus}
											onBlur={this.handleBlur}
											index={index+1}
											style={{
												'-webkit-writing-mode': 'horizontal-tb !important',
												'text-rendering': 'auto',
												'color': 'initial',
												'letter-spacing': 'normal',
												'word-spacing': 'normal',
												'text-transform': 'none',
												'text-indent': '0px',
												'text-shadow': 'none',
												'display': 'inline-block',
												'-webkit-appearance': 'textfield',
												'background-color': '#eeebdc',
												'-webkit-rtl-ordering': 'logical',
												'cursor': 'text',
												'margin': '0em',
												'font': '400 13.3333px Arial',
												'padding': '5px 1px 5px 1px',
												'border-width': '2px',
												'border-style': 'inset',
												'border-color': 'initial',
												'border-image': 'initial',
												'text-align': 'center' }}
											autoComplete='off' size="4" name={`überstunden${index+1}`} value={arbeitszeiten[arbeitsstelle][`überstunden${index+1}`]} maxLength="5" type="text" onChange={this.handleChange} />
										</td>
										<td>
											{ arbeitszeiten[index+1][`nicht_produziert_too_much${index+1}`] <0 && (<div style={{ color: 'red',}}>{arbeitszeiten[index+1][`nicht_produziert_too_much${index+1}`]}</div> )}
										</td>
									</tr>
									)}
									<tr>
										<td>
										</td>
										<td>
										<Button onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{ margin: '5px',
											background: 'rgb(250, 149, 129)',
											border: '2px solid ghostwhite',
											color: 'ghostwhite',
											position: 'relative',
											left: '-12px'
											}}
										>
											<Link style={{ color: 'ghostwhite' }}to='/Bestellungen' >
												{this.props.t('workingtimes.backbutton')}
											</Link>
										</Button>
										</td>
										<td style={{ position: 'relative'}}>
											<Button
											onClick={this.handleReset}
											onFocus={ this.handleFocus} onBlur={this.handleBlur}
													style= {{
												background: 'rgb(250, 149, 129)',
												border: '2px solid ghostwhite',
												color: 'ghostwhite',
												position: 'relative',
												left: '-5px',
												margin: '19px 0px 0px 0px',
												top: '-10px'
										}}> {this.props.t('workingtimes.resetbutton')} </Button>
										</td>
									</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
			</div>
		</table>
			<Button
				id='product1_button'
					style={{ marginLeft: '20px' ,position: '', right: '35%',
					background: 'rgb(250, 149, 129)',
					border: '2px solid ghostwhite',
					color: 'ghostwhite',
					margin: '20px',
					position: 'relative',
					right: '-350px'
						}}
					onClick={this.anzeigenExpertModus}
					> Expert modus </Button>
					{this.state.erklärung && (
				<div>
					<div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'}}>
					{ arbeitszeiten[1] && <React.Fragment>
					<table class="tg">
						<tr>
							<th style={{ width: '33%'}}>{this.props.t('workingtimes.arbeitsplatz')} </th>
							<th style={{ width: '33%'}}>{this.props.t('workingtimes.zeitbedarf')}</th>
							<th style={{ width: '33%'}}>{this.props.t('workingtimes.zeitdeckungschichten')}</th>
							<th style={{ width: '33%'}}>{this.props.t('workingtimes.zeitdeckungstunden')}</th>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="1" to="1" spy={true} smooth={true} duration={500} >1</Link>
							</td>
							<td class="tg-0lax">{arbeitszeiten[1].zeitbedarf1}</td>
							<td class="tg-0lax">{arbeitszeiten[1].zeitbedarf_schichten1}</td>
							<td class="tg-0lax"> {arbeitszeiten[1].überstunden_gesamt1}</td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="2" to="2" spy={true} smooth={true} duration={500} >2</Link>
							</td>
							<td class="tg-0pky">{arbeitszeiten[2].zeitbedarf2}</td>
							<td class="tg-0pky">{arbeitszeiten[2].zeitbedarf_schichten2}</td>
							<td class="tg-0pky">{arbeitszeiten[2].überstunden_gesamt2}</td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="3" to="3" spy={true} smooth={true} duration={500} >3</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[3].zeitbedarf3} </td>
							<td class="tg-0lax"> {arbeitszeiten[3].zeitbedarf_schichten3} </td>
							<td class="tg-0lax"> {arbeitszeiten[3].überstunden_gesamt3} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="4" to="4" spy={true} smooth={true} duration={500} >4</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[4].zeitbedarf4} </td>
							<td class="tg-0lax"> {arbeitszeiten[4].zeitbedarf_schichten4} </td>
							<td class="tg-0lax"> {arbeitszeiten[4].überstunden_gesamt4} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="5" to="5" spy={true} smooth={true} duration={500} >5</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[5].zeitbedarf5} </td>
							<td class="tg-0lax"> {arbeitszeiten[5].zeitbedarf_schichten5} </td>
							<td class="tg-0lax"> {arbeitszeiten[5].überstunden_gesamt5} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="6" to="6" spy={true} smooth={true} duration={500} >6</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[6].zeitbedarf6} </td>
							<td class="tg-0lax"> {arbeitszeiten[6].zeitbedarf_schichten6} </td>
							<td class="tg-0lax"> {arbeitszeiten[6].überstunden_gesamt6} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="7" to="7" spy={true} smooth={true} duration={500} >7</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[7].zeitbedarf7} </td>
							<td class="tg-0lax"> {arbeitszeiten[7].zeitbedarf_schichten7} </td>
							<td class="tg-0lax"> {arbeitszeiten[7].überstunden_gesamt7} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="8" to="8" spy={true} smooth={true} duration={500} >8</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[8].zeitbedarf8} </td>
							<td class="tg-0lax"> {arbeitszeiten[8].zeitbedarf_schichten8} </td>
							<td class="tg-0lax"> {arbeitszeiten[8].überstunden_gesamt8} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="9" to="9" spy={true} smooth={true} duration={500} >9</Link>
						</td>
							<td class="tg-0lax"> {arbeitszeiten[9].zeitbedarf9} </td>
							<td class="tg-0lax"> {arbeitszeiten[9].zeitbedarf_schichten9} </td>
							<td class="tg-0lax"> {arbeitszeiten[9].überstunden_gesamt9} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="10" to="10" spy={true} smooth={true} duration={500} >10</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[10].zeitbedarf10} </td>
							<td class="tg-0lax"> {arbeitszeiten[10].zeitbedarf_schichten10} </td>
							<td class="tg-0lax"> {arbeitszeiten[10].überstunden_gesamt10} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="11" to="11" spy={true} smooth={true} duration={500} >11</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[11].zeitbedarf11} </td>
							<td class="tg-0lax"> {arbeitszeiten[11].zeitbedarf_schichten11} </td>
							<td class="tg-0lax"> {arbeitszeiten[11].überstunden_gesamt11} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="12" to="12" spy={true} smooth={true} duration={500} >12</Link>
						</td>
							<td class="tg-0lax"> {arbeitszeiten[12].zeitbedarf12} </td>
							<td class="tg-0lax"> {arbeitszeiten[12].zeitbedarf_schichten12} </td>
							<td class="tg-0lax"> {arbeitszeiten[12].überstunden_gesamt12} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="13" to="13" spy={true} smooth={true} duration={500} >13</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[13].zeitbedarf13} </td>
							<td class="tg-0lax"> {arbeitszeiten[13].zeitbedarf_schichten13} </td>
							<td class="tg-0lax"> {arbeitszeiten[13].überstunden_gesamt13} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="14" to="14" spy={true} smooth={true} duration={500} >14</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[14].zeitbedarf14} </td>
							<td class="tg-0lax"> {arbeitszeiten[14].zeitbedarf_schichten14} </td>
							<td class="tg-0lax"> {arbeitszeiten[14].überstunden_gesamt14} </td>
						</tr>
						<tr>
							<td class="tg-0lax">
							<Link activeClass="active" className="15" to="15" spy={true} smooth={true} duration={500} >15</Link>
							</td>
							<td class="tg-0lax"> {arbeitszeiten[15].zeitbedarf15} </td>
							<td class="tg-0lax"> {arbeitszeiten[15].zeitbedarf_schichten15} </td>
							<td class="tg-0lax"> {arbeitszeiten[15].überstunden_gesamt15} </td>
						</tr>
					</table>
					</React.Fragment>
						}
					</div>
					{ arbeitszeiten_arbeitszeiten[1][29] && Object.keys(arbeitszeiten_arbeitszeiten).map( number =>
					<div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'}}>
					<p style={{ fontWeight: `bold`, color: `red` }} >
						<Element name={number} className="element" >
							{this.props.t('workingtimes.arbeitsplatz')} {number}
						</Element>
					</p>
					<table style={{ width: '100'}}class="tg">
						<tr>
							<th className="tg-0pky" colSpan="3">{this.props.t('workingtimes.arbeitszeit')}</th>
							<th className="tg-0lax" colSpan="3">{this.props.t('workingtimes.rüstzeit')}</th>
							<th className="tg-0lax" colSpan="3">{this.props.t('workingtimes.warteschlange')}</th>
						</tr>
						<tr>
							<td className="tg-0lax">{this.props.t('workingtimes.erzeugnis')}</td>
							<td className="tg-0lax">{this.props.t('workingtimes.menge')}</td>
							<td className="tg-0lax">{this.props.t('workingtimes.time')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td className="tg-0lax">{this.props.t('workingtimes.erzeugnis')}</td>
							<td className="tg-0lax">{this.props.t('workingtimes.menge')}</td>
							<td className="tg-0lax">{this.props.t('workingtimes.time')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td className="tg-0lax">{this.props.t('workingtimes.erzeugnis')}</td>
							<td className="tg-0lax">{this.props.t('workingtimes.menge')}</td>
							<td className="tg-0lax">{this.props.t('workingtimes.time')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
						</tr>
						{ Object.keys(dictonary_entrys[number]).map( entry =>
						<tr id={number} >
							<td class="tg-0lax">{dictonary_entrys[number][entry]} </td>
							<td class="tg-0lax">{arbeitszeiten_arbeitszeiten[number][dictonary_entrys[number][entry]][`product_amount${dictonary_entrys[number][entry]}`]}</td>
							<td class="tg-0lax">{arbeitszeiten_arbeitszeiten[number][dictonary_entrys[number][entry]][`production_time${dictonary_entrys[number][entry]}`]}</td>
							<td class="tg-0lax">{dictonary_entrys[number][entry]}</td>
							<td class="tg-0lax">{arbeitszeiten_rüstzeit[number][dictonary_entrys[number][entry]][`product_amount${dictonary_entrys[number][entry]}`]}</td>
							<td class="tg-0lax">{arbeitszeiten_rüstzeit[number][dictonary_entrys[number][entry]][`production_time${dictonary_entrys[number][entry]}`]}</td>
							<td class="tg-0lax">{dictonary_warteschlange[number][entry] && arbeitszeiten_warteschlange[number][dictonary_warteschlange[number][entry]][`Erzeugnis`]}</td>
							<td class="tg-0lax">{ dictonary_warteschlange[number][entry] && arbeitszeiten_warteschlange[number][dictonary_warteschlange[number][entry]][`Menge`]}</td>
							<td class="tg-0lax">{ dictonary_warteschlange[number][entry] && arbeitszeiten_warteschlange[number][dictonary_warteschlange[number][entry]][`Zeitbedarf`]}</td>
						</tr>
						)}
					</table>
						</div>
						)}
					</div>
				)}
		</div>
		)
	}
}

export default translate(Arbeitszeiten);
