import Cascade, { Component, Elements } from 'cascade';

export interface IFormProps extends Elements.JSXFormElement {

}

export default class Form extends Component<IFormProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form');
        let className = classNames.join(' ');
        return (
            <form className={className}>{this.children}</form>
        );
    }
}
