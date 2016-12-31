import Cascade, { Component } from 'cascade';

import { Code, Section } from '../../../../../scripts/modules/CascadeComponents';

export interface ICodeViewProps {

}

export default class CodeView extends Component<ICodeViewProps> {
    render() {
        return (
            <Section title="Code">
                <Code>{'\
window.onload = function() {\r\n\
    console.log(\'started...\');\r\n\
}\
            '}</Code>
            </Section>
        );
    }
}
