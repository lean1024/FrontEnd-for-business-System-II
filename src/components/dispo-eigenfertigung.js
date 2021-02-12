import React, { Component } from 'react';


export default class DispoEigenfertigung extends Component {
  constructor(props) {
    super(props);

    this.handle_submit = this.handle_submit.bind(this);

    this.state = {
      params: "not defined",
      xml: "not defined",
      orders_in_work: "not defined",
      waiting_list: "not defined",
      item_data: "not defined",
      dispo: "not defined"
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
    reader.onload = function (e) {
      var text = reader.result;
      var parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      scope.setState({ xml: xmlDoc })
    }
    reader.readAsText(xml);
    console.log(reader)
  }

  //notwendige Eingaben deklarieren
   create_xml(params, orders, production, hours) {

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
            var item = doc.createElement("workingtime");
            item.setAttribute("station", workstation.toString());
            if (hours[workstation]['Anzahl Schichten'] == '1-schichtig') {
                var shift = 1
            } else if (hours[workstation]['Anzahl Schichten'] == '2-schichtig') {
                var shift = 2
            } else {
                var shift = 3
            }
            item.setAttribute("shift", shift.toString());
            item.setAttribute("overtime", hours[workstation]['Überstunden'].toString());
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
    //Vetriebswunsch definieren (externe Eingabgen)
    var sales_order = { 1: 100, 2: 200, 3: 100 }
    //geplante Lagerbestaende definieren (externe Eingaben)
    var planned_p_stock = { 1: 0, 2: 0, 3: 0 };
    var planned_e_stock = { 1: 150, 2: 150, 3: 150 };
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
    var obj = { sales_order, planned_p_stock, planned_e_stock, multiple_item_ids, usage, usage_order }
    this.setState({ params: obj })
  }
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
  dispo_function(xml, params) {
    var parameter
    for (parameter of [xml, params]) {
      if (typeof (parameter) != 'string') {
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
      } else {
        dispo_dict = "not defined"
        return
      }
      this.setState({ dispo: dispo_dict })
      return dispo_dict
    }
  }

  handle_submit = (event) => {
    event.preventDefault();
    ///////////////////////////////////////////////
    this.read_xml_file();
    console.log(this.state.xml)
    this.declare_params();
    console.log(this.state.params)
    ///////////////////////////////////////////////
    var dispo = this.dispo_function(this.state.xml, this.state.params)
    console.log(dispo)
  }

  render() {
    return (<form onSubmit={this.handle_submit}>
      <label>
        Upload file:
          <input type="file" ref={input => { this.App = input; }} />
      </label>
      <br />
      <button type="submit"> Klick mich ! </button>
      <h1> XML:</h1>
      {this.state.xml.toString()}
      <h1> Notwendige Parameter: </h1>
      {JSON.stringify(this.state.params)}
      <h1> Aufträge in Bearbeitung: </h1>
      {JSON.stringify(this.state.orders_in_work)}
      <h1> Aufträge aus Warteschlange: </h1>
      {JSON.stringify(this.state.waiting_list)}
      <h1> Produktdaten: </h1>
      {JSON.stringify(this.state.item_data)}
      <h1> Dispoprogramm: </h1>
      {JSON.stringify(this.state.dispo)}
    </form>);
  }
}