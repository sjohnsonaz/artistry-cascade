import Cascade, { Component } from 'cascade';

import { Button, Form, FormActions, FormContainer, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IFormViewProps {

}

export default class FormView extends Component<IFormViewProps> {
    render() {
        return (
            <Section title="Form">
                <Form>
                    <FormContainer title="Value">
                        <input type="text" className="input" />
                    </FormContainer>
                    <FormActions>
                        <Button>Cancel</Button>
                        <Button theme="primary">Save</Button>
                    </FormActions>
                </Form>
            </Section>
        );
    }
}
