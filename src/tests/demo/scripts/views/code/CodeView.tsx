import Cascade, { Component } from 'cascade';

import { Code } from '../../../../../scripts/modules/CascadeComponents';

export interface ICodeViewProps {

}

export default class CodeView extends Component<ICodeViewProps> {
    render() {
        return (
            <div>
                <h2>Code</h2>
                <Code>{'\
window.onload = function() {\r\n\
    console.log(\'started...\');\r\n\
}\
            '}</Code>
            </div>
        );
    }
}
