// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import localStorage from 'local-storage';
import xmlConvert from 'xml-js';
import { translate } from 'react-multi-lang'
import Sales from './Sales2.css'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import { isObject } from 'util';

class Sales2 extends Component {
    state = {
        allowBestätigen: false,
        allowWeiter: false,
        sales2: {
            // aktuellerLagerbestandP1: 'upload xml',
            // aktuellerLagerbestandP2: 'upload xml',
            // aktuellerLagerbestandP3: 'upload xml',
            direkt_mengep1: 0,
            direkt_mengep2: 0,
            direkt_mengep3: 0,
            direkt_preisp1: 0.0,
            direkt_preisp2: 0.0,
            direkt_preisp3: 0.0,
            direkt_strafep1:0.0,
            direkt_strafep2:0.0,
            direkt_strafep3:0.0,
            // LagerbestandP1: 100,
            // LagerbestandP2: 100,
            // LagerbestandP3: 100,
        }
    }

    handleChange = (evt) => {
        // if (evt.target.value > 100 ) evt.target.value = 100;
        let { sales2 } = this.state;
        sales2[evt.target.name] = parseInt(evt.target.value);
        if (evt.target.name.includes('direkt_preis')
        || evt.target.name.includes('direkt_strafe')
        )  sales2[evt.target.name] = parseFloat(evt.target.value);
        console.log(typeof(parseFloat(evt.target.value)))
        console.log(sales2)
		this.setState({ sales2: sales2 })
        localStorage.set('sales2', sales2);
        console.log(this.state.sales2)

        localStorage.set('direkt_sales2', sales2);
    }

	handleReset = (e) => {
		e.preventDefault();
        const sales2_safe = localStorage.get('sales2_safe');
		this.setState({ sales2: sales2_safe })
    }

//     componentWillUnmount(){

//   }

        // constructor(props) {
        //     super(props);
        //     this.getAlert = this.getAlert.bind(this);
        // }

        // getAlert() {
        //     alert('ANANS EXPRESS');
        //     this.dispo_function(true, true, this.state.übersetzung)
        // }

    // wrapperDispo = (truth) => {
    //     alert('dispo')
    //     if (!truth) this.dispo_function(true, true, this.state.übersetzung)
    // }

    
	componentDidMount() {
        // if (this.props.setClick) this.props.setClick(this.wrapperDispo(true));
        // this.props.setClick(this.getAlert);

        console.log('didmount')
        console.log(localStorage.get('sales1'))
        const { HIDEblackcalledFromSales2 } = this.props;
        if ( !HIDEblackcalledFromSales2) document.getElementById('Sales2').childNodes[0].setAttribute('style', 'color:black;  ')

        // getting xml
        const text = localStorage.get('xml')
        console.log('textXML')
        console.log(text)
        var parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        console.log(xml);
        this.setState({ xml : xml })

        // allow weiter
        const allowWeiter = localStorage.get('bestellungen')
        if ( allowWeiter ) this.setState({allowWeiter: true})


        const sales1 = localStorage.get('sales1');
        const sales2 = localStorage.get('sales2');

        // if (!sales2) {
        //     alert('settting sales2')
        //     let sales2_xml_preObject= {
        //         direkt_mengep1: 0,
        //         direkt_mengep2: 0,
        //         direkt_mengep3: 0,
        //         direkt_preisp1: 0.0,
        //         direkt_preisp2: 0.0,
        //         direkt_preisp3: 0.0,
        //         direkt_strafep1:0.0,
        //         direkt_strafep2:0.0,
        //         direkt_strafep3:0.0,
        //     }
        //     localStorage.set('sales2',sales2_xml_preObject)
        // }

        console.log('hallo')
        console.log(sales1)

        if ( sales1 !== null ) {
            // Übernehme Vertriebswunsch als Lagerbestand für E, als erste Innitierung.
            let { n1_p1 , n1_p2, n1_p3 } = sales1;
            if ( n1_p1 > 100 ) n1_p1 = 100;
            if ( n1_p2 > 100 ) n1_p2 = 100;
            if ( n1_p3 > 100 ) n1_p3 = 100;

            if ( n1_p1*0.75 > 100 ){
                var n1_e1 = 100;
            }else{
                var n1_e1 = n1_p1*0.75;
                }
             if ( n1_p2*0.75 > 100 ){
                    var n1_e2 = 100;
                }else{
                    var n1_e2 = n1_p2*0.75;
                    }
                    if ( n1_p3*0.75 > 100 ){
                        var n1_e3 = 100;
                    }else{
                        var n1_e3 = n1_p3*0.75;
                    }

            // let sales2_twentySeven = localStorage.get('sales2')

            // sales2_twentySeven[`LagerbestandP1`] = n1_p1;
            // sales2_twentySeven[`LagerbestandP2`] = n1_p2;
            // sales2_twentySeven[`LagerbestandP3`] = n1_p3;
            // sales2_twentySeven[`LagerbestandE1`] = n1_e1;
            // sales2_twentySeven[`LagerbestandE2`] = n1_e2;
            // sales2_twentySeven[`LagerbestandE3`] = n1_e3;


            const firstStateSales2 = {
                LagerbestandP1: n1_p1,
                LagerbestandP2:n1_p2,
                LagerbestandP3:n1_p3,
                LagerbestandE1: n1_e1,
                LagerbestandE2: n1_e2,
                LagerbestandE3: n1_e3,
                direkt_mengep1: 0,
                direkt_mengep2: 0,
                direkt_mengep3: 0,
                direkt_preisp1: 0.0,
                direkt_preisp2: 0.0,
                direkt_preisp3: 0.0,
                direkt_strafep1:0.0,
                direkt_strafep2:0.0,
                direkt_strafep3:0.0,
            }

            this.setState({ sales2: firstStateSales2})

            if (!this.props.alwaysCalledFromSales2) {
                // alert('not called from sales2')
                localStorage.set('sales2', firstStateSales2)
            }
            localStorage.set('direkt_sales2', firstStateSales2)
        }

        // Übernehme als letzten Schritt, falls existiert den "remembered state" von sales2
		if (sales2 !== null ) {
            console.log('schritt 2')
            console.log(sales2)
            this.setState({ sales2: sales2})
            localStorage.set('sales2_safe', sales2)
        }

        // update Lagerbestand E, wenn Änderungen am Vertriebswunsch vorgenommen wurden. Weil ansonsten hardrememberd, der state sales2 mit den alten Werten verwendet wird
        if ( sales2 !== null && sales1 !== null ) {
            const { n1_p1 , n1_p2, n1_p3 } = sales1;
            console.log('schritt 3')

            if ( n1_p1*0.75 > 100 ){
                var n1_e1 = 100;
            }else{
                var n1_e1 = n1_p1*0.75;
            }
             if ( n1_p2*0.75 > 100 ){
                 var n1_e2 = 100;
                }else{
                    var n1_e2 = n1_p2*0.75;
                }
                if ( n1_p3*0.75 > 100 ){
                    var n1_e3 = 100;
                }else{
                    var n1_e3 = n1_p3*0.75;
                }
                sales2.LagerbestandE1 = n1_e1;
                sales2.LagerbestandE2 = n1_e2;
                sales2.LagerbestandE3 = n1_e3 ;

                this.setState({ sales2: sales2 })
                localStorage.set('sales2_safe', sales2)
                console.log(sales2)
        }

        console.log('a_00')
        console.log(sales2)
    }

       ////////////////////////////////////////////////////////////////////////////////////////////
    //datei einlesen und als xml parsen




    read_xml_file() {
        //um state zu setzen
        const scope = this
        var xml = this.App.files[0];
        //console.log(xml);
        var reader = new FileReader();
        //onLoad-Handler
        if (!xml.name.includes('.xml')) {
            document.getElementById('bestätigenButton').style.outline = '2px solid red';
            document.getElementById('bestätigenButton').disabled = true;
            let invalidXmlMessage = document.createElement('div');
            invalidXmlMessage.setAttribute('style','position:absolute; color:red; font-size:12px;')
            invalidXmlMessage.setAttribute('id',1234)
            invalidXmlMessage.innerText = 'uploaded file is not xml'
            document.getElementById('bestätigenButton').parentElement.appendChild(invalidXmlMessage);


            // dispo_function
        }
        if (xml.name.includes('.xml')) {
            // remove red highlight because valid xml && enable button
            document.getElementById('bestätigenButton').style.outline = '';
            document.getElementById('bestätigenButton').disabled = false;

            if (document.getElementById(1234)) document.getElementById('bestätigenButton').parentElement.removeChild(document.getElementById(1234))

            reader.onload = function (e) {
                var text = reader.result;
                console.log('');
                console.log(text)
                var parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");
                console.log(xmlDoc)
                scope.setState({ xml: xmlDoc })

                // #### THE TRUE AND ONLY SASCHA XML
                let file1 = xmlConvert.xml2json(text)
                console.log(file1);

                // ### Ugurs Bereich
                console.log('UgursBereich')
                let periode;
                let lagerwert;
                let leerzeitkosten;
                let gewinn;

                try {
                    lagerwert = xmlDoc.getElementsByTagName('totalstockvalue')[0].innerHTML;
                } catch (err) {
                    lagerwert = '0';
                }

                try {
                    leerzeitkosten = xmlDoc.getElementsByTagName('general')[0].getElementsByTagName('idletimecosts')[0].getAttribute('current');
                } catch (err) {
                    leerzeitkosten = '0';
                }

                try {
                    gewinn = xmlDoc.getElementsByTagName('profit')[0].getAttribute('current');
                } catch (err) {
                    gewinn = '0';
                }

                try {
                    periode = xmlDoc.getElementsByTagName('results')[0].getAttribute('period');
                   // lagerwert = xmlDoc.getElementsByTagName('totalstockvalue')[0].innerHTML;
                   // leerzeitkosten = xmlDoc.getElementsByTagName('general')[0].getElementsByTagName('idletimecosts')[0].getAttribute('current');
                    //gewinn = xmlDoc.getElementsByTagName('profit')[0].getAttribute('current');
                }
                catch (err) {
                    console.log('Keine Periode!')
                }
                localStorage.set(`periode${periode}`, periode);
                localStorage.set(`periode${periode} Lagerwert`, lagerwert);
                localStorage.set(`periode${periode} Leerzeitkosten`,leerzeitkosten);
                localStorage.set(`periode${periode} Gewinn`, gewinn);

                console.log(periode);
                console.log(lagerwert);
                console.log(leerzeitkosten);
                console.log(gewinn);

                //UGURS Bereich ENDE
                console.log(xmlDoc);

                console.log('birne')
                file1 = xmlConvert.json2xml(file1);

                // scope.setState({xml: xmlDoc})  // outcommented FINAL andrej

                localStorage.set('xml', file1)
                console.log('pinki')
                console.log(localStorage.get('xml'))
            }
            reader.readAsText(xml);
            console.log(reader)
        }
    }

    componentWillUnmount () {
        let ignore = true
		document.getElementById('Sales2').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')
        const { calledFromSales2, übersetzung } = this.props;
        if (calledFromSales2 ) this.dispo_function(true, calledFromSales2, übersetzung)
        if (calledFromSales2) //alert('yes')
        // if ( calledFromSales2 ) this.dispo_function(ignore, new_calledFromSales2);
        console.log('unmount')
        console.log(this.state)
        console.log(localStorage.get('sales2'))

    }

    // //notwendige Eingaben deklarieren
     create_xml(params, orders, production, hours) {
    //     delete hours[5];

    //     var parameter
    //     for (parameter of [params, orders, production, hours])
    //         if (typeof (parameter) == 'string') { return }

    //     var doc = document.implementation.createDocument("", "", null);
    //     var input = doc.createElement("input");

    //     var qualitycontrol = doc.createElement("qualitycontrol");
    //     qualitycontrol.setAttribute("type", "no");
    //     qualitycontrol.setAttribute("losequantity", "0");
    //     qualitycontrol.setAttribute("delay", "0");

    //     var sellwish = doc.createElement("sellwish");
    //     var product

    //     for (product of Object.keys(params['sales_order'])) {
    //         var item = doc.createElement("item");
    //         item.setAttribute("article", product.toString());
    //         item.setAttribute("quantity", params['sales_order'][product].toString());
    //         sellwish.appendChild(item)
    //     }

    //     var selldirect = doc.createElement("selldirect");
    //     var product
    //     for (product of Object.keys(params['sales_order'])) {
    //         var item = doc.createElement("item");
    //         item.setAttribute("article", product.toString());
    //         item.setAttribute("quantity", "0");
    //         item.setAttribute("price", "0.0");
    //         item.setAttribute("penalty", "0");
    //         selldirect.appendChild(item)
    //     }

    //     var productionlist = doc.createElement("productionlist");
    //     var order
    //     //var reihenfolge = [18,19,20,13,11,14,15,7,8,9,49,54,29,10,12,4,5,6,50,55,30,16,17,51,56,31,26,1,2,3]
    //     //var reihenfolge = [4,5,6,7,8,9,18,19,20,10,11,12,13,14,15,16,17,26,49,54,29,50,55,30,51,56,31,1,2,3]
    //     var reihenfolge = [16,17,26,13,18,7,10,4,49,50,51,1,14,19,8,11,5,54,55,56,2,15,20,9,12,6,29,30,31,3]
    //     for (order of reihenfolge) {
    //         var item = doc.createElement("production");
    //         item.setAttribute("article", order.toString());
    //         if (production[order] <= 0) {
    //             continue
    //         } else {
    //             var amount = Math.ceil(production[order])
    //         }
    //         item.setAttribute("quantity", amount.toString());
    //         productionlist.appendChild(item)
    //     }

    //     var orderlist = doc.createElement("orderlist");
    //     var order_i
    //     for (order_i of Object.keys(orders)) {
    //         var item = doc.createElement("order");
    //         item.setAttribute("article", order_i.toString());
    //         item.setAttribute("quantity", orders[order_i]['menge'].toString());
    //         if (orders[order_i]['bestellart'] == "Eil") { var art = 4 } else { var art = 5 }
    //         item.setAttribute("modus", art.toString());
    //         orderlist.appendChild(item)

    //     }

    //     var workingtimelist = doc.createElement("workingtimelist")
    //     var workstation
    //     for (workstation of Object.keys(hours)) {
    //         console.log('bam')
    //         console.log(workstation);
    //         var item = doc.createElement("workingtime");
    //         item.setAttribute("station", workstation.toString());
    //         if (hours[workstation][`anzahl_Schichten${workstation}`] == 1) {
    //             var shift = 1
    //         } else if (hours[workstation][`anzahl_Schichten${workstation}`] == 2) {
    //             var shift = 2
    //         } else {
    //             var shift = 3
    //         }
    //         item.setAttribute("shift", shift.toString());
    //         item.setAttribute("overtime", hours[workstation][`überstunden${workstation}`].toString());
    //         workingtimelist.appendChild(item)
    //     }

    //     input.appendChild(qualitycontrol)
    //     input.appendChild(sellwish)
    //     input.appendChild(selldirect)
    //     input.appendChild(orderlist)
    //     input.appendChild(productionlist)
    //     input.appendChild(workingtimelist)

    //     doc.appendChild(input);
    //     let xml = `<?xml version="1.0" encoding="UTF-8"?>${doc.documentElement.outerHTML}`;
    //     let file = new File([xml], "xmlfile.xml", { type: "application/xml" });
    //     var url = URL.createObjectURL(file);
    //     this.setState({ input: url })
    //     return doc
    }

declare_params(maxAufträge) {
    localStorage.set('Änderungen', 2)
    let sales1 = localStorage.get('sales1');
        if (maxAufträge) {
            // alert(1)
            sales1.n_p1 = sales1.n_p1 * 10
            sales1.n_p2 = sales1.n_p2 * 10
            sales1.n_p3 = sales1.n_p3 * 10
        }
        sales1.n_p1 = sales1.n_p1 + parseInt(this.state.sales2.direkt_mengep1)
        sales1.n_p2 = sales1.n_p2 + parseInt(this.state.sales2.direkt_mengep2)
        sales1.n_p3 = sales1.n_p3 + parseInt(this.state.sales2.direkt_mengep3)

        console.log('spezi')
        console.log(sales1.n_p1)
        console.log(this.state.direkt_mengep1)

        var parameter
        for (parameter of [sales1.n_p1, sales1.n1_p1, sales1.n2_p1, sales1.n3_p1,
        sales1.n_p2, sales1.n1_p2, sales1.n2_p2, sales1.n3_p2,
        sales1.n_p3, sales1.n1_p3, sales1.n2_p3, sales1.n3_p3]) {
            if (parameter == "undefined") { return }
        }

        //Vetriebswunsch definieren (externe Eingabgen)
        var sales_order = { 1: sales1.n_p1, 2: sales1.n_p2, 3: sales1.n_p3 }
        //Prognosen
        var prognose = {
            2: { 1: sales1.n1_p1, 2: sales1.n1_p2, 3: sales1.n1_p3 },
            3: { 1: sales1.n2_p1, 2: sales1.n2_p2, 3: sales1.n3_p2 },
            4: { 1: sales1.n3_p1, 2: sales1.n2_p3, 3: sales1.n3_p3 }
        }
        //geplante Lagerbestaende definieren (externe Eingaben)
        // sascha
        var planned_p_stock = { 1: parseInt(this.state.n1_p1 * 0.75), 2: parseInt(this.state.n1_p2 * 1), 3: parseInt(this.state.n1_p3 * 1) };
        var planned_e_stock = { 1: parseInt(this.state.n1_p1 * 0.75), 2: parseInt(this.state.n1_p2 * 1), 3: parseInt(this.state.n1_p3 * 1) };


        //Angabe der Item's welche mehrere Male verwendet werden
        var multiple_item_ids = [16, 17, 26];
        //Angabe der Verwendungsstruktur
        var usage = {
            1: { 1: 0, 26: 1, 51: 1, 16: 51, 17: 51, 50: 51, 4: 50, 10: 50, 49: 50, 7: 49, 13: 49, 18: 49 },
            2: { 2: 0, 26: 2, 56: 2, 16: 56, 17: 56, 55: 56, 5: 55, 11: 55, 54: 55, 8: 54, 14: 54, 19: 54 },
            3: { 3: 0, 26: 3, 31: 3, 16: 31, 17: 31, 30: 31, 6: 30, 12: 30, 29: 30, 9: 29, 15: 29, 20: 29 }
        }

        var usage_order = {
            1: [1, 26, 51, 16, 17, 50, 4, 10, 49, 7, 13, 18],
            2: [2, 26, 56, 16, 17, 55, 5, 11, 54, 8, 14, 19],
            3: [3, 26, 31, 16, 17, 30, 6, 12, 29, 9, 15, 20]
        }
        var obj = { sales_order, planned_p_stock, planned_e_stock, multiple_item_ids, usage, usage_order, prognose }
        !maxAufträge && this.setState({ params: obj })
        localStorage.set('sales2_output', obj);

        console.log('a_01_params')
        console.log(obj);
        maxAufträge && localStorage.set('maxAufträge_params', obj)
        maxAufträge && setTimeout(() => this.dispo_function(false, undefined, undefined, true),100)
    }
    /////////////////////////////////////////////////////////////////////////////////////////////

    setParams = (event) => {
        this.setState({ allowBestätigen: true})
        event.preventDefault();
        ///////////////////////////////////////////////
        //1. Eingabe von Vertriebswunsch und Prognosen
        //=> Bestätigen und als state speichern und weitergeben
        //2. xml-einlesen und geplante Lagerbestände setzen
        //=> Bestätigen und als state speichern und weitergeben
        this.read_xml_file();
        console.log(this.state.xml)
        if( !this.state.correctTHIRDrun) this.declare_params(true);
        this.declare_params();
        console.log(this.state.params)
        ///////////////////////////////////////////////

    }

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
        console.log('a_02_orders_in_work')
        console.log(orders_in_work)
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
                        console.log(xml)
                        console.log(xml.getElementsByTagName("article"))
                        console.log('hier')
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

        console.log('item', item)

        let sales2 = this.state.sales2
        if ( item == 1 ) sales2.aktuellerLagerbestandP1 = warehousestock
        if ( item == 2 ) sales2.aktuellerLagerbestandP2 = warehousestock
        if ( item == 3 ) sales2.aktuellerLagerbestandP3 = warehousestock
        this.setState({ sales2: sales2})
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

    handleFocus = e => {
        e.target.style.outline = '3px solid rgb(250, 149, 129)'
      }

      handleBlur = e => {
        e.target.style.outline = ''
      }

      alertMe () {
          alert('me')
      }

      showAlert() {
        alert('Hello World');
    }

      dispo_function_twice = () => {
        let sales2 = localStorage.get('sales2')
        let block = 'dont block'
        if (sales2.direkt_mengep1 != 0 && (sales2.direkt_preisp1 == 0 || sales2.direkt_preisp1 == null || sales2.direkt_strafep1 == null  || sales2.direkt_strafep1 == 0)) {
            block = 'block'
            alert('p1 preis und Konventionalstrafe müssen noch gesetzt werden' )}
        if (sales2.direkt_mengep2 != 0 && (sales2.direkt_preisp2 == 0 || sales2.direkt_preisp2 == null || sales2.direkt_strafep2 == null  || sales2.direkt_strafep2 == 0)) {
            block = 'block'
            alert('p2 preis und Konventionalstrafe müssen noch gesetzt werden')}
        if (sales2.direkt_mengep3 != 0 && (sales2.direkt_preisp3 == 0|| sales2.direkt_preisp3 == null || sales2.direkt_strafep3 == null || sales2.direkt_strafep3 == 0)) {
            block = 'block'
            alert('p3 preis und Konventionalstrafe müssen noch gesetzt werden')}
        // this.dispo_function(false, 10000)


        console.log('state',this.state)
        if (block == 'dont block') { 
            // alert('resetting')
            localStorage.set('list_Reihenfolge')
            // this.resetAllValues()
            this.dispo_function()
        }
    }


    ///Black Box Magic
    dispo_function = (ignore, new_calledFromSales2, übersetzung, allowNAVBARnot, RANDOM )  => {      // rsd
        if (!übersetzung) übersetzung = localStorage.get('übersetzung')
        console.log('übersetzung__t', übersetzung)
        // alert(' dispo executed')
        console.log(this.state)
        console.log('AAAAAAAAAAAAAAAAAA')
        const { xml } = this.state;
        let params = localStorage.get('sales2_output');
        if (ignore === false && !this.state.correctTHIRDrun) {
            // alert('2')
            params = localStorage.get('maxAufträge_params');
        }



        if ( ignore ) {
            if ( this.state.allowBestätigen && document.getElementById('bestätigenButton') && document.getElementById('bestätigenButton').parentElement ) {
                // document.getElementById('bestätigenButton').style.outline = '2px solid red';
                // let invalidXmlMessage = document.createElement('div');
                // invalidXmlMessage.setAttribute('style','position:absolute; color:red; font-size:12px;')
                // invalidXmlMessage.setAttribute('id',2000)
                // invalidXmlMessage.innerText = 'please upload a xml file'
                // document.getElementById('bestätigenButton').parentElement.appendChild(invalidXmlMessage);


                // setTimeout(() => {
                //     if( document.getElementById('bestätigenButton') && document.getElementById('bestätigenButton').parentElement ) {
                //         document.getElementById('bestätigenButton').parentElement.removeChild(document.getElementById(2000))

                //         document.getElementById('bestätigenButton').style.outline = '';
                //     }
                // },2000)
            }
            console.log('Gurke')
            console.log(this.state.allowBestätigen);
            console.log(document.getElementById('bestätigenButton'))
            if ( this.state.allowBestätigen && document.getElementById('bestätigenButton')) {
                document.getElementById('bestätigenButton').style.outline = '2px solid green'
                setTimeout( () => {
                    if ( document.getElementById('bestätigenButton')) {
                        document.getElementById('bestätigenButton').style.outline = ''

                    }

                },1000)
             }
        }

        // start
        // @start
        if ( !allowNAVBARnot) {
            document.getElementById('Arbeitszeiten').style.display = '';
            document.getElementById('Bestellungen').style.display = '';
            document.getElementById('Reihenfolge').style.display = '';
            document.getElementById('download').style.display = '';
            document.getElementById('help').style.display = '';
            document.getElementById('Fertigungsaufträge').style.display = '';
            this.setState({ allowWeiter: true})
        }


        const { LagerbestandE1, LagerbestandE2, LagerbestandE3, LagerbestandP1, LagerbestandP2, LagerbestandP3 } = this.state.sales2;
        var sales2_planned_p_stock = { 1: LagerbestandP1, 2: LagerbestandP2, 3: LagerbestandP3};
        var sales2_planned_e_stock = { 1: LagerbestandE1, 2: LagerbestandE2, 3: LagerbestandE3};
        params.planned_p_stock = sales2_planned_p_stock;
        params.planned_e_stock = sales2_planned_e_stock;

        // const { xml } = this.state;



        console.log('pepe')
        console.log(xml);

        var parameter
        for (parameter of [xml, params]) {
            if (typeof (parameter) == 'string') { return }
        }
        var produktdaten = this.generate_item_data(params, xml)
        var dispo_dict = {};
        var super_dispo_dict = {};
        var product;

        // #################################
        for (product of Object.keys(produktdaten['produktDaten'])) {
            var dispo_dict = {};
            var item;
            //für nicerdicer Ausgabe
            console.log("Vertriebswunsch + Übertrag + Lagerbestand(Ende) - Lagerbestand - Warteschlange - Bearbeitung = Produktionsmenge")
            for (item of params['usage_order'][product]) {

                //Abfrage der verbindlichen Aufträge
                var sales_order = Math.floor(this.get_sales_order(produktdaten, product, item, dispo_dict))

                //Abfrage des geplanten Lagerbestandes der Produkte/Erzeugnisse
                var planned_stock = Math.floor(produktdaten['produktDaten'][product][item]['lagerbestand_geplant']);




                var spec = [16,17,26]
                // if(spec.includes(parseInt(product))&&planned_stock > 300){
                //     planned_stock = 300
                // }else if(planned_stock > 100) {
                //     planned_stock = 100
                // }

                //Abfrage der Aufträge aus der Warteschlange
                var waiting_items = Math.floor(this.get_waiting_items(produktdaten, product, item))

                //Abfrage der Aufträge in Bearbeitung
                var producing_items = Math.floor(this.get_producing_items(produktdaten, product, item));

                //Abfrage der aktuellen Lagerbestände
                var warehousestock = Math.floor(this.get_warehousestock(produktdaten, product, item))

                //Übertag aus Warteliste
                var tf_waiting_item = Math.floor(this.transfer_waiting_item(produktdaten, product, item, dispo_dict))

                var waiting_list = Math.floor(this.get_waitinglist_by_producing_items(this.state.xml))
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
                production_order = Math.floor(sales_order + tf_waiting_item + planned_stock - warehousestock - waiting_items - producing_items);


                console.log(dispo_dict)
                dispo_dict[item] = {
                    "production_order": production_order - waiting_material, // 18.01
                    "sales_order": sales_order,
                    "tf_waiting_item": tf_waiting_item,
                    "planned_stock": planned_stock,
                    "warehousestock": warehousestock,
                    "waiting_items": waiting_items + waiting_material,  // 18.01
                    "producing_items": producing_items,
                }

                console.log(sales_order, "+", tf_waiting_item, "+", planned_stock, "-", warehousestock, "-", waiting_items, "-", producing_items, "=", production_order)
            }
            for (item of Object.keys(dispo_dict)) {
                dispo_dict[item]['production_order'] = Math.floor(dispo_dict[item]['production_order'])
            }
            super_dispo_dict[product] = dispo_dict;
        }
        localStorage.set('super_dispo_dict', super_dispo_dict)
        console.log('super_dispo_dict', super_dispo_dict)
        // ################################# 18.01 super dic

        var dispo_dict = { }
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
                // if(spec.includes(parseInt(product))&&planned_stock > 300){
                //     planned_stock = 300
                // }else if(planned_stock > 100) {
                //     planned_stock = 100
                // }

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

                if ( spec.includes(parseInt(product))) {
                    waiting_material = Math.floor(waiting_material / 3 )
                }

                //production_orders = sales_orders + nf_waiting_items + planned_warehousestock - warehousestock - producing_items - waiting_items
                var production_order;
                //notwendige Berechnungen
                production_order = sales_order + tf_waiting_item + planned_stock - warehousestock - waiting_items - producing_items;

                console.log('gta')
                console.log(dispo_dict)
                if (Object.keys(dispo_dict).includes(item.toString())) {
                    console.log('obama')
                    console.log(dispo_dict[item])
                    console.log( dispo_dict[item]["production_order"])
                    console.log( production_order)
                    console.log()
                    dispo_dict[item] = {
                        "sales_order": dispo_dict[item]["sales_order"] + sales_order,
                        "tf_waiting_item": dispo_dict[item]["tf_waiting_item"] + tf_waiting_item,
                        "planned_stock": dispo_dict[item]["planned_stock"] + planned_stock,
                        "warehousestock": dispo_dict[item]["warehousestock"] + warehousestock,
                        "waiting_items": dispo_dict[item]["waiting_items"] + waiting_items + waiting_material, // 18.01,
                        "producing_items": dispo_dict[item]["producing_items"] + producing_items,
                        "production_order": dispo_dict[item]["production_order"] + production_order - waiting_material // 18.01
                    }
                }
                else {
                    console.log(dispo_dict)
                    dispo_dict[item] = {
                        "sales_order": sales_order,
                        "tf_waiting_item": tf_waiting_item,
                        "planned_stock": planned_stock,
                        "warehousestock": warehousestock,
                        "waiting_items": waiting_items + waiting_material, // 18.01
                        "producing_items": producing_items,
                        "production_order": production_order - waiting_material // 18.01
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
        console.log("sehrsehr",dispo_dict)

                                                                                                                                // dispo_dict ist hier
        console.log('Bedarfsplannung');
        console.log("wichtig",dispo_dict)
        var production_order = this.get_needed_purchase_items_by(xml, params, 'production_order', dispo_dict, new_calledFromSales2)

        let dispo = dispo_dict;
        console.log('Bezeichner');
        console.log(dispo_dict)

        // ####################################### finale Änderung. calledFromSales2
        // if ( this.props.calledFromSales2 ) {
        //     Object.keys(dispo).map( number => {
        //         // console.log(dispo[number]['production_order'])
        //         // console.log(`menge${number}`)
        //         // console.log(dispo[number]['production_order'][`menge${number}`])

        //         dispo[number]['production_order'] =  this.props.fertigungsaufträge_produktion[number][`menge${number}`];

        //         Object.keys(dispo[number]).map ( attributes => {
        //             // console.log(dispo[number])

        //             // console.log( Object.keys( dispo[number]['production_order']))
        //             // console.log('bibi')
        //             // console.log(dispo[number]);
        //             // console.log(dispo[number]['production_order'])
        //             // console.log(dispo[number]['production_order'][`menge${number}`] )
        //             console.log('Entry')
        //             console.log(this.props.fertigungsaufträge_produktion[number][`menge${number}`])
        //             // console.log(this.props.fertigungsaufträge_produktion)
        //             // console.log(this.props.fertigungsaufträge_produktion[`menge${number}`])
        //             // dispo[number]['production_order'] =  this.props.fertigungsaufträge_produktion[number][`menge${number}`];               // hier
        //             // console.log(number)
        //             // console.log(dispo)
        //             // console.log( dispo[number])
        //             // console.log(dispo[number]['production_order'])
        //             // dispo[number]['production_order'] = 0


        //         })
        //     })
        // }


        console.log('sales2_dispo2');
        console.log(dispo)


        var production = this.extract_production(dispo)
        console.log('a_production')
        console.log(production)


        // if ( this.props.calledFromSales2 ) production = this.props.fertigungsaufträge_produktion;

        // #Fertigungsaufträge json { 1 : stock, 2: stock, 3: stock, ... 40: 432stk, }
        // let fertigungsaufträge = {}
        // Object.keys(dispo_dict).map(item => {
        //     fertigungsaufträge[item] =  dispo_dict[item].planned_stock;
        // })
        // console.log('kirsche')
        // console.log(fertigungsaufträge);
        let fertigungsaufträge = production;

        if ( !this.props.calledFromSales2 ){

            let theRealState = {}
            Object.keys(fertigungsaufträge).map( number => {
            theRealState[number] = {};

            theRealState[number][`artikel${number}`] = parseInt(number);
            theRealState[number][`menge${number}`] = parseInt(fertigungsaufträge[number]);
             })
             localStorage.set('fertigungsaufträge', theRealState)
             localStorage.set('first_big_fertigungsaufträge_original_this_view', theRealState)
             console.log('nani')
             console.log(theRealState);
        }


        const Reihenfolge1 = [ 1, 26 , 51 , 16 , 17 , 50 , 4 , 10 , 49, 7 , 13 , 18 ]
        const Reihenfolge2 = [ 2, 26 , 56 , 16 , 17 , 55 , 5 , 11 , 54, 8 , 14, 19 ]
        const Reihenfolge3 = [ 3, 26, 31 , 16 , 17 , 30 , 6 , 12 , 29 , 9 , 15 , 20 ]

        console.log('super')
        console.log(super_dispo_dict)
        // ######################### 18.01
        if ( !this.props.calledFromSales2 ){
            let theRealState = {}
            Object.keys(super_dispo_dict).map( number1 => {
                    theRealState[number1] = {}
                Object.keys(super_dispo_dict[number1]).map( number2 => {
                    theRealState[number1][number2] = {}
                    console.log(super_dispo_dict[number1][number2])
                    theRealState[number1][number2][`artikel${number2}`] = Math.floor(parseInt(number2));
                    theRealState[number1][number2][`menge${number2}`] = Math.floor(parseInt(super_dispo_dict[number1][number2].production_order));
                })

                localStorage.set('fertigungsaufträge1', theRealState)  //hier_x

                if ( ignore === false && !this.state.correctTHIRDrun) {
                   // alert('better_engpass_fertigungsaufträge1')
                    // alert('fertigungsaufträge1')
                    localStorage.set('better_engpass_fertigungsaufträge1', theRealState)
                }

                localStorage.set('fertigungsaufträge1_original', theRealState)
                console.log('nano')
                console.log(theRealState)



             })


            //  alert('x x x x x ')
             let maxAufträge_better = localStorage.get('maxAufträge_better')
             if (maxAufträge_better) {
                 console.log('theRealState', theRealState)
                //  alert('maxAufträge_better exist')
                 let maxValues = {1: {}, 2:{}, 3:{}}
                 Object.keys(theRealState).map(outerNumber => {
                     Object.keys(theRealState[outerNumber]).map( number => {
                         let maxNumber = parseInt(theRealState[outerNumber][number][`menge${number}`]) - parseInt(maxAufträge_better[outerNumber][number])
                         maxValues[outerNumber][number] = maxNumber;
                     })
                 })
                 //alert('setting maxValues')
                 localStorage.set('maxAufträge_better',maxValues)
                 console.log('maxValues', maxValues)
            }

        }



        // ############################# 14.01
        if ( !this.props.calledFromSales2 ){
            let übermenge = {}
            Object.keys(super_dispo_dict).map( number1 => {
                    übermenge[number1] = {}
                Object.keys(super_dispo_dict[number1]).map( number2 => {
                    übermenge[number1][number2] = {}
                    console.log(super_dispo_dict[number1][number2])
                    übermenge[number1][number2][`artikel${number2}`] = Math.floor(parseInt(number2));
                    übermenge[number1][number2][`menge${number2}`] = 10000;
                })

                localStorage.set('fertigungsaufträge_übermenge', übermenge)
                console.log('übermenge')
                console.log(übermenge)

             })

        }
        //######################################






        // ######################### 20.01
        // if ( this.props.calledfromSales2 ) {
        //     localStorage.set('fertigungsaufträge', fertigungsaufträge)
        //     localStorage.set('first_big_fertigungsaufträge_original_this_view', fertigungsaufträge)
        // }
        console.log("Dispositionsprogramm", dispo)
        console.log("Kapazitätsprogramm", working_hours)
        console.log("eins",production)
        //////////////////////////////////////////////
        //5. Bedarfsplanung
        //

        // 20.01
        if (new_calledFromSales2) {
            console.log('übersetzung_c', übersetzung)
            console.log('dispo_dict_k', dispo_dict)

            Object.keys(dispo_dict).map( number => {
                Object.keys(dispo_dict[number]).map ( key => {
                    if (key == 'production_order') {
                        // alert(dispo_dict[number].production_order)
                        let menge_b = übersetzung[number][`menge${number}`]

                        // alert(`vorher ${dispo_dict[number][key]}`)
                        dispo_dict[number][key] = menge_b

                        // alert(`nacher ${dispo_dict[number][key]}`)

                        dispo_dict[number][`bro`] = 9000
                    }
                })
            })
            const nani= dispo_dict
            localStorage.set('ananas_dispo_dict', nani)
            console.log('abc')
            console.log(nani)

            // alert('yes')
            // let sum_dispo = dispo_dict
            //     console.log('sum_dispo',sum_dispo)
            //     console.log(1, sum_dispo[1].production_order)
            //     console.log('übersetzung_b', übersetzung)

            // Object.keys(übersetzung).map( number => {
            //     let menge = übersetzung[number][`menge${number}`]
            //     console.log('number', number)
            //     // sum_dispo[number].production_order = parseInt(menge)
            //     sum_dispo[number].production_order = 9999999
            //     // console.log(number)
            //     // console.log(sum_dispo)
            //     // console.log(sum_dispo[number].production_order)
            //     // Object.keys(sum_dispo[number]).map( key => console.log(key))
            //     console.log('keys_a')
            //     console.log(sum_dispo[number].production_order)
            //     console.log(menge)
            //     console.log(sum_dispo[number].production_order)
            //     console.log(number, menge , sum_dispo)
            //     // console.log(sum_dispo[number].producing_order)
            // })
            // console.log('sum_dispo_b',sum_dispo)

            var working_hours = this.working_hours_planning(localStorage.get('ananas_dispo_dict'), xml)
            // alert('new_calledFromSales2 executed this working hours planning')
            // console.log('working_hours_a',working_hours)
            // console.log('übersetzung_b', übersetzung)
            console.log('ananas2')
            console.log(localStorage.get('ananas_dispo_dict'))
        }
        else {
            console.log('ananas1')
            console.log(dispo_dict)
            var working_hours = this.working_hours_planning(dispo_dict, xml);
            // alert('normal working hours planning')
            console.log('übersetzung_b1', dispo_dict)

        }

        console.log("Kaufteile aus Produktionsmenge", production_order)
        var waiting_items = this.get_needed_purchase_items_by(xml, params, 'waiting_items', dispo_dict, new_calledFromSales2)
        localStorage.set('reihenfolge_waiting_items', waiting_items)

        console.log("Kaufteile aus Warteschlange", waiting_items)
        var waiting_list = this.get_waitinglist_by_purchase_items(xml);
            localStorage.set('reihenfolge_waiting_list', waiting_list)

        console.log("Kaufteile aus Warteliste", waiting_list)
        var warehousestock = this.get_warehousestock_by_purchase_items(xml);                                                // korrekt
                    // 08.01 Reihenfolge
                    localStorage.set('reihenfolge_warehousestock_dict', warehousestock)

        console.log("Lagerbestand", warehousestock)
        //Lagerbestand abzüglich Warteschlange und Warteliste
        var new_warehousestock = this.calculate_new_warehousestock(warehousestock, waiting_items, waiting_list)             // variable korrekt
            localStorage.set('reihenfolge_new_warehousestock', new_warehousestock)

        console.log("wichtig_5 Lagerbestand(neu)", new_warehousestock)
        //Bedarf für Periode n,n+1,n+2,n+3
        console.log("sehrsehrwichtig",production_order)
        var merge_periods = this.merge_periods(production_order, params['prognose']);                                       // falsch
            localStorage.set('reihenfolge_merge_periods',merge_periods)

        console.log("Bedarf(gesamt)", merge_periods)
        var warehousestock_after_using_demand = this.calculate_warehousestock_after_using_demand(new_warehousestock, merge_periods)
            localStorage.set('reihenfolge_warehousestock_after_using_demand', warehousestock_after_using_demand)

        console.log("Lagermenge(nach Verbrauch)", warehousestock_after_using_demand)
        //vorhandene Menge (%)
        var available_amount = this.calculate_available_amount(warehousestock_after_using_demand, merge_periods)

        console.log("vorhandene Menge", available_amount)
        //Lieferzeiten bestimmen
        var ranges = this.declare_warehoue_range()

        console.log("Lagerweite", ranges)
        //zukünftige Lieferungen bestimmen
        var future_movement = this.calculate_future_movement(xml, ranges)
            localStorage.set('reihenfolge_future_movement', future_movement)

        console.log("Lagerzugang", future_movement)











        // 18.01
        // let new_stock_warehousestock = localStorage.get('menge')
        // let new_stock_demand = localStorage.get('produktion')
        // let new_stock_movement = localStorage.get('eventuelleZugänge')
        // let new_stock = localStorage.get('minus')
        // let reihenfolge_warehousestock

        // let warehousestock_dict = localStorage.get('reihenfolge_warehousestock_dict')
        // let reihenfolge_waiting_items = localStorage.get('reihenfolge_waiting_items')
        // let reihenfolge_waiting_list = localStorage.get('reihenfolge_waiting_list')
        // let reihenfolge_new_warehousestock = localStorage.get('reihenfolge_new_warehousestock')
        // let reihenfolge_merge_periods = localStorage.get('reihenfolge_merge_periods')
        // let reihenfolge_warehousestock_after_using_demand = localStorage.get('reihenfolge_warehousestock_after_using_demand')
		// let reihenfolge_future_movement = localStorage.get('reihenfolge_future_movement')
		// let reihenfolge_warehousestock_after_movement = localStorage.get('reihenfolge_warehousestock_after_movement')

                                                                                                                            //

        //5.Engpassteuerung
        var new_dispo = this.calculate_empty_work_time(new_warehousestock, merge_periods, future_movement, production, dispo, ignore)    // produktion

        console.log("1111",new_dispo)
        console.log('ignore')
        console.log(ignore)
        if (ignore !== true) {

                localStorage.set('sascha_engpasssteuerung', new_dispo)
            }
        console.log("1_",new_dispo)
        console.log("2_Kapazitätsprogramm", working_hours)
        //Lagerbestand nach erhaltenen Bestellungen
        var warehousestock_after_movement = this.add_stock_movement_from_tool(warehousestock_after_using_demand, future_movement)
            localStorage.set('reihenfolge_warehousestock_after_movement', warehousestock_after_movement)
        console.log("3_Lagermenge(nach Lieferung)", warehousestock_after_movement)
        //vorhandene Menge (%)
        var available_amount = this.calculate_available_amount(warehousestock_after_movement, merge_periods)


        console.log("4_vorhandene Menge", available_amount)
        //lieferungen bestimmen
            var erfasste_Lieferungen = this.calculate_orders(ranges, available_amount, warehousestock_after_movement, warehousestock_after_using_demand, merge_periods)
                localStorage.set('reihenfolge_erfasste_Lieferungen', erfasste_Lieferungen)


        console.log("")
        console.log('dieser Sascha')
        console.log(erfasste_Lieferungen)

        // 28.01 bestellungen, geschluckte bestellungen mitliefern
        localStorage.set('erfasste_Lieferungen', erfasste_Lieferungen)
        console.log('xexe')
        console.log('production_order')
        console.log('')
        console.log(production_order)
        console.log('waiting_items')
        console.log('')


        console.log(waiting_items)


        console.log('waiting_list')
 console.log('')
 console.log(waiting_list)
 console.log('warehousestock')
 console.log('')
 console.log(warehousestock)
 console.log('new_warehousestock')
 console.log('')
 console.log(new_warehousestock)
 console.log('merge_periods')
 console.log('')
 console.log(merge_periods)
 console.log('warehousestock_after_using_demand')
 console.log('')
 console.log(warehousestock_after_using_demand)
 console.log('available_amount')
 console.log('')
 console.log('')
 console.log(available_amount)
 console.log('future_movement')
 console.log('')
 console.log(future_movement)
 console.log('new_dispo')
 console.log('')
 console.log(new_dispo)
 console.log('production2')
 console.log('')
//  console.log(production2)
 console.log('working_hours2')
 console.log('')
//  console.log(working_hours2)
 console.log('warehousestock_after_movement')
 console.log('')
 console.log( warehousestock_after_movement)
 console.log('available_amount')
 console.log('')
 console.log(available_amount)
 console.log('erfasste_Lieferungen')
 console.log('')
 console.log(erfasste_Lieferungen)

        console.log('#########################################aaaaaa_05######')


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
            console.log('bestellungen2_x',bestellungen2)
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

        // 24.01 todo
        localStorage.set('bestellungen', bestellungenState)


        if( this.props.calledFromSales2) {
            console.log('sales2_call')
            console.log(bestellungenState)
        }

        console.log('a_04_dispo')
        console.log('bestellungenState')
        console.log(bestellungenState)
        console.log('')

        console.log('dispo_dict')
        console.log(dispo_dict)
        console.log('')

        console.log('fertigungsaufträge / theRealState')
        console.log('')
        console.log('')
        console.log('')
        console.log('')
        console.log('')


        let better_engpass_fertigungsaufträge1 = localStorage.get('better_engpass_fertigungsaufträge1')
        let final_better_engpass = localStorage.get('final_better_engpass')


        // 24.01
        let ffx_engpass = {1:{}, 2:{}, 3:{}}
        if ( better_engpass_fertigungsaufträge1 && final_better_engpass ) {
            Object.keys(final_better_engpass).map( outerProduct => {
                Object.keys(final_better_engpass[outerProduct]).map( number => {
                    let a = final_better_engpass[outerProduct][number]
                    let b = better_engpass_fertigungsaufträge1[outerProduct][number][`menge${number}`]

                    let limit = b -a
                    ffx_engpass[outerProduct][number] = limit
                })
            })
        }

        console.log('ffx_engpass', ffx_engpass)
        localStorage.set('ffx_engpass',ffx_engpass)
        let correctTHIRDrun = this.state.correctTHIRDrun
        //alert( correctTHIRDrun )
        //alert(ignore)
        if ( !correctTHIRDrun && ignore != false && !new_calledFromSales2) {
            //
            // alert('first run')
            let übersetzung = this.createÜbersetzung();
            this.setState({ correctTHIRDrun: true} , () => this.dispo_function(false, true, übersetzung))
            // this.dispo_function(undefined,undefined,undefined,undefined,'yes')

        }


        // hier
        localStorage.set('bestellungen_Reihenfolge')
        return dispo_dict

    }

    resetAllValues = () => {
        let sales1 =localStorage.get('sales1')
        let sales2 = localStorage.get('sales2')

        localStorage.clear()
        // location.reload();
        // document.getElementById('Fertigungsaufträge').style.display = 'none';
        // document.getElementById('Arbeitszeiten').style.display = 'none';
        // document.getElementById('Bestellungen').style.display = 'none';
        // document.getElementById('Reihenfolge').style.display = 'none';
        // document.getElementById('download').style.display = 'none';
        // document.getElementById('help').style.display = 'none';
        // window.location.href = 'http://localhost:3000/sales1'

        localStorage.set('sales1', sales1)
        localStorage.set('sales2',sales2)

    }

    createÜbersetzung = () => {
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
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
        return übersetzung;
    }


    extract_production = (dispo) =>  {
        if (typeof (dispo) == 'undefined') { return }
        var production_order = {}
        var item
        for (item of Object.keys(dispo)) {
            production_order[item] = dispo[item]['production_order']
        }
        return production_order
    }

    //    ##############   Arbeitszeiten       updated                                                                                                 Arbeitszeiten
    working_hours_planning(dispo, xml) {
        // alert('executed')
        console.log('input_dispo')
        console.log('input_dispo', dispo)
        if (typeof (dispo) == 'undefined' || typeof (this.state.xml) == 'string') { return }
        var total_capacity_plan = this.total_capacity_planning(dispo, xml)
        console.log(total_capacity_plan);
        var working_hours_dict = {}
        var workstation
        console.log("Sehr wichtig", total_capacity_plan)
        for (workstation of Object.keys(total_capacity_plan)) {
            var working_hours
            var schichten
            var schichten_working_hours
            //1-Schichten Betrieb
            working_hours = Math.ceil((total_capacity_plan[workstation] - 2400) / 5)
            if (working_hours < 360 && working_hours > 240) { working_hours = 240 }
            schichten = 1
            schichten_working_hours = 2400
            if(total_capacity_plan[workstation] - 2400 * 1-working_hours*5>0){
                var too_much = (total_capacity_plan[workstation] - 2400 * 1-working_hours*5)*(-1)
                var too_less = 0
            }else{
                var too_much = 0
                var too_less = (total_capacity_plan[workstation] - 2400 * 1)*(-1)
            }
            //2-Schichten Betrieb
            if ( working_hours > 240) {
                working_hours = parseInt((total_capacity_plan[workstation] - 2400 * 2) / 5)
                if (working_hours < 360 && working_hours > 240) { working_hours = 240 }
                schichten = 2
                schichten_working_hours = 2400*2
                if(total_capacity_plan[workstation] - 2400 * 2-working_hours*5>0){
                    var too_much = (total_capacity_plan[workstation] - 2400 * 2-working_hours*5)*(-1)
                    var too_less = 0
                }else{
                    var too_much = 0
                    var too_less = (total_capacity_plan[workstation] - 2400 * 2)*(-1)
                }
                //3-Schichten Betrieb
                if ( working_hours > 240) {
                    working_hours = 0
                    schichten_working_hours = 2400*3
                     schichten = 3
                    if(total_capacity_plan[workstation] - 2400 * 3-working_hours*5>0){
                        var too_much = (total_capacity_plan[workstation] - 2400 * 3-working_hours*5)*(-1)
                        var too_less = 0
                    }else{
                        var too_much = 0
                        var too_less = (total_capacity_plan[workstation] - 2400 * 3)*(-1)
                    }
                }
            }
            if (working_hours < 0) {
                working_hours = 0;
            }

            let überstunden = `überstunden${workstation}`;
            let anzahl_Schichten = `anzahl_Schichten${workstation}`
            let zeitbedarf = `zeitbedarf${workstation}`
            let zeitbedarf_schichten = `zeitbedarf_schichten${workstation}`
            let überstunden_gesamt = `überstunden_gesamt${workstation}`
            let nicht_produziert_too_less = `nicht_produziert_too_less${workstation}`
            let nicht_produziert_too_much = `nicht_produziert_too_much${workstation}`

            working_hours_dict[workstation] = {
                [überstunden]: working_hours,
                [anzahl_Schichten]: schichten,
                [zeitbedarf]: total_capacity_plan[workstation],
                [zeitbedarf_schichten]: schichten_working_hours,
                [überstunden_gesamt]:working_hours*5,
                [nicht_produziert_too_less]: too_less,
                [nicht_produziert_too_much]: too_much

            }
        }
        this.setState({ capacity_programm: working_hours_dict })
        console.log('Arbeitszeiten')
        console.log(working_hours_dict);
        this.setState({ capacity_programm: working_hours_dict })
        localStorage.set('arbeitszeiten', working_hours_dict);
        console.log("wichtig_1",working_hours_dict)
        return working_hours_dict
    }


    // total_capacity_planning(dispo, xml) {
    //     var capacity_plan = this.capacity_planning(dispo)
    //     var setup_plan = this.get_setup_time(dispo)
    //     var timeneed = this.get_timeneed_at_workstation(xml)
    //     var capacity_data = { "capacity_plan": capacity_plan, "setup_plan": setup_plan, "timeneed": timeneed }
    //     this.setState({ capacity_data: capacity_data })
    //     var total_capacity_dict = {}
    //     var workstation
    //     for (workstation of Object.keys(capacity_plan)) {
    //         total_capacity_dict[workstation] = capacity_plan[workstation] + setup_plan[workstation] + timeneed[workstation]
    //     }
    //     this.setState({ capacity_plan: total_capacity_dict })
    //     console.log("wichtig_2",capacity_data)
    //     return total_capacity_dict
    // }

      ///////////////////////////////////////////////////////////////////////////////////
      // 5 :{ },  added
      capacity_planning(dispo_dict) {
        var arbeitszeiten_dict = {
            1: { 29: 6, 49: 6, 54: 6 }, 2: { 30: 5, 50: 5, 55: 5 }, 3: { 31: 6, 51: 5, 56: 6 }, 4: { 1: 6, 2: 7, 3: 7 }, 5 :{  },
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
        var time_output_2 = {}
        console.log('arbeitszeiten_arbeitszeiten prüfung')
        console.log(dispo_dict)
        console.log(time_dict)
        for (workstation of Object.keys(time_dict)) {
            console.log(workstation);
            var product
            var workstation_product_time = []
            var time_output = {}
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
                let product_new = `product${product}`
                let production_time_new = `production_time${product}`
                let menge_new = `product_amount${product}`

                time_output[product] = {
                [product_new]: product,
                [production_time_new]:production_time * production_order,
            [menge_new]:production_order }

            }
            time_output_2[workstation] = time_output
            var workstation_time = workstation_product_time.reduce((a, b) => a + b, 0)
            workstation_dict[workstation] = workstation_time;
        }
        console.log("wichtig_3",time_output_2)
        if ( unique == 0 ) localStorage.set('arbeitszeiten_rüstzeit', time_output_2)
        if ( unique == 1 ) localStorage.set('arbeitszeiten_arbeitszeiten', time_output_2)
        return workstation_dict
    }

    get_timeneed_at_workstation(xml_data) {
        var workstation_time_dict = {};
        var xml_root = xml_data.getElementsByTagName('waitinglistworkstations')[0];
        var workstation;
        var new_output2 = {}
        for (workstation of xml_root.getElementsByTagName('workplace')) {
            var new_output = {}
            var workstation_id = workstation.getAttribute("id")
            var timeneed = parseInt(workstation.getAttribute("timeneed"));
            workstation_time_dict[workstation_id] = timeneed
            if(workstation.getElementsByTagName('waitinglist').length>0){
                let position
                for (position of workstation.getElementsByTagName('waitinglist'))
                new_output[position.getAttribute('item')] = {
                    'Erzeugnis' : position.getAttribute('item'),
                    'Zeitbedarf': parseInt(position.getAttribute('timeneed')),
                    'Menge': parseInt(position.getAttribute('amount'))
                }
            }
            new_output2[workstation_id] = new_output
        }
        console.log("wichtig_4",new_output2)
        localStorage.set('arbeitszeiten_warteschlange',new_output2)
        return workstation_time_dict
    }

    total_capacity_planning(dispo, xml) {
        var capacity_plan = this.capacity_planning(dispo)
        var setup_plan = this.get_setup_time(dispo)
        var timeneed = this.get_timeneed_at_workstation(xml)
        var capacity_data = { "capacity_plan": capacity_plan, "setup_plan": setup_plan, "timeneed": timeneed }
        var capacity_data_new = {}
        this.setState({ capacity_data: capacity_data })
        var total_capacity_dict = {}
        var workstation
        console.log("wichtig_2",capacity_plan)
        for (workstation of Object.keys(capacity_plan)) {
            total_capacity_dict[workstation] = capacity_plan[workstation] + setup_plan[workstation] + timeneed[workstation]

            let capacity_plan_new = `capacity_plan`
            let setup_plan_new = `setup_plan`
            let timeneed_new = `timneeed`

        capacity_data_new[workstation] = {
                [capacity_plan_new]: capacity_plan[workstation],
                [setup_plan_new]:setup_plan[workstation],
                [timeneed_new]: timeneed[workstation]}
        }
        this.setState({ capacity_plan: total_capacity_dict })
        console.log("wichtig_2",capacity_data_new)
        return total_capacity_dict
    }


    calculate_empty_work_time(warehousestock_n, demand, warehousestock_movement, production, dispo, ignore) {

        if (typeof (warehousestock_n) == "undefined") { return }
        if (typeof (warehousestock_movement) == "undefined") { return }
        if (typeof (demand) == "undefined") { return }

        var item
        var new_stock = {}
        var new_stock_warehousestock = {}
        var new_stock_demand = {}
        var new_stock_movement = {}
        var new_stock_item
        for (item of Object.keys(warehousestock_n)) {
            if (Object.keys(warehousestock_movement[item]).length !== 0) {
                var lieferung
                for(lieferung of Object.keys(warehousestock_movement[item])){
                    lieferung = parseInt(lieferung)
                    if (parseFloat(warehousestock_movement[item][lieferung]['ankunft']) <= 0.6) {
                        new_stock_item = warehousestock_n[item] - demand[1][item] + parseInt(warehousestock_movement[item][lieferung]['menge'])
                        console.log(item, warehousestock_n[item], demand[1][item], parseInt(warehousestock_movement[item][lieferung]['menge']))
                        new_stock_movement[item] = parseInt(warehousestock_movement[item][lieferung]['menge'])
                    } else {
                        new_stock_item = warehousestock_n[item] - demand[1][item]
                        console.log(item, warehousestock_n[item], demand[1][item])
                    }

                }
            } else {
                new_stock_item = warehousestock_n[item] - demand[1][item]
                console.log(item, warehousestock_n[item], demand[1][item])
            }
            if (new_stock_item < 0) {
                new_stock[item] = new_stock_item * (-1)
                new_stock_warehousestock[item] = warehousestock_n[item]
                new_stock_demand[item] = demand[1][item]
            }
        }
        console.log("1__fehlende_Kaufteile", new_stock)
        console.log("1.Engpass - fehlende Kaufteile",new_stock)

        // console.log("2__aktuell Lagerbestand", new_stock_warehousestock)
        // console.log("3__Verbrauch", new_stock_demand)
        // console.log("4__Lagerzugang", new_stock_movement)

        localStorage.set('menge', new_stock_warehousestock)
        localStorage.set('produktion', new_stock_demand)
        localStorage.set('eventuelleZugänge', new_stock_movement)
        localStorage.set('minus', new_stock)

        var single_product_use_1 = [21, 52, 53]
        var single_product_use_2 = [22, 57, 58]
        var single_product_use_3 = [23, 33, 34]

        var get_production_order = localStorage.get('super_dispo_dict');
        // console.log("dispopogo",get_production_order)
        var production_order = localStorage.get('production_order');
        // console.log("gesamt:bedarf",production_order)

        // var produkt_1_menge = get_production_order[1][1]['production_order']
        // var produkt_2_menge = get_production_order[2][2]['production_order']
        // var produkt_3_menge = get_production_order[3][3]['production_order']

        // var produkt_1_anteil = produkt_1_menge/(produkt_1_menge+produkt_2_menge+produkt_3_menge)
        // var produkt_2_anteil = produkt_2_menge/(produkt_1_menge+produkt_2_menge+produkt_3_menge)
        // var produkt_3_anteil = produkt_3_menge/(produkt_1_menge+produkt_2_menge+produkt_3_menge)

        // console.log("prozente",produkt_1_anteil,produkt_2_anteil,produkt_3_anteil)

        //newnew
        var verwendung_p1_v2 = {
            1: { 21: 1, 24: 1, 27: 1 }, 26: { 44: 2, 47: 1, 48: 2 }, 51: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1, 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 50: { 24: 2, 25: 2 },
            4: { 35: 2, 36: 1, 52: 1, 53: 36 }, 10: { 32: 1, 39: 1 }, 49: { 24: 2, 25: 2 },
            7: { 35: 2, 37: 1, 38: 1, 52: 1, 53: 36 },
            13: { 32: 1, 39: 1 }, 18: { 28: 3, 32: 1, 59: 2 }
        }
        //1.Bedarfsermittlung
        var p1_bedarf = {}
        for (item of Object.keys(verwendung_p1_v2)) {
            var corresponding_item = get_production_order[1][item]['production_order']
            var subitem
            for (subitem of Object.keys(verwendung_p1_v2[item])) {
                if (corresponding_item < 0) {
                    corresponding_item = 0
                }
                var waitings_items = Math.ceil(corresponding_item) * verwendung_p1_v2[item][subitem]
                if (Object.keys(p1_bedarf).includes(subitem.toString())) {
                    p1_bedarf[subitem] = p1_bedarf[subitem] + waitings_items
                } else {
                    p1_bedarf[subitem] = waitings_items
                }
            }
        }
        var verwendung_p2_v2 = {
            2: { 22: 1, 24: 1, 27: 1 }, 26: { 44: 2 , 47: 1 , 48: 2  }, 56: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1 , 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 55: { 24: 2, 25: 2 },
            5: { 35: 2, 36: 1, 57: 1, 58: 36 }, 11: { 32: 1, 39: 1 }, 54: { 24: 2, 25: 2 }, 8: { 35: 2, 37: 1, 38: 1, 57: 1, 58: 36 },
            14: { 32: 1, 39: 1 }, 19: { 28: 4, 32: 1, 59: 2 }
        }
        var p2_bedarf = {}
        for (item of Object.keys(verwendung_p2_v2)) {
            var corresponding_item = get_production_order[2][item]['production_order']
            var subitem
            for (subitem of Object.keys(verwendung_p2_v2[item])) {
                if (corresponding_item < 0) {
                    corresponding_item = 0
                }
                var waitings_items = Math.ceil(corresponding_item) * verwendung_p2_v2[item][subitem]
                if (Object.keys(p2_bedarf).includes(subitem.toString())) {
                    p2_bedarf[subitem] = p2_bedarf[subitem] + waitings_items
                } else {
                    p2_bedarf[subitem] = waitings_items
                }
            }
        }
        var verwendung_p3_v2 = {
            3: { 23: 1, 24: 1, 27: 1 }, 26: { 44: 2 , 47: 1 , 48: 2  }, 31: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1 , 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 30: { 24: 2, 25: 2 },
            6: { 35: 2, 36: 1, 33: 1, 34: 36 }, 12: { 32: 1, 39: 1 }, 29: { 24: 2, 25: 2 }, 9: { 35: 2, 37: 1, 38: 1, 33: 1, 34: 36 },
            15: { 32: 1, 39: 1 }, 20: { 28: 5, 32: 1, 59: 2 }
        }
        var p3_bedarf = {}
        for (item of Object.keys(verwendung_p3_v2)) {
            var corresponding_item = get_production_order[3][item]['production_order']
            var subitem
            for (subitem of Object.keys(verwendung_p3_v2[item])) {
                if (corresponding_item < 0) {
                    corresponding_item = 0
                }
                var waitings_items = Math.ceil(corresponding_item) * verwendung_p3_v2[item][subitem]
                if (Object.keys(p3_bedarf).includes(subitem.toString())) {
                    p3_bedarf[subitem] = p3_bedarf[subitem] + waitings_items
                } else {
                    p3_bedarf[subitem] = waitings_items
                }
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

        //new
        //Anteile amm gesamten Bedarfs berechenen
        var new_stock_two = {}
        new_stock_two[1]={}
        new_stock_two[2]={}
        new_stock_two[3]={}
        for (item of Object.keys(new_stock)) {
            if (single_product_use_1.includes(parseInt(item))) {
                new_stock_two[1][item] = new_stock[item]}
            else if (single_product_use_2.includes(parseInt(item))) {
                new_stock_two[2][item] = new_stock[item]}
            else if (single_product_use_3.includes(parseInt(item))) {
                new_stock_two[3][item] = new_stock[item]
            } else {
                new_stock_two[1][item] = Math.ceil(new_stock[item] * (p1_bedarf[item]) / (p1_bedarf[item]+p2_bedarf[item]+p3_bedarf[item]))
                new_stock_two[2][item] = Math.ceil(new_stock[item] * (p2_bedarf[item]) / (p1_bedarf[item]+p2_bedarf[item]+p3_bedarf[item]))
                new_stock_two[3][item] = Math.ceil(new_stock[item] * (p3_bedarf[item]) / (p1_bedarf[item]+p2_bedarf[item]+p3_bedarf[item]))
            }
        }
        console.log("2.Engpasse-Bedarf pro Proukt",p1_bedarf,p2_bedarf,p3_bedarf)
        console.log("2.Engpass-Bedarf (Gesamt)", new_stock_demand)
        console.log("2.Engpass-fehlende Kaufteile über Anteile aufteilen (Bedarf Kaufteile / Bedarf Gesamt)", new_stock_two)

        localStorage.set('eps_p1_bedarfProProdukt', p1_bedarf)
        localStorage.set('eps_p2_bedarfProProdukt', p2_bedarf)
        localStorage.set('eps_p3_bedarfProProdukt', p3_bedarf)
        localStorage.set('eps_gesamtbedarf', new_stock_demand)
        localStorage.set('eps_%Bedarf',new_stock_two)
        localStorage.set('minus_after_trippeling', new_stock_two)

        console.log(get_production_order)

        var verwendung_dict = {}
        var product
        for (product of [1,2,3]) {
            var product_dict = {}
            for (item of Object.keys(erzeugnisse[product])) {
                var array_item
                if(product == 1 && Object.keys(new_stock_two[1]).includes(item)){
                    for(array_item of erzeugnisse[product][item]){
                        if(Object.keys(product_dict).includes(array_item.toString()))
                        {
                            var neuer_wert = new_stock_two[1][item]*get_production_order[product][array_item]['production_order']/p1_bedarf[item]
                            if(product_dict[array_item]<neuer_wert)
                            {
                                product_dict[array_item] = Math.ceil(neuer_wert)
                            }
                        }else{
                     product_dict[array_item] = Math.ceil(new_stock_two[1][item]*get_production_order[product][array_item]['production_order']/p1_bedarf[item])
                        }
                    }
                }
                if(product == 2 && Object.keys(new_stock_two[2]).includes(item)){
                    for(array_item of erzeugnisse[product][item]){
                        if(Object.keys(product_dict).includes(array_item.toString()))
                        {
                            var neuer_wert = new_stock_two[2][item]*get_production_order[product][array_item]['production_order']/p2_bedarf[item]
                            if(product_dict[array_item]<neuer_wert)
                            {
                                product_dict[array_item] = Math.ceil(neuer_wert)
                            }
                        }else{
                       product_dict[array_item] = Math.ceil(new_stock_two[2][item]*get_production_order[product][array_item]['production_order']/p2_bedarf[item])
                        }
                    }
                }
                if(product == 3 && Object.keys(new_stock_two[3]).includes(item)){
                    for(array_item of erzeugnisse[product][item]){
                        if(Object.keys(product_dict).includes(array_item.toString()))
                        {
                            var neuer_wert = new_stock_two[3][item]*get_production_order[product][array_item]['production_order']/p3_bedarf[item]
                            if(product_dict[array_item]<neuer_wert)
                            {
                                product_dict[array_item] = Math.ceil(neuer_wert)
                            }
                        }else{
                         product_dict[array_item] = Math.ceil(new_stock_two[3][item]*get_production_order[product][array_item]['production_order']/p3_bedarf[item])
                        }
                    }
                }
                verwendung_dict[product] = product_dict
            }
        }
        var better_engpass = verwendung_dict
        console.log("4.Engpass-Verwendung",verwendung_p1_v2)
        console.log("4.Engpass-fehlende Teile",new_stock_two)
        console.log("4.Engpass-Produktion",get_production_order)
        console.log("4.Engpass-Bedarf",p1_bedarf)
        console.log("4.Engpass-fehlende Kaufteile über Anteile aufteilen (Produktionsaufträge Produkt/Produktionaufträge gesamt)",better_engpass)
        localStorage.set('get_production_order',get_production_order)

        console.log("5.Engpass-final",better_engpass)
        if ( ignore === false && !this.state.correctTHIRDrun) {
            // alert('final_better_engpass')
            //alert('final_better_engpass ')
            localStorage.set('final_better_engpass', better_engpass)
        }

        localStorage.set('finally_better_engpass_maybe', better_engpass)



        // var verwendung = {
        //     1: {
        //         21: 1, 22: 0, 23: 0, 24: 7, 25: 4, 27: 2, 28: 4, 32: 3, 33: 0, 34: 0, 35: 4, 36: 1, 37: 1, 38: 1,
        //         39: 2, 40: 1, 41: 1, 42: 2, 43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 2, 53: 72, 57: 0, 58: 0, 59: 2
        //     },
        //     2: {
        //         21: 0, 22: 1, 23: 0, 24: 7, 25: 4, 27: 2, 28: 5, 32: 3, 33: 0, 34: 0, 35: 4, 36: 1, 37: 1, 38: 1, 39: 2, 40: 1, 41: 1, 42: 2,
        //         43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 0, 53: 0, 57: 2, 58: 72, 59: 2
        //     },
        //     3: {
        //         21: 0, 22: 0, 23: 1, 24: 7, 25: 4, 27: 2, 28: 6, 32: 3, 33: 2, 34: 72, 35: 4, 36: 1, 37: 1, 38: 1, 39: 2, 40: 1, 41: 1, 42: 2,
        //         43: 1, 44: 3, 45: 1, 46: 1, 47: 1, 48: 2, 52: 0, 53: 0, 57: 0, 58: 0, 59: 2
        //     }
        // }

        // var verwendung_dict = {}
        // var product
        // for (product of Object.keys(verwendung)) {
        //     var product_dict = {}
        //     for (item of Object.keys(erzeugnisse[product])) {
        //         if (Object.keys(new_stock_two[product]).includes(item.toString())) {
        //             if (verwendung[product][item] > 0)
        //                 product_dict[item] = Math.ceil(new_stock_two[product][item] / verwendung[product][item])
        //         }
        //     }
        //     verwendung_dict[product] = product_dict
        // }
        // console.log("3__Verwendung",verwendung_dict)

        // var erzeugnisse = {
        //     1: {
        //         21: [1], 24: [1, 51, 16, 50, 49], 25: [50, 49], 27: [1, 51], 28: [16, 18], 32: [10, 13, 18],
        //         35: [4, 7], 36: [4], 37: [7], 38: [7], 39: [10, 13], 40: [16], 41: [16], 42: [16],
        //         43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 52: [4, 7], 53: [4, 7], 59: [18]
        //     },
        //     2: {
        //         22: [2], 24: [2, 56, 16, 55, 54], 25: [55, 54], 27: [2, 56], 28: [16, 19], 32: [11, 14, 19],
        //         35: [5, 8], 36: [5], 37: [8], 38: [8], 39: [11, 14], 40: [16], 41: [16], 42: [16],
        //         43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 59: [19], 57: [5, 8], 58: [5, 8]
        //     },
        //     3: {
        //         23: [3], 24: [3, 31, 16, 30, 29], 25: [30, 29], 27: [3, 31], 28: [16, 20], 32: [12, 15, 20],
        //         35: [6, 9], 36: [6], 37: [9], 38: [9], 39: [12, 15], 40: [16], 41: [16], 42: [16],
        //         43: [17], 44: [26, 17], 45: [17], 46: [17], 47: [26], 48: [26], 59: [20], 33: [6, 9], 34: [6, 9]
        //     }
        // }

        // var product_erzeugnisse = {}
        // for (product of Object.keys(erzeugnisse)) {
        //     var erzeugniss
        //     var erzeugniss_dict = {}
        //     for (item of Object.keys(erzeugnisse[product])) {
        //         if (Object.keys(verwendung_dict[product]).includes(item.toString())) {
        //             for (erzeugniss of erzeugnisse[product][item]) {
        //                 if (Object.keys(erzeugniss_dict).includes(erzeugniss.toString())) {
        //                     if (erzeugniss_dict[erzeugniss] < verwendung_dict[product][item]) {
        //                         erzeugniss_dict[erzeugniss] = verwendung_dict[product][item]
        //                     }

        //                 } else {
        //                     erzeugniss_dict[erzeugniss] = verwendung_dict[product][item]
        //                 }
        //             }
        //         }
        //     }
        //     product_erzeugnisse[product] = erzeugniss_dict
        // }
        // console.log("5__",product_erzeugnisse)

        // //new
        // //Max von  product_erzeugnisse[product] und von allen abziehen

        // var p1_reihenfolge = [18,13,7,49,10,4,50,17,16,51,26,1]
        // var p2_reihenfolge = [19,14,8,54,11,5,55,17,16,56,26,2]
        // var p3_reihenfolge = [20,15,9,29,12,6,30,17,16,31,26,3]

        // var p1_iteration = { 18:[49,50,51,1],13:[49,50,51,1],7:[49,50,51,1],
        //     49:[50,51,1],10:[50,51,1],4:[50,51,1],
        //     50:[51,1],17:[51,1],16:[51,1],
        //     51:[1], 26:[1]}
        // var p2_iteration = { 19:[54,55,56,2],14:[54,55,56,2],8:[54,55,56,2],
        //     54:[55,56,2],11:[55,56,2],5:[55,56,2],
        //     55:[56,2],17:[56,2],16:[56,2],
        //     56:[2], 26:[2]}
        // var p3_iteration = { 20:[29,30,31,3],15:[29,30,31,3],9:[29,30,31,3],
        //     29:[30,31,3],12:[30,31,3],6:[30,31,3],
        //     30:[31,3],17:[31,3],16:[31,3],
        //     31:[3], 26:[3]}


        // var better_engpass = {1:{},2:{},3:{}}
        // var i
        // //1
        // for ( i of p1_reihenfolge)
        // {
        //     if(Object.keys(product_erzeugnisse[1]).includes(i.toString()))
        //     {
        //         if(better_engpass[1][i]>product_erzeugnisse[1][i])
        //         {}
        //         else
        //         {
        //         better_engpass[1][i] = product_erzeugnisse[1][i]
        //         }
        //         if(Object.keys(p1_iteration).includes(i.toString())){
        //             var j
        //             for(j of p1_iteration[i]){
        //                 if(better_engpass[1][j]>product_erzeugnisse[1][i])
        //                 {}
        //                 else
        //                 {
        //                     better_engpass[1][j] = product_erzeugnisse[1][i]
        //                 }
        //             }
        //         }
        //     }
        // }
        // //2
        // for ( i of p2_reihenfolge)
        // {
        //     if(Object.keys(product_erzeugnisse[2]).includes(i.toString()))
        //     {
        //         if(better_engpass[2][i]>product_erzeugnisse[2][i])
        //         {}
        //         else
        //         {
        //         better_engpass[2][i] = product_erzeugnisse[2][i]
        //         }
        //         if(Object.keys(p2_iteration).includes(i.toString())){
        //             var j
        //             for(j of p2_iteration[i]){
        //                 if(better_engpass[2][j]>product_erzeugnisse[2][i])
        //                 {}
        //                 else
        //                 {
        //                     better_engpass[2][j] = product_erzeugnisse[2][i]
        //                 }
        //             }
        //         }
        //     }
        // }
        // //3
        // for ( i of p3_reihenfolge)
        // {
        //     if(Object.keys(product_erzeugnisse[3]).includes(i.toString()))
        //     {
        //         if(better_engpass[3][i]>product_erzeugnisse[3][i])
        //         {}
        //         else
        //         {
        //         better_engpass[3][i] = product_erzeugnisse[3][i]
        //         }
        //         if(Object.keys(p3_iteration).includes(i.toString())){
        //             var j
        //             for(j of p3_iteration[i]){
        //                 if(better_engpass[3][j]>product_erzeugnisse[3][i])
        //                 {}
        //                 else
        //                 {
        //                     better_engpass[3][j] = product_erzeugnisse[3][i]
        //                 }
        //             }
        //         }
        //     }
        // }
        // console.log("neues_engpass_dict",better_engpass)
        if ( ignore === false) {
            // alert(3)
            // localStorage.set('maxAufträge_better', better_engpass)
        }
        localStorage.set('better_engpass',better_engpass)
        localStorage.set('safe_better_engpass', better_engpass)
        localStorage.set('better_engpass_color',better_engpass)


        // var max_dict = {1:0,2:0,3:0}

        // for (product of Object.keys(product_erzeugnisse)) {
        //     for (item of Object.keys(product_erzeugnisse[product])) {
        //         if (max_dict[product]<product_erzeugnisse[product][item]) {
        //             max_dict[product] = product_erzeugnisse[product][item]
        //         } else {
        //         }
        //     }
        // }

        // console.log("6__max",max_dict)

        // console.log("alte production",production)



        // var produkte = {
        //     1: { 1: 0, 26: 1, 51: 1, 16: 51, 17: 51, 50: 51, 4: 50, 10: 50, 49: 50, 7: 49, 13: 49, 18: 49 },
        //     2: { 2: 0, 26: 2, 56: 2, 16: 56, 17: 56, 55: 56, 5: 55, 11: 55, 54: 55, 8: 54, 14: 54, 19: 54 },
        //     3: { 3: 0, 26: 3, 31: 3, 16: 31, 17: 31, 30: 31, 6: 30, 12: 30, 29: 30, 9: 29, 15: 29, 20: 29 }
        // }

        // for (product of Object.keys(product_erzeugnisse)) {
        //     for (item of Object.keys(produkte[product])) {
        //         if (production[item] - max_dict[product] < 0) {
        //             production[item] = 0
        //         } else {
        //             production[item] = production[item] - max_dict[product]
        //         }
        //     }
        // }
        // console.log("neue production",production)

        // for (item of Object.keys(dispo)) {
        //     dispo[item]['production_order'] = production[item]
        // }
        // return dispo
        return
    }

    // get_timeneed_at_workstation(xml_data) {
    //     var workstation_time_dict = {};
    //     var xml_root = xml_data.getElementsByTagName('waitinglistworkstations')[0];
    //     var workstation;
    //     for (workstation of xml_root.getElementsByTagName('workplace')) {
    //         var workstation_id = workstation.getAttribute("id")
    //         var timeneed = parseInt(workstation.getAttribute("timeneed"));
    //         workstation_time_dict[workstation_id] = timeneed
    //     }
    //     return workstation_time_dict
    // }

    // ##################### ende


    // ##################### Bestellungen                                                       Bestellungen start
     ///////////////////////////////////////////////////////////////////////////////////
     get_needed_purchase_items_by(xml, params, property, dispo_dict, new_calledFromSales2) {
        var parameter
        for (parameter of [xml, params]) {
            if (typeof (parameter) == 'string') { return }
        }
        // wichtig vital change
        // var dispo_dict = this.dispo_function(xml, params)

        //newnew
        var get_production_order = localStorage.get('super_dispo_dict');
        let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        console.log("dispopogo",get_production_order)

        // 24.01
        if (new_calledFromSales2) {
            console.log('vorher_x', get_production_order)

            Object.keys(fertigungsaufträge1).map( outerProduct => {
                Object.keys(fertigungsaufträge1[outerProduct]).map( number => {
                    // production order anpassen
                    get_production_order[outerProduct][number].production_order = fertigungsaufträge1[outerProduct][number][`menge${number}`]
                })
            })
            console.log('nacher', get_production_order)
        }

        var produkt_1_menge = get_production_order[1][1]['production_order']
        var produkt_2_menge = get_production_order[2][2]['production_order']
        var produkt_3_menge = get_production_order[3][3]['production_order']

        var produkt_1_anteil = produkt_1_menge/(produkt_1_menge+produkt_2_menge+produkt_3_menge)
        var produkt_2_anteil = produkt_2_menge/(produkt_1_menge+produkt_2_menge+produkt_3_menge)
        var produkt_3_anteil = produkt_3_menge/(produkt_1_menge+produkt_2_menge+produkt_3_menge)
        //newnew

        var verwendung_p1 = {
            1: { 21: 1, 24: 1, 27: 1 }, 26: { 44: 2, 47: 1, 48: 2 }, 51: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1, 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 50: { 24: 2, 25: 2 },
            4: { 35: 2, 36: 1, 52: 1, 53: 36 }, 10: { 32: 1, 39: 1 }, 49: { 24: 2, 25: 2 },
            7: { 35: 2, 37: 1, 38: 1, 52: 1, 53: 36 },
            13: { 32: 1, 39: 1 }, 18: { 28: 3, 32: 1, 59: 2 }
        }

        var verwendung_p2 = {
            2: { 22: 1, 24: 1, 27: 1 }, 26: { 44: 2 , 47: 1 , 48: 2  }, 56: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1 , 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 55: { 24: 2, 25: 2 },
            5: { 35: 2, 36: 1, 57: 1, 58: 36 }, 11: { 32: 1, 39: 1 }, 54: { 24: 2, 25: 2 }, 8: { 35: 2, 37: 1, 38: 1, 57: 1, 58: 36 },
            14: { 32: 1, 39: 1 }, 19: { 28: 4, 32: 1, 59: 2 }
        }

        var verwendung_p3 = {
            3: { 23: 1, 24: 1, 27: 1 }, 26: { 44: 2 , 47: 1 , 48: 2  }, 31: { 24: 1, 27: 1 },
            16: { 24: 1 , 28: 1 , 40: 1 , 41: 1 , 42: 2  },
            17: { 43: 1 , 44: 1 , 45: 1 , 46: 1  }, 30: { 24: 2, 25: 2 },
            6: { 35: 2, 36: 1, 33: 1, 34: 36 }, 12: { 32: 1, 39: 1 }, 29: { 24: 2, 25: 2 }, 9: { 35: 2, 37: 1, 38: 1, 33: 1, 34: 36 },
            15: { 32: 1, 39: 1 }, 20: { 28: 5, 32: 1, 59: 2 }
        }

        var verwendung = { 1: verwendung_p1, 2: verwendung_p2, 3: verwendung_p3 }

        var waiting_items_dict = {};
        var product
        for (product of (Object.keys(verwendung))) {
            var item
            console.log(product)
            for (item of Object.keys(verwendung[product])) {
                var corresponding_item = get_production_order[product][item][property]
                var subitem
                for (subitem of Object.keys(verwendung[product][item])) {
                    if (corresponding_item < 0) {
                        corresponding_item = 0
                    }
                    var waitings_items = Math.ceil(corresponding_item) * verwendung[product][item][subitem]
                    if (Object.keys(waiting_items_dict).includes(subitem.toString())) {
                        waiting_items_dict[subitem] = waiting_items_dict[subitem] + waitings_items
                    } else {
                        waiting_items_dict[subitem] = waitings_items
                    }
                }

            }
        }
        if (property == 'waiting_items') {
            this.setState({ waiting_purchase_items: waiting_items_dict })
        } else {
            localStorage.set('production_order', waiting_items_dict);
            this.setState({ production_order_purchase_items: waiting_items_dict })
        }
        return waiting_items_dict
    }

    declare_following_demand(prognose) {

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

        var period
        var demand_dict = {}
        for (period of Object.keys(prognose)) {
            var product
            var item_dict = {}
            for (product of Object.keys(prognose[period])) {
                var item
                for (item of Object.keys(verwendung[product])) {
                    if (Object.keys(item_dict).includes(item)) {
                        item_dict[item] = item_dict[item] + (verwendung[product][item] * prognose[period][product])
                    } else {
                        item_dict[item] = verwendung[product][item] * prognose[period][product]
                    }
                }
            }
            demand_dict[period] = item_dict
        }
        return demand_dict

    }

    declare_warehoue_range() {
        var normal_range = {
            21: 1.8, 22: 1.7, 23: 1.2, 24: 3.2, 25: 0.9, 27: 0.9, 28: 1.7, 32: 2.1, 33: 1.9, 34: 1.6,
            35: 2.2, 36: 1.2, 37: 1.5, 38: 1.7, 39: 1.5, 40: 1.7, 41: 0.9, 42: 1.2, 43: 2.0, 44: 1.0,
            45: 1.7, 46: 0.9, 47: 1.1, 48: 1.0, 52: 1.6, 53: 1.6, 57: 1.7, 58: 1.6, 59: 0.7
        }

        var deviation = {
            21: 0.4, 22: 0.4, 23: 0.2, 24: 0.3, 25: 0.2, 27: 0.2, 28: 0.4, 32: 0.5, 33: 0.5, 34: 0.3,
            35: 0.4, 36: 0.1, 37: 0.3, 38: 0.4, 39: 0.3, 40: 0.2, 41: 0.2, 42: 0.3, 43: 0.5, 44: 0.2,
            45: 0.3, 46: 0.3, 47: 0.1, 48: 0.2, 52: 0.4, 53: 0.2, 57: 0.3, 58: 0.5, 59: 0.2
        }

        var range_with_deviation = {}
        var item
        for (item of Object.keys(normal_range)) {
            var range_with_deviation_comma
            var range_with_deviation_item = normal_range[item] + deviation[item]
            //range_with_deviation_comma = (normal_range[item] + deviation[item] - Math.floor(normal_range[item] + deviation[item])).toFixed(2)
            // if (range_with_deviation_comma >= 0.8) {
            //     range_with_deviation_comma = 1
            // } else if (range_with_deviation_comma >= 0.6) {
            //     range_with_deviation_comma = 0.8
            // } else if (range_with_deviation_comma >= 0.4) {
            //     range_with_deviation_comma = 0.6
            // } else if (range_with_deviation_comma >= 0.2) {
            //     range_with_deviation_comma = 0.4
            // }
            // else {
            //     range_with_deviation_comma = 0.2
            // }
            //range_with_deviation[item] = range_with_deviation_comma + Math.floor(normal_range[item] + deviation[item])
            range_with_deviation[item] = range_with_deviation_item
        }
        var calculated_deviation = {}
        var item
        for (item of Object.keys(normal_range)) {
            calculated_deviation[item] = normal_range[item] + deviation[item] - Math.trunc(normal_range[item] + deviation[item])
        }

        var fast_range_dict = {}
        var item
        for (item of Object.keys(normal_range)) {
            var fast_range = {}
            var fast_range_comma
            fast_range = (normal_range[item] / 2)
            // fast_range_comma = (fast_range - Math.floor(fast_range)).toFixed(2)
            // if (fast_range_comma >= 0.8) {
            //     fast_range_comma = 1
            // } else if (fast_range_comma >= 0.6) {
            //     fast_range_comma = 0.8
            // } else if (fast_range_comma >= 0.4) {
            //     fast_range_comma = 0.6
            // } else if (fast_range_comma >= 0.2) {
            //     fast_range_comma = 0.4
            // }
            // else {
            //     fast_range_comma = 0.2
            // }
            // fast_range_dict[item] = fast_range_comma + Math.floor(fast_range)
            fast_range_dict[item] = fast_range
        }
        return { normal_range, deviation, range_with_deviation, fast_range_dict, calculated_deviation }
    }

    declare_discount_quantity() {
        var discount_quantity = {
            21: 300, 22: 300, 23: 300, 24: 6100, 25: 3600, 27: 1800, 28: 4500, 32: 2700, 33: 900, 34: 22000,
            35: 3600, 36: 900, 37: 900, 38: 300, 39: 1800, 40: 900, 41: 900, 42: 1800, 43: 2700, 44: 900,
            45: 900, 46: 900, 47: 900, 48: 1800, 52: 600, 53: 22000, 57: 600, 58: 22000, 59: 1800
        }
        return discount_quantity

    }

    get_warehousestock_by_purchase_items(xml) {
        if (typeof (xml) != 'string') {
            var discount = this.declare_discount_quantity()
            var warehousestock_dict = {}
            var ids
            for (ids of Object.keys(discount)) {
                warehousestock_dict[ids] = parseInt(xml.getElementsByTagName("article")[ids - 1].getAttribute("amount"));
            }
            return warehousestock_dict
        } else { return }

    }

    get_waitinglist_by_purchase_items(xml) {
        if (typeof (xml) != 'string') {
            var waitinglist_dict = {}
            var missingpart = xml.getElementsByTagName("waitingliststock")[0].getElementsByTagName("missingpart")
            var part
            for (part of missingpart) {
                var id = parseInt(part.getAttribute("id"))
                var item
                for (item of part.getElementsByTagName("waitinglist")) {
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

    merge_periods(production_order, prognose) {

        if (typeof (prognose) == 'undefined') { return }
        var following_demand = this.declare_following_demand(prognose);

        var merge_periods = {}
        merge_periods[1] = production_order
        var period
        for (period of Object.keys(following_demand)) {
            merge_periods[period] = following_demand[period]
        }
        this.setState({ using_demand: merge_periods })
        return merge_periods

    }

    calculate_warehousestock_after_using_demand(warehousestock, using_demand) {
        var parameter
        for (parameter of [warehousestock, using_demand]) {
            if (typeof (parameter) == 'undefined') { return }
        }
        var new_warehousestock = {}
        var period
        for (period of Object.keys(using_demand)) {
            var item
            var new_warehousestock_item = {}
            if (period == 1) {
                for (item of Object.keys(warehousestock)) {
                    new_warehousestock_item[item] = warehousestock[item] - using_demand[period][item]
                }
                new_warehousestock[period] = new_warehousestock_item
            } else {
                for (item of Object.keys(warehousestock)) {
                    new_warehousestock_item[item] = new_warehousestock[period - 1][item] - using_demand[period][item]
                }
                new_warehousestock[period] = new_warehousestock_item
            }
        }
        this.setState({ warehousestock_after_using_demand: new_warehousestock })
        return new_warehousestock
    }

    calculate_new_warehousestock(warehousestock, waiting_items, waiting_list) {
        var parameter
        for (parameter of [warehousestock, waiting_items, waiting_list]) { if (typeof (parameter) == 'undefined') { return } }
        var warehousestock_information = {
            "warehousestock": warehousestock,
            "waiting_items": waiting_items,
            "waiting_list": waiting_list
        }
        this.setState({ warehousestock_information: warehousestock_information })

        console.log("Wichtig_5", warehousestock_information)
        var new_warehousestock = {}
        var item
        for (item of Object.keys(warehousestock)) {
            new_warehousestock[item] = warehousestock[item] - waiting_items[item]
            if (Object.keys(waiting_list).includes(item)) {
                new_warehousestock[item] = new_warehousestock[item] - waiting_list[item]
            }
        }
        console.log("Wichtig_5", new_warehousestock)
        this.setState({ new_warehousestock: new_warehousestock })
        return new_warehousestock
    }

    calculate_available_amount(warehousestock, using_demand) {
        var parameter
        for (parameter of [warehousestock, using_demand]) {
            if (typeof (parameter) == 'undefined') { return }
        }
        var available_amount_period = {}

        var period
        for (period of Object.keys(warehousestock)) {
            var available_amount_item = {}
            var item
            for (item of Object.keys(warehousestock[period])) {
                if (warehousestock[period][item] >= 0) {
                    available_amount_item[item] = 1
                } else {
                    //available_amount_item[item]= Math.sqrt((warehousestock[period][item]/using_demand[period][item]))
                    available_amount_item[item] = 1 - Math.sqrt(Math.pow(warehousestock[period][item] / using_demand[period][item], 2))
                }
            }
            available_amount_period[period] = available_amount_item

        }
        this.setState({ available_amount: available_amount_period })
        return available_amount_period
    }

    calculate_order_type(range, available_amount) {
        var parameter
        for (parameter of [range, available_amount]) {
            if (typeof (parameter) == 'undefined') { return }
        }
        var item
        var bestellart = {}

        console.log(range)
        for (item of Object.keys(range['range_with_deviation'])) {
                if (Math.ceil(range['range_with_deviation'][item]) == 1) {

            if (available_amount[2][item] < 1) {
                    bestellart[item] = "Normal"
                }
                if (available_amount[1][item] < 1) {
                    bestellart[item] = "Normal"
                }
                if (available_amount[1][item] < range['calculated_deviation'][item]) {
                    bestellart[item] = "Eil"
                }


            }
            if (Math.ceil(range['range_with_deviation'][item]) == 2) {

                if (available_amount[3][item] < 1) {
                    bestellart[item] = "Normal"
                }
                if (available_amount[2][item] < 1) {
                    bestellart[item] = "Normal"
                }
                if (available_amount[2][item] < range['calculated_deviation'][item]) {
                    bestellart[item] = "Eil"
                }
                if (range['fast_range_dict'][item] <= 0.6 && available_amount[1][item] < 1) {
                    bestellart[item] = "Eil"
                }

            }
            if (Math.ceil(range['range_with_deviation'][item]) == 3) {

                if (available_amount[4][item] < 1) {
                    bestellart[item] = "Normal"
                }
                if (available_amount[3][item] < 1) {
                    bestellart[item] = "Normal"
                }
                if (available_amount[3][item] < range['calculated_deviation'][item]) {
                    bestellart[item] = "Eil"
                }
                if (range['fast_range_dict'][item] <= 1.6 && available_amount[2][item] < 1) {
                    bestellart[item] = "Eil"
                }
                if (range['fast_range_dict'][item] <= 0.6 && available_amount[1][item] < 1) {
                    bestellart[item] = "Eil"
                }

            }
            if (Math.ceil(range['range_with_deviation'][item]) == 4) {
                if (available_amount[4][item] < 1) {
                    bestellart[item] = "Normal"
                }
                if (available_amount[4][item] < range['calculated_deviation'][item]) {
                    bestellart[item] = "Eil"
                }
                if (range['fast_range_dict'][item] <= 2.6 && available_amount[3][item] < 1) {
                    bestellart[item] = "Eil"
                }
                if (range['fast_range_dict'][item] <= 1.6 && available_amount[2][item] < 1) {
                    bestellart[item] = "Eil"
                }
                if (range['fast_range_dict'][item] <= 0.6 && available_amount[1][item] < 1) {
                    bestellart[item] = "Eil"
                }


            }
        }
        return bestellart
    }


    calculate_order_amount(ranges, amount, order_type) {

        var discount = this.declare_discount_quantity()
        var parameter
        for (parameter of [ranges, amount, order_type]) {
            if (typeof (parameter) == 'undefined') { return }
        }
        var item
        var needed_amount_dict = {}
        for (item of Object.keys(order_type)) {
            if (order_type[item] == 'Eil' || order_type[item] == 'Normal') {
                var period
                for (period of Object.keys(amount)) {
                    if (amount[period][item] < 0) {
                        var menge
                        var ankunft
                        var opt = [24, 25, 27, 28, 32, 34, 35, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 53, 58, 59]

                        if (order_type[item] == 'Eil') {
                            ankunft = ranges['fast_range_dict'][item]
                            if (amount[period][item] * (-1) < discount[item] && opt.includes(parseInt(item))) {
                                menge = discount[item]
                            }
                            else {
                                menge = Math.ceil(amount[period][item] * (-1.5))
                            }
                        } else {
                            ankunft = ranges['range_with_deviation'][item]
                            if (amount[period][item] * (-1) < discount[item] && opt.includes(parseInt(item))) {
                                menge = discount[item]
                            }
                            else {
                                menge = Math.ceil(amount[period][item] * (-1.5))
                            }
                        }

                        needed_amount_dict[item] = {
                            'ankunft': ankunft,
                            'menge': menge,
                            'bestellart': order_type[item]
                        }
                        break;
                    }
                }
            }
        }
        return needed_amount_dict
    }

    calculate_future_movement(xml_data, ranges) {
        if (typeof (xml_data) == 'string') { return }
        var period = xml_data.getElementsByTagName('results')[0].getAttribute('period')
        var item
        var alle_kaufteile = [21,22, 23, 24, 25, 27, 28, 32, 33, 34, 35, 36, 37, 38,39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 52, 53, 57, 58, 59]
        var future_movement = {}
        var a
        for (a of alle_kaufteile){
            future_movement[a] = {}
        }
        for (item of xml_data.getElementsByTagName('futureinwardstockmovement')[0].getElementsByTagName('order')) {
            //abzüglich der simulierten Periode
            var id = item.getAttribute('article')
            var amount = item.getAttribute('amount')
            if (item.getAttribute('mode') == 5) {
                var anmerkung = "normal"
                var range = ranges['range_with_deviation'][id]
            } else if (item.getAttribute('mode') == 4) {
                var range = ranges['fast_range_dict'][id]
                var anmerkung = "eil"
            }
            //new stuff
            else if (item.getAttribute('mode') == 3) {
                // Lieferzeit
                var range = ranges['normal_range'][id]*0.2
                var anmerkung = "jit"
            }
            else if (item.getAttribute('mode') == 2) {
                // Lieferzeit + Abweichung + Bearbeitungszeit + Abweichung
                var range = ranges['normal_range'][id]*1.3+ranges['deviation'][id]*2+3+0.5
                var anmerkung = "jit"
            }
            else if (item.getAttribute('mode') == 1) {
                // Lieferzeit + Abweichung + Bearbeitungszeit + Abweichung
                var range = ranges['normal_range'][id]*0.4+1+0.1
                var anmerkung = "jit"
            }
            //end stuff
            var passed = period - item.getAttribute('orderperiod') + 1
            if( Object.keys(future_movement[id]).length === 0){

                var ankunft = (range - passed + 0.2).toFixed(2)

                future_movement[id][ankunft.toString()[0]] = {
                    // 0.2 ?!
                    "ankunft": (range - passed + 0.2).toFixed(2),
                    "bestellart": anmerkung,
                    "menge": amount
                }
            }
            else{

                var ankunft = (range - passed + 0.2).toFixed(2)

                future_movement[id][ankunft.toString()[0]] = {
                    // 0.2 ?!
                    "ankunft": ankunft,
                    "bestellart": anmerkung,
                    "menge": amount
                }

            }

            }

        console.log("auchwichtig",future_movement)
        Object.keys(future_movement).map( number => {
            Object.keys(future_movement[number]).map( period => {
                Object.keys(future_movement[number][period]).map( keys => {
                    if (keys == "menge") {
                        future_movement[number][period][keys] = parseInt(future_movement[number][period][keys])
                    }
                    if (keys == "ankunft") {
                        future_movement[number][period][keys] = parseFloat(future_movement[number][period][keys])
                    }
                })
            })
        })
        this.setState({ future_movement: future_movement })
        return future_movement
    }

    add_stock_movement(warehousestock, movement) {
        var parameter
        for (parameter of [warehousestock, movement]) {
            if (typeof (parameter) == 'undefined') { return }
        }
        var new_warehousestock = {}
        var item
        for (item of Object.keys(warehousestock)) {
            new_warehousestock[item] = warehousestock[item]
        }
        var item
        for (item of Object.keys(movement)) {
            var warehousestock_movement = parseInt(movement[item]['menge'])
            if (Math.ceil(movement[item]['ankunft']) == 1) {
                new_warehousestock[1][item] = new_warehousestock[1][item] + warehousestock_movement
                new_warehousestock[2][item] = new_warehousestock[2][item] + warehousestock_movement
                new_warehousestock[3][item] = new_warehousestock[3][item] + warehousestock_movement
                new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
            }
            if (Math.ceil(movement[item]['ankunft']) == 2) {
                new_warehousestock[2][item] = new_warehousestock[2][item] + warehousestock_movement
                new_warehousestock[3][item] = new_warehousestock[3][item] + warehousestock_movement
                new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
            }
            if (Math.ceil(movement[item]['ankunft']) == 3) {
                new_warehousestock[3][item] = new_warehousestock[3][item] + warehousestock_movement
                new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
            }
            if (Math.ceil(movement[item]['ankunft']) == 4) {
                new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
            }
        }
        this.setState({ warehousestock_after_movement: new_warehousestock })
        return new_warehousestock
    }

    add_stock_movement_from_tool(warehousestock, movement) {
        console.log("zugang",movement)
        var parameter
        for (parameter of [warehousestock, movement]) {
            if (typeof (parameter) == 'undefined') { return }
        }
        var new_warehousestock = {}
        var item
        for (item of Object.keys(warehousestock)) {
            new_warehousestock[item] = warehousestock[item]
        }
        var item
        for (item of Object.keys(movement)) {

            if(Object.keys(movement[item]).length !== 0 )
            {
                var lieferung
                for(lieferung of Object.keys(movement[item])){
                    lieferung = parseInt(lieferung)

                var warehousestock_movement = parseInt(movement[item][lieferung]['menge'])
                if (Math.trunc(movement[item][lieferung]['ankunft']) == 0) {
                    new_warehousestock[1][item] = new_warehousestock[1][item] + warehousestock_movement
                    new_warehousestock[2][item] = new_warehousestock[2][item] + warehousestock_movement
                    new_warehousestock[3][item] = new_warehousestock[3][item] + warehousestock_movement
                    new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
                }
                if (Math.trunc(movement[item][lieferung]['ankunft']) == 1) {
                    new_warehousestock[2][item] = new_warehousestock[2][item] + warehousestock_movement
                    new_warehousestock[3][item] = new_warehousestock[3][item] + warehousestock_movement
                    new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
                }
                if (Math.trunc(movement[item][lieferung]['ankunft']) == 2) {
                    new_warehousestock[3][item] = new_warehousestock[3][item] + warehousestock_movement
                    new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
                }
                if (Math.trunc(movement[item][lieferung]['ankunft']) == 3) {
                    new_warehousestock[4][item] = new_warehousestock[4][item] + warehousestock_movement
                }
                }

            }

        }
        this.setState({ warehousestock_after_movement: new_warehousestock })
        return new_warehousestock
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    calculate_orders(ranges, available_amount, warehousestock_after_movement, warehousestock_after_using_demand, merge_periods) {
        console.log("super_wichtig",ranges, available_amount, warehousestock_after_movement, warehousestock_after_using_demand, merge_periods)
        var erfasste_lieferungen = {}
        for (var i = 1; i < 5; i++) {
            var order_type = this.calculate_order_type(ranges, available_amount)
            console.log("Bestellart", i, order_type)
            if (this.isEmpty(order_type)) {
                break
            }
            var order_amount = this.calculate_order_amount(ranges, warehousestock_after_movement, order_type)
            console.log("erfasste Lieferungen", i, order_amount)
            // todo andrej
            erfasste_lieferungen[i] = order_amount
            var warehousestock_after_movement = this.add_stock_movement(warehousestock_after_using_demand, order_amount)
            console.log("Bedarf(nach erfassten Lieferungen)", warehousestock_after_movement)
            var available_amount = this.calculate_available_amount(warehousestock_after_movement, merge_periods)
            console.log("vorhandene Menge", available_amount)
        }

        return erfasste_lieferungen
    }


    // ##################### Bestellungen Ende

    render() {
        // localStorage.clear()
        const {  sales1, sales2, allowWeiter } = this.state;
        let {
            LagerbestandE1,
            LagerbestandE2,
            LagerbestandE3,
            LagerbestandP1,
            LagerbestandP2,
            LagerbestandP3,
            aktuellerLagerbestandP1,
            aktuellerLagerbestandP2,
            aktuellerLagerbestandP3,
            direkt_mengep1,
            direkt_mengep2,
            direkt_mengep3,
            direkt_preisp1,
            direkt_preisp2,
            direkt_preisp3,
            direkt_strafep1,
            direkt_strafep2,
            direkt_strafep3,
        } = sales2;

        // alert(aktuellerLagerbestandP1)

        const sales1_ = localStorage.get('sales1');
        const sales2_ = localStorage.get('sales2');

        return (
<div style={{ padding: '30px', margin: 'auto', width: '1400px' , position:'relative', right: '150px' ,border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'}}>

<table style={{ backgroundColor:'#c1c1bf',margin:'auto' }}>
<tbody style={{ border: '1px solid#f0f0f0' }}>

  <tr style={{ border: '1px solid#f0f0f0' }}>
    <th style={{ border: '1px solid#f0f0f0' }} rowspan="2"></th>
      <th style={{border: '1px solid#f0f0f0'}} rowSpan="2">{this.props.t('lagerbestand.stockvalueactually')}</th>
      <th style={{border: '1px solid#f0f0f0'}} colSpan="2">{this.props.t('lagerbestand.safetystock')}</th>
      <th style={{border: '1px solid#f0f0f0'}} colSpan="3">{this.props.t('lagerbestand.directsale')}</th>
  </tr>
  <tr style={{ border: '1px solid#f0f0f0' }}>
      <td style={{ border: '1px solid#f0f0f0' }} >{this.props.t('lagerbestand.products')}</td>
      <td style={{ border: '1px solid#f0f0f0' }} >{this.props.t('lagerbestand.manufactures')}</td>
      <td style={{ border: '1px solid#f0f0f0' }} >{this.props.t('lagerbestand.amount')}</td>
      <td style={{ border: '1px solid#f0f0f0' }} >{this.props.t('lagerbestand.price')}</td>
      <td style={{ border: '1px solid#f0f0f0' }} >{this.props.t('lagerbestand.penalty')}</td>
  </tr>
  <tr style={{ border: '1px solid#f0f0f0' }}>
    <td style={{ border: '1px solid#f0f0f0' }} >p1</td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="text"
                            disabled='true'
                            placeholder="upload xml"
                            autoComplete='off'
                            min='0' maxLength="4"  name="aktuellerLagerbestandP1" step="any"
                            value={aktuellerLagerbestandP1} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="LagerbestandP1" step="50"
                            value={LagerbestandP1} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE1" step="50"
                                value={LagerbestandE1} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_mengep1" step="50"
                            value={direkt_mengep1} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_preisp1" step="50"
                            value={direkt_preisp1} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_strafep1" step="50"
                            value={direkt_strafep1} onChange={this.handleChange} />
    </td>
  </tr>
  <tr style={{ border: '1px solid#f0f0f0' }}>
    <td style={{ border: '1px solid#f0f0f0' }} >p2</td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            disabled={true}
                            type="number"
                            placeholder="upload xml"
                            autoComplete='off'
                            min='0' maxLength="4"  name="aktuellerLagerbestandP2" step="50"
                            value={aktuellerLagerbestandP2} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="LagerbestandP2" step="50"
                            value={LagerbestandP2} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE2" step="50"
                                value={LagerbestandE2} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
                <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_mengep2" step="50"
                            value={direkt_mengep2} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
                <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_preisp2" step="50"
                            value={direkt_preisp2} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
                <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_strafep2" step="50"
                            value={direkt_strafep2} onChange={this.handleChange} />
    </td>
  </tr>
  <tr style={{ border: '1px solid#f0f0f0' }}>
    <td style={{ border: '1px solid#f0f0f0' }} >p3</td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            disabled={true}
                            type="number"
                            autoComplete='off'
                            placeholder="upload xml"
                            min='0' maxLength="4"  name="aktuellerLagerbestandP3" step="50"
                            value={aktuellerLagerbestandP3} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="LagerbestandP3" step="50"
                            value={LagerbestandP3} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
        <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE3" step="50"
                                value={LagerbestandE3} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
            <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_mengep3" step="50"
                            value={direkt_mengep3} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
            <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_preisp3" step="50"
                            value={direkt_preisp3} onChange={this.handleChange} />
    </td>
    <td style={{ border: '1px solid#f0f0f0' }} >
            <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="direkt_strafep3" step="50"
                            value={direkt_strafep3} onChange={this.handleChange} />
    </td>
  </tr>
</tbody>
</table>

                {/* <table class="tg"  style={{backgroundColor:'#c1c1bf',margin:'auto' }} >
                    <tbody style={{ border: '1px solid#f0f0f0' }}>
                <tr >
                    <th style={{padding:'20px'}} class="tg-cly1"></th>
                    <th style={{padding:'20px'}} class="tg-cly1">
                        {this.props.t('lagerbestand.lagerbestandE')}
                    </th>
                    <th style={{padding:'20px 25px 20px 20px'}} class="tg-0lax">
                        {this.props.t('lagerbestand.lagerbestandP')}
                    </th>
                </tr>
                <tr>
                    <td style={{padding:'20px'}} class="tg-cly1">P1</td>
                    <td style={{padding:'20px'}} class="tg-cly1">
                        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number"
                            autoComplete='off'
                            min='0' maxLength="4"  name="LagerbestandP1" step="50"
                            value={LagerbestandP1} onChange={this.handleChange} />
                    </td>
                    <td style={{padding:'20px 25px 20px 20px'}} class="tg-0lax">
                        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE1" step="50"
                            value={LagerbestandE1} onChange={this.handleChange} />
                    </td>
                </tr>
                <tr>
                    <td style={{padding:'20px'}} class="tg-cly1">P2</td>
                    <td style={{padding:'20px 25px 20px 20px'}} class="tg-cly1">
                        <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandP2" step="50"
                                value={LagerbestandP2} onChange={this.handleChange} />
                    </td>
                    <td style={{padding:'20px'}} class="tg-0lax">
                        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE2" step="50"
                            value={LagerbestandE2} onChange={this.handleChange} />
                    </td>
                </tr>
                <tr>
                    <td style={{padding:'20px'}} class="tg-0lax">P3</td>
                    <td style={{padding:'20px'}} class="tg-0lax">
                        <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandP3" step="50"
                                value={LagerbestandP3} onChange={this.handleChange} />
                    </td>
                    <td style={{padding:'20px 25px 20px 20px'}} class="tg-0lax">
                        <input
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE3" step="50"
                            value={LagerbestandE3} onChange={this.handleChange} />
                    </td>
                </tr>
                </tbody>
                </table> */}

<div style={{
    'background': 'rgb(193, 193, 191)',
    'padding': '25px',
    borderRadius: '5px',
    border: '1px solid white',
    marginTop: '30px'}}>
            <label>
            {this.props.t('lagerbestand.uploadfile')}

            <input
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.setParams}
                style={{padding: '5px'}}
                type="file"
                ref={input => { this.App = input; }} />
            </label>
            <br />
            <button style={{
                background: 'rgb(250, 149, 129)',
                border: '2px solid ghostwhite',
                color: 'black ',
                opacity: 0.67,
            }}
                onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     id='bestätigenButton'
                     onClick={this.dispo_function_twice}
                     type="submit">
                {this.props.t('lagerbestand.confirmbutton')}
            </button>
            { console.log('meh' , this.state.input)}
            {  this.state.input && (
                <a style={{
                    'padding': '2px 10px 2px 10px',
                    'border': '2px solid white',
                    'margin': '0 0 0 15px',
                }}href={this.state.input} download="input.xml">download</a>
            )}
</div>


<Button onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{  margin: '5px 0 0 0 ' ,
    background: 'rgb(250, 149, 129)',
      border: '2px solid ghostwhite',
      color: 'ghostwhite',
      position: 'relative',
      top: '12px'
  }}>

    <Link style={{ color: 'ghostwhite' }}to='/Sales1' >
        {this.props.t('lagerbestand.backbutton')}
    </Link>

</Button>

{/* { sales2_ && <Button onFocus={ this.handleFocus} onBlur={this.handleBlur}
onClick={this.handleReset}
style={{  margin: '5px 0 0 0 ' ,
    background: 'rgb(250, 149, 129)',
      border: '2px solid ghostwhite',
      color: 'ghostwhite',
      position: 'relative',
      top: '12px',
      marginLeft: '10px',

  }}>

      reset

</Button> } */}

{ allowWeiter && (
    <Button onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{  margin: '5px 0 0 0 ' ,
        background: 'rgb(250, 149, 129)',
        border: '2px solid ghostwhite',
        color: 'ghostwhite',
        position: 'relative',
        top: '12px',
        marginLeft: '10px',
    }}>

        <Link style={{ color: 'ghostwhite' }}to='/Fertigungsaufträge' >
            {this.props.t('lagerbestand.nextbutton')}
        </Link>

    </Button>

)}

            </div>
        )
    }
}


export default translate(Sales2);
