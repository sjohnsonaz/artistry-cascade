import Cascade, { Component } from 'cascade';

export interface IFormDividerProps {
    className?: string;
    id?: string;
}

export default class FormDivider extends Component<IFormDividerProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('form-divider');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}