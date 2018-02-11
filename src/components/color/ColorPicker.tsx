import * as React from 'react';
import { Tag } from 'antd';
import { SyntheticEvent } from 'react';

interface Props {
    id: number;
    color: string;
    onChange(color: string, id: number): void;
    onDelete(id: number): void;
}

export default class ColorPicker extends React.Component<Props> {

    private colorPicker: HTMLInputElement;

    public render() {
        const TagComponent: any = Tag;
        return (
            <TagComponent
                color={this.props.color}
                key={this.props.id}
                closable={true}
                onClick={this.handleChangeColor}
                onClose={this.handleClose}
            >
                {this.props.color}
                <input
                    type="color"
                    hidden={true}
                    ref={c => this.colorPicker = c!}
                    onChange={this.changeColor}
                />
            </TagComponent>
        );
    }

    private handleChangeColor = () => {
        this.colorPicker.click();
    }

    private handleClose = (e: SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onDelete(this.props.id);
    }

    private changeColor = (e: SyntheticEvent<HTMLInputElement>) => {
        const color = (e.target as HTMLInputElement).value;
        this.props.onChange(color, this.props.id);
    }
}