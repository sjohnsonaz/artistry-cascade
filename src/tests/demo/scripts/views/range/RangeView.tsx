import Cascade, { Component } from 'cascade';

import { Range, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface IRangeViewProps {

}

export default class RangeView extends Component<IRangeViewProps> {
    render() {
        return (
            <Section header="Range" space headerSpace>
                <Range />
            </Section>
        );
    }
}
