import React from 'react'
import {WebStripAnimationProgressMode} from "../api";
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';

function AnimationProgressMode(props) {
    let animationProgressModeOptions = WebStripAnimationProgressMode.ALL.map((m, index) =>
        <MenuItem key={index} value={m.id}>{m.name}</MenuItem>
    );

    return (
        <div>
            <Typography type='caption'>Animation Progress Mode:</Typography>
            <Select value={props.value} onChange={props.onChange}>
                {animationProgressModeOptions}
            </Select>
        </div>
    );
}

export default AnimationProgressMode;