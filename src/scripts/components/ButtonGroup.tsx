import Cascade, { Component } from 'cascade';

export interface IButtonGroupProps {
    className?: string;
    id?: string;
    fill?: boolean;
}

export default class ButtonGroups extends Component<IButtonGroupProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('button-group');
        if (this.props.fill) {
            classNames.push('fill-width');
        }
        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}
