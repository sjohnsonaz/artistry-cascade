import Cascade, { Component } from 'cascade';

import { Section, Toggle } from '../../../../../scripts/modules/CascadeComponents';

export interface IToggleViewProps {

}

export default class ToggleView extends Component<IToggleViewProps> {
    render() {
        return (
            <Section title="Toggle">
                <Toggle />
            </Section>
        );
    }
}
