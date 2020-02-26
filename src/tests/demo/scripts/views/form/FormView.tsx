import Cascade, { Component, observable } from 'cascade';

import { ActionBar, AmountInput, Button, Form, FormGroup, Divider, FormText, Input, Section, TimeInput, TimePicker, Select } from '../../../../../scripts/modules/ArtistryCascade';

export interface IFormViewProps {

}

export default class FormView extends Component<IFormViewProps> {
    @observable date: Date = new Date(Date.now());
    @observable amount: number = 0;
    @observable selectValue = 'a';

    render() {
        return (
            <Section header="Form" headerSpace>
                <Form
                    size="small"
                    onEnter={(event: KeyboardEvent) => {
                        event.preventDefault();
                        console.log('enter')
                    }}
                    onEscape={(event: KeyboardEvent) => {
                        event.preventDefault();
                        console.log('escape')
                    }}
                >
                    <FormGroup label="Value">
                        <Input type="text" fill />
                    </FormGroup>
                    <Divider />
                    <FormText>
                        <h2>Masked Inputs</h2>
                    </FormText>
                    <FormGroup label="Time">
                        <Input mask="[[0-23]]:[[0-59]]" fill />
                    </FormGroup>
                    <FormGroup label="Phone">
                        <Input mask="(999) 999-9999" fill />
                    </FormGroup>
                    <FormGroup label="Color">
                        <Input mask="#000000" fill />
                    </FormGroup>
                    <Divider />
                    <FormText>
                        <h3>Test Examples</h3>
                    </FormText>
                    <FormGroup label="99999">
                        <Input mask="99999" fill />
                    </FormGroup>
                    <FormGroup label="aaaaa">
                        <Input mask="aaaaa" fill />
                    </FormGroup>
                    <FormGroup label="nnnnn">
                        <Input mask="nnnnn" fill />
                    </FormGroup>
                    <FormGroup label="[[0-23]]00000">
                        <Input mask="[[0-23]]00000" fill />
                    </FormGroup>
                    <FormGroup label="99aa99aa99aa">
                        <Input mask="99aa99aa99aa" fill />
                    </FormGroup>
                    <Divider />
                    <FormText>
                        <h3>Advanced Input</h3>
                    </FormText>
                    <FormGroup label="Select" nonLabel>
                        <Select
                            data={['a', 'b', 'c']}
                            model={this}
                            modelProp="selectValue"
                        />
                    </FormGroup>
                    <FormGroup label="Time Input">
                        <TimeInput
                            fill
                            value={this.date.toUTCString()}
                            oninput={(event) => {
                                let value = (event.target as any).value;
                                let date = new Date(this.date);
                                let parts = value.split(':').map(part => parseInt(part));
                                if (parts) {
                                    date.setHours(parts[0], parts[1]);
                                }
                                this.date = date;
                                console.log(date);
                            }}
                        />
                    </FormGroup>
                    <FormGroup label="Time Picker" nonLabel>
                        <TimePicker
                            value={this.date}
                            onChange={(event, date?: Date) => {
                                event;
                                if (date) {
                                    this.date = date;
                                    console.log(date);
                                }
                            }}
                        />
                    </FormGroup>
                    <FormGroup label="Time with Seconds">
                        <TimeInput
                            fill
                            seconds
                            value={this.date.toUTCString()}
                            oninput={(event) => {
                                let value = (event.target as any).value;
                                let date = new Date(this.date);
                                let parts = value.split(':').map(part => parseInt(part));
                                if (parts) {
                                    date.setHours(parts[0], parts[1], parts[2]);
                                }
                                this.date = date;
                                console.log(date);
                            }}
                        />
                    </FormGroup>
                    <FormGroup label="Amount" nonLabel>
                        <AmountInput value={this.amount} minimum={1} maximum={10} onChange={(value) => {
                            this.amount = value;
                        }} />
                    </FormGroup>
                    <Divider />
                    <ActionBar>
                        <Button>Cancel</Button>
                        <Button theme="primary">Save</Button>
                    </ActionBar>
                </Form>
            </Section>
        );
    }
}
