import Cascade, { Component } from 'cascade';

export interface IMenuBarLinkProps {
    className?: string;
    id?: string;
    title?: any;
    href?: string;
    active?: boolean;
}

export default class MenuBarLink extends Component<IMenuBarLinkProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-link');
        if (this.props.active) {
            classNames.push('menu-active');
        }
        return (
            <li className={classNames.join(' ')} id={this.props.id}>
                <a href={this.props.href || ''}>{this.props.title}</a>
            </li>
        );
    }
}
