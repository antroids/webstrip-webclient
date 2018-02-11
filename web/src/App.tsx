import * as React from 'react';
import { Layout, Tabs, Button, Divider, Switch } from 'antd';
import ColorsContainer from './components/color/ColorsContainer';

import {
    ANIMATION_MODE,
    ANIMATION_MODES_CONFIG,
    ANIMATION_PROGRESS_MODE,
    ANIMATION_PROGRESS_MODES_CONFIG,
    COLOR_SELECTION_MODE,
    COLOR_SELECTION_MODES_CONFIG,
    WebStripMode
} from './service/WebStripMode';
import ModeSelector from './components/mode/ModeSelector';
import ModePercentSlider from './components/mode/ModePercentSlider';
import Api from './api';

class App extends React.Component<any, WebStripMode> {

    constructor(props: any) {
        super(props);

        this.state = {
            index: 0,
            description: '',
            animationMode: ANIMATION_MODE.NONE,
            animationSpeed: 128,
            animationProgressMode: ANIMATION_PROGRESS_MODE.LINEAR,
            animationIntensity: 128,
            animationDirection: true,
            colors: [],
            colorSelectionMode: COLOR_SELECTION_MODE.ASC
        };
        Api.getMode().then(response => {
            this.setState(response);
        });
    }

    public render() {
        return (
            <Layout className="App">
                <Layout.Header>header</Layout.Header>
                <Layout>
                    <Layout.Content style={{padding: '20px 50px'}}>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Pick Color" key="1">
                                <ModeSelector
                                    title="Color Selection Mode"
                                    mode={this.state.colorSelectionMode}
                                    config={COLOR_SELECTION_MODES_CONFIG}
                                    onChange={this.onColorSelectionModeChange}
                                />
                                <Divider />
                                <ColorsContainer
                                    colors={this.state.colors}
                                    onChange={this.onColorsChange}
                                />
                                <Divider />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Set Animation" key="2">
                                <ModeSelector
                                    title="Mode"
                                    mode={this.state.animationMode}
                                    config={ANIMATION_MODES_CONFIG}
                                    onChange={this.onAnimationModeChange}
                                />
                                <Divider />
                                <ModePercentSlider
                                    title="Speed"
                                    value={this.state.animationSpeed}
                                    onChange={this.onAnimationSpeedChange}
                                />
                                <Divider />
                                <ModeSelector
                                    title="Progress Mode"
                                    mode={this.state.animationProgressMode}
                                    config={ANIMATION_PROGRESS_MODES_CONFIG}
                                    onChange={this.onAnimationProgressModeChange}
                                />
                                <Divider />

                                <ModePercentSlider
                                    title="Intensity"
                                    value={this.state.animationIntensity}
                                    onChange={this.onAnimationIntensityChange}
                                />
                                <Divider />
                                <div>
                                    <div style={{display: 'inline-block', paddingRight: '10px'}}>
                                        Direction:
                                    </div>
                                    <Switch
                                        checkedChildren="Normal"
                                        unCheckedChildren="Reverse"
                                        defaultChecked={true}
                                        onChange={this.onAnimationDirectionChange}
                                    />
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </Layout.Content>
                </Layout>
                <Layout.Footer>
                    <Button type="primary" onClick={this.refresh}>Refresh</Button>
                </Layout.Footer>
            </Layout>
        );
    }

    private onColorSelectionModeChange = (colorSelectionMode: COLOR_SELECTION_MODE) => {
        this.setState({ colorSelectionMode });
    }

    private onColorsChange = (colors: string[]) => {
        this.setState({ colors });
    }

    private onAnimationModeChange = (animationMode: ANIMATION_MODE) => {
        this.setState({ animationMode });
    }

    private onAnimationProgressModeChange = (animationProgressMode: ANIMATION_PROGRESS_MODE) => {
        this.setState({ animationProgressMode });
    }

    private onAnimationSpeedChange = (animationSpeed: number) => {
        this.setState({ animationSpeed });
    }

    private onAnimationIntensityChange = (animationIntensity: number) => {
        this.setState({ animationIntensity });
    }

    private onAnimationDirectionChange = (animationDirection: boolean) => {
        this.setState({ animationDirection });
    }

    private refresh = () => {
        Api.setMode(this.state as Partial<WebStripMode>).then(response => {
            this.setState(response);
        });
    }
}

export default App;
