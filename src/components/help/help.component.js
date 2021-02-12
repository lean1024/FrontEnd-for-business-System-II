import React from 'react';
import axios from 'axios';
import { translate } from 'react-multi-lang';
import FileSaver from 'file-saver';

class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        axios({
            method: "POST",
            url:"http://localhost:4000/ibsys2/send",
            data:  this.state
        }).then((response)=>{
            if (response.data.status === 'success'){
                alert(this.props.t('help.handlesubmit.messagesent'));
                this.resetForm()
            }else if(response.data.status === 'fail'){
                alert(this.props.t('help.handlesubmit.messagefailed'))
            }
        })
    }

    downloadFile() {
        try {
            FileSaver.saveAs("http://localhost:4000/ibsys2/downloadFile", "Handbuch.pdf");
        }
        catch (error) {
            alert('Das hat nicht geklappt!')
        }
     }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }

    resetForm(){
        this.setState({name: '', email: '', message: ''})
    }

    componentDidMount () {
		document.getElementById('help').childNodes[0].setAttribute('style', 'color:black;  ')


    }

    componentWillUnmount () {
		document.getElementById('help').childNodes[0].setAttribute('style', 'color:ghostwhite;  ')

    }

    render()
    {
        return (
            <React.Fragment>
            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">

                <br></br>
                <div style={{ padding: '30px',
                    margin: '0px 115px 0 120px' ,
                    border: '3px solid#f0f0f0' ,
                    background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'

                }} className="form-group">
                    <h1>
                        {this.props.t('help.contacttitle')}
                    </h1>
                    <label htmlFor="name">
                        {this.props.t('help.name')}
                    </label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)}/>
                </div>
                <div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'

                }} className="form-group">
                    <label htmlFor="exampleInputEmail1">{this.props.t('help.email')} </label>
                    <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                </div>
                <div style={{ padding: '30px', margin: '0px 115px 0 120px' , border: '2px solid white' , background: ' repeating-linear-gradient(45deg, #ffffff3b, transparent 100px)'

                }} className="form-group">
                    <label htmlFor="message">
                        {this.props.t('help.message')}
                    </label>
                    <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)}></textarea>
                </div>
                <button type="submit"
                        style={{  margin: '5px 0 0 0 ' ,
                            background: 'rgb(250, 149, 129)',
                            border: '2px solid ghostwhite',
                            color: 'ghostwhite',
                            position: 'relative',
                            top: '12px'
                        }}
                >
                    {this.props.t('help.submitbutton')}
                </button>

            </form>
                <br></br>

        <h1> {this.props.t('help.guidetitle')} </h1>
            <br></br>
                {this.props.t('help.guidedownload')} &nbsp;
                <button onClick={this.downloadFile}
                        style={{  margin: '5px 0 0 0 ' ,
                            background: 'rgb(250, 149, 129)',
                            border: '2px solid ghostwhite',
                            color: 'ghostwhite',
                            top: '12px'
                        }}
                >
                {this.props.t('help.guidedownloadbutton')}
        </button>
        </React.Fragment>

            )
        }
}

export default translate(Help);
