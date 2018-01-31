import React from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Typography from 'material-ui/Typography';

function AnimationIntensity(props) {
    return (
        <div>
            <Typography type='caption'>Animation Intensity:</Typography>
            <Slider value={props.value} onChange={props.onChange} min={1} max={255}/>
        </div>
    );
}

export default AnimationIntensity;