import Cascade, { Component, observable } from 'cascade';

import { Button, ButtonGroup, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IButtonViewProps {

}

export default class ButtonView extends Component<IButtonViewProps> {
    @observable locked: boolean = false;

    lockButton = () => {
        this.locked = true;
        window.setTimeout(() => {
            this.locked = false;
        }, 1000);
    }

    render() {
        return (
            <Section title="Buttons">
                <h3>Individual Buttons</h3>
                <div>
                    <Button>Edit</Button>
                    <Button theme="primary">Save</Button>
                    <Button theme="danger">Delete</Button>
                </div>

                <h3>Disabled Buttons</h3>
                <div>
                    <Button disabled>Edit</Button>
                    <Button disabled theme="primary">Save</Button>
                    <Button disabled theme="danger">Delete</Button>
                </div>

                <h3>Button Group</h3>
                <ButtonGroup>
                    <Button>View</Button>
                    <Button popover="Popover" theme="primary">Edit</Button>
                    <Button theme="danger">Delete</Button>
                </ButtonGroup>

                <h3>Lockable Buttons</h3>
                <div>
                    <Button lockContent="Locked" locked={this.locked} onclick={this.lockButton}>Lockable Edit</Button>
                    <Button lockContent="Locked" locked={this.locked} onclick={this.lockButton} theme="primary">Lockable Save</Button>
                    <Button lockContent="Locked" locked={this.locked} onclick={this.lockButton} theme="danger">Lockable Delete</Button>
                </div>

                <h3>Tooltip</h3>
                <Button tooltip="Information..." tooltipDirection="right">Tooltip</Button>

                <h3>Popover</h3>
                <Button popover={<span><strong>Popover</strong> Text</span>} popoverDirection="right">Popover</Button>
            </Section>
        );
    }
}
