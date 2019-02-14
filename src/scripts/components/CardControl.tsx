import Cascade, { Component } from 'cascade';

export interface ICardControlProps {
    id?: string;
    className?: string;
    title?: string;
    label?: boolean;
    width?: number | string;
}

export default class CardControl extends Component<ICardControlProps> {
    render() {
        let {
            id,
            className,
            title,
            label,
            width
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-control');

        if (width && typeof width === 'number') {
            width += 'px' as any;
        }

        let content = (
            <>
                <div className="card-control-title">{title}</div>
                <div className="card-control-data">{this.children}</div>
            </>
        );
        if (label) {
            return (
                <label
                    className={classNames.join(' ')}
                    id={id}
                    style={{ '--card-control-min-width': width } as any}
                >
                    {content}
                </label>
            );
        } else {
            return (
                <div
                    className={classNames.join(' ')}
                    id={id}
                    style={{ '--card-control-min-width': width } as any}
                >
                    {content}
                </div>
            );
        }
    }
}