import Cascade, { Component, Elements, observable } from 'cascade';

import Button from './Button';
import { IGridExternalProps, gridConfig } from './Grid';

export interface ISectionProps extends Elements.JSXElement, IGridExternalProps {
    header: any;
    footer?: any;
    lockable?: boolean;
    locked?: boolean;
    closeable?: boolean;
    closed?: boolean;
    space?: boolean;
    headerSpace?: boolean;
    footerSpace?: boolean;
    relative?: boolean;
    onClose?: (closed: boolean) => void;
}

export default class Section extends Component<ISectionProps> {
    @observable closed: boolean;
    @observable running: boolean = false;
    @observable animating: boolean = false;
    @observable height: string = undefined;
    runCount: number = 0;

    close = () => {
        if (this.props.onClose) {
            // Get closed value
            let closed = typeof this.props.closed !== 'undefined' ?
                this.props.closed :
                (this.closed || false);
            this.props.onClose(closed);
        } else {
            this.closed = !this.closed;
        }
    }

    transitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === 'height') {
            let animating = this.animating;
            if (!animating) {
                if (this.props.closed) {
                    this.height = undefined;
                    this.running = false;
                    this.closed = true;
                } else {
                    this.height = undefined;
                    this.running = false;
                    this.closed = false;
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
            let node = this.element as HTMLElement;
            let header = node.childNodes[0] as HTMLElement;
            let content = node.childNodes[1] as HTMLElement;

            this.runCount++;
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

                this.height = header.offsetHeight + 'px';
                await Cascade.track(this, 'height');
                if (runCount !== this.runCount) {
                    return;
                }

                this.animating = false;
                await Cascade.track(this, 'animating');
            } else {
                var border = node.offsetHeight - node.clientHeight;
                this.height = border / 2 + header.offsetHeight + content.offsetHeight + 'px';
                await Cascade.track(this, 'height');
                if (runCount !== this.runCount) {
                    return;
                }

                this.closed = false;
                await Cascade.track(this, 'closed');
                if (runCount !== this.runCount) {
                    return;
                }

                this.height = border / 2 + header.offsetHeight + content.offsetHeight + 'px';
                await Cascade.track(this, 'height');
                if (runCount !== this.runCount) {
                    return;
                }

                this.animating = false;
                await Cascade.track(this, 'animating');
            }
        }
    }

    afterDispose() {
        this.runCount++;
    }

    render() {
        let {
            id,
            className,
            header,
            footer,
            closeable,
            closed,
            lockable,
            locked,
            space,
            headerSpace,
            footerSpace,
            relative,
            grid,
            gridColumns,
            gridSize,
            gridSpace,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('section');

        if (this.closed) {
            classNames.push('section-closed');
        }

        if (this.running) {
            classNames.push('section-run');
        }

        let innerClassNames = ['section-content'];
        if (lockable) {
            innerClassNames.push('lock-contents');
        }

        if (locked) {
            innerClassNames.push('locked');
        }

        if (space) {
            innerClassNames.push('section-content-space');
        }

        if (relative) {
            innerClassNames.push('section-content-relative');
        }

        if (grid) {
            gridConfig(innerClassNames, this.props);
        }

        return (
            <section
                className={classNames.join(' ')}
                id={id}
                style={{
                    height: this.height
                }}
                onTransitionEnd={this.transitionEnd}
                {...props}
            >
                <header
                    className={headerSpace ? 'section-title' : undefined}
                >
                    {header}
                    {closeable ?
                        <Button className="section-toggle" onclick={this.close}>-</Button>
                        : undefined}
                </header>
                <div className={innerClassNames.join(' ')}>{this.children}</div>
                {footer ?
                    <footer
                        className={footerSpace ? 'section-title' : undefined}
                    >
                        {footer}
                    </footer> :
                    undefined}
            </section>
        );
    }
}