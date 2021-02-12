import React, { Component } from 'react';


export default class XmlImport extends Component
{
    constructor(props) {
        super(props);
        
        this.handle_submit = this.handle_submit.bind(this);
        
        this.state = { 
            raw_xml: 'not defined',
            params : 'not defined'
        };
    }

    //datei einlesen und als xml parsen
    read_xml_file(){
        //um state zu setzen
        const scope = this
        var xml = this.App.files[0];
        var reader = new FileReader();
        //onLoad-Handler
        reader.onload = function(e) {
            var text = reader.result;
            var parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            scope.setState({raw_xml:xmlDoc})
            return xmlDoc
        }
        reader.readAsText(xml);
    }

    //notwendige Eingaben deklarieren
    declare_params(){

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
        this.setState({params:obj})
      }


      handle_submit = (event) => {

        event.preventDefault();
        
        this.read_xml_file();
        this.declare_params();
        console.log("Xml wurde eingelesen und Parameter wurden definiert")
        console.log(this.state.raw_xml)
        console.log(this.state.params)

    }

    render() {
        return( <form onSubmit={this.handle_submit} className="btn">
            <label>
                <input type="file" className="btn btn-primary"
                       ref={input => { this.App = input;
                       }}
                />
            </label>
            <br />
            <button type="submit" className="btn btn-primary"> Klick mich ! </button>
            <h1> XML:</h1>
            {this.state.raw_xml.toString()}
            <h1> Parameter </h1>
            {this.state.params.toString()}
        </form>);
    }
}

