import Cascade, { Component } from 'cascade';

import ClassNames from '../util/ClassNames';

export interface ICardSectionProps {
    id?: string;
    className?: string;
    multiColumn?: boolean;
    centered?: boolean;
}

export default class CardSection extends Component<ICardSectionProps> {
    render() {
        let {
            id,
            className,
            multiColumn,
            centered
        } = this.props;

        let classNames = new ClassNames(className, 'card-section');

        classNames.addTest('card-section-multi-column', multiColumn);
        classNames.addTest('card-section-centered', centered);

        return (
            <section className={classNames.toString()} id={id}>
                {this.children}
            </section>
        );
    }
}