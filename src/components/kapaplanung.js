import React, { Component } from 'react';


export default class Kapazitaetsplanung extends Component {
  constructor(props) {
    super(props);

    this.handle_submit = this.handle_submit.bind(this);

    this.state = {
      params: "not defined",
      xml: "not defined",
      orders_in_work: "not defined",
      waiting_list: "not defined",
      item_data: "not defined",
      dispo: "not defined",
      waiting_purchase_items: "not defined",
      production_order_purchase_items: "not defined",
      capacity_data:"not defined",
      capacity_plan: "not defined",
      capacity_programm: "not defined"

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
    this.setState({ dispo: dispo_dict })
    return dispo_dict
  }
  ///////////////////////////////////////////////////////////////////////////////////
  get_needed_purchase_items_by(xml, params, property) {
    var parameter
    for (parameter of [xml, params]) {
      if (typeof (parameter) == 'string') { return }
    }
    var dispo_dict = this.dispo_function(xml, params)
    var verwendung_p1 = {
      1: { 21: 1, 24: 1, 27: 1 }, 26: { 44: 2 / 3, 47: 1 / 3, 48: 2 / 3 }, 51: { 24: 1, 27: 1 },
      16: { 24: 1 / 3, 28: 1 / 3, 40: 1 / 3, 41: 1 / 3, 42: 2 / 3 }, 17: { 43: 1 / 3, 44: 1 / 3, 45: 1 / 3, 46: 1 / 3 }, 50: { 24: 2, 25: 2 },
      4: { 35: 2, 36: 1, 52: 1, 53: 36 }, 10: { 32: 1, 39: 1 }, 49: { 24: 2, 25: 2 }, 7: { 35: 2, 37: 1, 38: 1, 52: 1, 53: 36 },
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
    var capacity_data = {"capacity_plan":capacity_plan,"setup_plan":setup_plan,"timeneed":timeneed}
    this.setState({capacity_data:capacity_data})
    var total_capacity_dict = {}
    var workstation
    for (workstation of Object.keys(capacity_plan)) {
      total_capacity_dict[workstation] = capacity_plan[workstation] + setup_plan[workstation] + timeneed[workstation]
    }
    this.setState({capacity_plan:total_capacity_dict})
    return total_capacity_dict
  }

  // updated
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
    //////////////////////////////////
    var waiting_items = this.get_needed_purchase_items_by(this.state.xml, this.state.params, 'waiting_items')
    var production_order = this.get_needed_purchase_items_by(this.state.xml, this.state.params, 'production_order')
    console.log(waiting_items)
    console.log(production_order)
    ///////////////////////////////////////////
    var working_hours = this.working_hours_planning(dispo, this.state.xml)
    console.log(working_hours);

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
     
      <h1> Kapzitätsdaten: </h1>
      {JSON.stringify(this.state.capacity_data)}
      <h1> Kapazitätsplan: </h1>
      {JSON.stringify(this.state.capacity_plan)}
      <h1> Kapazitätsprogramm: </h1>
      {JSON.stringify(this.state.capacity_programm)}
    </form>);
  }
}