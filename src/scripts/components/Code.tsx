import Cascade, { Component, Elements } from 'cascade';

export interface ICodeProps extends Elements.JSXPreElement {

}

export default class Code extends Component<ICodeProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('code');
        return (
            <pre className={classNames.join(' ')} {...this.props}>
                {this.children ?
                    this.children.map(child => <code>{child}</code>)
                    : undefined}
            </pre>
        );
    }
}
