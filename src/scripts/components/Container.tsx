import Cascade, { Component } from 'cascade';

export interface IContainerProps {
    className?: string;
    id?: string;
    menuBar?: boolean;
}

export default class ButtonGroups extends Component<IContainerProps>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('container');
        if (this.props.menuBar) {
            classNames.push('container-menu-bar-top');
        }
        return <div className={classNames.join(' ')} id={this.props.id}>{this.children}</div>
    }
}
