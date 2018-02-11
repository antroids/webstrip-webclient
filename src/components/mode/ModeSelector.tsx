import * as React from 'react';

import { Menu, Dropdown, Button, Icon } from 'antd';

interface Config {
    [key: number]: string;
}
interface Props {
    title: string;
    mode: number;
    config: Config;
    onChange(mode: number): void;
}
interface State {
    value: string;
    mode: number;
}
export default class ModeSelector extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            mode: props.mode,
            value: props.config[props.mode]
        };
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.state.mode !== nextProps.mode) {
            this.updateValue(nextProps.mode);
        }
    }

    public render() {
        const menuItems = Object.keys(this.props.config).map(key => (
            <Menu.Item key={key}>{this.props.config[key]}</Menu.Item>
        ));
        const menu = (
            <Menu onClick={this.handleSelectMode}>
                {menuItems}
            </Menu>
        );

        return (
            <div>
                {`${this.props.title}: `}
                <Dropdown trigger={['click']} overlay={menu}>
                    <Button style={{marginLeft: 8}}>
                        {this.state.value} <Icon type="down"/>
                    </Button>
                </Dropdown>
            </div>);
    }

    private handleSelectMode = (param: any) => {
        const mode = param.key;
        this.updateValue(mode, () => this.props.onChange(mode));
    }

    private updateValue(mode: number, callback?: () => void) {
        this.setState({
            mode: mode,
            value: this.props.config[mode]
        }, callback);
    }
}