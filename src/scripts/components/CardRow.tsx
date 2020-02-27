import Cascade, { Component } from 'cascade';

import { alignClass, AlignType } from '../util/Align';
import ClassNames from '../util/ClassNames';

export interface ICardRowProps {
    id?: string;
    className?: string;
    align?: AlignType;
}

export default class CardRow extends Component<ICardRowProps> {
    render() {
        let {
            id,
            className,
            align
        } = this.props;

        let classNames = new ClassNames(className, 'card-row');

        if (align) {
            alignClass(align, classNames);
        }

        return (
            <div className={classNames.toString()} id={id}>
                {this.children}
            </div>
        );
    }
}