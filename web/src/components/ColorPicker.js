import React from 'react'

function ColorPicker(props) {
    return <input type="color" value={props.value} onChange={props.onChange} />
}

export default ColorPicker;