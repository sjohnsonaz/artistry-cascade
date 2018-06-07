import Cascade, { Component } from 'cascade';

import { ProgressBar, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IProgressBarViewProps {

}

export default class ProgressBarView extends Component<IProgressBarViewProps> {
    render() {
        return (
            <Section header="Progress Bar" space>
                <ProgressBar value={50} />
            </Section>
        );
    }
}
