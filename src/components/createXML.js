
import React, { Component } from 'react';
import localStorage from 'local-storage';
import { Button, input } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { translate } from 'react-multi-lang'


class createXML extends Component {

    state = { input: false}

    componentDidMount(){
        document.getElementById('download').childNodes[0].setAttribute('style', 'color:black;  ')
        document.addEventListener('keydown', this.logging)
    }

    logging = () => {
        let list_Reihenfolge = localStorage.get('list_Reihenfolge')
        console.log(list_Reihenfolge)
    }

    componentWillUnmount(){
		document.getElementById('download').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')
    }

  //notwendige Eingaben deklarieren
  create_xml = () => {
    // delete hours[5];

    // var parameter
    // for (parameter of [params, orders, production, hours])
    //     if (typeof (parameter) == 'string') { return }

    var doc = document.implementation.createDocument("", "", null);
    var input = doc.createElement("input");

var qualitycontrol = doc.createElement("qualitycontrol");
qualitycontrol.setAttribute("type", "no");
qualitycontrol.setAttribute("losequantity", "0");
qualitycontrol.setAttribute("delay", "0");

var sellwish = doc.createElement("sellwish");


let sales1 = localStorage.get('sales1');

var item1 = doc.createElement("item");
item1.setAttribute("article", "1");
item1.setAttribute("quantity", sales1[`n_p1`].toString());
sellwish.appendChild(item1)

var item2 = doc.createElement("item");
item2.setAttribute("article", "2");
item2.setAttribute("quantity", sales1[`n_p2`].toString());
sellwish.appendChild(item2)

var item3 = doc.createElement("item");
item3.setAttribute("article", "3");
item3.setAttribute("quantity", sales1[`n_p3`].toString());
sellwish.appendChild(item3)

    let sales2 = localStorage.get('direkt_sales2')
    console.log('d_sales2')
    console.log(sales2)
    let { direkt_preisp1, direkt_preisp2, direkt_preisp3, direkt_mengep1, direkt_mengep2, direkt_mengep3, direkt_strafep1, direkt_strafep2, direkt_strafep3 } = sales2;

    var selldirect = doc.createElement("selldirect");
    selldirect.innerHTML = `<item article="1" quantity="${direkt_mengep1}" price="${direkt_preisp1}" penalty="${direkt_strafep1}"/> 
    <item article="2" quantity="${direkt_mengep2}" price="${direkt_preisp2}" penalty="${direkt_strafep2}"/>  <item article="3" quantity="${direkt_mengep3}" price="${direkt_preisp3}" penalty="${direkt_strafep3}"/>`
    // var product
    // for (product of Object.keys(params['sales_order'])) {
    //     var item = doc.createElement("item");
    //     item.setAttribute("article", product.toString());
    //     item.setAttribute("quantity", "0");
    //     item.setAttribute("price", "0.0");
    //     item.setAttribute("penalty", "0");
    //     selldirect.appendChild(item)
    // }

var productionlist = doc.createElement("productionlist");
var order

                                                                        let fertigungsaufträge = localStorage.get('fertigungsaufträge')
                                                                        // Object.keys(fertigungsaufträge).map( number => {
                                                                        // // bestellungen[number][`artikel${number}`]
                                                                        // // bestellungen[number][`menge${number}`]

                                                                        // var item = doc.createElement("production");
                                                                        // item.setAttribute("article", number.toString());
                                                                        // item.setAttribute("quantity", fertigungsaufträge[number][`menge${number}`].toString());
                                                                        // productionlist.appendChild(item)
                                                                        // })

let fertigungsaufträgeListe = fertigungsaufträge
let list_Reihenfolge = localStorage.get('list_Reihenfolge')
if (list_Reihenfolge.includes('undefined')) list_Reihenfolge = undefined
    // fertigungsaufträge
    // var reihenfolge = [18,19,20,13,11,14,15,7,8,9,49,54,29,10,12,4,5,6,50,55,30,16,17,51,56,31,26,1,2,3]
    //var reihenfolge = [4,5,6,7,8,9,18,19,20,10,11,12,13,14,15,16,17,26,49,54,29,50,55,30,51,56,31,1,2,3]
    //               ALTRE REIHENFOLGE PRODUKTIONLISTe

if ( !list_Reihenfolge) {

    var reihenfolge = [16,17,26,13,18,7,10,4,49,50,51,1,14,19,8,11,5,54,55,56,2,15,20,9,12,6,29,30,31,3]

    console.log('HIER')
    for (fertigungsaufträge of reihenfolge) {
                                                                                                                                        console.log('treffer ')
                                                                                                                                        console.log(fertigungsaufträge)
                                                                                                                                        var item = doc.createElement("production");
                                                                                                                                        item.setAttribute("article", fertigungsaufträge.toString());
                                                                                                                                        if (fertigungsaufträgeListe[fertigungsaufträge] <= 0) {
                                                                                                                                            continue
                                                                                                                                        } else {
                                                                                                                                            var amount = Math.ceil( fertigungsaufträgeListe[fertigungsaufträge][`menge${fertigungsaufträge}`])
                                                                                                                                        }
                                                                                                                                        item.setAttribute("quantity", amount.toString());
                                                                                                                                        if (fertigungsaufträgeListe[fertigungsaufträge][`menge${fertigungsaufträge}`] > 1 ) {
                                                                                                                                            productionlist.appendChild(item)

                                                                                                                                        }
                                                                                                                                    }

} else {

    console.log('list_Reihenfolge_c',list_Reihenfolge)
    list_Reihenfolge.map( entry => {
        Object.keys(entry).map(number => {
            let menge = entry[number][`menge${number}`]
        var item = doc.createElement("production");
        item.setAttribute("article", number);
        item.setAttribute("quantity", menge)
        if (menge > 1 ) 
        productionlist.appendChild(item)
    })
})
}



var orderlist = doc.createElement("orderlist");
var order_i

let bestellungen = localStorage.get('bestellungen')
let bestellungen_Reihenfolge = localStorage.get('bestellungen_Reihenfolge')
if (bestellungen_Reihenfolge && bestellungen_Reihenfolge.includes('undefined')) bestellungen_Reihenfolge = undefined
console.log('bestellungen_Reihenfolge');
console.log(bestellungen_Reihenfolge)

if ( !bestellungen_Reihenfolge) {
    Object.keys(bestellungen).map( number => {
    // bestellungen[number][`${number}_ankunft`]
    // bestellungen[number][`${number}_menge`]
    // bestellungen[number][`${number}_bestellart`]


    var item = doc.createElement("order");
    item.setAttribute("article", number.toString());
    item.setAttribute("quantity", bestellungen[number][`${number}_menge`].toString());
    var art;
    if (bestellungen[number][`${number}_bestellart`] == "Normal") art = 5
    if (bestellungen[number][`${number}_bestellart`] == "Eil") art = 4
    if (bestellungen[number][`${number}_bestellart`] == "Sonderbestellung") art = 1
    if (bestellungen[number][`${number}_bestellart`] == "Billiganbieter") art = 2
    if (bestellungen[number][`${number}_bestellart`] == "JIT") art = 3
    
    item.setAttribute("modus", art.toString());  //hier

    // alert(bestellungen[number][`${number}_menge`])
    if (bestellungen[number][`${number}_menge`] != 0 ) {
        orderlist.appendChild(item)
    } 
    })
}

if ( bestellungen_Reihenfolge) {
    bestellungen_Reihenfolge.map(element => {

        Object.keys(element).map( number => {
            // bestellungen[number][`${number}_ankunft`]
            // bestellungen[number][`${number}_menge`]
            // bestellungen[number][`${number}_bestellart`]

        var item = doc.createElement("order");
        item.setAttribute("article", number.toString());
        item.setAttribute("quantity", element[number][`${number}_menge`].toString());

        var art 
        if (element[number][`${number}_bestellart`] == "Normal") art = 5
        if (element[number][`${number}_bestellart`] == "Eil") art = 4
        if (element[number][`${number}_bestellart`] == "Sonderbestellung") art = 1
        if (element[number][`${number}_bestellart`] == "Billiganbieter") art = 2
        if (element[number][`${number}_bestellart`] == "JIT") art = 3
        // if (element[number][`${number}_bestellart`] == "Eil") { var art = 4 } else { var art = 5 }
        item.setAttribute("modus", art.toString());
        // alert(element[number][`${number}_menge`])
        if (element[number][`${number}_menge`] != 0 ) {
            orderlist.appendChild(item)
        } 
        })
    })
}

        // for (order_i of Object.keys(orders)) {
        //     var item = doc.createElement("order");
        //     item.setAttribute("article", order_i.toString());
        //     item.setAttribute("quantity", orders[order_i]['menge'].toString());
        //     if (orders[order_i]['bestellart'] == "Eil") { var art = 4 } else { var art = 5 }
        //     item.setAttribute("modus", art.toString());
        //     orderlist.appendChild(item)

        // }

var workingtimelist = doc.createElement("workingtimelist")
var workstation

let arbeitszeiten = localStorage.get('arbeitszeiten')
delete arbeitszeiten[5];
Object.keys(arbeitszeiten).map(number => {
// arbeitszeiten[number][`überstunden${number}`]
// arbeitszeiten[number][`anzahl_Schichten${number}`]

var item = doc.createElement("workingtime");
item.setAttribute("station", number.toString());
item.setAttribute("shift", arbeitszeiten[number][`anzahl_Schichten${number}`].toString());
item.setAttribute("overtime", arbeitszeiten[number][`überstunden${number}`].toString());
workingtimelist.appendChild(item)
})

    // for (workstation of Object.keys(hours)) {
    //     console.log('bam')
    //     console.log(workstation);
    //     var item = doc.createElement("workingtime");
    //     item.setAttribute("station", workstation.toString());
    //     if (hours[workstation][`anzahl_Schichten${workstation}`] == 1) {
    //         var shift = 1
    //     } else if (hours[workstation][`anzahl_Schichten${workstation}`] == 2) {
    //         var shift = 2
    //     } else {
    //         var shift = 3
    //     }
    //     item.setAttribute("shift", shift.toString());
    //     item.setAttribute("overtime", hours[workstation][`überstunden${workstation}`].toString());
    //     workingtimelist.appendChild(item)
    // }

input.appendChild(qualitycontrol)
input.appendChild(sellwish)
input.appendChild(selldirect)
input.appendChild(orderlist)
input.appendChild(productionlist)
input.appendChild(workingtimelist)

doc.appendChild(input);
let xml = `<?xml version="1.0" encoding="UTF-8"?>${doc.documentElement.outerHTML}`;
let file = new File([xml], "xmlfile.xml", { type: "application/xml" });
var url = URL.createObjectURL(file);
this.setState({ input: url })
return doc

}

rescue = () => {

    let perioden = [ 1 ,2 ,3 ,4 , 5 ,6 ,7 ,8 ]

    let ergebnisse = []
    perioden.map( periode => {
        let periodeNumber = localStorage.get(`periode${periode}`, periode);
        let lagerwert = localStorage.get(`periode${periode} Lagerwert`, lagerwert);
        let leerzeitkosten = localStorage.get(`periode${periode} Leerzeitkosten`,leerzeitkosten);
        let gewinn = localStorage.get(`periode${periode} Gewinn`, gewinn);

        let result = {}
        result[1] = periodeNumber
        result[2] = lagerwert
        result[3] = leerzeitkosten
        result[4] = gewinn

        ergebnisse.push(result)
    })

    // localStorage.clear();

    ergebnisse.map( ergebnis => {

        let periode =         ergebnis[1]
        let lagerwert =        ergebnis[2]
        let leerzeitkosten =        ergebnis[3]
        let gewinn =         ergebnis[4]

        localStorage.set(`periode${periode}`, periode);
        localStorage.set(`periode${periode} Lagerwert`, lagerwert);
        localStorage.set(`periode${periode} Leerzeitkosten`,leerzeitkosten);
        localStorage.set(`periode${periode} Gewinn`, gewinn);
    })
}

	render() {
        return (
            <div>


            <div style={{
                width: '100px',
                height: '100px',
                background: 'rgb(250, 149, 129)',
                border: '2px solid black',
                borderRadius: '5px',
                margin: 'auto',
            }}>


                <button onClick={this.create_xml} style={{ color: 'ghostwhite', background: 'rgb(250, 149, 129)' }}className="nav-link"  > {this.props.t('download.createoutput')} </button>

                {  this.state.input && (
              <a
            //   onClick={this.rescue}
            onClick={ () => {
                // localStorage.clear()
                // // location.reload();
                // document.getElementById('Fertigungsaufträge').style.display = 'none';
                // document.getElementById('Arbeitszeiten').style.display = 'none';
                // document.getElementById('Bestellungen').style.display = 'none';
                // document.getElementById('Reihenfolge').style.display = 'none';
                // document.getElementById('download').style.display = 'none';
                // document.getElementById('help').style.display = 'none';
                // window.location.href = 'http://localhost:3000/sales1'
            }}
              style={{
                  'padding': '2px 10px 2px 10px',
                  'color': 'black',
                  'margin': '0 0 0 5px',
              }}href={this.state.input} download="input.xml">Download</a>
          )}



            </div>

            </div>
        )
    }
}

export default translate(createXML) ;
