import Cascade, { Component } from 'cascade';

export interface ICardSectionProps {
    id?: string;
    className?: string;
    multiColumn?: boolean;
}

export default class CardSection extends Component<ICardSectionProps> {
    render() {
        let {
            id,
            className,
            multiColumn
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-section');

        if (multiColumn) {
            classNames.push('card-section-multi-column');
        }

        return (
            <section className={classNames.join(' ')} id={id}>
                {this.children}
            </section>
        );
    }
}