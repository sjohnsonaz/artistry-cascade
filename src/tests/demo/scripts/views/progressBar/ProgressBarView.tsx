import Cascade, { Component } from 'cascade';

import { ProgressBar, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface IProgressBarViewProps {

}

export default class ProgressBarView extends Component<IProgressBarViewProps> {
    render() {
        return (
            <Section header="Progress Bar" space headerSpace>
                <h3>Default</h3>
                <ProgressBar value={50} min={0} max={100} decimal={2} decimalFixed showPercentage />
                <h3>Success</h3>
                <ProgressBar value={50} min={0} max={100} decimal={2} decimalFixed showPercentage type="success" />
            </Section>
        );
    }
}