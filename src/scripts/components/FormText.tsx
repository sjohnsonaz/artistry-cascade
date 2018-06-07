import Cascade, { Component } from 'cascade';

export interface IFormTextProps {
    className?: string;
    id?: string;
}

export default class FormText extends Component<IFormTextProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-text');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}