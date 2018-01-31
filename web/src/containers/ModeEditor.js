import React from 'react'
import {WebStripClient, WebStripMode, WebStripColorSelectionMode} from "../api";
import update from 'immutability-helper';

import ColorPalette from '../components/ColorPalette'
import ColorSelectionMode from "../components/ColorSelectionMode";

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ClearIcon from 'material-ui-icons/Clear';
import SaveIcon from 'material-ui-icons/Save';
import SendIcon from 'material-ui-icons/Send';
import ColorLensIcon from 'material-ui-icons/ColorLens';
import SlideshowIcon from 'material-ui-icons/Slideshow';
import AnimationMode from "../components/AnimationMode";
import AnimationSpeed from "../components/AnimationSpeed";
import AnimationProgressMode from "../components/AnimationProgressMode";
import AnimationIntensity from "../components/AnimationIntensity";
import AnimationDirection from "../components/AnimationDirection";

class ModeEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: 'No',
            mode: new WebStripMode(),
            tabIndex: 0
        };

        this.api = new WebStripClient();

        this.handleGetClick = this.handleGetClick.bind(this);
        this.handleApplyClick = this.handleApplyClick.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleColorRemoved = this.handleColorRemoved.bind(this);
        this.handleColorAdded = this.handleColorAdded.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleModeFieldChange = this.handleModeFieldChange.bind(this);

        this.handleGetClick();
    }

    handleColorChange(index, event) {
        this.setState({
            mode: Object.assign({}, this.state.mode, {
                colors: update(this.state.mode.colors, {[index]: {$set: event.target.value}})
            })
        });
    };

    handleColorRemoved(index, event) {
        this.setState({
            mode: Object.assign({}, this.state.mode, {
                colors: update(this.state.mode.colors, {$splice: [[index, 1]]})
            })
        });
    }

    handleColorAdded(event) {
        this.setState({
            mode: Object.assign({}, this.state.mode, {
                colors: [...this.state.mode.colors, "#000000"]
            })
        });
    }

    handleGetClick() {
        this.processModeResponse(this.api.getMode());
    }

    handleApplyClick() {
        this.processModeResponse(this.api.setMode(this.state.mode));
    }

    handleTabChange(event, tabIndex) {
        this.setState({tabIndex: tabIndex});
    }

    handleModeFieldChange(fieldName) {
        return (event, v) => {
            let value = v === undefined ? (event.target !== undefined ? event.target.value : event) : v;
            this.setState({
                mode: Object.assign({}, this.state.mode, {
                    [fieldName]: value
                })
            });
        };
    }

    processModeResponse(response) {
        response.then((mode) => {
            this.setState(Object.assign({}, this.state, {
                mode: mode
            }));
        }).catch((error) => {
            this.setState({msg: error.toString()});
        });
    }

    render() {
        const {tabIndex} = this.state;

        return (
            <div>
                Msg: {this.state.msg} <br/>

                <AppBar position="static" color='default'>
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            Web Strip Mode Editor
                        </Typography>
                    </Toolbar>
                    <Tabs value={tabIndex} onChange={this.handleTabChange}>
                        <Tab label="Color" icon={<ColorLensIcon/>}/>
                        <Tab label="Animation" icon={<SlideshowIcon/>}/>
                    </Tabs>
                </AppBar>

                {tabIndex === 0 && this.renderColorTab()}
                {tabIndex === 1 && this.renderAnimationTab()}


                <Button raised size='small' onClick={this.handleGetClick}>
                    <ClearIcon/>
                    Refresh
                </Button>
                <Button raised size='small' onClick={this.handleApplyClick}>
                    <SendIcon/>
                    Apply
                </Button>
                <Button raised size='small'>
                    <SaveIcon/>
                    Save
                </Button>
            </div>
        )
    }

    renderColorTab() {
        return (
            <Typography component='div' style={{ padding: 8 * 3 }}>
                <ColorSelectionMode value={this.state.mode.colorSelectionMode} onChange={this.handleModeFieldChange('colorSelectionMode')}/>
                <br/>
                <ColorPalette value={this.state.mode.colors}
                              onColorChange={this.handleColorChange}
                              onColorRemoved={this.handleColorRemoved}
                              onColorAdded={this.handleColorAdded}/>
            </Typography>
        );
    }

    renderAnimationTab() {
        return (
            <Typography component='div' style={{ padding: 8 * 3 }}>
                <AnimationMode value={this.state.mode.animationMode} onChange={this.handleModeFieldChange('animationMode')}/>
                <AnimationSpeed value={this.state.mode.animationSpeed} onChange={this.handleModeFieldChange('animationSpeed')}/>
                <AnimationProgressMode value={this.state.mode.animationProgressMode} onChange={this.handleModeFieldChange('animationProgressMode')}/>
                <AnimationIntensity value={this.state.mode.animationIntensity} onChange={this.handleModeFieldChange('animationIntensity')}/>
                <AnimationDirection value={this.state.mode.animationDirection} onChange={this.handleModeFieldChange('animationDirection')}/>
            </Typography>
        );
    }
}

export default ModeEditor;