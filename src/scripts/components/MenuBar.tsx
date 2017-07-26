import Cascade, { Component } from 'cascade';

export interface IMenuBarProps {
    className?: string;
    title?: any;
    top?: boolean;
    links?: {
        title?: any;
        href?: string;
        active?: boolean;
        reverse?: boolean;
        simple?: boolean;
    }[];
}

export default class MenuBar extends Component<IMenuBarProps> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-bar');

        if (this.props.top) {
            classNames.push('menu-bar-top');
        }

        let menuBarTitle;
        if (this.props.title) {
            menuBarTitle = (
                <div className="menu-bar-title">{this.props.title}</div>
            )
        }

        let className = classNames.join(' ');
        return (
            <div className={className}>
                {menuBarTitle}
                <ul>
                    {this.props.links ?
                        this.props.links.map(link => {
                            let linkClassNames = [];
                            if (link.active) {
                                linkClassNames.push('menu-active');
                            }
                            if (link.reverse) {
                                linkClassNames.push('pull-right');
                            }
                            let linkClassName = linkClassNames.join(' ');
                            return (
                                <li className={linkClassName}>
                                    <a className={link.simple ? '' : 'menu-item'} href={link.href || ''}>{link.title}</a>
                                </li>
                            );
                        })
                        : undefined}
                </ul>
            </div>
        );
    }
}
