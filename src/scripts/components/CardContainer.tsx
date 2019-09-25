import Cascade, { Component } from 'cascade';

export interface ICardContainerProps {
    id?: string;
    className?: string;
    space?: boolean;
    minWidth?: number | string;
    maxWidth?: number | string;
}

export default class CardContainer extends Component<ICardContainerProps> {
    render() {
        let {
            id,
            className,
            space,
            minWidth,
            maxWidth
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-container');

        if (space) {
            classNames.push('space');
        }

        if (maxWidth && typeof maxWidth === 'number') {
            maxWidth += 'px' as any;
        }

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                style={{
                    '--card-min-width': minWidth,
                    '--card-max-width': maxWidth
                } as any}
            >
                {this.children}
            </div>
        )
    }
}