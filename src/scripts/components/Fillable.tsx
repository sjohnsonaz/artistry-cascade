import Cascade, { Component, observable } from 'cascade';

import { waitAnimation } from '../util/PromiseUtil';
import BodyScroll from '../util/BodyScroll';

export interface IFillableProps {
    id?: string;
    className?: string;
    filled?: boolean;
    card?: boolean;
}

export default class Fillable extends Component<IFillableProps> {
    @observable filled: boolean = this.props.filled;
    @observable height: string;
    @observable width: string;
    @observable top: string;
    @observable right: string;
    @observable bottom: string;
    @observable left: string;
    @observable animating: boolean = false;
    @observable running: boolean = false;
    runCount?: number = 0;

    constructor(props: IFillableProps, ...children: any[]) {
        super(props, ...children);
        if (props.filled) {
            this.top = 0 + 'px';
            this.right = 0 + 'px';
            this.bottom = 0 + 'px';
            this.left = 0 + 'px';
            BodyScroll.lock();
        }
    }

    transitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === 'top') {
            let animating = this.animating;
            if (!animating) {
                if (this.props.filled) {
                    this.running = false;
                    BodyScroll.lock();
                } else {
                    this.running = false;
                    this.filled = false;
                    this.height = undefined;
                    this.width = undefined;
                    this.top = undefined;
                    this.right = undefined;
                    this.bottom = undefined;
                    this.left = undefined;
                    BodyScroll.unlock();
                }
            }
        }
    }

    afterRender(node: HTMLDivElement, updating: boolean) {
        if (!updating) {
            node.addEventListener('transitionend', this.transitionEnd);
        }
    }

    async afterProps(mounted: boolean) {
        if (mounted && this.props.filled !== this.prevProps.filled) {
            let node = this.element as HTMLDivElement;
            let runCount = this.runCount;

            this.animating = true;
            if (!this.props.filled) {
                let rect = node.getBoundingClientRect();
                this.top = rect.top + 'px';
                this.bottom = window.innerHeight - rect.top - rect.height + 'px';
                this.left = rect.left + 'px';
                this.right = document.body.scrollWidth - rect.left - rect.width + 'px';
                await Cascade.track(this, 'top');
                if (runCount !== this.runCount) {
                    return;
                }

                this.animating = false;
            } else {
                let rect = node.getBoundingClientRect();
                this.height = rect.height + 'px';
                this.width = rect.width + 'px';
                this.running = true;
                await Cascade.track(this, 'running');
                if (runCount !== this.runCount) {
                    return;
                }

                this.top = rect.top + 'px';
                this.bottom = window.innerHeight - rect.top - rect.height + 'px';
                this.left = rect.left + 'px';
                this.right = document.body.scrollWidth - rect.left - rect.width + 'px';
                await Cascade.track(this, 'top');
                if (runCount !== this.runCount) {
                    return;
                }
    
                this.top = undefined;
                this.right = undefined;
                this.bottom = undefined;
                this.left = undefined;
                this.filled = true;
                await Cascade.track(this, 'filled');
                if (runCount !== this.runCount) {
                    return;
                }

                this.animating = false;
            }
        }
    }

    afterDispose() {
        // If we were locked, unlock
        if (this.filled) {
            BodyScroll.unlock();
        }
    }

    render() {
        let {
            id,
            className,
            card
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('fillable');

        if (card) {
            classNames.push('card-fillable');
        }

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-running={this.running}
                data-filled={this.filled}
                style={{
                    height: this.height,
                    width: this.width
                }}
            >
                <div
                    className="fillable-content"
                    style={{
                        top: this.top,
                        right: this.right,
                        bottom: this.bottom,
                        left: this.left
                    }}
                >
                    {this.children}
                </div>
            </div>
        );
    }
}