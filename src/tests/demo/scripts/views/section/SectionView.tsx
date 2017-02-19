import Cascade, { Component, observable } from 'cascade';

import { Button, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ISectionViewProps {

}

export default class SectionView extends Component<ISectionViewProps> {
    @observable locked: boolean = false;
    @observable closed: boolean = false;

    close = () => {
        this.closed = !this.closed;
    }

    lockContents = () => {
        this.locked = true;
        window.setTimeout(() => {
            this.locked = false;
        }, 1000);
    }

    render() {
        return (
            <Section title="Section" lockable closeable locked={this.locked} closed={this.closed} onClose={this.close}>
                Section Content<br />
                <Button onclick={this.lockContents}>Lock</Button>
            </Section>
        );
    }
}
