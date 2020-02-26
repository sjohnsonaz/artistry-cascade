import Cascade, { Component, observable } from 'cascade';

import { ActionBar, Button, Form, FormGroup, Divider, Drawer, Section } from '../../../../../scripts/modules/ArtistryCascade';

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
            <Section header="Drawer" space headerSpace>
                <Button onclick={this.openDrawer}>Open Drawer</Button>
                <Drawer open={this.drawerOpen} onClose={this.closeDrawer}>
                    <Button onclick={this.closeDrawer} className="pull-right">Close</Button>
                    <p>Drawer Content</p>
                    <br />
                    <Form>
                        <FormGroup label="Input">
                            <input className="input" />
                        </FormGroup>
                        <Divider />
                        <ActionBar>
                            <Button theme="primary">OK</Button>
                        </ActionBar>
                    </Form>
                </Drawer>
            </Section>
        );
    }
}
