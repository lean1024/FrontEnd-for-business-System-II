import React, { Component } from 'react';


export default class DispoEigenfertigung extends Component 
{ 
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        params:"params not defined",
        raw_xml: "raw_xml not defined"
    }

  }

  sagMirSascha = () => { console.log('hello')};

  handleSubmit = (event) => {

    this.sagMirSascha();  

    event.preventDefault();
    
    //benötigte Parameter deklarieren
    function declare_params(){
      //Vetriebswunsch definieren (externe Eingabgen)
      var sales_order = {1:100,2:200,3:100}
      //geplante Lagerbestaende definieren (externe Eingaben)
      var planned_p_stock = {1:0,2:0,3:0};
      var planned_e_stock = {1:150,2:150,3:150};
      //Angabe der Item's welche mehrere Male verwendet werden
      var multiple_item_ids = [16,17,26];
      //Angabe der Verwendungsstruktur
      var usage = {
        1:{1:0,26:1,51:1,16:51,17:51,50:51,4:50,10:50,49:50,7:49,13:49,18:49},
        2:{2:0,26:2,56:2,16:56,17:56,55:56,5:55,11:55,54:55,8:54,14:54,19:54},
        3:{3:0,26:3,31:3,16:31,17:31,30:31,6:30,12:30,29:30,9:29,15:29,20:29}
      }

      var usage_order = {
        1:[1,26,51,16,17,50,4,10,49,7,13,18],
        2:[2,26,56,16,17,55,5,11,54,8,14,19],
        3:[3,26,31,16,17,30,6,12,29,9,15,20]
      }
      var obj = {sales_order,planned_p_stock,planned_e_stock,multiple_item_ids,usage,usage_order}
      return obj;
    }

    function generate_item_data(object,xml_data){
      var xml = xml_data;
      var product_dict = {}; 
      var product;
      for(product of Object.keys(object['usage'])){
         var item_dict = {};
         var item;
         for (item of Object.keys(object['usage'][product])){
          //Mehrfachverwendung deklarieren
          var multiple_usage;
          if(object['multiple_item_ids'].includes(parseInt(item))){
            multiple_usage = 'ja'
          }else{
            multiple_usage = 'nein'
          }
          //Weitere Verwendung deklarieren
          var usage;
          usage = object['usage'][product][item];
          //Lagerbestände deklarieren
          var warehousestock = parseInt(xml.getElementsByTagName("article")[item-1].getAttribute("amount"));
          //geplante Lagerbestände deklarieren
          var planned_warehousestock;
          if(Object.keys(object['planned_p_stock']).includes(item)){
            planned_warehousestock = object['planned_p_stock'][product];
          }else{
            planned_warehousestock = object['planned_e_stock'][product];
          }
          // Erstellen eines dicts für die Rückgabe
          item_dict[item] = {
            'lagerbestand':warehousestock,
            'lagerbestand_geplant':planned_warehousestock,
            'verwendung_in':usage,
            'mehrfachverwendung': multiple_usage
          }
          //Vertriebswunsch deklarieren
          if(Object.keys(object['sales_order']).includes(item)){
            item_dict[item]["vetriebswunsch"] = object['sales_order'][item];
          }
       }
        product_dict[product] = item_dict;
      }
      var output = {};
      output['produktDaten'] = product_dict;
      //Aufträge in Bearbeitung deklarieren
      output['inBearbeitung'] = get_orders_in_work_by_amount(xml_data);
      //Aufträge in Warteschlange deklarieren
      output['inWarteschlange'] = get_waiting_list_at_workstation_by_amount(xml_data);
      return output;
    }

    function get_orders_in_work_by_amount(xml_data){
      var orders_in_work ={};
      var xml_root = xml_data.getElementsByTagName('ordersinwork')[0];
      var orders;
      for(orders of xml_root.getElementsByTagName('workplace')){
        var item = orders.getAttribute("item");
        if(Object.keys(orders_in_work).includes(item)){
          orders_in_work[item] = orders_in_work[item]+parseInt(orders.getAttribute('amount'));
        }else{
          orders_in_work[item] = parseInt(orders.getAttribute('amount'));
        }
      }
      return orders_in_work
    }

      function get_waiting_list_at_workstation_by_amount(xml_data){
        var waiting_list = {};
        var xml_root = xml_data.getElementsByTagName('waitinglistworkstations')[0];
        var list_item;
        for(list_item of xml_root.getElementsByTagName('waitinglist')){
          var item = list_item.getAttribute("item");
          if(Object.keys(waiting_list).includes(item)){
            waiting_list[item] = waiting_list[item]+parseInt(list_item.getAttribute('amount'));
          }else{
            waiting_list[item] = parseInt(list_item.getAttribute('amount'));
          }
        }
        return waiting_list;
      }
      
      //Black Box Magic
      function dispo_function(input,object){
        var dispo_dict = {};
        var product;
        for (product of Object.keys(input['produktDaten'])){
          var item;
          //für nicerdicer Ausgabe
          console.log("Vertriebswunsch + Übertrag + Lagerbestand(Ende) - Lagerbestand - Warteschlange - Bearbeitung = Produktionsmenge")
          for(item of object['usage_order'][product]){

            //Abfrage der verbindlichen Aufträge
            var sales_order = get_sales_order(input,product,item,dispo_dict)

            //Abfrage des geplanten Lagerbestandes der Produkte/Erzeugnisse
            var planned_stock = input['produktDaten'][product][item]['lagerbestand_geplant'];

            //Abfrage der Aufträge aus der Warteschlange
            var waiting_items = get_waiting_items(input,product,item)

            //Abfrage der Aufträge in Bearbeitung
            var producing_items = get_producing_items(input,product,item);

            //Abfrage der aktuellen Lagerbestände
            var warehousestock = get_warehousestock(input,product,item)

            //Übertag aus Warteliste
            var tf_waiting_item = transfer_waiting_item(input,product,item,dispo_dict)
             
             //production_orders = sales_orders + nf_waiting_items + planned_warehousestock - warehousestock - producing_items - waiting_items
             var production_order;
             //notwendige Berechnungen
             production_order = sales_order+tf_waiting_item+planned_stock-warehousestock-waiting_items-producing_items;
             
             if(Object.keys(dispo_dict).includes(item.toString())){
              dispo_dict[item] = {
                "sales_order":dispo_dict[item]["sales_order"]+sales_order,
                "tf_waiting_item":dispo_dict[item]["tf_waiting_item"]+tf_waiting_item,
                "planned_stock":dispo_dict[item]["planned_stock"]+planned_stock,
                "warehousestock":dispo_dict[item]["warehousestock"]+warehousestock,
                "waiting_items":dispo_dict[item]["waiting_items"]+waiting_items,
                "producing_items":dispo_dict[item]["producing_items"]+producing_items,
                "production_order":dispo_dict[item]["production_order"]+production_order
              }
             }
             else{
              dispo_dict[item] = {
                "sales_order":sales_order,
                "tf_waiting_item":tf_waiting_item,
                "planned_stock":planned_stock,
                "warehousestock":warehousestock,
                "waiting_items":waiting_items,
                "producing_items":producing_items,
                "production_order":production_order
               }
             }
            console.log(sales_order,"+",tf_waiting_item,"+",planned_stock,"-",warehousestock,"-",waiting_items,"-",producing_items,"=",production_order)
          }

        }
        return dispo_dict;
      }

      function get_sales_order(input,product,item,dispo_dict){
        var sales_order
        if(input['produktDaten'][product][item]["verwendung_in"] != 0){
          //deklaration der sales_order anhand der notwendigen Verwendung
          sales_order = dispo_dict[input['produktDaten'][product][item]["verwendung_in"]]["production_order"];
        }else{
          //deklaration der sales_order anhand des Vertriebswunsches
          sales_order = input['produktDaten'][product][item]["vetriebswunsch"];
        }
        return sales_order
      }
      
      function get_waiting_items(input,product,item){
        var waiting_items
        if(Object.keys(input['inWarteschlange']).includes(item.toString())){
          if(input['produktDaten'][product][item]["mehrfachverwendung"]=='ja'){
            waiting_items = input['inWarteschlange'][item]/3
          }
          else{
            waiting_items = input['inWarteschlange'][item]
          }
        }
        else{
          waiting_items = 0;
        }
        return waiting_items;
      }

      function get_producing_items(input,product,item){
        var producing_items;
        if(Object.keys(input['inBearbeitung']).includes(item.toString())){
          if(input['produktDaten'][product][item]["mehrfachverwendung"]=='ja'){
            producing_items = input['inBearbeitung'][item]/3
          }
          else{
            producing_items = input['inBearbeitung'][item]
          }
        }
        else{
          producing_items = 0;
        }
        return producing_items;
      }

      function get_warehousestock(input,product,item){
        var warehousestock
        if(input['produktDaten'][product][item]["mehrfachverwendung"]=='ja'){
          warehousestock = input['produktDaten'][product][item]["lagerbestand"]/3
        }
        else{
          warehousestock = input['produktDaten'][product][item]["lagerbestand"]
        }
        return warehousestock;
      }

      function transfer_waiting_item(input,product,item,dispo_dict){
        //todo
        var tf_waiting_item
        if(input['produktDaten'][product][item]["verwendung_in"] != 0){
          tf_waiting_item = dispo_dict[input['produktDaten'][product][item]["verwendung_in"]]["waiting_items"];
        }else{
          tf_waiting_item = 0;
        }
        return tf_waiting_item
      }

      function capacity_planning(dispo_dict){
        var arbeitszeiten_dict = {1:{29:6,49:6,54:6},2:{30:5,50:5,55:5},3:{31:6,51:5,56:6},4:{1:6,2:7,3:7},
        6:{16:2,18:3,19:3,20:3},7:{10:2,11:2,12:2,13:2,14:2,15:2,18:2,19:2,20:2,26:2},
        8:{10:1,11:2,12:2,13:1,14:2,15:2,18:3,19:3,20:3},9:{10:3,11:3,12:3,13:3,14:3,15:3,18:2,19:2,20:2},
        10:{4:4,5:4,6:4,7:4,8:4,9:4},11:{4:3,5:3,6:3,7:3,8:3,9:3},12:{10:3,11:3,12:3,13:3,14:3,15:3},
        13:{10:2,11:2,12:2,13:2,14:2,15:2},14:{16:3},15:{17:3,26:3}}

        var capacity_plan = get_time_by(dispo_dict,arbeitszeiten_dict)
        return capacity_plan
      }

      function get_setup_time(dispo_dict){
        var rüstzeiten_dict = {1:{29:20,49:20,54:20},2:{30:20,50:30,55:30},3:{31:20,51:20,56:20},4:{1:30,2:20,3:30},
        6:{16:15,18:15,19:15,20:15},7:{10:20,11:20,12:20,13:20,14:20,15:20,18:20,19:20,20:20,26:30},
        8:{10:15,11:15,12:15,13:15,14:15,15:15,18:20,19:25,20:20},9:{10:15,11:15,12:15,13:15,14:15,15:15,18:15,19:20,20:15},
        10:{4:20,5:20,6:20,7:20,8:20,9:20},11:{4:10,5:10,6:20,7:20,8:20,9:20},12:{10:0,11:0,12:0,13:0,14:0,15:0},
        13:{10:0,11:0,12:0,13:0,14:0,15:0},14:{16:0},15:{17:15,26:15}}
        
        var product
        for(product of Object.keys(dispo_dict))
        {
          if(dispo_dict[product]['production_order']>0){
            dispo_dict[product]['production_order']=1
          }else{
            dispo_dict[product]['production_order']=0
          }
        }

        var setup_time = get_time_by(dispo_dict,rüstzeiten_dict)
        return setup_time

      }

      function get_time_by(dispo_dict,time_dict)
      {
        var workstation
        var workstation_dict = {}
        for (workstation of Object.keys(time_dict)){
          console.log(workstation);
          var product
          var workstation_product_time = []
          console.log("Arbeitsplatz: Produkt => Arbeitszeit * Anzahl = Arbeitszeit")
          for(product of Object.keys(time_dict[workstation])){
            var production_time = time_dict[workstation][product]
            var production_order 
            if (dispo_dict[product]['production_order']<0){
              production_order = 0;
            }else{
              production_order = Math.ceil(dispo_dict[product]['production_order']);
            }
            workstation_product_time.push(production_time*production_order)
            console.log(workstation,":",product,"=>",production_time,"*",production_order,"=",
            production_time*production_order)
            console.log(workstation_product_time)
          }
          var workstation_time = workstation_product_time.reduce((a, b) => a + b, 0)
          workstation_dict[workstation] = workstation_time;
        }
        return workstation_dict
      }

      function get_timeneed_at_workstation(xml_data){
        var workstation_time_dict ={};
        var xml_root = xml_data.getElementsByTagName('waitinglistworkstations')[0];
        var workstation;
        for(workstation of xml_root.getElementsByTagName('workplace')){
          console.log(workstation)
          var workstation_id = workstation.getAttribute("id")
          var timeneed = parseInt(workstation.getAttribute("timeneed"));
          workstation_time_dict[workstation_id] = timeneed
      }
      return workstation_time_dict
    }

      function total_capacity_planning(working_time,setup_time,time_need){
        var total_capacity_dict = {}
        var workstation
        for (workstation of Object.keys(working_time)){
          total_capacity_dict[workstation] = working_time[workstation]+setup_time[workstation]+time_need[workstation]
        }
        return total_capacity_dict
      }

      function working_hours_planning(total_capacity_plan){
        var working_hours_dict = {}
        var workstation
        for (workstation of Object.keys(total_capacity_plan)){
          var working_hours
          var schichten 
          //1-Schichten Betrieb
          working_hours = (total_capacity_plan[workstation]-2400)/5
          schichten= 1
          //2-Schichten Betrieb
          if(working_hours > 240){
            working_hours = (total_capacity_plan[workstation]-2400*2)/5
            schichten= 2
            //3-Schichten Betrieb
            if(working_hours>240){
              working_hours = (total_capacity_plan[workstation]-2400*3)/5
              schichten = 3
              if(working_hours>240)
              {
                working_hours = 240
                var anmerkung = "Es kann nicht vollständig produziert werden"
              }
            }
          }
          if (working_hours <0){
            working_hours = 0;
          }
          working_hours_dict[workstation] = {
            "überstunden": working_hours,
            "anzahl_Schichten": schichten,
            "Anmerkung": anmerkung
          }
        }
        return working_hours_dict
      }


    var xml = this.App.files[0];
    console.log(xml);

    const scope = this
    var reader = new FileReader();
    //onLoad-Handler
    reader.onload = function(e) {
      var text = reader.result;
      console.log(text);
      var parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      console.log(xmlDoc);
      scope.setState({raw_xml:text})
      var params = declare_params();
      console.log(params);
      scope.setState({params:params})
      //Dispo der Erzegnisse erstellen
      var items = generate_item_data(params,xmlDoc);
      console.log(items);
      var dispo = dispo_function(items,params);
      console.log(dispo)
      
      // var capacity_plan = capacity_planning(dispo);
      // console.log(capacity_plan)
      // var setup_plan = get_setup_time(dispo)
      // console.log(setup_plan)
      // var timeneed = get_timeneed_at_workstation(xmlDoc)
      // console.log(timeneed)
      // var total_capacity = total_capacity_planning(capacity_plan,setup_plan,timeneed)
      // console.log(total_capacity);
      // var working_hours = working_hours_planning(total_capacity)
      // console.log(working_hours);
    }
    reader.readAsText(xml);
    
    console.log(this.state.params)
  }


     render() {
      return( <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={input => { this.App = input; }}/>
        </label>
        <br />
      <button type="submit"> Klick mich ! </button>
      <p></p><b>deklarierte Parameter :</b><p></p>
      <p>{JSON.stringify(this.state.raw_xml)}</p>
      </form>);
    }
}