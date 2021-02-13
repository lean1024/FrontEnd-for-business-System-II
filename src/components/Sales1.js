import React, { Component } from 'react';
import localStorage from 'local-storage';
import { Link } from "react-router-dom";

import { translate } from 'react-multi-lang'
import Sales from './Sales1.css'
import Sales2 from './Sales2';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

import { BottomNavigation } from '@material-ui/core';

class Sales1 extends Component {

    state = {
        sales1: {
          n_p1: '', n1_p1: '', n2_p1: '', n3_p1: '',
          n_p2: '', n1_p2: '', n2_p2: '', n3_p2: '',
          n_p3: '', n1_p3: '', n2_p3: '', n3_p3: '',
        }
    };

    handleChange = (evt) => {
    //if (evt.target.value > 500 ) evt.target.value = 500;
		let { sales1 } = this.state;
    sales1[evt.target.name] =  parseInt(evt.target.value);
		this.setState({ sales1: sales1 });
		localStorage.set('sales1', sales1);
  };
  
  componentWillUnmount(){
		document.getElementById('Sales1').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')
    
  }

	componentDidMount() {
		document.getElementById('Sales1').childNodes[0].setAttribute('style', 'color:black;  ')

		const rememberedState = localStorage.get('sales1');
		console.log(rememberedState);
		if (rememberedState !== null ) {
			this.setState({ sales1: rememberedState})
		}
    }

    handleFocus = e => {
      e.target.style.outline = '3px solid rgb(250, 149, 129)'
    };
  
    handleBlur = e => {
      e.target.style.outline = ''
    };

    render() {
        return (
          // <div style={{ padding: '30px', margin: 'auto' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'}}>
	        <div style={{ padding: '30px', margin: 'auto' ,}}>
            <table className="tg"  style={{backgroundColor:'#c1c1bf',margin:'auto'}}>
              {/* <div style={{ border: '1px solid#8bacbd'}}>  */}
                <tbody style={{ border: '1px solid#f0f0f0'}}>
              <tr>
                <th style={{padding:'20px'}}  className="tg-cly1"></th>
                <th style={{padding:'20px'}}  className="tg-cly1">
                  {/* {this.props.t('prognosen.vertriebswunsch')} */}
                  <p style={{fontWeight:'bold'}}>
                    Vertriebswunsch
                  </p>
                </th>
                <th style={{padding:'20px'}}  className="tg-0lax" colSpan="3">
                  {/* {this.props.t('prognosen.prognosen')} */}
                  <p style={{fontWeight:'bold'}}>
                    Prognosen für Vertriebswunsch in n-ten Perioden
                  </p>
                </th>
              </tr>
              <tr>
                <td style={{padding:'20px'}}   className="tg-cly1">
                <div style={{display:'inline-flex'}} >
                <Icon disabled name='calendar alternate outline' /> Zeitperiode
                </div>
                </td>
                <td style={{padding:'20px'}}   className="tg-cly1">n</td>
                <td style={{padding:'20px'}}   className="tg-0lax">n+1</td>
                <td style={{padding:'20px'}}   className="tg-0lax">n+2</td>
                <td style={{padding:'20px'}}   className="tg-0lax">n+3</td>
              </tr>
              <tr>
                <td style={{padding:'20px'}}   className="tg-cly1">Produkt 1: Herrenfahrrad</td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur} type="number" min='0' maxLength="4" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" min='0' maxLength="4"  name="n1_p1" step="50" value={this.state.sales1.n1_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n2_p1" step="50" value={this.state.sales1.n2_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n3_p1" step="50" value={this.state.sales1.n3_p1} onChange={this.handleChange} /> </td>
                {/* <td style={{padding:'20px'}}   className="tg-cly1">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /></td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n1_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n2_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n3_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td> */}
              </tr>
              <tr>
                <td style={{padding:'20px'}}   className="tg-cly1">Produkt 2: Frauenfahrrad</td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n_p2" step="50" value={this.state.sales1.n_p2} onChange={this.handleChange} /></td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n1_p2" step="50" value={this.state.sales1.n1_p2} onChange={this.handleChange} /></td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n2_p2" step="50" value={this.state.sales1.n2_p2} onChange={this.handleChange} /></td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n3_p2" step="50" value={this.state.sales1.n3_p2} onChange={this.handleChange} /></td>
                {/* <td style={{padding:'20px'}}   className="tg-cly1">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td> */}
              </tr>
              <tr>
                <td style={{padding:'20px'}}   className="tg-cly1">Produkt 3: Kinderfahrrad</td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n_p3" step="50" value={this.state.sales1.n_p3} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n1_p3" step="50" value={this.state.sales1.n1_p3} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n2_p3" step="50" value={this.state.sales1.n2_p3} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}} > <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number"  min='0' maxLength="4"  name="n3_p3" step="50" value={this.state.sales1.n3_p3} onChange={this.handleChange} /> </td>
                {/* <td style={{padding:'20px'}}   className="tg-cly1">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td>
                <td style={{padding:'20px'}}   className="tg-0lax">  <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" name="n_p1" step="50" value={this.state.sales1.n_p1} onChange={this.handleChange} /> </td> */}
              </tr>
              </tbody>
              {/* </div> */}
            </table>
            <Button onFocus={ this.handleFocus} onBlur={this.handleBlur} 
              onKeyPress={ e => {
                if (e.key === 'ENTER' ) {
                  e.target.click();
                }
              }}
            style={{  margin: '5px 0 0 0 ' ,
              background: 'rgb(250, 149, 129)',
                border: '2px solid ghostwhite',
                color: 'ghostwhite',
                position: 'relative',
                top: '12px'
              }}> 
                <Link style={{ color: 'ghostwhite' }} to='/Sales2' >
                  {this.props.t('prognosen.nextbutton')}
                </Link>
            </Button>
            </div>
        )
    }
}

export default translate(Sales1);