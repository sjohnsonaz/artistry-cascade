import Cascade, { Component, observable } from 'cascade';

import { Button, ButtonBar, Modal, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IModalViewProps {

}

export default class ModalView extends Component<IModalViewProps> {
    @observable modalOpen: boolean = false;
    @observable modalLock: boolean = false;
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

    lockModal = () => {
        this.modalLock = true;
        window.setTimeout(() => {
            this.modalLock = false;
        }, 1000);
    }

    render() {
        return (
            <Section title="Modal">
                <Button onclick={this.openModal}>Open Modal</Button>
                <Modal open={this.modalOpen} onclose={this.closeModal} title="Modal" animation="top" lockable locked={this.modalLock} lockScroll>
                    <div>test</div>
                    <ButtonBar>
                        <Button onclick={this.openInnerModal}>Open Inner Modal</Button>
                        <Button onclick={this.lockModal}>Lock Modal</Button>
                    </ButtonBar>
                    <Modal open={this.innerModalOpen} onclose={this.closeInnerModal} title="Inner Modal" animation="center">
                        <div>inner test</div>
                    </Modal>
                </Modal>
            </Section>
        );
    }
}
