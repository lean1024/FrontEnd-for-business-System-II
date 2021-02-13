// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import localStorage from 'local-storage';
import { Button, input, Modal } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { translate } from 'react-multi-lang'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Sales2 from './Sales2';

import './Reihenfolge.css'


class Reihenfolge extends Component {
	state = {
        newArtikel: '',
        newMenge:'',
        displayProdukt1 : false,
        displayProdukt2 : false,
        displayProdukt3 : false,
        showSplitting: {},

    }

// a little function to help us with reordering the result
reorder = (list, startIndex, endIndex) => {
    let { Reihenfolge } = this.state;
    	// item swapping
	const [removed] = Reihenfolge.splice(startIndex, 1);
    Reihenfolge.splice(endIndex, 0, removed);
    this.setState({ Reihenfolge: Reihenfolge})
    localStorage.set('list_Reihenfolge', Reihenfolge)



    // let { fertigungsaufträge } = this.state;

    // let fertigungsaufträge_order = localStorage.get('fertigungsaufträge_order')
    // let order = [16,17,26,13,18,7,10,4,49,50,51,1,14,19,8,11,5,54,55,56,2,15,20,9,12,6,29,30,31,3]
    // // wenn keine neue Reihenfolge erstellt wurde, ist dass die originelle Reihenfolge
    // // existiert eine geänderte Version davon, nutzen wir diese.

    // // es werden die numbers die über drag n drop vertauscht wurden, im array vertauscht.

    // if ( !fertigungsaufträge_order ) fertigungsaufträge_order = order;


	// console.log('dbd')
	// console.log(fertigungsaufträge)
	// console.log(fertigungsaufträge_order)
	// console.log(endIndex)

	// let temporaryIndexes = [];
	// let temporaryArray = []
	// Object.keys(list).map( E => {
	// 	console.log(E)
	// 	temporaryArray.push(list[E])
	// 	temporaryIndexes.push((parseInt(E)))
	// })

	// if (fertigungsaufträge_order)  temporaryIndexes = fertigungsaufträge_order;

	// // item swapping
	// const [removed] = temporaryArray.splice(startIndex, 1);
	// temporaryArray.splice(endIndex, 0, removed);

	// // indexes swapping
	// const [removed2] = temporaryIndexes.splice(startIndex, 1);
	// temporaryIndexes.splice(endIndex, 0, removed2);

	// console.log('swappingIndexes')
	// console.log(temporaryIndexes)
    // localStorage.set('fertigungsaufträge_order',temporaryIndexes)

    // console.log('Reihenfolge', this.state.Reihenfolge)
    // // this.setState(Reihenfolge: )

    // // 06.01 Reihenfolge
    // let Reihenfolge = [];
    // let fertigungsaufträgeTMP = fertigungsaufträge;
    // let fertigung = fertigungsaufträge;
    // console.log('biene')
    // // console.log(fertigungsaufträgeTMP)
    // for (fertigung of temporaryIndexes) {
    //     // console.log('#########')
    //     // console.log(temporaryIndexes)
    //     // console.log(fertigung)
    //     // console.log(fertigungsaufträgeTMP[fertigung])
    //     let tmpJSON = {}
    //     tmpJSON[fertigung] = fertigungsaufträgeTMP[fertigung]
    //     // if ( fertigungsaufträgeTMP[fertigung] ) Reihenfolge.push(fertigungsaufträgeTMP[fertigung])
    //     if (fertigungsaufträgeTMP[fertigung] ) Reihenfolge.push(tmpJSON);
    // }

    // console.log(Reihenfolge);
    // this.setState({Reihenfolge : Reihenfolge})




	// // let result = {}
	// // temporaryIndexes.map( (order, index) => {
	// // 	console.log('#################')
	// // 	console.log(order)
	// // 	result[order] = temporaryArray[index]
	// // 	console.log(result)
	// // })

    // console.log(list[21])
    // console.log('bierfass')
    // console.log(fertigungsaufträge)


	// localStorage.set('bestellungen',result)


	// return temporaryArray;
  };


	handleChange = (evt) => {
        let { fertigungsaufträge } = this.state;
        let fertigungsaufträgeX = localStorage.get('fertigungsaufträge1')

        let fertigungsaufträge1;
        if ( fertigungsaufträgeX ) fertigungsaufträge1 = fertigungsaufträgeX
        if ( !fertigungsaufträgeX) fertigungsaufträge1 = fertigungsaufträge

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


        let product_number = evt.target.name[0]
        let product_name = evt.target.name.slice(2,evt.target.name.length)
        let product_entry = evt.target.name.slice(7,evt.target.name.length)


        let fertigungsaufträge_normales_dispo_dict = localStorage.get('fertigungsaufträge')



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


        this.setState({
            fertigungsaufträge: fertigungsaufträge1
        })
        localStorage.set('fertigungsaufträge1', fertigungsaufträge1);
        }
        localStorage.set('fertigungsaufträge', fertigungsaufträge_normales_dispo_dict)

    }

    handleReset = (e) => {
		e.preventDefault();
        const original_list_Reihenfolge = localStorage.get('original_list_Reihenfolge');
        console.log(original_list_Reihenfolge)
        this.setState({ Reihenfolge: original_list_Reihenfolge })
        localStorage.set('list_Reihenfolge', original_list_Reihenfolge)
    }

    handleFocus = e => {
		e.target.style.outline = '3px solid rgb(250, 149, 129)'
	}

	handleBlur = e => {
		e.target.style.outline = ''
    }

    componentWillUnmount(){
		document.getElementById('Reihenfolge').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')

  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }


    const items = this.reorder(
      this.state.fertigungsaufträge,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

	componentDidMount() {
        document.getElementById('Reihenfolge').childNodes[0].setAttribute('style', 'color:black;  ')
        window.scrollTo(0, 0)
        const rememberedState = localStorage.get('fertigungsaufträge');



        // 19.91 ######## JSON localstorage in ein ARRAY transformieren, damit Duplikate zugelassen werden

        // let list_Fertigungsaufträge = []
        // Object.keys(fertigungsaufträge).map( entry => {

        // })




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


        // 09.01
        console.log('render state')
        console.log( this.state )

        let fertigungsaufträge = rememberedState;
        let list_Reihenfolge = localStorage.get('list_Reihenfolge')
        

        if (list_Reihenfolge && list_Reihenfolge.includes('undefined')) list_Reihenfolge = undefined

        if ( list_Reihenfolge ) this.setState({ Reihenfolge: list_Reihenfolge})
        let Reihenfolge = [];
        if ( fertigungsaufträge && !list_Reihenfolge) {  // wenn noch kein ARRAY aus den JSON gemacht wurde, dann soll einer daraus gemacht werden
            console.log('#############################')
           // alert('list_Reihenfolge NO NO NO')
            Object.keys(fertigungsaufträge).map(number => {
                console.log(number)
                console.log(fertigungsaufträge[number])
                let a = Object.keys(fertigungsaufträge[number]);
                Object.keys(fertigungsaufträge[number]).map(entry => console.log(entry))
                console.log(a)
                if (fertigungsaufträge[number][`menge${number}`] < 0 ) fertigungsaufträge[number][`menge${number}`] = 0
            })

            // 06.01 Reihenfolge
            let temporaryIndexes = [16,17,26,13,18,7,10,4,49,50,51,1,14,19,8,11,5,54,55,56,2,15,20,9,12,6,29,30,31,3]
            let fertigungsaufträge_order = localStorage.get('fertigungsaufträge_order')

            if ( fertigungsaufträge_order ) temporaryIndexes = fertigungsaufträge_order;
            let fertigungsaufträgeTMP = fertigungsaufträge;
            let fertigung = fertigungsaufträge;
            console.log('biene')
            // console.log(fertigungsaufträgeTMP)
            for (fertigung of temporaryIndexes) {
                // console.log('#########')
                // console.log(temporaryIndexes)
                // console.log(fertigung)
                // console.log(fertigungsaufträgeTMP[fertigung])
                let tmpJSON = {}
                tmpJSON[fertigung] = fertigungsaufträgeTMP[fertigung]
                // if ( fertigungsaufträgeTMP[fertigung] ) Reihenfolge.push(fertigungsaufträgeTMP[fertigung])
                if (fertigungsaufträgeTMP[fertigung] ) Reihenfolge.push(tmpJSON);
            }

            console.log('Reihenfolge_')
            console.log(Reihenfolge);
            this.setState({Reihenfolge : Reihenfolge})
            localStorage.set('list_Reihenfolge', Reihenfolge)
            localStorage.set('original_list_Reihenfolge', Reihenfolge)
        }

	}

	componentDidUnmount() {
		// this.working_hours_planning(dispo, xml);
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
    dispo_function = () => {

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

    anzeigenBerrechnungProdukt1 = () => this.setState({ displayProdukt1: !this.state.displayProdukt1})
    anzeigenBerrechnungProdukt2 = () => this.setState({ displayProdukt2: !this.state.displayProdukt2})
    anzeigenBerrechnungProdukt3 = () => this.setState({ displayProdukt3: !this.state.displayProdukt3})

    createNewArticel = e => {
        // let { Reihenfolge, newArtikel, newMenge} = this.state;
        // let tmp ={}
        // newMenge = parseInt(newMenge)
        // newArtikel = parseInt(newArtikel)

        // console.log(newArtikel);

		// tmp[newArtikel] = { [`artikel${newArtikel}`] : newArtikel, [`menge${newArtikel}`]: parseInt(newMenge)}
		// console.log(tmp)
		// Reihenfolge.push(tmp)
		// console.log('nasty')
		// console.log(Reihenfolge)
        // this.setState({Reihenfolge: Reihenfolge})
        // localStorage.set('list_Reihenfolge', Reihenfolge)

        // localStorage.set('reihenfolge_Reihenfolge', Reihenfolge)

        // // 19.01 updated der Fertigungsaufträge, wenn ein Element hinzugefügt wurde
        // let fertigungsaufträge1 = localStorage.get('fertigungsaufträge1')
        // console.log('lego')
        // console.log(fertigungsaufträge1)

        // // adding fertigungsaufträge, if article got added
        // Object.keys(fertigungsaufträge1).map( outerProduct  => {
        //     Object.keys(fertigungsaufträge1[outerProduct ]).map( innerNumber => {
        //         if(innerNumber==parseInt(newArtikel) ){
        //             alert(fertigungsaufträge1[outerProduct][innerNumber][`menge${innerNumber}`])
        //             fertigungsaufträge1[outerProduct][innerNumber][`menge${innerNumber}`] = fertigungsaufträge1[outerProduct][innerNumber][`menge${innerNumber}`] + parseInt(newMenge)
        //             alert(fertigungsaufträge1[outerProduct][innerNumber][`menge${innerNumber}`])

        //         }
        //     })
        // })
        // localStorage.set('fertigungsaufträge1', fertigungsaufträge1)


        // const Reihenfolge1 = [ 1, 26 , 51 , 16 , 17 , 50 , 4 , 10 , 49, 7 , 13 , 18 ]
        // const Reihenfolge2 = [ 2, 26 , 56 , 16 , 17 , 55 , 5 , 11 , 54, 8 , 14, 19 ]
        // const Reihenfolge3 = [ 3, 26, 31 , 16 , 17 , 30 , 6 , 12 , 29 , 9 , 15 , 20 ]

        // let a = localStorage.get('Änderungen')
        // let Änderungen = []
        // if (a != 2 ) Änderungen = a;


        // // outerProduct
        // let outerProduct
        // if (Reihenfolge1.includes(newArtikel) > 0) outerProduct = 1
        // if (Reihenfolge2.includes(newArtikel) > 0) outerProduct = 2
        // if (Reihenfolge3.includes(newArtikel) > 0) outerProduct = 3

        // alert(Reihenfolge3.includes(newArtikel) > 0)


        // let key = `${outerProduct}_menge${newArtikel}`
        // Änderungen.push({[key]: newMenge})
        // localStorage.set('Änderungen', Änderungen)
        // console.log('änderungen',Änderungen)
    }

    changeNewArticel = e => {
        let { newArtikel } = this.state
        this.setState({ newArtikel: e.target.value})
    }
    changeNewMenge = e => {
        this.setState({ newMenge: e.target.value})
    }



    splittingMenge = (e) => {
        // 19.01 list_Reihenfolge  ist ein ARRAY statt JSON um Duplikate zu erlauben

        let fertigungsaufträge_order = localStorage.get('fertigungsaufträge_order')
        let menge = document.getElementsByName(`input${e.target.name}`)[0].value
        let split = {[e.target.name]: {[`artikel${e.target.name}`]: parseInt(e.target.name), [`menge${e.target.name}`]: parseInt(menge)}}

        let { Reihenfolge, showSplitting } = this.state;
        console.log(fertigungsaufträge_order)
        // let indexOf = fertigungsaufträge_order.indexOf(parseInt(e.target.name))
        let indexOf = parseInt(e.target.getAttribute('index'))
        let jsonToBeReducedFrom = Reihenfolge[indexOf]
        // console.log(split)
        // console.log(jsonToBeReducedFrom)
        // console.log(e.target.name)
        // console.log(e.target.getAttribute('index'))
        // console.log(e.target)
        // console.log(Reihenfolge)
        console.log('indexOf',indexOf)
        jsonToBeReducedFrom[e.target.name][`menge${e.target.name}`] = jsonToBeReducedFrom[e.target.name][`menge${e.target.name}`] - parseInt(menge)
        // console.log(Reihenfolge)
        Reihenfolge.splice(indexOf +1, 0, split)
        console.log(Reihenfolge)


        showSplitting[e.target.getAttribute('index')] = false;
        this.setState({Reihenfolge: Reihenfolge, showSplitting: showSplitting})
        localStorage.set('list_Reihenfolge', Reihenfolge)

        console.log('NANI_x')
        console.log(Reihenfolge)


    }

    onChangeSplittingMenge = e => {}

    showSplitting = e => {
        let { showSplitting } = this.state;
        showSplitting[e.target.name] = true;
        this.setState({showSplitting: showSplitting})
    }

    render() {




        let { fertigungsaufträge, Reihenfolge, showSplitting } = this.state;
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






        return (
                    <React.Fragment>
						<div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'}}>
						<table style={{backgroundColor:'#c1c1bf',margin:'auto' }}>
                        <div style={{ border: '3px solid#f0f0f0'}}>
							<tbody>


							<tr>

								<td style={{padding:'5px 10px 8px 10px'}}>
									<table style={{margin:'auto'}}>
										<tbody>

										<DragDropContext onDragEnd={this.onDragEnd}>
                                            <Droppable droppableId="droppable">
                                            {(provided, snapshot) => (
                                                <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}

                                                >
<tr>

                                            <td>{this.props.t('reihenfolge.position')}</td>
 											<td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    {this.props.t('reihenfolge.artikel')}  &nbsp; &nbsp; &nbsp; &nbsp; {this.props.t('reihenfolge.menge')}</td>
										</tr>





                                    { this.state.fertigungsaufträge && Reihenfolge && Reihenfolge.map( (element, index) =>
                                        Object.keys(element).map( (number) =>

                                        <tr style={{position: 'relative'}}>
                                            <td>
                                                 {index+1}
                                            </td>
                                    <Draggable key={number} draggableId={`${number}_position_${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <div

                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
{/*
                                        { console.log('maja')}
                                        { console.log(number) } */}
                                        {/* { console.log('maja')}
                                        { console.log(number) }
                                        { console.log(Reihenfolge)}
                                        { console.log(Reihenfolge[number])} */}
                                        <div style={{ border: '1px solid white', marginBottom: '10px', position:'relative'}} >
                                            <td style={{ width:'200px', height: '75px'}}> {bezeichnerErz[number]}</td>
                                            <td>
                                                 <div style={{ margin: '0 5px 0 0 ', width: '95px', height: '25px', }}  tabindex='-1'
                                                    name={index+1}  > {Reihenfolge[index] [number][`artikel${number}`] }</div>
                                            </td>
                                            <td>
                                                <div style={{width: '50px', height:'25px', }}
                                                  name={`menge${number}`} > {Reihenfolge[index][number][`menge${number}`]} </div>
                                            </td>
                                            <button name={index} onClick={this.showSplitting} style={{position: 'absolute', left: '35px', top: '37px'}}>splitting</button>
                    <div style={{border: '1px solid white', borderTop: 'none'}}>

                    { showSplitting[index] && (
                    <table >
                    <tr>

                        <th>Menge</th>
                    </tr>
                        <tr>

                            <td>
                                <input name={`input${number}`} style={{maxWidth: '140px' }} onChange={this.onChangeSplittingMenge} onFocus={this.handleFocus} onBlur={this.handleBlur} style={{ }} autoComplete='off' size="4" value={this.state.splittingMenge} maxLength="5" type="text"  />
                                <Button className='myButtons'  style={{marginLeft: '25px'}} name={number} index={index} onClick={this.splittingMenge}> {this.props.t('reihenfolge.buttonconfirm')} </Button>
                            </td>
                        </tr>

                    </table>
                    )}
                    </div>
                                            </div>

                                            </div>
                                    )}
                                  </Draggable>
                                    </tr>
                                    )
                                    )}

</div>
          )}
        </Droppable>
      </DragDropContext>
									</tbody></table>
								</td>




							</tr>

                            {/* <div >
                                    <p style={{ marginLeft: '10px'}}>new item</p>
                                    <button style={{position:'relative', right: '-95px'}} id='createButton' onClick={this.createNewArticel}>create </button>
                                </div>



                                <div style={{ position: 'relative', right: '-90px'}}>
                                <div> {bezeichnerErz[this.state.newArtikel]} </div>
                                <div>
                                    <input id='newArtikel' onChange={this.changeNewArticel}style={{ margin: '5px 25px 0 0'}} tabIndex='' autoComplete='off' size="4"  value={this.state.newArtikel} maxLength="2" type="text"  />
                                    <input style={{maxWidth: '93px' }} onChange={this.changeNewMenge} onFocus={this.handleFocus} id='new_artikel_amount' onBlur={this.handleBlur} style={{ }} autoComplete='off' size="4" name={''} value={this.state.newMenge} maxLength="5" type="text"  />
                                </div>
                                </div>
                             */}

                            <tr>

													<td>
														<Button className='myButtons'  onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{
                                                                    margin:' 0px 0px 5px 4px',
                                                                    position: 'relative',
                                                                    top: '-2px',
                                                                    background: 'rgb(250, 149, 129)',
                                                                    border: '2px solid ghostwhite',
                                                                    color: 'ghostwhite',
                                                        }}>
                                                         <Link style={{ color: 'ghostwhite' }}to='/Sales2'>
                                                             {this.props.t('reihenfolge.buttonback')}
                                                         </Link>

                                                             </Button>
													</td>

													<td style={{ position: 'relative'}}>
                                                        <Button className='myButtons'  onFocus={ this.handleFocus} onBlur={this.handleBlur}  style={{ position: 'absolute' , top: '3px' , right: '7px', margin: '0 0 0 0 ',
                                                    															background: 'rgb(250, 149, 129)',
                                                                                                                border: '2px solid ghostwhite',
                                                                                                                color: 'ghostwhite',
                                                    }}>
                                                    <Link style={{ color: 'ghostwhite' }}to='/Bestellungen'>
                                                        {this.props.t('reihenfolge.buttonnext')}
                                                    </Link>

                                                    </Button>
                                                        <Button className='myButtons'  onFocus={ this.handleFocus} onBlur={this.handleBlur}  onClick={this.handleReset} style={{ position: 'absolute' , top: '52px' ,
                                                        															background: 'rgb(250, 149, 129)',
                                                                                                                    border: '2px solid ghostwhite',
                                                                                                                    color: 'ghostwhite',
                                                        right: '56px', margin: '0 0 0 0 '}}> {this.props.t('reihenfolge.buttonreset')}</Button>

													</td>

												</tr>

						</tbody>
                        </div>
                        </table>
						</div>
                    <div style={{ display:' none'}}>
                        {/* <Sales2 calledFromSales2={true} style={{display:'none'}} fertigungsaufträge_produktion={fertigungsaufträge} /> */}
                    </div>

                    </React.Fragment>
        )
    }
}

export default translate(Reihenfolge);
