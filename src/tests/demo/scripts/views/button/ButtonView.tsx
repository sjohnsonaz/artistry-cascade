import Cascade, { Component, observable } from 'cascade';

import { Button, ButtonBar, ButtonGroup, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface IButtonViewProps {

}

export default class ButtonView extends Component<IButtonViewProps> {
    @observable locked: boolean = false;
    @observable popoverOpen: boolean = false;

    lockButton = () => {
        this.locked = true;
        window.setTimeout(() => {
            this.locked = false;
        }, 1000);
    }

    openPopover = () => {
        this.popoverOpen = true;
    }

    closePopover = () => {
        this.popoverOpen = false;
    }

    render() {
        return (
            <Section header="Buttons" space headerSpace>
                <h3>Individual Buttons</h3>
                <div>
                    <Button>Edit</Button>{' '}
                    <Button theme="primary">Save</Button>{' '}
                    <Button theme="danger">Delete</Button>
                </div>

                <h3>Text Only Buttons</h3>
                <div>
                    <Button display="textonly">Edit</Button>{' '}
                    <Button display="textonly" theme="primary">Save</Button>{' '}
                    <Button display="textonly" theme="danger">Delete</Button>
                </div>

                <h3>Outline Buttons</h3>
                <div>
                    <Button display="outline">Edit</Button>{' '}
                    <Button display="outline" theme="primary">Save</Button>{' '}
                    <Button display="outline" theme="danger">Delete</Button>
                </div>

                <h3>Button Sizes</h3>
                <div>
                    <Button displaySize="small">Small</Button>{' '}
                    <Button>Medium</Button>{' '}
                    <Button displaySize="large">Large</Button>
                </div>

                <h3>Disabled Buttons</h3>
                <div>
                    <Button disabled>Edit</Button>{' '}
                    <Button disabled theme="primary">Save</Button>{' '}
                    <Button disabled theme="danger">Delete</Button>
                </div>

                <h3>Button Group</h3>
                <ButtonGroup>
                    <Button>View</Button>
                    <Button theme="primary" popover="Popover" popoverAlign="left">Edit</Button>
                    <Button theme="danger">Delete</Button>
                </ButtonGroup>

                <h3>Button Bar</h3>
                <ButtonBar>
                    <Button>View</Button>
                    <Button theme="primary" popover="Popover" popoverAlign="left">Edit</Button>
                    <Button theme="danger">Delete</Button>
                </ButtonBar>

                <h3>Lockable Buttons</h3>
                <div>
                    <Button lockContent="Locked" locked={this.locked} onclick={this.lockButton}>Lockable Edit</Button>{' '}
                    <Button lockContent="Locked" locked={this.locked} onclick={this.lockButton} theme="primary">Lockable Save</Button>{' '}
                    <Button lockContent="Locked" locked={this.locked} onclick={this.lockButton} theme="danger">Lockable Delete</Button>
                </div>

                <h3>Tooltip</h3>
                <Button tooltip="Information..." tooltipDirection="right">Tooltip</Button>

                <h3>Popover</h3>
                <Button popover={<span><strong>Popover</strong> Text</span>} popoverDirection="right">Popover</Button>

                <h3>Popover Menu</h3>
                <Button popover={<span><strong>Popover</strong> Text</span>} popoverDirection="right"
                    popoverMenu
                    popoverOpen={this.popoverOpen}
                    onPopoverClose={this.closePopover}
                    onclick={this.openPopover}
                >Popover Menu</Button>
            </Section>
        );
    }
}
