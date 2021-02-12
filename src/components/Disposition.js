
import React, { Component } from 'react';
import { input } from 'semantic-ui-react'
import localStorage from 'local-storage';


class Disposition extends Component {
	state = { 
		disposition: {
			VertriebswunschP1:'',
			VertriebswunschP2:'',
			VertriebswunschP3:'',
			PrognoseP1:'',
			PrognoseP2:'',
			PrognoseP3:'',
			LagerbestandP1:'',
			LagerbestandP2:'',
			LagerbestandP3:'',
			LagerbestandE1:'',
			LagerbestandE2:'',
			LagerbestandE3:'',
		}
	}  
 
	handleChange = (evt) => {
		let { disposition } = this.state;
		disposition[evt.target.name] = evt.target.value;
		this.setState({ disposition: disposition })
		localStorage.set('disposition', disposition);
	}

	componentDidMount() {
		const rememberedState = localStorage.get('disposition');
		console.log(rememberedState);
		if (rememberedState !== null ) {
			this.setState({ disposition: rememberedState})
		}
	}

	  render () {
		const {
			VertriebswunschP1,
			VertriebswunschP2,
			VertriebswunschP3,
			LagerbestandE1,
			LagerbestandE2,
			LagerbestandE3,
			LagerbestandP1,
			LagerbestandP2,
			LagerbestandP3,
			PrognoseP1,
			PrognoseP2,
			PrognoseP3,
		} = this.state.disposition;
	
		return (
			<div>
			<form>
      
			<label style={{width:'240px'}}>Vertriebswunsch P1</label>
			<input type="text" name="VertriebswunschP1" value={VertriebswunschP1} maxLength='4' autoComplete='off' onChange={this.handleChange} />
			<br/>
			
			<label style={{width:'240px'}}>Vertriebswunsch P2</label>
			<input type="text" name="VertriebswunschP2" value={VertriebswunschP2} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Vertriebswunsch P3</label>
			<input type="text" name="VertriebswunschP3" value={VertriebswunschP3} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Prognose Periode n+1 für P1</label>
			<input type="text" name="PrognoseP1" value={PrognoseP1} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Prognose Periode n+1 für P2</label>
			<input type="text" name="PrognoseP2" value={PrognoseP2} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Prognose Periode n+1 für P3</label>
			<input type="text" name="PrognoseP3" value={PrognoseP3} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>
 
			<label style={{width:'240px'}}>Lagerbestand P1</label>
			<input type="text" name="LagerbestandP1" value={LagerbestandP1} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Lagerbestand P2</label>
			<input type="text" name="LagerbestandP2" value={LagerbestandP2} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Lagerbestand P3</label>
			<input type="text" name="LagerbestandP3" value={LagerbestandP3} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Lagerbestand Erzeugnisse für P1</label>
			<input type="text" name="LagerbestandE1" value={LagerbestandE1} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Lagerbestand Erzeugnisse für P2</label>
			<input type="text" name="LagerbestandE2" value={LagerbestandE2} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>

			<label style={{width:'240px'}}>Lagerbestand Erzeugnisse für P3</label>
			<input type="text" name="LagerbestandE3" value={LagerbestandE3} maxLength='4'autoComplete='off' onChange={this.handleChange} />
			<br/>


		  </form>
		  <button onClick={this.startCalculation}> Start calculation</button>
		  </div>
			
		);
	  }
	}

export default Disposition;
