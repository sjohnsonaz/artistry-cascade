import Cascade, { Component } from 'cascade';

import { ProgressBar } from '../../../../../scripts/modules/CascadeComponents';

export interface IProgressBarViewProps {

}

export default class ProgressBarView extends Component<IProgressBarViewProps> {
    render() {
        return (
            <ProgressBar value={50} />
        );
    }
}
