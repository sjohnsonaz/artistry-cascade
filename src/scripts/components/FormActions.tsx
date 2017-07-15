import Cascade, { Component } from 'cascade';

export interface IFormActionsProps {
    className?: string;
}

export default class FormActions extends Component<IFormActionsProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-actions');
        let className = classNames.join(' ');
        return <div className={className}>{this.children}</div>
    }
}