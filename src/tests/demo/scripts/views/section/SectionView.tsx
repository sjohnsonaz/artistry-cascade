import Cascade, { Component, observable } from 'cascade';

import { Button, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ISectionViewProps {

}

export default class SectionView extends Component<ISectionViewProps> {
    @observable locked: boolean = false;
    lockContents = () => {
        this.locked = true;
        window.setTimeout(() => {
            this.locked = false;
        }, 3000);
    }
    render() {
        return (
            <div>
                <h2>Section</h2>
                <Section title="Section" locked={this.locked}>
                    Section Content<br />
                    <Button onclick={this.lockContents}>Lock</Button>
                </Section>
            </div>
        );
    }
}
