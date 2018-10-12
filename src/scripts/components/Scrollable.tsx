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
    buffer?: number;
    height?: number | string;
    onscroll?: (event?: MouseEvent) => void;
    onTop?: (event?: MouseEvent) => void;
    onRight?: (event?: MouseEvent) => void;
    onBottom?: (event?: MouseEvent) => void;
    onLeft?: (event?: MouseEvent) => void;
}

export default class Scrollable extends Component<IScrollableProps> {
    insideBottom: boolean = false;

    scroll = (event: MouseEvent) => {
        let element = event.target as HTMLDivElement;

        let buffer = this.props.buffer || 0;
        if (this.props.onBottom) {
            if (element.scrollTop + element.clientHeight + buffer >= element.scrollHeight) {
                this.props.onBottom(event);
            }
        }

        if (this.props.onscroll) {
            this.props.onscroll(event);
        }
    }

    render() {
        let {
            id,
            className,
            type,
            height,
            onscroll,
            onTop,
            onRight,
            onBottom,
            onLeft
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('scrollable');

        let scrollHandler = undefined;
        if (onscroll || onTop || onRight || onBottom || onLeft) {
            scrollHandler = this.scroll;
        }

        if (typeof height === 'number') {
            height = height + 'px';
        }

        let style;
        if (height) {
            style = { height: height }
        }
        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-scroll={type}
                onscroll={scrollHandler}
                style={style}
            >
                {this.children}
            </div>
        );
    }
}