// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import localStorage from 'local-storage';
import Sales from './Sales2.css'
import xmlConvert from 'xml-js';

import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
 
class Sales2 extends Component {
    state = {
        allowBestätigen: false,
        allowWeiter: false,
        sales2: {

        }
    }

    handleChange = (evt) => {
        if (evt.target.value > 100 ) evt.target.value = 100;
		let { sales2 } = this.state;
        sales2[evt.target.name] = parseInt(evt.target.value);
        console.log('lolo');
        console.log(typeof(parseInt(evt.target.value)))
		this.setState({ sales2: sales2 })
		localStorage.set('sales2', sales2);
    }
    
	handleReset = (e) => {
		e.preventDefault();
        const sales2_safe = localStorage.get('sales2_safe');
		this.setState({ sales2: sales2_safe })
    }
    
//     componentWillUnmount(){
    
//   }

	componentDidMount() {
        const { calledFromSales2 } = this.props;
        if ( !calledFromSales2) document.getElementById('Sales2').childNodes[0].setAttribute('style', 'color:darkred;  ')



        // getting xml 
        const text = localStorage.get('xml')
        var parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        this.setState({ xml : xml })

        // allow weiter
        const allowWeiter = localStorage.get('bestellungen')
        if ( allowWeiter ) this.setState({allowWeiter: true})


        const sales1 = localStorage.get('sales1');
        const sales2 = localStorage.get('sales2');

        console.log('hallo')
        console.log(sales1)
        
        if ( sales1 !== null ) {
            // Übernehme Vertriebswunsch als Lagerbestand für E, als erste Innitierung. 
            let { n1_p1 , n1_p2, n1_p3 } = sales1;
            if ( n1_p1 > 100 ) n1_p1 = 100;
            if ( n1_p2 > 100 ) n1_p2 = 100;
            if ( n1_p3 > 100 ) n1_p3 = 100;
            

            const firstStateSales2 = {
                LagerbestandP1: n1_p1,
                LagerbestandP2:n1_p2,
                LagerbestandP3:n1_p3,
                LagerbestandE1: Math.ceil(n1_p1 * 0.75 ),
                LagerbestandE2: Math.ceil(n1_p2 * 0.75 ),
                LagerbestandE3: Math.ceil(n1_p3 * 0.75 ),
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

            sales2.LagerbestandE1 = Math.ceil(n1_p1 * 0.75 );
            sales2.LagerbestandE2 = Math.ceil(n1_p2 * 0.75 );
            sales2.LagerbestandE3 =Math.ceil( n1_p3 * 0.75 );

            this.setState({ sales2: sales2 })
            localStorage.set('sales2_safe', sales2)
        }
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
                console.log('text');
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
                let periode = xmlDoc.getElementsByTagName('results')[0].getAttribute('period');
                localStorage.set(`periode${periode}`, file1)
                console.log(xmlDoc);
    
                console.log('birne')
                file1 = xmlConvert.json2xml(file1);
    
    
               
    
                scope.setState({xml: xmlDoc})
    
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
        const { calledFromSales2 } = this.props;
        if ( calledFromSales2 ) this.dispo_function(ignore);
    }

    //notwendige Eingaben deklarieren
     create_xml(params, orders, production, hours) {
        delete hours[5];

        var parameter
        for (parameter of [params, orders, production, hours])
            if (typeof (parameter) == 'string') { return }

        var doc = document.implementation.createDocument("", "", null);
        var input = doc.createElement("input");

        var qualitycontrol = doc.createElement("qualitycontrol");
        qualitycontrol.setAttribute("type", "no");
        qualitycontrol.setAttribute("losequantity", "0");
        qualitycontrol.setAttribute("delay", "0");

        var sellwish = doc.createElement("sellwish");
        var product
        for (product of Object.keys(params['sales_order'])) {
            var item = doc.createElement("item");
            item.setAttribute("article", product.toString());
            item.setAttribute("quantity", params['sales_order'][product].toString());
            sellwish.appendChild(item)
        }

        var selldirect = doc.createElement("selldirect");
        var product
        for (product of Object.keys(params['sales_order'])) {
            var item = doc.createElement("item");
            item.setAttribute("article", product.toString());
            item.setAttribute("quantity", "0");
            item.setAttribute("price", "0.0");
            item.setAttribute("penalty", "0");
            selldirect.appendChild(item)
        }

        var productionlist = doc.createElement("productionlist");
        var order
        //var reihenfolge = [18,19,20,13,11,14,15,7,8,9,49,54,29,10,12,4,5,6,50,55,30,16,17,51,56,31,26,1,2,3]
        //var reihenfolge = [4,5,6,7,8,9,18,19,20,10,11,12,13,14,15,16,17,26,49,54,29,50,55,30,51,56,31,1,2,3]
        var reihenfolge = [16,17,26,13,18,7,10,4,49,50,51,1,14,19,8,11,5,54,55,56,2,15,20,9,12,6,29,30,31,3]
        for (order of reihenfolge) {
            var item = doc.createElement("production");
            item.setAttribute("article", order.toString());
            if (production[order] <= 0) {
                continue
            } else {
                var amount = Math.ceil(production[order])
            }
            item.setAttribute("quantity", amount.toString());
            productionlist.appendChild(item)
        }

        var orderlist = doc.createElement("orderlist");
        var order_i
        for (order_i of Object.keys(orders)) {
            var item = doc.createElement("order");
            item.setAttribute("article", order_i.toString());
            item.setAttribute("quantity", orders[order_i]['menge'].toString());
            if (orders[order_i]['bestellart'] == "Eil") { var art = 4 } else { var art = 5 }
            item.setAttribute("modus", art.toString());
            orderlist.appendChild(item)

        }

        var workingtimelist = doc.createElement("workingtimelist")
        var workstation
        for (workstation of Object.keys(hours)) {
            console.log('bam')
            console.log(workstation);
            var item = doc.createElement("workingtime");
            item.setAttribute("station", workstation.toString());
            if (hours[workstation][`anzahl_Schichten${workstation}`] == 1) {
                var shift = 1
            } else if (hours[workstation][`anzahl_Schichten${workstation}`] == 2) {
                var shift = 2
            } else {
                var shift = 3
            }
            item.setAttribute("shift", shift.toString());
            item.setAttribute("overtime", hours[workstation][`überstunden${workstation}`].toString());
            workingtimelist.appendChild(item)
        }

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

declare_params() {
        const sales1 = localStorage.get('sales1');


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
        this.setState({ params: obj })
        localStorage.set('sales2_output', obj);
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

    handleFocus = e => {
        e.target.style.outline = '3px solid rgb(250, 149, 129)'
      }
    
      handleBlur = e => {
        e.target.style.outline = ''
      }

    //     //Black Box Magic
    dispo_function = (ignore) => {

        if ( ignore ) { 
            if ( this.state.allowBestätigen && document.getElementById('bestätigenButton')) {
                document.getElementById('bestätigenButton').style.outline = '2px solid red';
                let invalidXmlMessage = document.createElement('div');
                invalidXmlMessage.setAttribute('style','position:absolute; color:red; font-size:12px;')
                invalidXmlMessage.setAttribute('id',2000)
                invalidXmlMessage.innerText = 'please upload a xml file'
                document.getElementById('bestätigenButton').parentElement.appendChild(invalidXmlMessage);
    
    
                setTimeout(() => {
                    if( document.getElementById('bestätigenButton')) {
                        document.getElementById('bestätigenButton').parentElement.removeChild(document.getElementById(2000))
    
                        document.getElementById('bestätigenButton').style.outline = '';
                    }
                },2000)
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
        document.getElementById('Arbeitszeiten').style.display = '';
        document.getElementById('Bestellungen').style.display = '';
        document.getElementById('Fertigungsaufträge').style.display = '';
        this.setState({ allowWeiter: true})

        let params = localStorage.get('sales2_output');
        const { LagerbestandE1, LagerbestandE2, LagerbestandE3, LagerbestandP1, LagerbestandP2, LagerbestandP3 } = this.state.sales2;
        var sales2_planned_p_stock = { 1: LagerbestandP1, 2: LagerbestandP2, 3: LagerbestandP3};
        var sales2_planned_e_stock = { 1: LagerbestandE1, 2: LagerbestandE2, 3: LagerbestandE3}; 
        params.planned_p_stock = sales2_planned_p_stock;
        params.planned_e_stock = sales2_planned_e_stock;

        // const { xml } = this.state;

        const { xml } = this.state;

        console.log('pepe')
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
        localStorage.set('fertigungsaufträge', theRealState)

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
        console.log(new_dispo)
        console.log("Kapazitätsprogramm", working_hours)
        //Lagerbestand nach erhaltenen Bestellungen
        var warehousestock_after_movement = this.add_stock_movement(warehousestock_after_using_demand, future_movement)
        console.log("Lagermenge(nach Lieferung)", warehousestock_after_movement)
        //vorhandene Menge (%) 
        var available_amount = this.calculate_available_amount(warehousestock_after_movement, merge_periods)
        console.log("vorhandene Menge", available_amount)
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

            let überstunden = `überstunden${workstation}`;
            let anzahl_Schichten = `anzahl_Schichten${workstation}`
            let nicht_produziert = `nicht_produziert${workstation}`

            working_hours_dict[workstation] = {
                [überstunden]: working_hours,
                [anzahl_Schichten]: schichten,
                [nicht_produziert]: anmerkung
            }
        }
        this.setState({ capacity_programm: working_hours_dict })
        console.log('Arbeitszeiten')
        console.log(working_hours_dict);
        this.setState({ capacity_programm: working_hours_dict })
        localStorage.set('arbeitszeiten', working_hours_dict);
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


    // ##################### Bestellungen                                                       Bestellungen start
     ///////////////////////////////////////////////////////////////////////////////////
     get_needed_purchase_items_by(xml, params, property, dispo_dict) {
        var parameter
        for (parameter of [xml, params]) {
            if (typeof (parameter) == 'string') { return }
        }
        // wichtig vital change
        // var dispo_dict = this.dispo_function(xml, params)
        var verwendung_p1 = {
            1: { 21: 1, 24: 1, 27: 1 }, 26: { 44: 2 / 3, 47: 1 / 3, 48: 2 / 3 }, 51: { 24: 1, 27: 1 },
            16: { 24: 1 / 3, 28: 1 / 3, 40: 1 / 3, 41: 1 / 3, 42: 2 / 3 },
            17: { 43: 1 / 3, 44: 1 / 3, 45: 1 / 3, 46: 1 / 3 }, 50: { 24: 2, 25: 2 },
            4: { 35: 2, 36: 1, 52: 1, 53: 36 }, 10: { 32: 1, 39: 1 }, 49: { 24: 2, 25: 2 },
            7: { 35: 2, 37: 1, 38: 1, 52: 1, 53: 36 },
            13: { 32: 1, 39: 1 }, 18: { 28: 3, 32: 1, 59: 2 }
        }

        var verwendung_p2 = {
            2: { 22: 1, 24: 1, 27: 1 }, 26: { 44: 2 / 3, 47: 1 / 3, 48: 2 / 3 }, 56: { 24: 1, 27: 1 },
            16: { 24: 1 / 3, 28: 1 / 3, 40: 1 / 3, 41: 1 / 3, 42: 2 / 3 }, 17: { 43: 1 / 3, 44: 1 / 3, 45: 1 / 3, 46: 1 / 3 }, 55: { 24: 2, 25: 2 },
            5: { 35: 2, 36: 1, 57: 1, 58: 36 }, 11: { 32: 1, 39: 1 }, 54: { 24: 2, 25: 2 }, 8: { 35: 2, 37: 1, 38: 1, 57: 1, 58: 36 },
            14: { 32: 1, 39: 1 }, 19: { 28: 4, 32: 1, 59: 2 }
        }

        var verwendung_p3 = {
            3: { 23: 1, 24: 1, 27: 1 }, 26: { 44: 2 / 3, 47: 1 / 3, 48: 2 / 3 }, 31: { 24: 1, 27: 1 },
            16: { 24: 1 / 3, 28: 1 / 3, 40: 1 / 3, 41: 1 / 3, 42: 2 / 3 }, 17: { 43: 1 / 3, 44: 1 / 3, 45: 1 / 3, 46: 1 / 3 }, 30: { 24: 2, 25: 2 },
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
                var corresponding_item = dispo_dict[item][property]
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
                    console.log(item, ":", Math.ceil(corresponding_item), "*", verwendung[product][item][subitem], "=", waitings_items, "K", subitem)
                }

            }
        }
        if (property == 'waiting_items') {
            this.setState({ waiting_purchase_items: waiting_items_dict })
        } else {
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

        var new_warehousestock = {}
        var item
        for (item of Object.keys(warehousestock)) {
            new_warehousestock[item] = warehousestock[item] - waiting_items[item]
            if (Object.keys(waiting_list).includes(item)) {
                new_warehousestock[item] = new_warehousestock[item] - waiting_list[item]
            }
        }
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
        var future_movement = {}
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
            var passed = period - item.getAttribute('orderperiod') + 1
            future_movement[id] = {
                // 0.2 ?!
                "ankunft": (range - passed + 0.2).toFixed(2),
                "bestellart": anmerkung,
                "menge": amount
            }
        }
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

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    calculate_orders(ranges, available_amount, warehousestock_after_movement, warehousestock_after_using_demand, merge_periods) {
        var erfasste_lieferungen = {}
        for (var i = 1; i < 5; i++) {
            var order_type = this.calculate_order_type(ranges, available_amount)
            console.log("Bestellart", i, order_type)
            if (this.isEmpty(order_type)) {
                break
            }
            var order_amount = this.calculate_order_amount(ranges, warehousestock_after_movement, order_type)
            console.log("erfasste Lieferungen", i, order_amount)
            erfasste_lieferungen[i] = order_amount
            var warehousestock_after_movement = this.add_stock_movement(warehousestock_after_using_demand, order_amount)
            console.log("Bedarf(nach erfassten Lieferungen)", warehousestock_after_movement)
            var available_amount = this.calculate_available_amount(warehousestock_after_movement, merge_periods)
            console.log("vorhandene Menge", available_amount)
        }

        return erfasste_lieferungen
    }

    // ##################### Bestellungen Ende                                                          Bestellungen Ende   ########################


    render() {
        const { sales1, sales2, allowWeiter } = this.state;

        const { 
            LagerbestandE1, 
            LagerbestandE2,
            LagerbestandE3,
            LagerbestandP1,
            LagerbestandP2,
            LagerbestandP3
        } = sales2;

        const sales1_ = localStorage.get('sales1');
        const sales2_ = localStorage.get('sales2');

        return (
<div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'}}>

                <table class="tg"  style={{backgroundColor:'#c1c1bf',margin:'auto' }} >
                    <tbody style={{ border: '1px solid#f0f0f0' }}>
                {/* <div style={{ border: '1px solid#8bacbd'}}>  */}
                <tr>
                    <th style={{padding:'20px'}} class="tg-cly1"></th>
                    <th style={{padding:'20px'}} class="tg-cly1">Lagerbestand P.</th>
                    <th style={{padding:'20px 25px 20px 20px'}} class="tg-0lax">Lagerbestand E.</th>
                </tr>
                <tr>
                    <td style={{padding:'20px'}} class="tg-cly1">P1</td>
                    <td style={{padding:'20px'}} class="tg-cly1"> <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandP1" step="50" value={LagerbestandP1} onChange={this.handleChange} /> </td>
                    <td style={{padding:'20px 25px 20px 20px'}} class="tg-0lax"> <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE1" step="50" value={LagerbestandE1} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td style={{padding:'20px'}} class="tg-cly1">P2</td>
                    <td style={{padding:'20px 25px 20px 20px'}} class="tg-cly1"> <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandP2" step="50" value={LagerbestandP2} onChange={this.handleChange} /></td>
                    <td style={{padding:'20px'}} class="tg-0lax"> <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE2" step="50" value={LagerbestandE2} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td style={{padding:'20px'}} class="tg-0lax">P3</td>
                    <td style={{padding:'20px'}} class="tg-0lax"> <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandP3" step="50" value={LagerbestandP3} onChange={this.handleChange} /></td>
                    <td style={{padding:'20px 25px 20px 20px'}} class="tg-0lax"> <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  type="number" autoComplete='off'  min='0' maxLength="4"  name="LagerbestandE3" step="50" value={LagerbestandE3} onChange={this.handleChange} /></td>
                </tr>
                {/* </div> */}
                </tbody>
                </table>

<div style={{ 
    'background': 'rgb(193, 193, 191)',
    'padding': '25px',
    borderRadius: '5px',
    border: '1px solid white',
    marginTop: '30px'}}> 
            <label>
            Upload file:
            <input  onFocus={this.handleFocus} onBlur={this.handleBlur}  onChange={this.setParams} style={{padding: '5px'}} type="file" ref={input => { this.App = input; }} />
            </label>
            <br />
            <button  style={{
                																background: 'rgb(250, 149, 129)',
                                                                                border: '2px solid ghostwhite',
                                                                                color: 'black ',
                                                                                opacity: 0.67,
            }}
                onFocus={this.handleFocus} onBlur={this.handleBlur}  id= 'bestätigenButton' onClick={this.dispo_function} type="submit"> Bestätigen </button>
            { console.log('meh' , this.state.input)}
            {  this.state.input && (
                <a style={{
                    'padding': '2px 10px 2px 10px',
                    'border': '2px solid white',
                    'margin': '0 0 0 15px',
                }}href={this.state.input} download="input.xml">download</a>
            )}
</div>


<Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{  margin: '5px 0 0 0 ' ,
    background: 'rgb(250, 149, 129)',
      border: '2px solid ghostwhite',
      color: 'ghostwhite',
      position: 'relative',
      top: '12px'
  }}> 
													
    <Link style={{ color: 'ghostwhite' }}to='/Sales1' >
      zurück
    </Link>
													
</Button>

{ sales2_ && <Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  
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
													
</Button> }

{ allowWeiter && (
    <Button className='myButtons backgroundColor1'    onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{  margin: '5px 0 0 0 ' ,
        background: 'rgb(250, 149, 129)',
        border: '2px solid ghostwhite',
        color: 'ghostwhite',
        position: 'relative',
        top: '12px',
        marginLeft: '10px',
    }}> 
                                                        
        <Link style={{ color: 'ghostwhite' }}to='/Bestellungen' >
        weiter
        </Link>
                                                        
    </Button>

)}

            </div>
        )
    }
}


export default Sales2;