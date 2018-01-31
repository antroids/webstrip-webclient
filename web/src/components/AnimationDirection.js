import React from 'react'
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';

function AnimationDirection(props) {
    return (
        <div>
            <Typography type='caption'>Animation Normal Direction:</Typography>
            <Switch checked={props.value} onChange={props.onChange}/>
        </div>
    );
}

export default AnimationDirection;