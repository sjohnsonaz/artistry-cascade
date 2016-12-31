import Cascade, { Component, observable } from 'cascade';

import { Button, Modal, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IModalViewProps {

}

export default class ModalView extends Component<IModalViewProps> {
    @observable modalOpen: boolean = false;
    @observable innerModalOpen: boolean = false;

    openModal = () => {
        this.modalOpen = true;
    }

    closeModal = () => {
        this.modalOpen = false;
    }

    openInnerModal = () => {
        this.innerModalOpen = true;
    }

    closeInnerModal = () => {
        this.innerModalOpen = false;
    }

    render() {
        return (
            <Section title="Modal">
                <Button onclick={this.openModal}>Open Modal</Button>
                <Modal open={this.modalOpen} onclose={this.closeModal} title="Modal">
                    <div>test</div>
                    <Button onclick={this.openInnerModal}>Open Inner Modal</Button>
                    <Modal open={this.innerModalOpen} onclose={this.closeInnerModal} title="Inner Modal">
                        inner test
                    </Modal>
                </Modal>
            </Section>
        );
    }
}
