import Cascade, { Component } from 'cascade';

export interface IFormActionsProps {
    className?: string;
    id?: string;
}

export default class FormActions extends Component<IFormActionsProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-actions');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}