import Cascade, { Component } from 'cascade';

export interface ICardContainerProps {
    id?: string;
    className?: string;
    space?: boolean;
    width?: number | string;
}

export default class CardContainer extends Component<ICardContainerProps> {
    render() {
        let {
            id,
            className,
            space,
            width
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-container');

        if (space) {
            classNames.push('space');
        }

        if (width && typeof width === 'number') {
            width += 'px' as any;
        }

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                style={{ '--card-min-width': width } as any}
            >
                {this.children}
            </div>
        )
    }
}