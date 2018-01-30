import React from 'react';
import WebStripClient from './WebStripClient';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: 'No',
            mode: {}
        };

        this.api = new WebStripClient();

        this.api.getMode().then((mode) => {
            this.setState({
                msg: JSON.stringify(mode),
                mode: mode
            });
        }).catch((error) => {
            this.setState({msg: error.toString()});
        });

        this.handleColorPickerChange = this.handleColorPickerChange.bind(this);
    }

    handleColorPickerChange(event) {
        this.api.setMode(Object.assign(this.state.mode, {colors: [event.target.value]})).then(mode => {
            this.setState({
                msg: "OK",
                mode: mode
            });
        });
    }

    render() {
        return (
        <div>
            Msg: {this.state.msg} <br/>

            <input type="color" name="colorPicker" onChange={this.handleColorPickerChange}/>
        </div>
        )
    }
}

export default App;