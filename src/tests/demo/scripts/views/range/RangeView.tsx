import Cascade, { Component } from 'cascade';

import { Range, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IRangeViewProps {

}

export default class RangeView extends Component<IRangeViewProps> {
    render() {
        return (
            <Section header="Range" space>
                <Range />
            </Section>
        );
    }
}
