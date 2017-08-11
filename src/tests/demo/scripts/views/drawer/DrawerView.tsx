import Cascade, { Component, observable } from 'cascade';

import { Button, Drawer, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IDrawerViewProps {

}

export default class DrawerView extends Component<IDrawerViewProps> {
    @observable drawerOpen: boolean = false;

    openDrawer = () => {
        this.drawerOpen = true;
    }

    closeDrawer = () => {
        this.drawerOpen = false;
    }

    render() {
        return (
            <Section title="Drawer">
                <Button onclick={this.openDrawer}>Open Drawer</Button>
                <Drawer open={this.drawerOpen} onClose={this.closeDrawer}>
                    <Button onclick={this.closeDrawer} className="pull-right">Close</Button>
                    <p>Drawer Content</p>
                </Drawer>
            </Section>
        );
    }
}
