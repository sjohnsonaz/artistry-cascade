import Cascade, { Component, observable } from 'cascade';

import ClassNames from '../util/ClassNames';

export interface ICarouselProps {
    className?: string;
    activeIndex: number;
}

export default class Carousel extends Component<ICarouselProps> {
    container: HTMLElement;
    child: HTMLElement;

    afterRender(node: HTMLElement, updating: boolean) {
        let { activeIndex } = this.props;
        activeIndex = activeIndex || 0;
        let children = node.children;
        activeIndex %= children.length;

        // Clear toggleTimeout
        let tabTimeout: number = (node as any).tabTimeout;
        if (typeof tabTimeout === 'number') {
            window.clearTimeout(tabTimeout);
            (node as any).tabTimeout = undefined;
        }

        if (updating) {
            let computedStyle = window.getComputedStyle(node, null);
            let paddingHeight = parseFloat(computedStyle.getPropertyValue('padding-top')) + parseFloat(computedStyle.getPropertyValue('padding-bottom'));
            let height = node.clientHeight + 'px'

            node.style.height = height;
            ClassNames.classListAdd(node, 'carousel-run');

            for (var index = 0, length = children.length; index < length; index++) {
                var child = children[index];
                (child as HTMLElement).style.visibility = '';
                if (index === activeIndex) {
                    child.className = 'carousel-selected';
                    height = paddingHeight + child.clientHeight + 'px';
                } else if (child.className) {
                    child.className = '';
                }
            }

            node.style.height = height;

            (node as any).tabTimeout = window.setTimeout(() => {
                ClassNames.classListRemove(node, 'carousel-run');
                node.style.height = 'auto';
                for (var index = 0, length = children.length; index < length; index++) {
                    var child = children[index];
                    if (index !== activeIndex) {
                        (child as HTMLElement).style.visibility = 'hidden';
                    }
                }
            }, 500);
        } else {
            for (var index = 0, length = children.length; index < length; index++) {
                var child = children[index];
                if (index === activeIndex) {
                    child.className = 'carousel-selected';
                } else {
                    child.className = '';
                }
            }
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');

        let className = classNames.join(' ');

        return (
            <div className={className} style="height: auto;">
                {this.children ? this.children.map((child, index) => {
                    return <div className={className}>{child}</div>
                }) : undefined}
            </div>
        );
    }
}
