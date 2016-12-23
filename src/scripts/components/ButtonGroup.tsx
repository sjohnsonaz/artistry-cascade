import Cascade, { Component } from 'cascade';

export interface IButtonGroupProps {
    className?: string;
}

export default class ButtonGroups extends Component<IButtonGroupProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('button-group');
        let className = classNames.join(' ');
        return <div className={className}>{this.children}</div>
    }
}
