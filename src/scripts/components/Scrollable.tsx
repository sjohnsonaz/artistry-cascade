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

export interface IScrollableExternalProps {
    buffer?: number;
    onscroll?: (event?: MouseEvent) => void;
    onTop?: (event?: MouseEvent) => void;
    onRight?: (event?: MouseEvent) => void;
    onBottom?: (event?: MouseEvent) => void;
    onLeft?: (event?: MouseEvent) => void;
}

export interface IScrollableProps extends IScrollableExternalProps {
    id?: string;
    className?: string;
    type?: ScrollableType;
    height?: number | string;
}

export function scrollHandler(props: IScrollableExternalProps, event: MouseEvent) {
    let element = event.currentTarget as HTMLDivElement;
    let buffer = props.buffer || 0;
    if (props.onBottom) {
        if (element.scrollTop + element.clientHeight + buffer >= element.scrollHeight) {
            props.onBottom(event);
        }
    }
    if (props.onscroll) {
        props.onscroll(event);
    }
}

export default class Scrollable extends Component<IScrollableProps> {
    insideBottom: boolean = false;

    onScroll = (event: MouseEvent) => {
        scrollHandler(this.props, event);
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
            scrollHandler = this.onScroll;
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