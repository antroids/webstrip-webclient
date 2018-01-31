import React from 'react'
import {WebStripAnimationMode} from "../api";
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import {InputLabel} from 'material-ui/Input';
import Typography from 'material-ui/Typography';

function AnimationMode(props) {
    let animationModeOptions = WebStripAnimationMode.ALL.map((m, index) =>
        <MenuItem key={index} value={m.id}>{m.name}</MenuItem>
    );

    return (
        <div>
            <Typography type='caption'>Animation Mode:</Typography>
            <Select value={props.value} onChange={props.onChange}>
                {animationModeOptions}
            </Select>
        </div>
    );
}

export default AnimationMode;