import Cascade, { Component } from 'cascade';

import { Button, Form, FormAction, FormContainer, FormDivider, FormInput, Section } from '../../../../../scripts/modules/ArtistryCascade';

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
                        <FormInput fill />
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
