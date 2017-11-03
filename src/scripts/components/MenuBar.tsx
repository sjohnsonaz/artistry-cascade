import Cascade, { Component } from 'cascade';

export interface IMenuBarProps {
    className?: string;
    id?: string;
    title?: any;
    top?: boolean;
    open?: boolean;
    onOpen?: (event: MouseEvent) => boolean | void;
}

export default class MenuBar extends Component<IMenuBarProps> {
    expand(event: MouseEvent) {
        event.preventDefault();
        this.props.onOpen(event);
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-bar');

        if (this.props.top) {
            classNames.push('menu-bar-top');
        }

        if (this.props.open) {
            classNames.push('menu-bar-open');
        }

        let menuBarTitle;
        if (this.props.title) {
            menuBarTitle = (
                <div className="menu-bar-title">{this.props.title}</div>
            )
        }

        return (
            <div className={classNames.join(' ')} id={this.props.id}>
                {this.props.top ? <div className="menu-bar-expander">
                    <a href="#" onclick={this.expand.bind(this)}>&#9776;</a>
                </div> : undefined}
                {menuBarTitle}
                <ul>
                    {this.children}
                </ul>
            </div>
        );
    }
}
