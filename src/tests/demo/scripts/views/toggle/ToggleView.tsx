import Cascade, { Component } from 'cascade';

import { Section, Toggle } from '../../../../../scripts/modules/ArtistryCascade';

export interface IToggleViewProps {

}

export default class ToggleView extends Component<IToggleViewProps> {
    render() {
        return (
            <Section header="Toggle" space>
                <Toggle />
            </Section>
        );
    }
}
