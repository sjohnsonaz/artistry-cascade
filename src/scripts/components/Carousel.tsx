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
        let {activeIndex} = this.props;
        activeIndex = activeIndex || 0;
        let children = node.children;
        activeIndex %= children.length;

        if (updating) {
            let computedStyle = window.getComputedStyle(node, null);
            let paddingHeight = parseFloat(computedStyle.getPropertyValue('padding-top')) + parseFloat(computedStyle.getPropertyValue('padding-bottom'));
            let height = node.clientHeight + 'px'

            node.style.height = height;
            ClassNames.classListAdd(node, 'carousel-run');

            for (var index = 0, length = children.length; index < length; index++) {
                var child = children[index];
                if (index === activeIndex) {
                    child.className = 'carousel-selected';
                    height = paddingHeight + child.clientHeight + 'px';
                } else if (child.className) {
                    child.className = '';
                }
            }

            node.style.height = height;

            window.setTimeout(() => {
                ClassNames.classListRemove(node, 'carousel-run');
                node.style.height = 'auto';
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
