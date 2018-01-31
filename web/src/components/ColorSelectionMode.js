import React from 'react'
import {WebStripColorSelectionMode} from "../api";
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import {InputLabel} from 'material-ui/Input';
import Typography from 'material-ui/Typography';

function ColorSelectionMode(props) {
    let colorSelectionModeOptions = WebStripColorSelectionMode.ALL.map((m, index) =>
        <MenuItem key={index} value={m.id}>{m.name}</MenuItem>
    );

    return (
        <div>
            <Typography type='caption'>Color Selection Mode:</Typography>
            <Select value={props.value} onChange={props.onChange}>
                {colorSelectionModeOptions}
            </Select>
        </div>
    );
}

export default ColorSelectionMode;