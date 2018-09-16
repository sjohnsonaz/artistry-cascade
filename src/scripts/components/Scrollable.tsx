import Cascade, { Component } from 'cascade';

export type ScrollableType =
    'auto' |
    'both' |
    'none' |
    'x' |
    'y' |
    'xAlways' |
    'yAlways' |
    'xNever' |
    'yNever';

export enum ScrollableTypeEnum {
    auto = "auto",
    both = "both",
    none = "none",
    x = "x",
    y = "y",
    xAlways = "xAlways",
    yAlways = "yAlways",
    xNever = "xNever",
    yNever = "yNever"
}

export interface IScrollableProps {
    id?: string;
    className?: string;
    type?: ScrollableType;
}

export default class Scrollable extends Component<IScrollableProps> {
    render() {
        let {
            id,
            className,
            type
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('scrollable');

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-scroll={type}
            >
                {this.children}
            </div>
        );
    }
}