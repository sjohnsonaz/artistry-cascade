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
    relative?: boolean;
    onClose?: (closed: boolean) => void;
}

export default class Section extends Component<ISectionProps> {
    @observable closed: boolean;
    toggleTimeout: number;

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

    afterRender(node: HTMLElement, updating: boolean) {
        if (updating) {
            // Get closed value
            let closed = typeof this.props.closed !== 'undefined' ?
                this.props.closed :
                (this.closed || false);

            // Clear toggleTimeout
            let toggleTimeout: number = this.toggleTimeout;
            if (typeof toggleTimeout === 'number') {
                window.clearTimeout(toggleTimeout);
                this.toggleTimeout = undefined;
            }

            let header = node.childNodes[0] as HTMLElement;
            let content = node.childNodes[1] as HTMLElement;
            node.classList.add('section-run');
            if (closed) {
                node.style.height = node.offsetHeight + 'px';
                node.style.height = header.offsetHeight + 'px';
                node.classList.add('section-closed');
                this.toggleTimeout = window.setTimeout(function () {
                    node.style.height = 'auto';
                    node.classList.remove('section-run');
                }, 220);
            } else {
                var sectionBorder = node.offsetHeight - node.clientHeight;
                node.style.height = sectionBorder / 2 + header.offsetHeight + content.offsetHeight + 'px';
                node.classList.remove('section-closed');
                node.style.height = sectionBorder / 2 + header.offsetHeight + content.offsetHeight + 'px';
                this.toggleTimeout = window.setTimeout(function () {
                    node.style.height = 'auto';
                    node.classList.remove('section-run');
                }, 220);
            }
        }
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
            relative,
            grid,
            gridColumns,
            gridSize,
            gridSpace,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('section');

        /*
        if (this.props.closed) {
            classNames.push('section-closed');
        }
        */
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
            <section className={classNames.join(' ')} id={id} {...props}>
                <header>
                    {header}
                    {closeable ?
                        <Button className="section-toggle" onclick={this.close}>-</Button>
                        : undefined}
                </header>
                <div className={innerClassNames.join(' ')}>{this.children}</div>
                {footer ?
                    <footer>{footer}</footer> :
                    null}
            </section>
        );
    }
}