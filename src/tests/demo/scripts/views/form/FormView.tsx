import Cascade, { Component } from 'cascade';

import { Form, FormContainer, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface IFormViewProps {

}

export default class FormView extends Component<IFormViewProps> {
    render() {
        return (
            <Section title="Form">
                <Form>
                    <FormContainer title="Value">
                        <input type="text" />
                    </FormContainer>
                </Form>
            </Section>
        );
    }
}
