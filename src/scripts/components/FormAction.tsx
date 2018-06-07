import Cascade, { Component } from 'cascade';

export interface IFormActionProps {
    className?: string;
    id?: string;
}

export default class FormAction extends Component<IFormActionProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-action');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}