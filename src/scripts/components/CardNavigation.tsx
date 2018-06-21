import Cascade, { Component } from 'cascade';

export interface ICardNavigationProps {
    id?: string;
    className?: string;
    align?: 'start' | 'end';
}

export default class CardNavigation extends Component<ICardNavigationProps> {
    render() {
        let {
            id,
            className,
            align
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card-nav');

        if (align === 'end') {
            classNames.push('card-nav-align-end');
        }

        return (
            <nav className={classNames.join(' ')} id={id}>
                {this.children}
            </nav>
        );
    }
}