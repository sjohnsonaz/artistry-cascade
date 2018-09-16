import Cascade, { Component } from 'cascade';

import { Code, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface ICodeViewProps {

}

export default class CodeView extends Component<ICodeViewProps> {
    render() {
        return (
            <Section header="Code" space>
                <Code>{'\
window.onload = function() {\r\n\
    console.log(\'started...\');\r\n\
}\
            '}</Code>
            </Section>
        );
    }
}
