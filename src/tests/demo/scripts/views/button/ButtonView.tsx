import Cascade, { Component } from 'cascade';

import { Button, ButtonGroup } from '../../../../../scripts/modules/CascadeComponents';

export interface IButtonViewProps {

}

export default class ButtonView extends Component<IButtonViewProps> {
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
            </div>
        );
    }
}
