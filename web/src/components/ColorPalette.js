import React from 'react';
import ColorPicker from './ColorPicker'

import List, {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Button from 'material-ui/Button';

import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';

function ColorPalette(props) {
    const colors = props.value;
    const handleChange = (index) => {
        return (event) => { props.onColorChange(index, event) };
    };
    const handleRemove = (index) => {
        return (event) => { props.onColorRemoved(index, event) };
    };
    const handleAdd = () => {
        return (event) => { props.onColorAdded(event) };
    };
    const colorPickers = colors.map((color, index) =>
        <ListItem key={index} divider={true}>
            <ColorPicker id={index} value={color} onChange={handleChange(index)}/>
            <ListItemText primary={color}/>
            <ListItemSecondaryAction>
                <Button raised size='small' onClick={handleRemove(index)} aria-label="Delete">
                    <DeleteIcon />
                    Remove Color
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
    const addButton = (
        <Button color='secondary' raised size='small' onClick={handleAdd()}>
            <AddIcon/>
            Add Color
        </Button>);

    return (
        <div>
            {addButton}
            <List>
                {colorPickers}
            </List>
            {addButton}
        </div>
    );
}

export default ColorPalette;