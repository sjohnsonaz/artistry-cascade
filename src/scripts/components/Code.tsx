import Cascade, { Component, Elements } from 'cascade';

export interface ICodeProps extends Elements.JSXPreElement {

}

export default class Code extends Component<ICodeProps> {
    render() {
        return (
            <pre class="code">
                {this.children ?
                    this.children.map(child => <code>{child}</code>)
                    : undefined}
            </pre>
        );
    }
}
