import Cascade, { Component, observable } from 'cascade';

import { ActionBar, AmountInput, Button, Form, FormContainer, Divider, FormText, Input, Section, TimeInput, TimePicker } from '../../../../../scripts/modules/ArtistryCascade';

export interface IFormViewProps {

}

export default class FormView extends Component<IFormViewProps> {
    @observable date: Date = new Date(Date.now());
    @observable amount: number = 0;

    render() {
        return (
            <Section header="Form">
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
                    <FormContainer label="Value">
                        <Input type="text" fill />
                    </FormContainer>
                    <Divider />
                    <FormText>
                        <h2>Masked Inputs</h2>
                    </FormText>
                    <FormContainer label="Time">
                        <Input mask="[[0-23]]:[[0-59]]" fill />
                    </FormContainer>
                    <FormContainer label="Phone">
                        <Input mask="(999) 999-9999" fill />
                    </FormContainer>
                    <FormContainer label="Color">
                        <Input mask="#000000" fill />
                    </FormContainer>
                    <Divider />
                    <FormText>
                        <h3>Test Examples</h3>
                    </FormText>
                    <FormContainer label="99999">
                        <Input mask="99999" fill />
                    </FormContainer>
                    <FormContainer label="aaaaa">
                        <Input mask="aaaaa" fill />
                    </FormContainer>
                    <FormContainer label="nnnnn">
                        <Input mask="nnnnn" fill />
                    </FormContainer>
                    <FormContainer label="[[0-23]]00000">
                        <Input mask="[[0-23]]00000" fill />
                    </FormContainer>
                    <FormContainer label="99aa99aa99aa">
                        <Input mask="99aa99aa99aa" fill />
                    </FormContainer>
                    <Divider />
                    <FormText>
                        <h3>Advanced Input</h3>
                    </FormText>
                    <FormContainer label="Time Input">
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
                    </FormContainer>
                    <FormContainer label="Time Picker" nonLabel>
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
                    </FormContainer>
                    <FormContainer label="Time with Seconds">
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
                    </FormContainer>
                    <FormContainer label="Amount" nonLabel>
                        <AmountInput value={this.amount} minimum={1} maximum={10} onChange={(value) => {
                            this.amount = value;
                        }} />
                    </FormContainer>
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
