import Cascade, { Component } from 'cascade';

import { Button, Form, FormAction, FormContainer, FormDivider, FormInput, FormText, Section, TimeInput } from '../../../../../scripts/modules/ArtistryCascade';

export interface IFormViewProps {

}

export default class FormView extends Component<IFormViewProps> {
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
                        <FormInput type="text" fill />
                    </FormContainer>
                    <FormDivider />
                    <FormText>
                        <h2>Masked Inputs</h2>
                    </FormText>
                    <FormContainer label="Time">
                        <FormInput mask="[[0-23]]:[[0-59]]" fill />
                    </FormContainer>
                    <FormContainer label="Phone">
                        <FormInput mask="(999) 999-9999" fill />
                    </FormContainer>
                    <FormContainer label="Color">
                        <FormInput mask="#000000" fill />
                    </FormContainer>
                    <FormDivider />
                    <FormText>
                        <h3>Test Examples</h3>
                    </FormText>
                    <FormContainer label="99999">
                        <FormInput mask="99999" fill />
                    </FormContainer>
                    <FormContainer label="aaaaa">
                        <FormInput mask="aaaaa" fill />
                    </FormContainer>
                    <FormContainer label="nnnnn">
                        <FormInput mask="nnnnn" fill />
                    </FormContainer>
                    <FormContainer label="[[0-23]]00000">
                        <FormInput mask="[[0-23]]00000" fill />
                    </FormContainer>
                    <FormContainer label="99aa99aa99aa">
                        <FormInput mask="99aa99aa99aa" fill />
                    </FormContainer>
                    <FormDivider />
                    <FormText>
                        <h3>Advanced Input</h3>
                    </FormText>
                    <FormContainer label="Time">
                        <TimeInput
                            fill
                            value={(new Date(Date.now())).toUTCString()}
                            onchange={(event, date?: Date) => {
                                if (date) {
                                    console.log(date);
                                }
                            }}
                        />
                    </FormContainer>
                    <FormContainer label="Time with Seconds">
                        <TimeInput
                            fill
                            seconds
                            value={(new Date(Date.now())).toUTCString()}
                            onchange={(event, date?: Date) => {
                                if (date) {
                                    console.log(date);
                                }
                            }}
                        />
                    </FormContainer>
                    <FormDivider />
                    <FormAction>
                        <Button>Cancel</Button>
                        <Button theme="primary">Save</Button>
                    </FormAction>
                </Form>
            </Section>
        );
    }
}
