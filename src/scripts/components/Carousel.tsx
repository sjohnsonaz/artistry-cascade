import Cascade, { Component, observable } from 'cascade';

import ClassNames from '../util/ClassNames';
import { wait, waitAnimation } from '../util/PromiseUtil';

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

    @observable height: string = 'auto';
    @observable activeIndex: number = 0;
    @observable previousActiveIndex: number = 0;
    @observable running: boolean = false;
    @observable animating: boolean = false;
    @observable selected: boolean = false;
    runCount: number = 0;

    transitionEnd = async (event: TransitionEvent) => {
        if (event.propertyName === 'height') {
            let running = this.running;
            if (!running) {
                this.animating = false;
                this.height = 'auto';
                this.previousActiveIndex = this.activeIndex;
            }
        }
    }


    async afterRender(node: HTMLElement, updating: boolean) {
        // Only run if we are changing indexes
        if (updating) {
            let { activeIndex } = this.props;
            let { activeIndex: previousActiveIndex } = this.prevProps;

            activeIndex = activeIndex || 0;
            previousActiveIndex = previousActiveIndex || 0;
            let children = this.children;
            if (children instanceof Array) {
                activeIndex %= children.length;
                previousActiveIndex %= children.length;
                if (activeIndex < 0) {
                    activeIndex += children.length;
                    activeIndex %= children.length;
                }
                if (previousActiveIndex < 0) {
                    previousActiveIndex += children.length;
                    previousActiveIndex %= children.length;
                }
            }
            if (activeIndex === previousActiveIndex) {
                return;
            }

            // Store runCount in closure
            let runCount = this.runCount + 1;

            // Start run
            this.runCount = runCount;

            await Cascade.set(this, 'running', true);
            if (runCount !== this.runCount) {
                return;
            }

            // Store current height
            await Cascade.set(this, 'height', node.offsetHeight + 'px');
            if (runCount !== this.runCount) {
                return;
            }

            // Start animating
            await Cascade.set(this, 'animating', true);
            if (runCount !== this.runCount) {
                return;
            }

            // Update indexes
            this.activeIndex = activeIndex;
            this.previousActiveIndex = previousActiveIndex;
            await Cascade.set(this, 'selected', false);

            // Wait for animationFrame
            await waitAnimation(1);
            if (runCount !== this.runCount) {
                return;
            }

            // Update selected
            await Cascade.set(this, 'selected', true);
            if (runCount !== this.runCount) {
                return;
            }

            // Update height
            let computedStyle = window.getComputedStyle(node, null);
            let paddingHeight =
                parseFloat(computedStyle.getPropertyValue('border-top-width')) +
                parseFloat(computedStyle.getPropertyValue('border-bottom-width')) +
                parseFloat(computedStyle.getPropertyValue('padding-top')) +
                parseFloat(computedStyle.getPropertyValue('padding-bottom'));
            let activeChild = node.querySelector('.carousel-selected');
            if (activeChild) {
                await Cascade.set(this, 'height', paddingHeight + activeChild.clientHeight + 'px');
            }
            if (runCount !== this.runCount) {
                return;
            }

            // Stop run
            if (this.running) {
                await Cascade.set(this, 'running', false);
            }
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');

        if (this.animating) {
            classNames.push('carousel-run');
        }

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

        let children;

        if (this.children instanceof Array) {
            if (this.activeIndex !== this.previousActiveIndex) {
                if (this.activeIndex < this.previousActiveIndex) {
                    children = [
                        <div
                            key={this.activeIndex as any}
                            className={this.selected ? "carousel-selected" : ""}
                        >{this.children[this.activeIndex]}</div>,
                        <div
                            key={this.previousActiveIndex as any}
                            className={this.selected ? "" : "carousel-selected"}
                        >{this.children[this.previousActiveIndex]}</div>
                    ];
                } else {
                    children = [
                        <div
                            key={this.previousActiveIndex as any}
                            className={this.selected ? "" : "carousel-selected"}
                        >{this.children[this.previousActiveIndex]}</div>,
                        <div
                            key={this.activeIndex as any}
                            className={this.selected ? "carousel-selected" : ""}
                        >{this.children[this.activeIndex]}</div>
                    ];
                }
            } else {
                children = (
                    <div key={this.activeIndex as any} className={this.selected ? "carousel-selected" : ""}>{this.children[this.activeIndex]}</div>
                );
            }
        } else {
            children = (
                <div key={this.activeIndex as any} className={this.selected ? "carousel-selected" : ""}>{this.children}</div>
            );
        }


        return (
            <div
                className={classNames.join(' ')}
                id={this.props.id}
                style={"height: " + this.height}
                onTransitionEnd={this.transitionEnd}
            >
                {children}
            </div>
        );
    }
}