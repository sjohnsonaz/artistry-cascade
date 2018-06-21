import Cascade, { Component } from 'cascade';

export interface ICardTitleProps {
    id?: string;
    className?: string;
}

export default class CardTitle extends Component<ICardTitleProps> {
    render() {
        let {
            id,
            className
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card-title');

        return (
            <header className={classNames.join(' ')} id={id}>
                {this.children}
            </header>
        );
    }
}