import Cascade, { Component, observable } from 'cascade';

import ClassNames from '../util/ClassNames';
import { wait } from '../util/PromiseUtil';

export interface ICarouselProps {
    className?: string;
    id?: string;
    activeIndex: number;
    animation?: 'slide' | 'slide-fade' | 'fade' | 'flip';
    safe?: boolean;
}

export default class Carousel extends Component<ICarouselProps> {
    container: HTMLElement;
    child: HTMLElement;

    async afterRender(node: HTMLElement, updating: boolean) {
        let { activeIndex } = this.props;
        activeIndex = activeIndex || 0;
        let children = node.children;
        activeIndex %= children.length;
        if (activeIndex < 0) {
            activeIndex += children.length;
            activeIndex %= children.length;
        }

        // increment runCount
        node['runCount'] = (node['runCount'] || 0) + 1;
        let runCount = node['runCount'];

        if (updating && node['activeIndex'] !== activeIndex) {
            node['activeIndex'] = activeIndex;
            let computedStyle = window.getComputedStyle(node, null);
            let paddingHeight = parseFloat(computedStyle.getPropertyValue('padding-top')) + parseFloat(computedStyle.getPropertyValue('padding-bottom'));
            let height = node.clientHeight + 'px'

            node.style.height = height;
            node.classList.add('carousel-run');

            // Wait for the carousel-run class to be added
            await wait(30);
            if (runCount === node['runCount']) {

                let oldChild: Element;
                for (var index = 0, length = children.length; index < length; index++) {
                    let child = children[index];
                    if (child.classList.contains('carousel-selected')) {
                        oldChild = child;
                        break;
                    }
                }
                let activeChild = children[activeIndex];

                oldChild.classList.remove('carousel-selected');

                if (activeChild) {
                    activeChild.classList.add('carousel-selected');
                    height = paddingHeight + activeChild.clientHeight + 'px';
                } else {
                    height = 'auto';
                }

                node.style.height = height;

                // Wait for the animation to run
                await wait(500);
                if (runCount === node['runCount']) {

                    node.classList.remove('carousel-run');
                    node.style.height = 'auto';
                }
            }
        } else {
            node['activeIndex'] = activeIndex;
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

        switch (this.props.animation) {
            case 'slide':
                break;
            case 'slide-fade':
                classNames.push('carousel-animate-fade');
                break;
            case 'fade':
                classNames.push('carousel-animate-fade');
                break;
            case 'flip':
                classNames.push('carousel-animate-flip');
                break;
            default:
                break;
        }

        if (this.props.safe) {
            classNames.push('carousel-safe');
        }

        return (
            <div className={classNames.join(' ')} id={this.props.id} style="height: auto;">
                {this.children ? this.children.map((child, index) => {
                    return <div>{child}</div>
                }) : undefined}
            </div>
        );
    }
}

function clearTimeoutBinding(container: any, property: string) {
    let timeout: number = container[property];
    if (typeof timeout === 'number') {
        window.clearTimeout(timeout);
        container[property] = undefined;
    }
}

function setTimeoutBinding(container: any, property: string, callback: Function, time?: number) {
    container[property] = window.setTimeout(callback, time);
    return container[property];
}