import Cascade, { Component, observable } from 'cascade';

import { Tab, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ITabViewProps {

}

export default class TabView extends Component<ITabViewProps> {
    render() {
        return (
            <Section title="Tab">
                <Tab titles={['Tab 1', 'Tab 2', 'Tab 3']}>
                    <div>Tab 1 Content</div>
                    <div>Tab 2 Content</div>
                    <div>Tab 3 Content</div>
                </Tab>
            </Section>
        );
    }
}
