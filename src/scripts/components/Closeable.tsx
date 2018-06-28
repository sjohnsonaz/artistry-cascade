import Cascade, { Component, observable } from 'cascade';

export interface ICloseableProps {
    id?: string;
    className?: string;
    closed?: boolean;
}

export default class Closeable extends Component<ICloseableProps> {
    @observable closed: boolean = this.props.closed;
    @observable running: boolean = false;
    @observable animating: boolean = false;
    @observable height: string = undefined;
    runCount: number = 0;

    transitionEnd = async (event: TransitionEvent) => {
        if (event.propertyName === 'height') {
            let animating = this.animating;
            if (!animating) {
                if (this.closed) {
                    this.running = false;
                    await Cascade.track(this, 'running');
                } else {
                    this.height = undefined;
                    this.running = false;
                    await Cascade.track(this, 'running');
                }
            }
        }
    }

    afterRender(node: HTMLDivElement, updating: boolean) {
        if (!updating) {
            node.addEventListener('transitionend', this.transitionEnd);
        }
    }

    async afterProps(updating: boolean) {
        if (updating && this.props.closed !== this.prevProps.closed) {
            let node = this.element as HTMLDivElement;
            let runCount = this.runCount;

            this.running = true;
            this.animating = true;
            await Cascade.track(this, 'animating');

            if (runCount !== this.runCount) {
                return;
            }

            if (this.props.closed) {
                this.height = node.offsetHeight + 'px';
                await Cascade.track(this, 'height');
                if (runCount !== this.runCount) {
                    return;
                }

                this.closed = true;
                await Cascade.track(this, 'closed');
                if (runCount !== this.runCount) {
                    return;
                }

                let border = node.offsetHeight - node.clientHeight;
                this.height = border / 2 + 'px';
                await Cascade.track(this, 'height');
                if (runCount !== this.runCount) {
                    return;
                }

                this.animating = false;
                await Cascade.track(this, 'animating');
            } else {
                let border = node.offsetHeight - node.clientHeight;
                this.height = border / 2 + 'px';
                await Cascade.track(this, 'height');
                if (runCount !== this.runCount) {
                    return;
                }

                this.closed = false;
                await Cascade.track(this, 'closed');
                if (runCount !== this.runCount) {
                    return;
                }

                this.height = border / 2 + node.scrollHeight + 'px';
                await Cascade.track(this, 'height');
                if (runCount !== this.runCount) {
                    return;
                }

                this.animating = false;
                await Cascade.track(this, 'animating');
            }
        }
    }

    render() {
        let {
            id,
            className,
            closed
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('closeable');

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-closed={this.closed}
                data-running={this.running}
                style={"height: " + this.height}
            >
                {this.children}
            </div>
        )
    }
}