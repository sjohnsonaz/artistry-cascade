import Cascade, { Component } from 'cascade';

import { Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ISectionViewProps {

}

export default class SectionView extends Component<ISectionViewProps> {
    render() {
        return (
            <div>
                <h2>Section</h2>
                <Section title="Section">
                    Section Content
                </Section>
            </div>
        );
    }
}
