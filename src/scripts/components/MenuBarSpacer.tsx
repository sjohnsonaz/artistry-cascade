import Cascade, { Component } from 'cascade';

export interface IMenuBarSpacerProps {
    className?: string;
    id?: string;
}

export default class MenuBarSpacer extends Component<IMenuBarSpacerProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-spacer');
        return (
            <li className={classNames.join(' ')} id={this.props.id}></li>
        );
    }
}
