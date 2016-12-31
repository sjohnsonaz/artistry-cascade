import Cascade, { Component, observable } from 'cascade';

import { Button, ButtonGroup } from '../../../../../scripts/modules/CascadeComponents';

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
            <div>
                <h2>Tooltip</h2>
                <Button tooltip="Information..." tooltipDirection="right">Tooltip</Button>

                <h2>Popover</h2>
                <Button popover={<span><strong>Popover</strong> Text</span>} popoverDirection="right">Popover</Button>

                <h2>Button Group</h2>
                <ButtonGroup>
                    <Button popover="Popover" theme="primary">Edit</Button>
                    <Button theme="danger">Delete</Button>
                    <Button>View</Button>
                </ButtonGroup>

                <h2>Lockable Buttons</h2>
                <Button lockContent="Locked" locked={this.locked} onclick={this.lockButton}>Lockable Button</Button>
            </div>
        );
    }
}
