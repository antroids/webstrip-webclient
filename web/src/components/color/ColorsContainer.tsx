import * as React from 'react';
import { Button } from 'antd';
import ColorPicker from './ColorPicker';

interface Props {
    colors?: string[];
    onChange(colors: string[]): void;
}

interface State {
    colors: string[];
}

export default class ColorsContainer extends React.Component<Props, State> {

    private static LIMIT = 32;

    constructor(props: Props) {
        super(props);

        this.state = {
            colors: props.colors || []
        };
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (!nextProps.colors || this.props.colors === nextProps.colors) {
            return;
        }
        this.setState({
            colors: nextProps.colors
        });
    }

    public render() {
        return (
            <div>
                {this.renderColors()}
                {this.renderAddButton()}
            </div>
        );
    }

    public getColors(): string[] {
        return this.state.colors;
    }
    
    private renderColors() {
        return this.state.colors.map((color: string, index: number) => (
            <div key={index} style={{display: 'inline-block', padding: '5px'}}>
                <ColorPicker
                    id={index}
                    color={color}
                    onChange={this.handleColorChange}
                    onDelete={this.handleColorDelete}
                />
            </div>
        ));
    }

    private renderAddButton() {
        if (this.state.colors.length >= ColorsContainer.LIMIT) {
            return null;
        }
        return (
            <Button shape="circle" icon="plus" onClick={this.handleAddClick} />
        );
    }

    private handleColorChange = (color: string, id: number) => {
        const colors = this.state.colors;
        colors.splice(id, 1, color);
        this.setState({ colors }, () => this.props.onChange(colors));
    }

    private handleColorDelete = (id: number) => {
        const colors = [...this.state.colors];
        colors.splice(id, 1);
        this.setState({ colors }, () => this.props.onChange(colors));
    }

    private handleAddClick = () => {
        const colors = this.state.colors;
        colors.push('#000000');
        this.setState({ colors });
    }

}