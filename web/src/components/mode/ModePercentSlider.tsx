import * as React from 'react';

import { Slider } from 'antd';

interface Props {
    title: string;
    value: number;
    onChange(value: number): void;
}
interface State {
    value: number;
}
export default class ModePercentSlider extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.state.value !== nextProps.value) {
            this.updateValue(nextProps.value);
        }
    }

    public render() {
        const marks = {
            0: '0%',
            127: '50%',
            255: '100%'
        };
        return (
            <div>
                {`${this.props.title}: `}
                <div style={{marginLeft: '10px'}}>
                    <Slider
                        min={0}
                        max={255}
                        marks={marks}
                        defaultValue={this.state.value}
                        tipFormatter={this.formatter}
                        onChange={this.handleChangeValue}
                    />
                </div>
            </div>
        );
    }

    private formatter = (value: number) => {
        const percentValue = 100 / 255 * value;
        return `${percentValue.toFixed(1)}%`;
    }

    private handleChangeValue = (value: number) => {
        this.updateValue(value, () => this.props.onChange(value));
    }

    private updateValue(value: number, callback?: () => void) {
        this.setState({
            value: value
        }, callback);
    }
}