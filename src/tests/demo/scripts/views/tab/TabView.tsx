import Cascade, { Component, observable } from 'cascade';

import { Tab, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ITabViewProps {

}

export default class TabView extends Component<ITabViewProps> {
    render() {
        return (
            <Section title="Tab">
                <Tab titles={['Tab 1', 'Tab 2', 'Tab 3']} animated>
                    <div>Tab 1 Content<br />
                        <input type="text" />
                    </div>
                    <div>
                        Tab 2 Content<br />
                        More Content<br />
                        <input type="text" />
                    </div>
                    <div>
                        Tab 3 Content<br />
                        Event more Content<br />
                        Another line of Content<br />
                        <input type="text" />
                    </div>
                </Tab>
            </Section>
        );
    }
}
